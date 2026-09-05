import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard, StatusBadge } from "@/components/dashboard/SharedComponents";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Users, UserCheck, Building2, UtensilsCrossed, Leaf, TrendingUp, Activity } from "lucide-react";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

export default function AdminDashboard() {
  const allUsers = useQuery(api.mutations.users.getAllUsers);
  const employees = useQuery(api.mutations.employees.list);
  const businesses = useQuery(api.mutations.businesses.list);
  const donations = useQuery(api.mutations.donations.list);
  const stats = useQuery(api.mutations.donations.getStats);
  const recent = useQuery(api.mutations.donations.getRecent, { limit: 5 });

  const totalUsers = allUsers?.length ?? 0;
  const totalEmployees = employees?.length ?? 0;
  const totalBusinesses = businesses?.length ?? 0;

  const monthlyData = [
    { month: "Jan", donations: 15, food: 85 },
    { month: "Feb", donations: 22, food: 120 },
    { month: "Mar", donations: 28, food: 165 },
    { month: "Apr", donations: 35, food: 210 },
    { month: "May", donations: 42, food: 280 },
    { month: "Jun", donations: 55, food: 340 },
  ];

  const donationStatusData = [
    { name: "Completed", value: stats?.completed ?? 0, color: "#059669" },
    { name: "In Progress", value: stats?.inProgress ?? 0, color: "#3b82f6" },
    { name: "Pending", value: stats?.pending ?? 0, color: "#f59e0b" },
    { name: "Cancelled", value: stats?.cancelled ?? 0, color: "#ef4444" },
  ];

  return (
    <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.06 } } }} className="space-y-6">
      <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
        <h1 className="text-2xl font-extrabold text-gray-900">Admin Overview</h1>
        <p className="text-sm text-gray-500 mt-1">Platform-wide control center for FoodHub operations.</p>
      </motion.div>

      <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Users" value={totalUsers} icon={Users} color="blue" />
        <StatCard title="Employees" value={totalEmployees} icon={UserCheck} color="emerald" />
        <StatCard title="Businesses" value={totalBusinesses} icon={Building2} color="amber" />
        <StatCard title="Total Donations" value={stats?.total ?? 0} icon={UtensilsCrossed} color="orange" />
      </motion.div>

      <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Completed" value={stats?.completed ?? 0} icon={Activity} color="emerald" trend={{ value: "+18%", positive: true }} />
        <StatCard title="In Progress" value={stats?.inProgress ?? 0} icon={TrendingUp} color="blue" />
        <StatCard title="Total Food" value={`${stats?.totalKg ?? 0} kg`} icon={Leaf} color="green" />
        <StatCard title="People Served" value={stats?.totalServed ?? 0} icon={Users} color="purple" />
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="pb-2"><CardTitle className="text-base font-bold text-gray-900">Donations Over Time</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="donations" fill="#059669" radius={[6, 6, 0, 0]} name="Donations" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="pb-2"><CardTitle className="text-base font-bold text-gray-900">Status Distribution</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={donationStatusData} cx="50%" cy="50%" outerRadius={90} innerRadius={40} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                    {donationStatusData.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} />))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
        <Card className="border-gray-200 shadow-sm">
          <CardHeader className="pb-2"><CardTitle className="text-base font-bold text-gray-900">Recent Activity</CardTitle></CardHeader>
          <CardContent>
            {recent && recent.length > 0 ? (
              <div className="space-y-3">
                {recent.map((d) => (
                  <div key={d._id} className="flex items-center justify-between rounded-xl border border-gray-100 p-3.5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600"><UtensilsCrossed className="h-4 w-4" /></div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{d.foodName}</p>
                        <p className="text-xs text-gray-500">{d.quantity} · {d.quantityKg} kg</p>
                      </div>
                    </div>
                    <StatusBadge status={d.status} />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 text-center py-8">No recent activity.</p>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
