
import { FlaggedItem } from "@/data/mockFlaggedItems";
import { Badge } from "@/components/ui/badge";
import { AppTable, Column } from "@/components/common/AppTable";
import { AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FlaggedItemsTableProps {
  filteredItems: FlaggedItem[];
  onItemDetail: (item: FlaggedItem) => void;
}

export const FlaggedItemsTable = ({
  filteredItems,
  onItemDetail,
}: FlaggedItemsTableProps) => {
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

  // Define columns for AppTable
  const columns: Column<FlaggedItem>[] = [
    { 
      key: 'type', 
      label: 'Type',
      render: (item) => (
        <Badge variant="outline" className="capitalize">
          {item.type}
        </Badge>
      )
    },
    { 
      key: 'employeeName', 
      label: 'Employee',
      width: 'w-1/6',
      sortable: true
    },
    { 
      key: 'department', 
      label: 'Department',
      width: 'w-1/6',
      sortable: true
    },
    { 
      key: 'itemTitle', 
      label: 'Item',
      width: 'w-1/5',
      render: (item) => (
        <div className="max-w-[200px] truncate" title={item.itemTitle}>
          {item.itemTitle}
        </div>
      )
    },
    { 
      key: 'phase', 
      label: 'Phase',
      render: (item) => (
        <>
          {item.phase === "goal-setting" && "Goal Setting"}
          {item.phase === "mid-year-review" && "Mid-Year Review"}
          {item.phase === "year-end-evaluation" && "Year-End Evaluation"}
        </>
      )
    },
    { 
      key: 'flagDate', 
      label: 'Flag Date',
      sortable: true
    },
    { 
      key: 'status', 
      label: 'Status',
      render: (item) => getStatusBadge(item.status)
    },
    { 
      key: 'actions', 
      label: 'Actions',
      render: (item) => (
        <div className="text-right">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onItemDetail(item)}
          >
            View Details
          </Button>
        </div>
      )
    }
  ];

  return (
    <AppTable
      columns={columns}
      data={filteredItems}
      emptyMessage="No flagged items found."
    />
  );
};
