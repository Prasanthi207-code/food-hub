import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/dashboard/SharedComponents";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useAuth } from "@/hooks/use-auth";
import { TrendingUp, Star, Truck, CheckCircle2, Clock } from "lucide-react";
import { motion } from "framer-motion";

export default function EmployeePerformance() {
  const { user } = useAuth();
  const employee = useQuery(api.mutations.employees.getByUserId, user?._id ? { userId: user._id } : "skip");
  const assigned = employee ? useQuery(api.mutations.donations.listByEmployee, { employeeId: employee._id }) : undefined;

  const completed = assigned?.filter((d) => d.status === "completed").length ?? 0;
  const total = assigned?.length ?? 0;
  const successRate = total > 0 ? Math.round((completed / total) * 100) : 0;
  const avgTime = "~45 min";

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900 flex items-center gap-2">
          <TrendingUp className="h-6 w-6 text-emerald-600" />
          Performance Summary
        </h1>
        <p className="text-sm text-gray-500 mt-1">Track your collection and delivery performance on FoodHub.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Rating" value={`${employee?.rating?.toFixed(1) ?? "5.0"} ★`} icon={Star} color="amber" />
        <StatCard title="Total Deliveries" value={employee?.totalDeliveries ?? 0} icon={Truck} color="blue" />
        <StatCard title="Success Rate" value={`${successRate}%`} icon={CheckCircle2} color="emerald" />
        <StatCard title="Avg. Pickup Time" value={avgTime} icon={Clock} color="purple" />
      </div>
      <Card className="border-gray-200 shadow-sm bg-gradient-to-r from-emerald-500 to-emerald-700 text-white">
        <CardContent className="p-6 text-center">
          <Star className="h-10 w-10 mx-auto text-emerald-200" />
          <p className="text-4xl font-extrabold mt-3">{employee?.rating?.toFixed(1) ?? "5.0"}</p>
          <p className="text-emerald-100 mt-1">Average Rating from Donors</p>
          <p className="text-sm text-emerald-200 mt-3">Thank you for making a difference in your community.</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
