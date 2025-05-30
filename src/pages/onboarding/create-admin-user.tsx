
import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import OnboardingLayout from '@/components/layouts/OnboardingLayout';
import OnboardingStepper from '@/components/onboarding/OnboardingStepper';
import OnboardingNavigation from '@/components/onboarding/OnboardingNavigation';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { UserRole } from '@/lib/permissions/roles';
import { toast } from '@/hooks/use-toast';
import { animateElement } from '@/utils/animations';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const adminUserSchema = z
  .object({
    firstName: z
      .string()
      .min(2, { message: 'First name must be at least 2 characters.' })
      .max(50, { message: 'First name must be less than 50 characters.' }),
    lastName: z
      .string()
      .min(2, { message: 'Last name must be at least 2 characters.' })
      .max(50, { message: 'Last name must be less than 50 characters.' }),
    email: z
      .string()
      .email({ message: 'Please enter a valid email address.' }),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters.' }),
    confirmPassword: z
      .string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type FormValues = z.infer<typeof adminUserSchema>;

const CreateAdminUserPage = () => {
  const { adminUser, updateAdminUser, organization, setCurrentStep } = useOnboarding();

  // Set the current step on component mount
  React.useEffect(() => {
    setCurrentStep(3);
  }, [setCurrentStep]);

  const form = useForm<FormValues>({
    resolver: zodResolver(adminUserSchema),
    defaultValues: {
      firstName: adminUser.firstName || '',
      lastName: adminUser.lastName || '',
      email: adminUser.email || '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      // Simulate API call to create admin user
      // In a real app, you would make an API request here
      console.log('Creating admin user:', {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        organizationName: organization.name,
        role: UserRole.HR_OFFICER,
      });

      // Update admin user in context, with HR_OFFICER role
      updateAdminUser({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        role: UserRole.HR_OFFICER,
      });

      // Show success toast
      toast({
        title: 'Admin account created',
        description: `Welcome, ${data.firstName}! Your admin account has been set up.`,
      });

      // Return true to allow navigation to next step
      return true;
    } catch (error) {
      console.error('Error creating admin user:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to create admin user. Please try again.',
      });
      return false;
    }
  };
  
  // Create a wrapper function that will call form.handleSubmit
  // and ensure it returns a Promise<boolean>
  const handleNext = async (): Promise<boolean> => {
    return new Promise((resolve) => {
      form.handleSubmit(async (data) => {
        const result = await onSubmit(data);
        resolve(result);
      })();
    });
  };

  return (
    <OnboardingLayout>
      <OnboardingStepper />
      
      <div className={animateElement("text-center mb-6", ["fade-in"])}>
        <h1 className="text-2xl font-bold tracking-tight">Create Admin Account</h1>
        <p className="text-gray-600 mt-1">
          Set up your admin account for {organization.name}
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className={animateElement("", ["fade-in"])} style={{ animationDelay: "100ms" }}>
                  <FormLabel>First Name*</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      placeholder="John" 
                      className={animateElement("", ["hover-scale"])}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className={animateElement("", ["fade-in"])} style={{ animationDelay: "200ms" }}>
                  <FormLabel>Last Name*</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      placeholder="Doe" 
                      className={animateElement("", ["hover-scale"])}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className={animateElement("", ["fade-in"])} style={{ animationDelay: "300ms" }}>
                <FormLabel>Email Address*</FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    placeholder="john@example.com" 
                    type="email" 
                    className={animateElement("", ["hover-scale"])}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className={animateElement("", ["fade-in"])} style={{ animationDelay: "400ms" }}>
                  <FormLabel>Password*</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      type="password" 
                      placeholder="••••••••" 
                      className={animateElement("", ["hover-scale"])}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className={animateElement("", ["fade-in"])} style={{ animationDelay: "500ms" }}>
                  <FormLabel>Confirm Password*</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      type="password" 
                      placeholder="••••••••" 
                      className={animateElement("", ["hover-scale"])}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <OnboardingNavigation
            onNext={handleNext}
            nextDisabled={form.formState.isSubmitting}
          />
        </form>
      </Form>
    </OnboardingLayout>
  );
};

export default CreateAdminUserPage;
