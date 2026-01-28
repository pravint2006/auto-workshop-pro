import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, ClipboardList, MoreVertical, Eye, Edit, Trash2, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/PageHeader";
import { SearchBar } from "@/components/SearchBar";
import { StatusBadge } from "@/components/StatusBadge";

// Mock data
const jobCards = [
  { id: "JC-20260128-001", vehicle: "MH-12-AB-1234", model: "Honda City", customer: "Raj Kumar", status: "in_progress" as const, date: "2026-01-28", amount: 5600, items: 3 },
  { id: "JC-20260128-002", vehicle: "MH-14-CD-5678", model: "Maruti Swift", customer: "Priya Sharma", status: "pending" as const, date: "2026-01-28", amount: 3200, items: 2 },
  { id: "JC-20260127-015", vehicle: "MH-01-EF-9012", model: "Hyundai i20", customer: "Amit Patel", status: "completed" as const, date: "2026-01-27", amount: 8500, items: 4 },
  { id: "JC-20260127-014", vehicle: "MH-03-GH-3456", model: "Toyota Innova", customer: "Suresh Reddy", status: "completed" as const, date: "2026-01-27", amount: 12000, items: 5 },
  { id: "JC-20260126-010", vehicle: "MH-05-IJ-7890", model: "Tata Nexon", customer: "Neha Singh", status: "cancelled" as const, date: "2026-01-26", amount: 0, items: 1 },
  { id: "JC-20260126-009", vehicle: "MH-08-KL-1234", model: "Mahindra XUV700", customer: "Vikram Joshi", status: "completed" as const, date: "2026-01-26", amount: 15500, items: 6 },
];

export default function JobCards() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const navigate = useNavigate();

  const filteredJobCards = jobCards.filter((jc) => {
    const matchesSearch =
      jc.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      jc.vehicle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      jc.customer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || jc.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <AppLayout>
      <div className="space-y-6">
        <PageHeader
          title="Job Cards"
          description="Manage all service job cards"
        >
          <Button
            onClick={() => navigate("/job-cards/new")}
            className="gradient-primary text-white hover:opacity-90"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Job Card
          </Button>
        </PageHeader>

        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <SearchBar
                placeholder="Search by job card, vehicle, or customer..."
                value={searchQuery}
                onChange={setSearchQuery}
                className="flex-1"
              />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="rounded-lg border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead>Job Card</TableHead>
                    <TableHead>Vehicle</TableHead>
                    <TableHead className="hidden md:table-cell">Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredJobCards.map((jc) => (
                    <TableRow
                      key={jc.id}
                      className="cursor-pointer hover:bg-muted/30"
                      onClick={() => navigate(`/job-cards/${jc.id}`)}
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-primary/10">
                            <ClipboardList className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-semibold">{jc.id}</p>
                            <p className="text-sm text-muted-foreground">{jc.items} items</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="font-medium">{jc.vehicle}</p>
                        <p className="text-sm text-muted-foreground">{jc.model} • {jc.customer}</p>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {new Date(jc.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={jc.status} />
                      </TableCell>
                      <TableCell className="text-right font-semibold">
                        {jc.amount > 0 ? `₹${jc.amount.toLocaleString()}` : "-"}
                      </TableCell>
                      <TableCell onClick={(e) => e.stopPropagation()}>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => navigate(`/job-cards/${jc.id}`)}>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => navigate(`/job-cards/${jc.id}/edit`)}>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredJobCards.length === 0 && (
              <div className="text-center py-12">
                <ClipboardList className="h-12 w-12 mx-auto text-muted-foreground/50" />
                <p className="mt-4 text-muted-foreground">No job cards found</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
