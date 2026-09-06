import { motion } from "framer-motion";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useAuth } from "@/hooks/use-auth";
import { StatCard, StatusBadge, EmptyState, foodImages } from "@/components/dashboard/SharedComponents";
import { Truck, ClipboardList, Package, CheckCircle2, MapPin, Clock, Star, TrendingUp } from "lucide-react";
import { Link } from "react-router";

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };
const stagger = { visible: { transition: { staggerChildren: 0.06 } } };

export default function EmployeeDashboard() {
  const { user } = useAuth();
  const employee = useQuery(api.mutations.employees.getByUserId, user?._id ? { userId: user._id } : "skip");
  const allDonations = useQuery(api.mutations.donations.list);
  const available = useQuery(api.mutations.donations.listAvailable);

  const myAssigned = (allDonations || []).filter((d) => d.assignedEmployeeId && d.status !== "completed" && d.status !== "cancelled");
  const completed = (allDonations || []).filter((d) => d.status === "completed");
  const pickupsToday = myAssigned.filter((d) => d.status === "on_the_way" || d.status === "picked_up").length;

  return (
    <motion.div initial="hidden" animate="visible" variants={stagger} className="space-y-8">
      {/* Hero banner */}
      <motion.div variants={fadeUp} className="relative rounded-3xl overflow-hidden h-48 sm:h-56">
        <img src={foodImages.delivery} alt="Food delivery" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1565C0]/90 to-[#1565C0]/60" />
        <div className="absolute inset-0 flex items-center px-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Hello, {user?.name?.split(" ")[0] || "Agent"} 🚚
            </h1>
            <p className="text-blue-100 mt-1">Ready to deliver food and make a difference today?</p>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard title="New Requests" value={available?.length ?? 0} icon={ClipboardList} color="amber" />
        <StatCard title="Assigned" value={myAssigned.length} icon={Truck} color="blue" />
        <StatCard title="Pickups Today" value={pickupsToday} icon={MapPin} color="emerald" />
        <StatCard title="Completed" value={completed.length} icon={CheckCircle2} color="emerald" />
        <StatCard title="Rating" value={`${employee?.rating ?? 5.0} ★`} icon={Star} color="emerald" />
      </motion.div>

      {/* Active deliveries */}
      <motion.div variants={fadeUp}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-extrabold text-gray-900">Active Deliveries</h2>
          <Link to="/dashboard/assignments" className="text-sm font-bold text-[#00615F] hover:underline">View All →</Link>
        </div>
        {myAssigned.length === 0 ? (
          <EmptyState icon={Truck} title="No active deliveries" description="Check available requests to accept new pickups." />
        ) : (
          <div className="space-y-3">
            {myAssigned.slice(0, 5).map((d, i) => (
              <motion.div
                key={d._id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="rounded-2xl bg-white border border-gray-100 p-5 hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="h-14 w-14 rounded-xl overflow-hidden shrink-0">
                    <img src={foodImages[d.foodCategory === "bakery" ? "bread" : d.foodCategory === "produce" ? "vegetables" : "cooking"]} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-bold text-gray-900">{d.foodName}</p>
                      <StatusBadge status={d.status} />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{d.quantityKg} kg · Serves {d.servesPeople} people</p>
                    <div className="flex items-center gap-1 mt-2 text-xs text-gray-400">
                      <MapPin className="h-3.5 w-3.5" /> {d.pickupAddress}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Tracking simulation */}
      <motion.div variants={fadeUp} className="rounded-3xl overflow-hidden bg-[#00615F] text-white">
        <div className="grid md:grid-cols-2 gap-0">
          <div className="relative h-48 md:h-auto">
            <img src={foodImages.bread} alt="Food journey" className="w-full h-full object-cover opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#00615F]/80" />
          </div>
          <div className="p-6 flex flex-col justify-center">
            <h3 className="text-xl font-extrabold">Donation Tracking Flow</h3>
            <div className="mt-4 space-y-3">
              {["Accepted", "On the Way", "Picked Up", "Delivered"].map((step, i) => (
                <div key={step} className="flex items-center gap-3">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold ${i < 2 ? "bg-white text-[#00615F]" : "bg-white/20 text-white"}`}>
                    {i + 1}
                  </div>
                  <span className={`text-sm font-semibold ${i < 2 ? "text-white" : "text-emerald-200"}`}>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
