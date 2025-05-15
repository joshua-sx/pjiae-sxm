
import React from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle, FileText, Mail, MessageSquare } from 'lucide-react';

const Help = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Help & Support</h1>
          <p className="text-muted-foreground mt-2">Find answers to your questions and get assistance</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Documentation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Browse our comprehensive documentation for detailed guides on using the system.
              </p>
              <a href="#" className="text-sm font-medium text-primary hover:underline">
                View Documentation
              </a>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center">
                <HelpCircle className="mr-2 h-5 w-5" />
                FAQs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Find answers to commonly asked questions about the appraisal system.
              </p>
              <a href="#" className="text-sm font-medium text-primary hover:underline">
                Browse FAQs
              </a>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center">
                <MessageSquare className="mr-2 h-5 w-5" />
                Live Chat Support
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Chat with our support team for immediate assistance during business hours.
              </p>
              <a href="#" className="text-sm font-medium text-primary hover:underline">
                Start Chat
              </a>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center">
                <Mail className="mr-2 h-5 w-5" />
                Contact Support
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Submit a support ticket for technical issues or questions.
              </p>
              <a href="#" className="text-sm font-medium text-primary hover:underline">
                Contact Support
              </a>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Video Tutorials</CardTitle>
            <CardDescription>Learn how to use the appraisal system with our step-by-step video guides</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border rounded-md p-4">
              <h3 className="font-medium">Getting Started with the Digital Appraisal System</h3>
              <p className="text-sm text-muted-foreground mt-1 mb-2">A complete overview of the system and its features</p>
              <a href="#" className="text-sm font-medium text-primary hover:underline">Watch Video (5:32)</a>
            </div>
            
            <div className="border rounded-md p-4">
              <h3 className="font-medium">Setting and Managing Goals</h3>
              <p className="text-sm text-muted-foreground mt-1 mb-2">Learn how to create, track and manage goals</p>
              <a href="#" className="text-sm font-medium text-primary hover:underline">Watch Video (4:18)</a>
            </div>
            
            <div className="border rounded-md p-4">
              <h3 className="font-medium">Conducting Performance Reviews</h3>
              <p className="text-sm text-muted-foreground mt-1 mb-2">Guide to completing mid-year and final assessments</p>
              <a href="#" className="text-sm font-medium text-primary hover:underline">Watch Video (6:45)</a>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Help;
