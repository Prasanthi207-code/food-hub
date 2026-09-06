import { motion } from "framer-motion";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useAuth } from "@/hooks/use-auth";
import { StatCard, StatusBadge, EmptyState, foodImages } from "@/components/dashboard/SharedComponents";
import { Users, UserCheck, Building2, UtensilsCrossed, Leaf, TrendingUp, Activity, Shield, AlertTriangle, Clock } from "lucide-react";
import { Link } from "react-router";

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };
const stagger = { visible: { transition: { staggerChildren: 0.06 } } };

export default function AdminDashboard() {
  const { user } = useAuth();
  const allUsers = useQuery(api.mutations.users.getAllUsers);
  const allEmployees = useQuery(api.mutations.employees.list);
  const allBusinesses = useQuery(api.mutations.businesses.list);
  const stats = useQuery(api.mutations.donations.getStats);
  const donations = useQuery(api.mutations.donations.list);

  const users = allUsers || [];
  const employees = allEmployees || [];
  const businesses = allBusinesses || [];
  const allDonations = donations || [];

  const pendingDonations = allDonations.filter((d) => d.status === "pending");
  const recentDonations = allDonations.sort((a, b) => b.createdAt - a.createdAt).slice(0, 5);

  return (
    <motion.div initial="hidden" animate="visible" variants={stagger} className="space-y-8">
      {/* Hero banner */}
      <motion.div variants={fadeUp} className="relative rounded-3xl overflow-hidden h-48 sm:h-56">
        <img src={foodImages.grocery} alt="Platform overview" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#00615F]/90 to-[#00615F]/60" />
        <div className="absolute inset-0 flex items-center px-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Admin Control Center 🛡️
            </h1>
            <p className="text-emerald-100 mt-1">Full visibility into platform performance, user activity, and food rescue impact.</p>
          </div>
        </div>
      </motion.div>

      {/* Platform overview stats */}
      <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Users" value={users.length} icon={Users} color="emerald" />
        <StatCard title="Employees" value={employees.length} icon={UserCheck} color="blue" />
        <StatCard title="Businesses" value={businesses.length} icon={Building2} color="amber" />
        <StatCard title="Total Donations" value={stats?.total ?? 0} icon={UtensilsCrossed} color="emerald" trend={{ value: "+23%", positive: true }} />
      </motion.div>

      {/* Secondary stats */}
      <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Completed" value={stats?.completed ?? 0} icon={Activity} color="emerald" />
        <StatCard title="In Progress" value={stats?.inProgress ?? 0} icon={TrendingUp} color="blue" />
        <StatCard title="Total Food" value={`${stats?.totalKg ?? 0} kg`} icon={Leaf} color="emerald" />
        <StatCard title="People Served" value={stats?.totalServed ?? 0} icon={Users} color="purple" />
      </motion.div>

      {/* Employee progress */}
      <motion.div variants={fadeUp} className="rounded-3xl bg-white border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-extrabold text-gray-900">Employee Performance</h2>
          <Link to="/dashboard/employees" className="text-sm font-bold text-[#00615F] hover:underline">View All →</Link>
        </div>
        <div className="space-y-3">
          {employees.length === 0 ? (
            <EmptyState icon={UserCheck} title="No employees yet" description="Employees will appear here once registered." />
          ) : (
            employees.map((emp, i) => (
              <motion.div
                key={emp._id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-4 rounded-2xl bg-[#FBF7F4] p-4"
              >
                <div className="h-10 w-10 rounded-full bg-[#E8F5E9] flex items-center justify-center text-[#00615F] font-bold text-sm">
                  {emp.employeeId.slice(-3)}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-gray-900">{emp.employeeId}</p>
                  <p className="text-xs text-gray-500">Zone: {emp.zone || "N/A"} · Vehicle: {emp.vehicleType || "N/A"}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-900">{emp.totalDeliveries} deliveries</p>
                  <p className="text-xs text-[#00615F] font-semibold">{emp.rating} ★ rating</p>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </motion.div>

      {/* Pending actions */}
      <motion.div variants={fadeUp} className="rounded-3xl bg-white border border-gray-100 p-6">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="h-5 w-5 text-amber-500" />
          <h2 className="text-xl font-extrabold text-gray-900">Pending Actions</h2>
        </div>
        {pendingDonations.length === 0 ? (
          <p className="text-sm text-gray-500 py-4">No pending actions. All clear! ✅</p>
        ) : (
          <div className="space-y-3">
            {pendingDonations.slice(0, 5).map((d, i) => (
              <motion.div
                key={d._id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-4 rounded-2xl bg-amber-50 border border-amber-100 p-4"
              >
                <div className="h-10 w-10 rounded-xl overflow-hidden shrink-0">
                  <img src={foodImages[d.foodCategory === "bakery" ? "bread" : d.foodCategory === "produce" ? "vegetables" : "cooking"]} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-gray-900">{d.foodName}</p>
                  <p className="text-xs text-gray-500">{d.quantityKg} kg · Needs employee assignment</p>
                </div>
                <StatusBadge status={d.status} />
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Recent donations */}
      <motion.div variants={fadeUp}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-extrabold text-gray-900">Recent Activity</h2>
          <Link to="/dashboard/donations" className="text-sm font-bold text-[#00615F] hover:underline">View All →</Link>
        </div>
        <div className="space-y-3">
          {recentDonations.map((d, i) => (
            <motion.div
              key={d._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-4 rounded-2xl bg-white border border-gray-100 p-4 hover:shadow-md transition-all duration-300"
            >
              <div className="h-10 w-10 rounded-xl overflow-hidden shrink-0">
                <img src={foodImages[d.foodCategory === "bakery" ? "bread" : d.foodCategory === "produce" ? "vegetables" : "cooking"]} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-900 truncate">{d.foodName}</p>
                <p className="text-xs text-gray-500">{d.quantityKg} kg · {d.donorType} · {new Date(d.createdAt).toLocaleDateString()}</p>
              </div>
              <StatusBadge status={d.status} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
