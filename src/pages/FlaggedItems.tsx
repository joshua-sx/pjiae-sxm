
import MainLayout from "@/components/layouts/MainLayout";
import { Flag } from "lucide-react";
import { FlaggedItemsFilters } from "@/components/flagged-items/FlaggedItemsFilters";
import { FlaggedItemsTable } from "@/components/flagged-items/FlaggedItemsTable";
import { FlaggedItemDetailDialog } from "@/components/flagged-items/FlaggedItemDetailDialog";
import { FlaggedItemResolveDialog } from "@/components/flagged-items/FlaggedItemResolveDialog";
import { FlaggedItemStatusBadge } from "@/components/flagged-items/FlaggedItemStatusBadge";
import { useFlaggedItemsState } from "@/hooks/useFlaggedItemsState";
import { PageHeader } from "@/components/common/PageHeader";

const FlaggedItems = () => {
  const {
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
  } = useFlaggedItemsState();
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <PageHeader
          title="Flagged Items"
          subtitle="Review all flagged goals and appraisals in one place"
          actions={
            <div className="flex items-center gap-2">
              <Flag className="h-5 w-5 text-red-600" />
            </div>
          }
        />
        
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
