
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Flag, Send } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface CommentFormProps {
  goalId: string;
  onCommentAdded?: () => void;
}

const CommentForm = ({ goalId, onCommentAdded }: CommentFormProps) => {
  const [comment, setComment] = useState('');
  const [isFlag, setIsFlag] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { role } = useAuth();
  
  // Only HR Officers can flag comments
  const canFlagGoal = role === 'HR Officer';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    
    setIsSubmitting(true);
    
    // Simulate submission
    setTimeout(() => {
      toast({
        title: isFlag ? "Comment added with flag" : "Comment added",
        description: "Your comment has been added successfully.",
      });
      
      setComment('');
      setIsFlag(false);
      setIsSubmitting(false);
      
      if (onCommentAdded) {
        onCommentAdded();
      }
    }, 500);
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Add Comment</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Textarea
            placeholder="Write your comment here..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="mb-3"
          />
          
          {canFlagGoal && (
            <div className="flex items-center space-x-2 mb-4">
              <Checkbox 
                id="flag" 
                checked={isFlag} 
                onCheckedChange={(checked) => setIsFlag(checked === true)}
              />
              <div className="flex items-center gap-1">
                <Flag className="h-4 w-4 text-amber-500" />
                <label 
                  htmlFor="flag" 
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Flag this goal for review
                </label>
              </div>
            </div>
          )}
          
          <Button 
            type="submit" 
            disabled={!comment.trim() || isSubmitting}
            className="w-full sm:w-auto"
          >
            <Send className="mr-2 h-4 w-4" />
            {isSubmitting ? "Sending..." : "Send Comment"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CommentForm;
