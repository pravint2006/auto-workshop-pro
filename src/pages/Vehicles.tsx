import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Car, MoreVertical, Eye, Edit, Trash2 } from "lucide-react";
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
const vehicles = [
  { id: "1", registration: "MH-12-AB-1234", make: "Honda", model: "City", year: 2022, color: "White", customer: "Raj Kumar", phone: "9876543210", lastService: "2026-01-15", nextService: "2026-04-15" },
  { id: "2", registration: "MH-14-CD-5678", make: "Maruti", model: "Swift", year: 2021, color: "Red", customer: "Priya Sharma", phone: "9876543211", lastService: "2026-01-20", nextService: "2026-04-20" },
  { id: "3", registration: "MH-01-EF-9012", make: "Hyundai", model: "i20", year: 2023, color: "Blue", customer: "Amit Patel", phone: "9876543212", lastService: "2026-01-10", nextService: "2026-04-10" },
  { id: "4", registration: "MH-03-GH-3456", make: "Toyota", model: "Innova", year: 2020, color: "Silver", customer: "Suresh Reddy", phone: "9876543213", lastService: "2026-01-25", nextService: "2026-04-25" },
  { id: "5", registration: "MH-05-IJ-7890", make: "Tata", model: "Nexon", year: 2024, color: "Black", customer: "Neha Singh", phone: "9876543214", lastService: "2026-01-18", nextService: "2026-04-18" },
];

export default function Vehicles() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const filteredVehicles = vehicles.filter(
    (v) =>
      v.registration.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.customer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AppLayout>
      <div className="space-y-6">
        <PageHeader
          title="Vehicles"
          description="Manage all registered vehicles"
        >
          <Button
            onClick={() => navigate("/vehicles/new")}
            className="gradient-primary text-white hover:opacity-90"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Vehicle
          </Button>
        </PageHeader>

        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <SearchBar
                placeholder="Search by registration, model, or customer..."
                value={searchQuery}
                onChange={setSearchQuery}
                className="flex-1"
              />
            </div>

            <div className="rounded-lg border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead>Vehicle</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead className="hidden md:table-cell">Last Service</TableHead>
                    <TableHead className="hidden md:table-cell">Next Due</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredVehicles.map((vehicle) => (
                    <TableRow
                      key={vehicle.id}
                      className="cursor-pointer hover:bg-muted/30"
                      onClick={() => navigate(`/vehicles/${vehicle.id}`)}
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-primary/10">
                            <Car className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-semibold">{vehicle.registration}</p>
                            <p className="text-sm text-muted-foreground">
                              {vehicle.make} {vehicle.model} • {vehicle.year} • {vehicle.color}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="font-medium">{vehicle.customer}</p>
                        <p className="text-sm text-muted-foreground">{vehicle.phone}</p>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {new Date(vehicle.lastService).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Badge variant="outline" className="font-normal">
                          {new Date(vehicle.nextService).toLocaleDateString()}
                        </Badge>
                      </TableCell>
                      <TableCell onClick={(e) => e.stopPropagation()}>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => navigate(`/vehicles/${vehicle.id}`)}>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => navigate(`/vehicles/${vehicle.id}/edit`)}>
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

            {filteredVehicles.length === 0 && (
              <div className="text-center py-12">
                <Car className="h-12 w-12 mx-auto text-muted-foreground/50" />
                <p className="mt-4 text-muted-foreground">No vehicles found</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
