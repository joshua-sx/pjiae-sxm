
import { useState } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Flag } from "lucide-react";
import { FlaggedItem, flaggedItems as initialFlaggedItems } from "@/data/mockFlaggedItems";
import { useToast } from "@/hooks/use-toast";
import { FlaggedItemsFilters } from "@/components/flagged-items/FlaggedItemsFilters";
import { FlaggedItemsTable } from "@/components/flagged-items/FlaggedItemsTable";
import { FlaggedItemDetailDialog } from "@/components/flagged-items/FlaggedItemDetailDialog";
import { FlaggedItemResolveDialog } from "@/components/flagged-items/FlaggedItemResolveDialog";
import { FlaggedItemStatusBadge } from "@/components/flagged-items/FlaggedItemStatusBadge";

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
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-2">
            <Flag className="h-5 w-5 text-red-600" />
            <h1>Flagged Items</h1>
          </div>
        </div>
        
        <FlaggedItemsFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
          phaseFilter={phaseFilter}
          setPhaseFilter={setPhaseFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />
        
        <FlaggedItemsTable 
          filteredItems={filteredItems}
          onItemDetail={handleDetailClick}
        />
      </div>
      
      <FlaggedItemDetailDialog
        isOpen={isDetailOpen}
        onOpenChange={setIsDetailOpen}
        selectedItem={selectedItem}
        getStatusBadge={(status) => <FlaggedItemStatusBadge status={status as any} />}
        onInProgressClick={handleInProgressClick}
        onResolveClick={handleResolveClick}
      />
      
      <FlaggedItemResolveDialog
        isOpen={isResolveOpen}
        onOpenChange={setIsResolveOpen}
        resolutionNote={resolutionNote}
        setResolutionNote={setResolutionNote}
        onResolveSubmit={handleResolveSubmit}
      />
    </MainLayout>
  );
};

export default FlaggedItems;
