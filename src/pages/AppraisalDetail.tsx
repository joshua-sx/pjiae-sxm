import { useParams } from "react-router-dom";
import MainLayout from "@/components/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import StatusBadge from "@/components/appraisal/StatusBadge";
import AppraisalProgress from "@/components/appraisal/AppraisalProgress";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useState } from "react";
import { Flag } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";

// Mock data - would come from API in real app
const mockGoals = [
  {
    id: "1",
    title: "Improve operational safety standards",
    description: "Implement new safety protocols and conduct monthly audits to ensure compliance",
    weight: 25,
    rating: 4,
    comments: "Good progress on implementation, regular audits conducted as scheduled."
  },
  {
    id: "2",
    title: "Reduce operating costs",
    description: "Identify and implement cost-saving measures to reduce department expenses by 10%",
    weight: 20,
    rating: 3,
    comments: "Cost reduction target partially met (7%). Further opportunities being explored."
  },
  {
    id: "3",
    title: "Staff development",
    description: "Ensure all staff complete required training and certifications by Q3",
    weight: 15,
    rating: 5,
    comments: "All staff completed training ahead of schedule. Additional professional development opportunities provided."
  },
  {
    id: "4",
    title: "Customer satisfaction",
    description: "Achieve customer satisfaction score of 85% or higher in quarterly surveys",
    weight: 20,
    rating: 4,
    comments: "Q1: 82%, Q2: 86%, Q3: 88% - showing consistent improvement trend."
  },
  {
    id: "5",
    title: "Process improvement",
    description: "Identify and implement at least 3 process improvements to increase efficiency",
    weight: 20,
    rating: 3,
    comments: "Two major improvements implemented successfully, third in progress."
  },
];

const mockCompetencies = [
  {
    id: "1",
    name: "Safety",
    description: "Demonstrates commitment to maintaining safe operations and environment",
    rating: 4,
    comments: "Consistently promotes safety culture and addresses issues promptly."
  },
  {
    id: "2",
    name: "Integrity",
    description: "Demonstrates honesty, transparency and ethical behavior",
    rating: 5,
    comments: "Exemplary ethical conduct and transparency in all dealings."
  },
  {
    id: "3",
    name: "People-Management",
    description: "Effectively manages team performance, development and engagement",
    rating: 3,
    comments: "Good team management, but needs development in conflict resolution areas."
  },
  {
    id: "4",
    name: "Results-Orientation",
    description: "Focuses on achieving objectives and delivering results",
    rating: 4,
    comments: "Consistently meets targets and works efficiently toward objectives."
  },
];

// Steps for the appraisal process
const steps = [
  { id: 1, name: "Dept. Goals", status: "completed" as const },
  { id: 2, name: "Employee Goals", status: "completed" as const },
  { id: 3, name: "Mid-Year", status: "completed" as const },
  { id: 4, name: "Year-End", status: "current" as const },
];

const AppraisalDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState("goals");
  const [appealReason, setAppealReason] = useState("");
  const { toast } = useToast();

  // Calculate the average score
  const goalScoreSum = mockGoals.reduce((sum, goal) => sum + goal.rating * (goal.weight / 100), 0);
  const compScoreSum = mockCompetencies.reduce((sum, comp) => sum + comp.rating, 0) / mockCompetencies.length;
  const finalScore = ((goalScoreSum * 5) + compScoreSum) / 2; // Assuming goal scores are normalized to 5

  const handleAppealSubmit = () => {
    // This would submit the appeal to the server in a real app
    toast({
      title: "Appeal Submitted",
      description: "Your appeal has been submitted for review by HR.",
    });
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-4">
              <h1 className="mb-0">Year-End Evaluation 2023</h1>
              <StatusBadge status="pending" />
            </div>
            <p className="text-gray-500 mt-1">Employee: John Doe | Department: Airport Operations</p>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline">Back</Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" className="bg-pjiae-lightgray/50">
                  <Flag className="mr-2 h-4 w-4" />
                  Appeal
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Submit an Appeal</AlertDialogTitle>
                  <AlertDialogDescription>
                    Please provide the reason for your appeal. Appeals can only be submitted within 48 hours of receiving your final evaluation.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="py-4">
                  <Textarea
                    placeholder="Provide detailed reason for your appeal..."
                    value={appealReason}
                    onChange={(e) => setAppealReason(e.target.value)}
                    className="min-h-[120px]"
                  />
                </div>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleAppealSubmit} disabled={!appealReason.trim()}>
                    Submit Appeal
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <Button>Accept Evaluation</Button>
          </div>
        </div>

        <Card>
          <CardContent className="p-6">
            <AppraisalProgress currentStep={4} steps={steps} />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row justify-between pb-4 border-b">
              <div>
                <h3 className="text-lg font-medium">Overall Rating</h3>
                <p className="text-sm text-gray-500">
                  Final Score = (Average Competency Score + Average Goal Score) ÷ 2
                </p>
              </div>
              <div className="mt-4 md:mt-0 flex flex-col items-center">
                <div className="text-3xl font-bold text-pjiae-blue">
                  {finalScore.toFixed(1)}
                </div>
                <div className="text-sm text-gray-500">
                  {finalScore >= 4.5 ? "Excellent" : 
                   finalScore >= 3.5 ? "Exceeds Expectations" :
                   finalScore >= 2.5 ? "Meets Expectations" :
                   finalScore >= 1.5 ? "Needs Improvement" : "Unsatisfactory"}
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                  <TabsTrigger value="goals">Goals (70%)</TabsTrigger>
                  <TabsTrigger value="competencies">Competencies (30%)</TabsTrigger>
                  <TabsTrigger value="summary">Summary</TabsTrigger>
                </TabsList>
                
                <TabsContent value="goals" className="mt-4 space-y-6">
                  {mockGoals.map((goal) => (
                    <Card key={goal.id} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
                          <div className="font-medium">{goal.title}</div>
                          <div className="flex items-center">
                            <div className="text-sm text-gray-500 mr-4">Weight: {goal.weight}%</div>
                            <div className="bg-pjiae-blue text-white font-bold rounded-full w-8 h-8 flex items-center justify-center">
                              {goal.rating}
                            </div>
                          </div>
                        </div>
                        <div className="p-4">
                          <p className="text-sm text-gray-700 mb-4">{goal.description}</p>
                          <div className="text-sm">
                            <div className="font-medium">Year-End Comments:</div>
                            <p className="text-gray-700 mt-1">{goal.comments}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
                
                <TabsContent value="competencies" className="mt-4 space-y-6">
                  {mockCompetencies.map((comp) => (
                    <Card key={comp.id} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
                          <div>
                            <div className="font-medium">{comp.name}</div>
                            <div className="text-xs text-gray-500">{comp.description}</div>
                          </div>
                          <div className="bg-pjiae-blue text-white font-bold rounded-full w-8 h-8 flex items-center justify-center">
                            {comp.rating}
                          </div>
                        </div>
                        <div className="p-4">
                          <div className="text-sm">
                            <div className="font-medium">Year-End Assessment:</div>
                            <p className="text-gray-700 mt-1">{comp.comments}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
                
                <TabsContent value="summary" className="mt-4">
                  <Card>
                    <CardContent className="p-4 space-y-4">
                      <div>
                        <h3 className="font-medium">Overall Performance Summary</h3>
                        <p className="text-gray-700 mt-2">
                          The employee has demonstrated strong performance across most areas, particularly in safety protocols and staff development initiatives. Goal achievement was consistent with expectations, though there is room for improvement in cost reduction strategies. Competency assessment shows strong skills in integrity and safety consciousness.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="font-medium">Development Areas</h3>
                        <ul className="list-disc pl-5 mt-2 text-gray-700">
                          <li>Further development in cost management strategies</li>
                          <li>Enhanced conflict resolution techniques</li>
                          <li>Continue focus on process improvement initiatives</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="font-medium">Strengths</h3>
                        <ul className="list-disc pl-5 mt-2 text-gray-700">
                          <li>Excellent commitment to safety standards</li>
                          <li>Strong integrity and ethical conduct</li>
                          <li>Effective staff development and training coordination</li>
                          <li>Consistent improvement in customer satisfaction metrics</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="font-medium">Recommendation</h3>
                        <p className="text-gray-700 mt-2">
                          Based on the overall performance score of {finalScore.toFixed(1)}, the employee qualifies for standard salary progression. Recommend additional training in financial management and process optimization to address development areas.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default AppraisalDetail;
