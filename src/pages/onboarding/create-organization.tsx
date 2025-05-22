
import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import OnboardingLayout from '@/components/layouts/OnboardingLayout';
import OnboardingStepper from '@/components/onboarding/OnboardingStepper';
import OnboardingNavigation from '@/components/onboarding/OnboardingNavigation';
import { useOnboarding } from '@/contexts/OnboardingContext';
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
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

const organizationSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Organization name must be at least 2 characters.' })
    .max(100, { message: 'Organization name must be less than 100 characters.' }),
  industry: z.string().optional(),
  size: z.string().optional(),
});

type FormValues = z.infer<typeof organizationSchema>;

const industries = [
  { id: 'technology', name: 'Technology' },
  { id: 'healthcare', name: 'Healthcare' },
  { id: 'education', name: 'Education' },
  { id: 'finance', name: 'Finance' },
  { id: 'retail', name: 'Retail' },
  { id: 'manufacturing', name: 'Manufacturing' },
  { id: 'government', name: 'Government' },
  { id: 'other', name: 'Other' },
];

const companySizes = [
  { id: '1-10', name: '1-10 employees' },
  { id: '11-50', name: '11-50 employees' },
  { id: '51-200', name: '51-200 employees' },
  { id: '201-500', name: '201-500 employees' },
  { id: '501-1000', name: '501-1000 employees' },
  { id: '1001+', name: '1001+ employees' },
];

const CreateOrganizationPage = () => {
  const { organization, updateOrganization, setCurrentStep } = useOnboarding();

  // Set the current step on component mount
  React.useEffect(() => {
    setCurrentStep(2);
  }, [setCurrentStep]);

  const form = useForm<FormValues>({
    resolver: zodResolver(organizationSchema),
    defaultValues: {
      name: organization.name || '',
      industry: organization.industry || '',
      size: organization.size || '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      // Update organization in context
      updateOrganization(data);
      
      // Return true to allow navigation to next step
      return true;
    } catch (error) {
      console.error('Error updating organization:', error);
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
        <h1 className="text-2xl font-bold tracking-tight">Create Your Organization</h1>
        <p className="text-gray-600 mt-1">
          Tell us about your organization to get started
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className={animateElement("", ["fade-in"])} style={{ animationDelay: "100ms" }}>
                <FormLabel>Organization Name*</FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    placeholder="Enter your organization name" 
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
              name="industry"
              render={({ field }) => (
                <FormItem className={animateElement("", ["fade-in"])} style={{ animationDelay: "200ms" }}>
                  <FormLabel>Industry</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className={animateElement("", ["hover-scale"])}>
                        <SelectValue placeholder="Select your industry" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {industries.map((industry) => (
                        <SelectItem 
                          key={industry.id} 
                          value={industry.id}
                          className={animateElement("", ["hover-lift"])}
                        >
                          {industry.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="size"
              render={({ field }) => (
                <FormItem className={animateElement("", ["fade-in"])} style={{ animationDelay: "300ms" }}>
                  <FormLabel>Company Size</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className={animateElement("", ["hover-scale"])}>
                        <SelectValue placeholder="Select company size" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {companySizes.map((size) => (
                        <SelectItem 
                          key={size.id} 
                          value={size.id}
                          className={animateElement("", ["hover-lift"])}
                        >
                          {size.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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

export default CreateOrganizationPage;
