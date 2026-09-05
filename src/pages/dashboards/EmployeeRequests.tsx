import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge, EmptyState } from "@/components/dashboard/SharedComponents";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useAuth } from "@/hooks/use-auth";
import { ClipboardList, MapPin, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

export default function EmployeeRequests() {
  const { user } = useAuth();
  const employee = useQuery(api.mutations.employees.getByUserId, user?._id ? { userId: user._id } : "skip");
  const available = useQuery(api.mutations.donations.listAvailable);
  const assignEmployee = useMutation(api.mutations.donations.assignEmployee);

  const handleAccept = async (donationId: string) => {
    if (!employee) return;
    try {
      await assignEmployee({ donationId: donationId as never, employeeId: employee._id });
      toast.success("Donation accepted! Proceed to the pickup location.");
    } catch {
      toast.error("Failed to accept donation.");
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900 flex items-center gap-2">
          <ClipboardList className="h-6 w-6 text-orange-500" />
          Available Requests
        </h1>
        <p className="text-sm text-gray-500 mt-1">Browse and accept donation pickup requests from the FoodHub network.</p>
      </div>
      {!available || available.length === 0 ? (
        <Card className="border-gray-200 shadow-sm">
          <CardContent>
            <EmptyState icon={ClipboardList} title="No pending requests" description="All current donations have been assigned. New requests will appear here." />
          </CardContent>
        </Card>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {available.map((d) => (
            <Card key={d._id} className="border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <h3 className="text-base font-bold text-gray-900">{d.foodName}</h3>
                  <StatusBadge status={d.status} />
                </div>
                <div className="mt-3 space-y-2 text-sm text-gray-600">
                  <p className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-emerald-500" /> {d.pickupAddress}</p>
                  <p className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 text-blue-500" /> {d.quantity} · {d.quantityKg} kg</p>
                  <p>Serves {d.servesPeople} people</p>
                  <p className="capitalize">Condition: {d.condition.replace(/_/g, " ")}</p>
                </div>
                <Button onClick={() => handleAccept(d._id)} className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700 text-white">
                  Accept Request
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </motion.div>
  );
}
