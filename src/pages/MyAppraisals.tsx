import MainLayout from "@/components/layouts/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AppraisalCard from "@/components/appraisal/AppraisalCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useAppraisalsQuery } from "@/hooks/useAppraisalsQuery";
import { useUIState } from "@/contexts/UIStateContext";
import { useState } from "react";
import { LoadingState } from "@/components/ui/loading-state";
import { ErrorAlert } from "@/components/ui/error-alert";
import { useAuth } from "@/contexts/AuthContext";

const MyAppraisals = () => {
  const { searchQuery, setSearchQuery, statusFilter, setStatusFilter } = useUIState();
  const [currentTab, setCurrentTab] = useState("my");
  const { role } = useAuth();
  
  // Fix the type comparison by using string literals explicitly
  // We'll cast role to a string to resolve the type mismatch
  const isManager = (role as string) === "Manager" || (role as string) === "Director";

  const { data: appraisals, isLoading, isError, error, refetch } = useAppraisalsQuery();

  if (isLoading) {
    return (
      <MainLayout>
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h1>Appraisals</h1>
          </div>
          <LoadingState count={3} variant="card" />
        </div>
      </MainLayout>
    );
  }

  if (isError) {
    return (
      <MainLayout>
        <div className="space-y-6">
          <h1>Appraisals</h1>
          <ErrorAlert 
            title="Failed to load appraisals" 
            description="Unable to retrieve appraisal data at this time." 
            error={error}
            onRetry={refetch}
          />
        </div>
      </MainLayout>
    );
  }

  const myAppraisals = appraisals?.filter(a => a.employeeId === "101"); // In a real app, use current user ID
  const teamAppraisals = appraisals?.filter(a => a.employeeId !== "101"); // Simple filter for demo purposes

  // Type-casting to ensure the status values match the expected types
  const filteredMyAppraisals = myAppraisals?.filter(appraisal => {
    const matchesSearch = appraisal.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || 
      (appraisal.status as "completed" | "pending" | "flagged" | "approved" | "appealed" | "draft") === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredTeamAppraisals = teamAppraisals?.filter(appraisal => {
    const matchesSearch = appraisal.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          appraisal.employeeName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || 
      (appraisal.status as "completed" | "pending" | "flagged" | "approved" | "appealed" | "draft") === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1>Appraisals</h1>
          <div className="flex gap-2">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search appraisals..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select 
              value={statusFilter}
              onValueChange={setStatusFilter}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="flagged">Flagged</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="appealed">Appealed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs 
          defaultValue="my" 
          value={currentTab}
          onValueChange={setCurrentTab}
          className="w-full"
        >
          <TabsList>
            <TabsTrigger value="my">My Appraisals</TabsTrigger>
            {isManager && <TabsTrigger value="team">Team Appraisals</TabsTrigger>}
          </TabsList>
          
          <TabsContent value="my" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMyAppraisals && filteredMyAppraisals.length > 0 ? (
                filteredMyAppraisals.map((appraisal) => (
                  <AppraisalCard
                    key={appraisal.id}
                    id={appraisal.id}
                    title={appraisal.title}
                    status={appraisal.status as "completed" | "pending" | "flagged" | "approved" | "appealed" | "draft"}
                    cycle={appraisal.cycle}
                    dueDate={appraisal.dueDate}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-10">
                  <p className="text-muted-foreground">No appraisals found matching your filters.</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          {isManager && (
            <TabsContent value="team" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTeamAppraisals && filteredTeamAppraisals.length > 0 ? (
                  filteredTeamAppraisals.map((appraisal) => (
                    <AppraisalCard
                      key={appraisal.id}
                      id={appraisal.id}
                      title={appraisal.title}
                      status={appraisal.status as "completed" | "pending" | "flagged" | "approved" | "appealed" | "draft"}
                      cycle={appraisal.cycle}
                      dueDate={appraisal.dueDate}
                      employeeName={appraisal.employeeName}
                    />
                  ))
                ) : (
                  <div className="col-span-full text-center py-10">
                    <p className="text-muted-foreground">No team appraisals found matching your filters.</p>
                  </div>
                )}
              </div>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default MyAppraisals;
