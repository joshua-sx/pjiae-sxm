
import { useState } from "react";
import { FlaggedItem, flaggedItems as initialFlaggedItems } from "@/data/mockFlaggedItems";
import { useToast } from "@/hooks/use-toast";

export const useFlaggedItemsState = () => {
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

  return {
    // States
    searchTerm,
    setSearchTerm,
    typeFilter,
    setTypeFilter,
    phaseFilter, 
    setPhaseFilter,
    statusFilter,
    setStatusFilter,
    selectedItem,
    isDetailOpen,
    setIsDetailOpen,
    isResolveOpen,
    setIsResolveOpen,
    resolutionNote,
    setResolutionNote,
    filteredItems,
    
    // Handlers
    handleDetailClick,
    handleResolveClick,
    handleResolveSubmit,
    handleInProgressClick
  };
};
