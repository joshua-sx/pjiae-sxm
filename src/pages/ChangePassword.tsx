
import React, { useState } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { EnhancedCard } from '@/components/ui/enhanced-card';
import { Button } from '@/components/ui/button';
import { EnhancedInput } from '@/components/ui/enhanced-input';
import { PageHeader } from '@/components/common/PageHeader';
import { useToast } from '@/hooks/use-toast';
import { Lock, Check, Eye, EyeOff } from 'lucide-react';

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { toast } = useToast();

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!currentPassword) {
      newErrors.currentPassword = "Current password is required";
    }
    
    if (!newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters";
    } else if (!/[A-Z]/.test(newPassword)) {
      newErrors.newPassword = "Password must include an uppercase letter";
    } else if (!/[a-z]/.test(newPassword)) {
      newErrors.newPassword = "Password must include a lowercase letter";
    } else if (!/[0-9]/.test(newPassword)) {
      newErrors.newPassword = "Password must include a number";
    } else if (!/[^A-Za-z0-9]/.test(newPassword)) {
      newErrors.newPassword = "Password must include a special character";
    }
    
    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (confirmPassword !== newPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Password changed",
        description: "Your password has been updated successfully",
        variant: "success",
      });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }, 1000);
  };

  const togglePasswordVisibility = (field: string) => {
    switch(field) {
      case 'current':
        setShowCurrentPassword(!showCurrentPassword);
        break;
      case 'new':
        setShowNewPassword(!showNewPassword);
        break;
      case 'confirm':
        setShowConfirmPassword(!showConfirmPassword);
        break;
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <PageHeader
          title="Change Password"
          subtitle="Update your account password"
        />

        <EnhancedCard
          title="Password Settings"
          description="Ensure your account is using a strong, secure password"
          variant="default"
        >
          <form className="space-y-6" onSubmit={handleSubmit}>
            <EnhancedInput
              id="current-password"
              label="Current Password"
              type={showCurrentPassword ? "text" : "password"}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Your current password"
              error={errors.currentPassword}
              required
              status={errors.currentPassword ? "error" : "default"}
              icon={<Lock className="h-4 w-4" />}
              className="relative"
            />
            
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer" onClick={() => togglePasswordVisibility('current')}>
              {showCurrentPassword ? <EyeOff className="h-4 w-4 text-muted-foreground" /> : <Eye className="h-4 w-4 text-muted-foreground" />}
            </div>
            
            <EnhancedInput
              id="new-password"
              label="New Password"
              type={showNewPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Your new password"
              error={errors.newPassword}
              required
              status={errors.newPassword ? "error" : "default"}
              icon={<Lock className="h-4 w-4" />}
            />
            
            <EnhancedInput
              id="confirm-password"
              label="Confirm New Password"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your new password"
              error={errors.confirmPassword}
              required
              status={errors.confirmPassword ? "error" : newPassword && confirmPassword === newPassword ? "success" : "default"}
              icon={<Lock className="h-4 w-4" />}
            />
            
            <div>
              <h4 className="text-sm font-medium mb-2">Password Requirements:</h4>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-2">
                <PasswordRequirementItem 
                  label="At least 8 characters long"
                  met={newPassword.length >= 8}
                />
                <PasswordRequirementItem 
                  label="At least one uppercase letter"
                  met={/[A-Z]/.test(newPassword)}
                />
                <PasswordRequirementItem 
                  label="At least one lowercase letter"
                  met={/[a-z]/.test(newPassword)}
                />
                <PasswordRequirementItem 
                  label="At least one number"
                  met={/[0-9]/.test(newPassword)}
                />
                <PasswordRequirementItem 
                  label="At least one special character"
                  met={/[^A-Za-z0-9]/.test(newPassword)}
                />
              </ul>
            </div>
            
            <div className="flex justify-end pt-4">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Changing..." : "Change Password"}
              </Button>
            </div>
          </form>
        </EnhancedCard>
      </div>
    </MainLayout>
  );
};

interface PasswordRequirementItemProps {
  label: string;
  met: boolean;
}

const PasswordRequirementItem = ({ label, met }: PasswordRequirementItemProps) => (
  <li className="flex items-center gap-2">
    <span className={`text-xs ${met ? 'text-success' : 'text-muted-foreground'}`}>
      {met && <Check className="inline h-3 w-3 mr-1" />}
      {label}
    </span>
  </li>
);

export default ChangePassword;
