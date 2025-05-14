
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/contexts/AuthContext';
import { mockDepartmentGoals } from '@/data/mockGoals';
import { SmartCriteria } from '@/types/goals';
import MainLayout from '@/components/layouts/MainLayout';

const DepartmentGoalForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { role } = useAuth();
  const isEditing = !!id;
  
  const existingGoal = isEditing ? mockDepartmentGoals.find(g => g.id === id) : null;
  const pageTitle = isEditing ? "Edit Department Goal" : "Create Department Goal";
  
  // Form state
  const [title, setTitle] = useState(existingGoal?.title || '');
  const [description, setDescription] = useState(existingGoal?.description || '');
  const [departmentName, setDepartmentName] = useState(existingGoal?.departmentName || '');
  const [smartCriteria, setSmartCriteria] = useState<SmartCriteria>(existingGoal?.smartCriteria || {
    specific: '',
    measurable: '',
    achievable: '',
    relevant: '',
    timeBound: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Redirect if not a Director
  useEffect(() => {
    if (role !== 'Director') {
      toast({
        title: "Access Denied",
        description: "Only Directors can create or edit department goals.",
        variant: "destructive",
      });
      navigate('/department-goals');
    }
    
    if (isEditing && !existingGoal) {
      toast({
        title: "Goal not found",
        description: "The requested goal could not be found.",
        variant: "destructive",
      });
      navigate('/department-goals');
    }
  }, [role, navigate, toast, isEditing, existingGoal]);

  const handleSmartCriteriaChange = (field: keyof SmartCriteria, value: string) => {
    setSmartCriteria(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!title.trim() || !description.trim() || !departmentName.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    // Validate SMART criteria
    const criteriaFields = Object.values(smartCriteria);
    if (criteriaFields.some(field => !field.trim())) {
      toast({
        title: "Incomplete SMART Criteria",
        description: "Please fill in all SMART criteria fields.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: isEditing ? "Goal Updated" : "Goal Created",
        description: isEditing 
          ? "The department goal has been updated successfully." 
          : "The department goal has been created and submitted for HR review.",
      });
      setIsSubmitting(false);
      navigate('/department-goals');
    }, 1000);
  };

  return (
    <MainLayout>
      <div className="container mx-auto py-6">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate('/department-goals')}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Department Goals
        </Button>
        
        <h1 className="text-2xl font-bold mb-6">{pageTitle}</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <Label htmlFor="title">Goal Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter a clear, concise title for the goal"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="department">Department</Label>
              <Input
                id="department"
                value={departmentName}
                onChange={(e) => setDepartmentName(e.target.value)}
                placeholder="Enter department name"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Provide a detailed description of the goal"
                className="mt-1"
                rows={4}
              />
            </div>
          </div>
          
          <div>
            <h2 className="text-lg font-semibold mb-4">SMART Criteria</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="specific">Specific</Label>
                <Textarea
                  id="specific"
                  value={smartCriteria.specific}
                  onChange={(e) => handleSmartCriteriaChange('specific', e.target.value)}
                  placeholder="What exactly will be accomplished?"
                  className="mt-1"
                  rows={2}
                />
              </div>
              
              <div>
                <Label htmlFor="measurable">Measurable</Label>
                <Textarea
                  id="measurable"
                  value={smartCriteria.measurable}
                  onChange={(e) => handleSmartCriteriaChange('measurable', e.target.value)}
                  placeholder="How will progress and success be measured?"
                  className="mt-1"
                  rows={2}
                />
              </div>
              
              <div>
                <Label htmlFor="achievable">Achievable</Label>
                <Textarea
                  id="achievable"
                  value={smartCriteria.achievable}
                  onChange={(e) => handleSmartCriteriaChange('achievable', e.target.value)}
                  placeholder="Is this goal realistic and attainable?"
                  className="mt-1"
                  rows={2}
                />
              </div>
              
              <div>
                <Label htmlFor="relevant">Relevant</Label>
                <Textarea
                  id="relevant"
                  value={smartCriteria.relevant}
                  onChange={(e) => handleSmartCriteriaChange('relevant', e.target.value)}
                  placeholder="How does this align with broader objectives?"
                  className="mt-1"
                  rows={2}
                />
              </div>
              
              <div>
                <Label htmlFor="timeBound">Time-bound</Label>
                <Textarea
                  id="timeBound"
                  value={smartCriteria.timeBound}
                  onChange={(e) => handleSmartCriteriaChange('timeBound', e.target.value)}
                  placeholder="When should this goal be accomplished?"
                  className="mt-1"
                  rows={2}
                />
              </div>
            </div>
          </div>
          
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/department-goals')}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 
                (isEditing ? "Updating..." : "Submitting...") : 
                (isEditing ? "Update Goal" : "Submit Goal")}
            </Button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
};

export default DepartmentGoalForm;
