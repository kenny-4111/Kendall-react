import { Link, useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";
import Button from "../components/Button";
import { useEffect, useState } from "react";

type Ticket = {
  id: number;
  title: string;
  description: string;
  status: string;
  created: string;
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    const fetchTickets = () => {
      const stored = localStorage.getItem("kendall_manager_pro_tickets");
      setTickets(stored ? (JSON.parse(stored) as Ticket[]) : []);
    };

    fetchTickets();

    // Listen for changes from other tabs/windows
    const onStorage = (e: StorageEvent) => {
      if (e.key === "kendall_manager_pro_tickets") fetchTickets();
    };
    window.addEventListener("storage", onStorage);

    // Refresh ticket list periodically
    const interval = setInterval(fetchTickets, 500);
    return () => {
      window.removeEventListener("storage", onStorage);
      clearInterval(interval);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/auth/login");
  };

  const total = tickets.length;
  const open = tickets.filter((t) => t.status === "open").length;
  const inProgress = tickets.filter((t) => t.status === "in_progress").length;
  const resolved = tickets.filter((t) => t.status === "closed").length;

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-100 via-blue-300 to-blue-500 flex flex-col items-center justify-center p-4 overflow-hidden">
      {/* ===== Decorative Circles (Soft Glow Effect) ===== */}
      {/* Top-left decorative circle */}
      <div className="absolute top-16 left-10 w-40 h-40 bg-white/70 rounded-full blur-3xl z-0"></div>

      {/* Mid-right decorative circle */}
      <div className="absolute top-1/3 right-20 w-52 h-52 bg-white/60 rounded-full blur-2xl z-0"></div>

      {/* Bottom-right decorative circle */}
      <div className="absolute bottom-16 right-24 w-28 h-28 bg-white/50 rounded-full blur-2xl z-0"></div>

      {/* ===== Main Dashboard Card ===== */}
      <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-lg p-8 flex flex-col gap-8 z-10">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-blue-700">Dashboard</h1>
          <Button
            onClick={handleLogout}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded transition">
            Logout
          </Button>
        </header>

        {/* Ticket Stats Section */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="p-6 rounded-lg bg-blue-50 text-blue-700 font-semibold text-center shadow">
            Total Tickets: {total}
          </div>
          <div className="p-6 rounded-lg bg-green-100 text-green-700 font-semibold text-center shadow">
            Open Tickets: {open}
          </div>
          <div className="p-6 rounded-lg bg-amber-100 text-amber-700 font-semibold text-center shadow">
            In Progress: {inProgress}
          </div>
          <div className="p-6 rounded-lg bg-gray-100 text-gray-700 font-semibold text-center shadow">
            Resolved: {resolved}
          </div>
        </section>

        {/* Manage Tickets Button */}
        <Link to="/tickets" className="self-center">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded transition">
            Manage Tickets
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
