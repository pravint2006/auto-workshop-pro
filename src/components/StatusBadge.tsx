import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Status = "pending" | "in_progress" | "completed" | "cancelled";

interface StatusBadgeProps {
  status: Status;
  className?: string;
}

const statusConfig: Record<Status, { label: string; className: string }> = {
  pending: {
    label: "Pending",
    className: "bg-status-pending text-white hover:bg-status-pending/90",
  },
  in_progress: {
    label: "In Progress",
    className: "bg-status-in-progress text-white hover:bg-status-in-progress/90",
  },
  completed: {
    label: "Completed",
    className: "bg-status-completed text-white hover:bg-status-completed/90",
  },
  cancelled: {
    label: "Cancelled",
    className: "bg-status-cancelled text-white hover:bg-status-cancelled/90",
  },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <Badge className={cn(config.className, "font-medium", className)}>
      {config.label}
    </Badge>
  );
}
