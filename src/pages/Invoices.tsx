import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, MoreVertical, Eye, Download, Send, CheckCircle, XCircle } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Mock data
const invoices = [
  { id: "INV-20260128-001", jobCard: "JC-20260128-001", customer: "Raj Kumar", vehicle: "MH-12-AB-1234", date: "2026-01-28", amount: 6608, paid: true },
  { id: "INV-20260127-015", jobCard: "JC-20260127-015", customer: "Amit Patel", vehicle: "MH-01-EF-9012", date: "2026-01-27", amount: 10030, paid: true },
  { id: "INV-20260127-014", jobCard: "JC-20260127-014", customer: "Suresh Reddy", vehicle: "MH-03-GH-3456", date: "2026-01-27", amount: 14160, paid: false },
  { id: "INV-20260126-009", jobCard: "JC-20260126-009", customer: "Vikram Joshi", vehicle: "MH-08-KL-1234", date: "2026-01-26", amount: 18290, paid: true },
  { id: "INV-20260125-005", jobCard: "JC-20260125-005", customer: "Priya Sharma", vehicle: "MH-14-CD-5678", date: "2026-01-25", amount: 7080, paid: false },
];

export default function Invoices() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const navigate = useNavigate();

  const filteredInvoices = invoices.filter((inv) => {
    const matchesSearch =
      inv.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.vehicle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "paid" && inv.paid) ||
      (statusFilter === "unpaid" && !inv.paid);
    return matchesSearch && matchesStatus;
  });

  const totalPaid = invoices.filter((i) => i.paid).reduce((sum, i) => sum + i.amount, 0);
  const totalUnpaid = invoices.filter((i) => !i.paid).reduce((sum, i) => sum + i.amount, 0);

  return (
    <AppLayout>
      <div className="space-y-6">
        <PageHeader title="Invoices" description="Manage all generated invoices" />

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-3">
          <Card>
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Invoices</p>
                <p className="text-2xl font-bold">{invoices.length}</p>
              </div>
              <FileText className="h-8 w-8 text-primary/20" />
            </CardContent>
          </Card>
          <Card className="border-status-completed/30">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Paid</p>
                <p className="text-2xl font-bold text-status-completed">₹{totalPaid.toLocaleString()}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-status-completed/20" />
            </CardContent>
          </Card>
          <Card className="border-status-pending/30">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Unpaid</p>
                <p className="text-2xl font-bold text-status-pending">₹{totalUnpaid.toLocaleString()}</p>
              </div>
              <XCircle className="h-8 w-8 text-status-pending/20" />
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <SearchBar
                placeholder="Search by invoice, customer, or vehicle..."
                value={searchQuery}
                onChange={setSearchQuery}
                className="flex-1"
              />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Payment Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="unpaid">Unpaid</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="rounded-lg border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead>Invoice</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead className="hidden md:table-cell">Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInvoices.map((invoice) => (
                    <TableRow key={invoice.id} className="hover:bg-muted/30">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-primary/10">
                            <FileText className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-semibold">{invoice.id}</p>
                            <p className="text-sm text-muted-foreground">{invoice.jobCard}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="font-medium">{invoice.customer}</p>
                        <p className="text-sm text-muted-foreground">{invoice.vehicle}</p>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {new Date(invoice.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={cn(
                            "font-medium",
                            invoice.paid
                              ? "bg-status-completed/10 text-status-completed hover:bg-status-completed/20"
                              : "bg-status-pending/10 text-status-pending hover:bg-status-pending/20"
                          )}
                        >
                          {invoice.paid ? "Paid" : "Unpaid"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-bold">
                        ₹{invoice.amount.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              View Invoice
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="h-4 w-4 mr-2" />
                              Download PDF
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Send className="h-4 w-4 mr-2" />
                              Send to Customer
                            </DropdownMenuItem>
                            {!invoice.paid && (
                              <DropdownMenuItem className="text-status-completed">
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Mark as Paid
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredInvoices.length === 0 && (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 mx-auto text-muted-foreground/50" />
                <p className="mt-4 text-muted-foreground">No invoices found</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
