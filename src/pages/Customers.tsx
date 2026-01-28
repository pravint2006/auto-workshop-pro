import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Users, MoreVertical, Eye, Edit, Trash2, Phone, Mail } from "lucide-react";
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
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/PageHeader";
import { SearchBar } from "@/components/SearchBar";
import { Badge } from "@/components/ui/badge";

// Mock data
const customers = [
  { id: "1", name: "Raj Kumar", phone: "9876543210", email: "raj.kumar@email.com", vehicles: 2, totalSpent: 45600, lastVisit: "2026-01-15" },
  { id: "2", name: "Priya Sharma", phone: "9876543211", email: "priya.sharma@email.com", vehicles: 1, totalSpent: 18200, lastVisit: "2026-01-20" },
  { id: "3", name: "Amit Patel", phone: "9876543212", email: "amit.patel@email.com", vehicles: 3, totalSpent: 78500, lastVisit: "2026-01-10" },
  { id: "4", name: "Suresh Reddy", phone: "9876543213", email: "suresh.reddy@email.com", vehicles: 1, totalSpent: 32100, lastVisit: "2026-01-25" },
  { id: "5", name: "Neha Singh", phone: "9876543214", email: "neha.singh@email.com", vehicles: 2, totalSpent: 56800, lastVisit: "2026-01-18" },
];

export default function Customers() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AppLayout>
      <div className="space-y-6">
        <PageHeader
          title="Customers"
          description="Manage your customer directory"
        >
          <Button
            onClick={() => navigate("/customers/new")}
            className="gradient-primary text-white hover:opacity-90"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Customer
          </Button>
        </PageHeader>

        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <SearchBar
                placeholder="Search by name, phone, or email..."
                value={searchQuery}
                onChange={setSearchQuery}
                className="flex-1"
              />
            </div>

            <div className="rounded-lg border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead>Customer</TableHead>
                    <TableHead className="hidden md:table-cell">Contact</TableHead>
                    <TableHead className="text-center">Vehicles</TableHead>
                    <TableHead className="text-right">Total Spent</TableHead>
                    <TableHead className="hidden md:table-cell">Last Visit</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCustomers.map((customer) => (
                    <TableRow
                      key={customer.id}
                      className="cursor-pointer hover:bg-muted/30"
                      onClick={() => navigate(`/customers/${customer.id}`)}
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full gradient-primary flex items-center justify-center text-white font-semibold">
                            {customer.name.charAt(0)}
                          </div>
                          <p className="font-semibold">{customer.name}</p>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="h-3 w-3 text-muted-foreground" />
                            {customer.phone}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Mail className="h-3 w-3" />
                            {customer.email}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="secondary">{customer.vehicles}</Badge>
                      </TableCell>
                      <TableCell className="text-right font-semibold">
                        ₹{customer.totalSpent.toLocaleString()}
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-muted-foreground">
                        {new Date(customer.lastVisit).toLocaleDateString()}
                      </TableCell>
                      <TableCell onClick={(e) => e.stopPropagation()}>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => navigate(`/customers/${customer.id}`)}>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => navigate(`/customers/${customer.id}/edit`)}>
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

            {filteredCustomers.length === 0 && (
              <div className="text-center py-12">
                <Users className="h-12 w-12 mx-auto text-muted-foreground/50" />
                <p className="mt-4 text-muted-foreground">No customers found</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
