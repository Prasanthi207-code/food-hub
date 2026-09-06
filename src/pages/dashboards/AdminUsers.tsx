import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge, EmptyState } from "@/components/dashboard/SharedComponents";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Users, Search } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const roleColors: Record<string, string> = {
  user: "bg-emerald-50 text-emerald-700",
  employee: "bg-blue-50 text-blue-700",
  business: "bg-amber-50 text-amber-700",
  admin: "bg-purple-50 text-purple-700",
  biogas: "bg-green-50 text-green-700",
};

export default function AdminUsers() {
  const allUsers = useQuery(api.mutations.users.getAllUsers);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const filtered = allUsers?.filter((u) => {
    const matchSearch = !search || u.name?.toLowerCase().includes(search.toLowerCase()) || u.email?.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === "all" || u.role === roleFilter;
    return matchSearch && matchRole;
  }) || [];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900 flex items-center gap-2"><Users className="h-6 w-6 text-blue-500" /> User Management</h1>
        <p className="text-sm text-gray-500 mt-1">View and manage all registered users on the FoodHub platform.</p>
      </div>
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input placeholder="Search users..." value={search} onChange={(e) => setSearch(e.target.value)} className="h-10 w-full rounded-lg border border-gray-200 pl-9 pr-4 text-sm focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/20" />
        </div>
        <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} className="h-10 rounded-lg border border-gray-200 px-3 text-sm bg-white focus:border-emerald-400 focus:outline-none">
          <option value="all">All Roles</option>
          <option value="user">Donors</option>
          <option value="employee">Employees</option>
          <option value="business">Businesses</option>
          <option value="admin">Admins</option>
          <option value="biogas">Biogas Partners</option>
        </select>
      </div>
      {filtered.length === 0 ? (
        <Card className="border-gray-200 shadow-sm"><CardContent><EmptyState icon={Users} title="No users found" description="No users match your current filters." /></CardContent></Card>
      ) : (
        <Card className="border-gray-200 shadow-sm">
          <CardContent className="p-0 divide-y divide-gray-100">
            {filtered.map((u) => (
              <div key={u._id} className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white text-sm font-bold">{u.name?.charAt(0) || "U"}</div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{u.name || "Unnamed"}</p>
                    <p className="text-xs text-gray-500">{u.email || "No email"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${roleColors[u.role || "user"] || "bg-gray-100 text-gray-600"}`}>{u.role || "user"}</span>
                  <p className="text-xs text-gray-400 hidden sm:block">{new Date(u.createdAt ?? 0).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </motion.div>
  );
}
