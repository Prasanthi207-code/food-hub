import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatCard, StatusBadge, EmptyState } from "@/components/dashboard/SharedComponents";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useAuth } from "@/hooks/use-auth";
import { motion } from "framer-motion";
import { ClipboardList, Truck, CheckCircle2, Clock, Package, MapPin } from "lucide-react";
import { toast } from "sonner";

export default function EmployeeDashboard() {
  const { user } = useAuth();
  const employee = useQuery(api.mutations.employees.getByUserId, user?._id ? { userId: user._id } : "skip");
  const available = useQuery(api.mutations.donations.listAvailable);
  const assigned = employee ? useQuery(api.mutations.donations.listByEmployee, { employeeId: employee._id }) : undefined;

  const acceptDonation = useMutation(api.mutations.donations.updateStatus);
  const assignEmployee = useMutation(api.mutations.donations.assignEmployee);

  const handleAccept = async (donationId: string) => {
    if (!employee) return;
    try {
      await assignEmployee({ donationId: donationId as never, employeeId: employee._id });
      toast.success("Donation accepted! Head to the pickup location.");
    } catch {
      toast.error("Failed to accept donation.");
    }
  };

  const assignedCount = assigned?.filter((d) => ["accepted", "on_the_way", "picked_up"].includes(d.status)).length ?? 0;
  const todayPickups = assigned?.filter((d) => d.status === "on_the_way" || d.status === "picked_up").length ?? 0;
  const completedCount = assigned?.filter((d) => d.status === "completed").length ?? 0;

  return (
    <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.06 } } }} className="space-y-6">
      <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
        <h1 className="text-2xl font-extrabold text-gray-900">Collection Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your assigned pickups and deliveries on FoodHub.</p>
      </motion.div>

      <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard title="New Requests" value={available?.length ?? 0} icon={ClipboardList} color="orange" />
        <StatCard title="My Assignments" value={assignedCount} icon={Truck} color="blue" />
        <StatCard title="Active Pickups" value={todayPickups} icon={MapPin} color="amber" />
        <StatCard title="Completed" value={completedCount} icon={CheckCircle2} color="emerald" />
        <StatCard title="Total Collected" value={employee?.totalDeliveries ?? 0} icon={Package} color="purple" />
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-base font-bold text-gray-900">Available Requests</CardTitle>
              <span className="text-xs font-medium text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">{available?.length ?? 0} new</span>
            </CardHeader>
            <CardContent>
              {!available || available.length === 0 ? (
                <EmptyState icon={ClipboardList} title="No pending requests" description="New donation requests from donors will appear here." />
              ) : (
                <div className="space-y-3">
                  {available.slice(0, 5).map((d) => (
                    <div key={d._id} className="flex items-center justify-between rounded-xl border border-gray-100 p-3.5 hover:bg-gray-50 transition-colors">
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">{d.foodName}</p>
                        <p className="text-xs text-gray-500">{d.quantity} · {d.quantityKg} kg · {d.servesPeople} servings</p>
                      </div>
                      <Button size="sm" onClick={() => handleAccept(d._id)} className="bg-emerald-600 hover:bg-emerald-700 text-white shrink-0 ml-3">
                        Accept
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-bold text-gray-900">My Active Assignments</CardTitle>
            </CardHeader>
            <CardContent>
              {!assigned || assigned.filter((d) => d.status !== "completed" && d.status !== "cancelled").length === 0 ? (
                <EmptyState icon={Truck} title="No active assignments" description="Accept a request to start your first pickup." />
              ) : (
                <div className="space-y-3">
                  {assigned.filter((d) => d.status !== "completed" && d.status !== "cancelled").map((d) => (
                    <div key={d._id} className="rounded-xl border border-gray-100 p-3.5 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-gray-900 truncate">{d.foodName}</p>
                          <p className="text-xs text-gray-500 flex items-center gap-1"><MapPin className="h-3 w-3" /> {d.pickupAddress}</p>
                        </div>
                        <StatusBadge status={d.status} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Performance card */}
      <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
        <Card className="border-gray-200 shadow-sm bg-gradient-to-r from-blue-500 to-blue-700 text-white">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-blue-100">Your Performance</p>
              <p className="text-3xl font-extrabold mt-1">{employee?.rating?.toFixed(1) ?? "5.0"} ★</p>
              <p className="text-sm text-blue-100 mt-0.5">{employee?.totalDeliveries ?? 0} successful deliveries</p>
            </div>
            <Truck className="h-12 w-12 text-blue-200" />
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
