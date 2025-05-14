
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GoalComment } from '@/types/goals';
import { formatDistanceToNow } from 'date-fns';
import { Flag } from 'lucide-react';

interface CommentsListProps {
  comments: GoalComment[];
}

const CommentsList = ({ comments }: CommentsListProps) => {
  if (comments.length === 0) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Comments</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">No comments yet.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Comments</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {comments.map(comment => (
            <div 
              key={comment.id} 
              className={`p-3 rounded-lg ${comment.isFlag ? 'bg-amber-50 border border-amber-200' : 'bg-gray-50'}`}
            >
              <div className="flex justify-between items-start mb-1">
                <div>
                  <span className="font-medium text-sm">{comment.authorName}</span>
                  <span className="text-xs text-muted-foreground ml-2">{comment.authorRole}</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                </div>
              </div>
              <p className="text-sm mb-1">{comment.content}</p>
              {comment.isFlag && (
                <div className="flex items-center gap-1 text-amber-600 text-xs">
                  <Flag size={12} />
                  <span>Flagged for review</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CommentsList;
