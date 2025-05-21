
import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { X, Plus } from 'lucide-react';
import OnboardingLayout from '@/components/layouts/OnboardingLayout';
import OnboardingStepper from '@/components/onboarding/OnboardingStepper';
import OnboardingNavigation from '@/components/onboarding/OnboardingNavigation';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { UserRole } from '@/lib/permissions/roles';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const inviteSchema = z.object({
  email: z
    .string()
    .email({ message: 'Please enter a valid email address.' }),
  role: z.string(),
});

type InviteFormValues = z.infer<typeof inviteSchema>;

const InviteTeamPage = () => {
  const { teamInvites, addTeamInvite, removeTeamInvite, organization, setCurrentStep } = useOnboarding();
  
  // Set the current step on component mount
  React.useEffect(() => {
    setCurrentStep(4);
  }, [setCurrentStep]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<InviteFormValues>({
    resolver: zodResolver(inviteSchema),
    defaultValues: {
      email: '',
      role: UserRole.EMPLOYEE,
    },
  });

  const handleAddInvite = form.handleSubmit((data) => {
    // Check if email already exists in the invites
    if (teamInvites.some(invite => invite.email === data.email)) {
      toast({
        variant: 'destructive',
        title: 'Email already added',
        description: 'This email has already been added to the invite list.',
      });
      return;
    }

    addTeamInvite({
      email: data.email,
      role: data.role as UserRole,
    });

    // Reset form
    form.reset({
      email: '',
      role: UserRole.EMPLOYEE,
    });

    toast({
      title: 'Team member added',
      description: `${data.email} has been added to the invite list.`,
    });
  });

  const handleRemoveInvite = (email: string) => {
    removeTeamInvite(email);
    toast({
      title: 'Team member removed',
      description: `${email} has been removed from the invite list.`,
    });
  };

  const handleInviteAll = async () => {
    if (teamInvites.length === 0) {
      // If no invites, just proceed to next step
      return true;
    }

    setIsSubmitting(true);
    try {
      // Simulate API call to send invites
      // In a real app, you would make an API request here
      console.log('Sending invites to:', teamInvites);

      // Show success toast
      toast({
        title: 'Invitations sent',
        description: `Invitations have been sent to ${teamInvites.length} team members.`,
      });

      setIsSubmitting(false);
      return true;
    } catch (error) {
      console.error('Error sending invites:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to send invitations. Please try again.',
      });
      setIsSubmitting(false);
      return false;
    }
  };

  return (
    <OnboardingLayout>
      <OnboardingStepper />

      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Invite Your Team</h1>
        <p className="text-gray-600 mt-1">
          Invite team members to join {organization.name} (optional)
        </p>
      </div>

      <div className="space-y-6">
        <Form {...form}>
          <div className="flex space-x-3">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="sr-only">Email Address</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Email address" type="email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className="w-40">
                  <FormLabel className="sr-only">Role</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={UserRole.EMPLOYEE}>Employee</SelectItem>
                      <SelectItem value={UserRole.SUPERVISOR}>Manager</SelectItem>
                      <SelectItem value={UserRole.DIRECTOR}>Director</SelectItem>
                      <SelectItem value={UserRole.HR_OFFICER}>HR Officer</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="button"
              onClick={handleAddInvite}
              className="self-end"
            >
              <Plus className="mr-1 h-4 w-4" />
              Add
            </Button>
          </div>
        </Form>

        {teamInvites.length > 0 && (
          <div className="border rounded-md p-4">
            <h3 className="text-sm font-medium mb-3">Team Members to Invite</h3>
            <div className="space-y-2">
              {teamInvites.map((invite) => (
                <div
                  key={invite.email}
                  className="flex items-center justify-between bg-gray-50 p-2 rounded-md"
                >
                  <div className="flex items-center space-x-2">
                    <span>{invite.email}</span>
                    <Badge variant="outline">{invite.role}</Badge>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveInvite(invite.email)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-blue-50 p-4 rounded-md text-sm text-blue-700">
          <p>Team members will receive an email invitation to join your organization.</p>
        </div>

        <OnboardingNavigation
          onNext={handleInviteAll}
          nextDisabled={isSubmitting}
          skipLink="/onboarding/complete"
          skipLabel="Skip for now"
          nextLabel={teamInvites.length > 0 ? 'Send Invites' : 'Continue'}
        />
      </div>
    </OnboardingLayout>
  );
};

export default InviteTeamPage;
