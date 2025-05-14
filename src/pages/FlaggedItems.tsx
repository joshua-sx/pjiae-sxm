
import { useState } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog, 
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Search, Flag, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { FlaggedItem, flaggedItems as initialFlaggedItems } from "@/data/mockFlaggedItems";
import { useToast } from "@/hooks/use-toast";

const FlaggedItems = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [phaseFilter, setPhaseFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedItem, setSelectedItem] = useState<FlaggedItem | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isResolveOpen, setIsResolveOpen] = useState(false);
  const [resolutionNote, setResolutionNote] = useState("");
  const [flaggedItems, setFlaggedItems] = useState<FlaggedItem[]>(initialFlaggedItems);
  
  // Phases for filtering
  const phases = [
    { value: "all", label: "All Phases" },
    { value: "goal-setting", label: "Goal Setting" },
    { value: "mid-year-review", label: "Mid-Year Review" },
    { value: "year-end-evaluation", label: "Year-End Evaluation" }
  ];
  
  // Status options for filtering
  const statusOptions = [
    { value: "all", label: "All Statuses" },
    { value: "flagged", label: "Flagged" },
    { value: "in-progress", label: "In Progress" },
    { value: "resolved", label: "Resolved" }
  ];
  
  // Filter flagged items based on search and filters
  const filteredItems = flaggedItems.filter(item => {
    const matchesSearch = searchTerm === "" || 
      item.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.itemTitle.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = typeFilter === "all" || item.type === typeFilter;
    
    const matchesPhase = phaseFilter === "all" || item.phase === phaseFilter;
    
    const matchesStatus = statusFilter === "all" || item.status === statusFilter;
    
    return matchesSearch && matchesType && matchesPhase && matchesStatus;
  });
  
  // Handle opening the detail dialog
  const handleDetailClick = (item: FlaggedItem) => {
    setSelectedItem(item);
    setIsDetailOpen(true);
  };
  
  // Handle opening the resolve dialog
  const handleResolveClick = () => {
    setIsDetailOpen(false);
    setIsResolveOpen(true);
  };
  
  // Handle resolving a flagged item
  const handleResolveSubmit = () => {
    if (!selectedItem) return;
    
    if (!resolutionNote.trim()) {
      toast({
        title: "Resolution Note Required",
        description: "Please provide a note about how the issue was resolved.",
        variant: "destructive"
      });
      return;
    }
    
    setFlaggedItems(flaggedItems.map(item => 
      item.id === selectedItem.id ? { ...item, status: "resolved" } : item
    ));
    
    setIsResolveOpen(false);
    setResolutionNote("");
    
    toast({
      title: "Item Resolved",
      description: `The flagged item for ${selectedItem.employeeName} has been marked as resolved.`
    });
  };
  
  // Handle setting the status to in-progress
  const handleInProgressClick = () => {
    if (!selectedItem) return;
    
    setFlaggedItems(flaggedItems.map(item => 
      item.id === selectedItem.id ? { ...item, status: "in-progress" } : item
    ));
    
    setIsDetailOpen(false);
    
    toast({
      title: "Status Updated",
      description: `The flagged item for ${selectedItem.employeeName} is now in progress.`
    });
  };
  
  // Get status badge styling
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'flagged':
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
            <AlertTriangle size={12} className="mr-1" /> Flagged
          </Badge>
        );
      case 'in-progress':
        return (
          <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">
            <Clock size={12} className="mr-1" /> In Progress
          </Badge>
        );
      case 'resolved':
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
            <CheckCircle size={12} className="mr-1" /> Resolved
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-2">
            <Flag className="h-5 w-5 text-red-600" />
            <h1>Flagged Items</h1>
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search employee or item..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4 pb-4">
          <div className="w-full md:w-1/4">
            <Select
              value={typeFilter}
              onValueChange={setTypeFilter}
            >
              <SelectTrigger>
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="goal">Goals</SelectItem>
                <SelectItem value="appraisal">Appraisals</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="w-full md:w-1/4">
            <Select
              value={phaseFilter}
              onValueChange={setPhaseFilter}
            >
              <SelectTrigger>
                <SelectValue placeholder="Filter by phase" />
              </SelectTrigger>
              <SelectContent>
                {phases.map((phase) => (
                  <SelectItem key={phase.value} value={phase.value}>
                    {phase.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="w-full md:w-1/4">
            <Select
              value={statusFilter}
              onValueChange={setStatusFilter}
            >
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="rounded-md border shadow overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Employee</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Item</TableHead>
                <TableHead>Phase</TableHead>
                <TableHead>Flag Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-10 text-gray-500">
                    No flagged items found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {item.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">{item.employeeName}</TableCell>
                    <TableCell>{item.department}</TableCell>
                    <TableCell className="max-w-[200px] truncate" title={item.itemTitle}>
                      {item.itemTitle}
                    </TableCell>
                    <TableCell>
                      {item.phase === "goal-setting" && "Goal Setting"}
                      {item.phase === "mid-year-review" && "Mid-Year Review"}
                      {item.phase === "year-end-evaluation" && "Year-End Evaluation"}
                    </TableCell>
                    <TableCell>{item.flagDate}</TableCell>
                    <TableCell>
                      {getStatusBadge(item.status)}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDetailClick(item)}
                      >
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      
      {/* Detail Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-2xl">
          {selectedItem && (
            <>
              <DialogHeader>
                <DialogTitle>Flagged Item Details</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Employee</p>
                    <p>{selectedItem.employeeName}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Department</p>
                    <p>{selectedItem.department}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Type</p>
                    <p className="capitalize">{selectedItem.type}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Phase</p>
                    <p>
                      {selectedItem.phase === "goal-setting" && "Goal Setting"}
                      {selectedItem.phase === "mid-year-review" && "Mid-Year Review"}
                      {selectedItem.phase === "year-end-evaluation" && "Year-End Evaluation"}
                    </p>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500">Item</p>
                  <p>{selectedItem.itemTitle}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500">Reason for Flag</p>
                  <div className="bg-red-50 border border-red-100 rounded p-3 mt-1">
                    <p>{selectedItem.flagReason}</p>
                    <div className="flex justify-between mt-2 text-xs text-gray-500">
                      <span>Flagged by: {selectedItem.flaggedBy}</span>
                      <span>Date: {selectedItem.flagDate}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500">Current Status</p>
                  <div className="mt-1">
                    {getStatusBadge(selectedItem.status)}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <div className="flex justify-end space-x-2">
                  {selectedItem.status !== "resolved" && (
                    <>
                      {selectedItem.status !== "in-progress" && (
                        <Button 
                          variant="outline"
                          onClick={handleInProgressClick}
                        >
                          Mark as In Progress
                        </Button>
                      )}
                      <Button 
                        className="bg-green-600 hover:bg-green-700"
                        onClick={handleResolveClick}
                      >
                        <CheckCircle size={16} className="mr-1" />
                        Mark as Resolved
                      </Button>
                    </>
                  )}
                </div>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Resolution Dialog */}
      <Dialog open={isResolveOpen} onOpenChange={setIsResolveOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Resolve Flagged Item</DialogTitle>
            <DialogDescription>
              Please provide details about how this issue was resolved.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Textarea
              placeholder="Enter resolution details..."
              value={resolutionNote}
              onChange={(e) => setResolutionNote(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsResolveOpen(false)}>Cancel</Button>
            <Button 
              className="bg-green-600 hover:bg-green-700"
              onClick={handleResolveSubmit}
            >
              <CheckCircle size={16} className="mr-1" />
              Confirm Resolution
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default FlaggedItems;
