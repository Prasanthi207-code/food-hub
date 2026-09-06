import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import {
  Home,
  UtensilsCrossed,
  Truck,
  Building2,
  Shield,
  Leaf,
  Bell,
  User,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Search,
  Menu,
  X,
  BarChart3,
  ClipboardList,
  MapPin,
  FileText,
  Users,
  UserCheck,
  Briefcase,
  Heart,
  Package,
  CalendarClock,
  TrendingUp,
} from "lucide-react";

export type UserRole = "user" | "employee" | "business" | "admin" | "biogas";

interface NavItem {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
}

const navByRole: Record<UserRole, NavItem[]> = {
  user: [
    { label: "Dashboard", icon: Home, href: "/dashboard" },
    { label: "My Donations", icon: UtensilsCrossed, href: "/dashboard/donations" },
    { label: "Create Donation", icon: Heart, href: "/dashboard/create-donation" },
    { label: "Tracking", icon: MapPin, href: "/dashboard/tracking" },
    { label: "Notifications", icon: Bell, href: "/dashboard/notifications" },
    { label: "Profile", icon: User, href: "/dashboard/profile" },
  ],
  employee: [
    { label: "Dashboard", icon: Home, href: "/dashboard" },
    { label: "Available Requests", icon: ClipboardList, href: "/dashboard/requests" },
    { label: "My Assignments", icon: Truck, href: "/dashboard/assignments" },
    { label: "Tracking", icon: MapPin, href: "/dashboard/tracking" },
    { label: "Delivery History", icon: Package, href: "/dashboard/history" },
    { label: "Performance", icon: TrendingUp, href: "/dashboard/performance" },
    { label: "Notifications", icon: Bell, href: "/dashboard/notifications" },
  ],
  business: [
    { label: "Dashboard", icon: Home, href: "/dashboard" },
    { label: "My Donations", icon: UtensilsCrossed, href: "/dashboard/donations" },
    { label: "Create Donation", icon: Heart, href: "/dashboard/create-donation" },
    { label: "Analytics", icon: BarChart3, href: "/dashboard/analytics" },
    { label: "Subscription", icon: Briefcase, href: "/dashboard/subscription" },
    { label: "Notifications", icon: Bell, href: "/dashboard/notifications" },
    { label: "Profile", icon: User, href: "/dashboard/profile" },
  ],
  admin: [
    { label: "Overview", icon: Home, href: "/dashboard" },
    { label: "Users", icon: Users, href: "/dashboard/users" },
    { label: "Employees", icon: UserCheck, href: "/dashboard/employees" },
    { label: "Businesses", icon: Building2, href: "/dashboard/businesses" },
    { label: "Donations", icon: UtensilsCrossed, href: "/dashboard/donations" },
    { label: "Biogas Partners", icon: Leaf, href: "/dashboard/biogas-partners" },
    { label: "Subscriptions", icon: Briefcase, href: "/dashboard/subscriptions" },
    { label: "Analytics", icon: BarChart3, href: "/dashboard/analytics" },
    { label: "System Health", icon: Shield, href: "/dashboard/system-health" },
    { label: "Notifications", icon: Bell, href: "/dashboard/notifications" },
  ],
  biogas: [
    { label: "Dashboard", icon: Home, href: "/dashboard" },
    { label: "Supply Requests", icon: Package, href: "/dashboard/supply-requests" },
    { label: "Agreements", icon: FileText, href: "/dashboard/agreements" },
    { label: "Schedule", icon: CalendarClock, href: "/dashboard/schedule" },
    { label: "Analytics", icon: BarChart3, href: "/dashboard/analytics" },
    { label: "Notifications", icon: Bell, href: "/dashboard/notifications" },
    { label: "Profile", icon: User, href: "/dashboard/profile" },
  ],
};

const roleLabels: Record<UserRole, string> = {
  user: "Donor",
  employee: "Collection Agent",
  business: "Business Partner",
  admin: "Super Admin",
  biogas: "Biogas Partner",
};

const roleColors: Record<UserRole, string> = {
  user: "bg-emerald-50 text-emerald-700",
  employee: "bg-emerald-50 text-emerald-700",
  business: "bg-emerald-50 text-emerald-700",
  admin: "bg-emerald-100 text-emerald-800",
  biogas: "bg-emerald-50 text-emerald-700",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const role = (user?.role as UserRole) || "user";
  const navItems = navByRole[role] || navByRole.user;
  const unreadCount = 3;

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#f8faf8]">
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col transition-all duration-300 lg:relative",
          collapsed ? "w-[72px]" : "w-[260px]",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          "bg-gradient-to-b from-[#1a3a2a] to-[#0f2318] text-white"
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-white/10 px-4">
          {!collapsed && (
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500">
                <Leaf className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm font-bold tracking-tight">FoodHub</span>
            </Link>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex h-7 w-7 items-center justify-center rounded-md text-white/60 hover:bg-white/10 hover:text-white transition-colors"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden h-7 w-7 flex items-center justify-center rounded-md text-white/60 hover:bg-white/10"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {!collapsed && (
          <div className="px-4 py-3 border-b border-white/10">
            <span className={cn("inline-block rounded-full px-2.5 py-0.5 text-xs font-medium", roleColors[role])}>
              {roleLabels[role]}
            </span>
          </div>
        )}

        <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href || (item.href !== "/dashboard" && location.pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150",
                  isActive
                    ? "bg-emerald-500/20 text-white shadow-sm"
                    : "text-white/60 hover:bg-white/8 hover:text-white"
                )}
                title={collapsed ? item.label : undefined}
              >
                <item.icon className={cn("h-4.5 w-4.5 shrink-0", isActive ? "text-emerald-400" : "")} />
                {!collapsed && <span>{item.label}</span>}
                {!collapsed && item.label === "Notifications" && unreadCount > 0 && (
                  <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-500 text-[10px] font-bold text-white px-1">
                    {unreadCount}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-white/10 p-3 space-y-1">
          <Link
            to="/"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/60 hover:bg-white/8 hover:text-white transition-colors"
          >
            <Home className="h-4.5 w-4.5 shrink-0" />
            {!collapsed && <span>Back to Home</span>}
          </Link>
          <button
            onClick={handleSignOut}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/60 hover:bg-red-500/15 hover:text-red-400 transition-colors"
          >
            <LogOut className="h-4.5 w-4.5 shrink-0" />
            {!collapsed && <span>Sign Out</span>}
          </button>
        </div>
      </aside>

      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-16 items-center justify-between border-b border-emerald-100 bg-white/80 backdrop-blur-sm px-4 lg:px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden flex h-9 w-9 items-center justify-center rounded-lg text-emerald-800 hover:bg-emerald-50 transition-colors"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-emerald-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-9 w-64 rounded-lg border border-emerald-200 bg-emerald-50/50 pl-9 pr-4 text-sm text-emerald-900 placeholder:text-emerald-400 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/20 transition-colors"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to="/dashboard/notifications"
              className="relative flex h-9 w-9 items-center justify-center rounded-lg text-emerald-700 hover:bg-emerald-50 transition-colors"
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-orange-500 text-[9px] font-bold text-white px-1">
                  {unreadCount}
                </span>
              )}
            </Link>
            <div className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-white px-3 py-1.5 ml-1">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white">
                {user?.name?.charAt(0) || "U"}
              </div>
              <div className="hidden md:block">
                <p className="text-xs font-medium text-emerald-900 leading-tight">{user?.name || "User"}</p>
                <p className="text-[10px] text-emerald-600 leading-tight">{roleLabels[role]}</p>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
