
import React from 'react';

interface Comment {
  id: string;
  author: string;
  role: string;
  text: string;
  date: string;
}

interface CommentsListProps {
  comments: Comment[];
}

const CommentsList = ({ comments }: CommentsListProps) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-3">Comments</h3>
      <div className="space-y-3">
        {comments.map((comment) => (
          <div key={comment.id} className="bg-gray-50 rounded p-3">
            <div className="flex justify-between">
              <span className="font-medium">{comment.author}</span>
              <span className="text-sm text-gray-500">{comment.role}</span>
            </div>
            <p className="mt-1 text-sm">{comment.text}</p>
            <span className="text-xs text-gray-500 mt-2 block">{comment.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentsList;
