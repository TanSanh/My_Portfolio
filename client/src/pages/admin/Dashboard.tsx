import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MessageSquare, FolderKanban, Mail } from "lucide-react";
import { contactService } from "../../services/contactService";
import { projectService } from "../../services/projectService";

interface Stats {
  totalContacts: number;
  unreadContacts: number;
  totalProjects: number;
}

export const Dashboard = () => {
  const [stats, setStats] = useState<Stats>({
    totalContacts: 0,
    unreadContacts: 0,
    totalProjects: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [contacts, projects] = await Promise.all([
          contactService.getAll(),
          projectService.getAll(),
        ]);

        setStats({
          totalContacts: contacts.length,
          unreadContacts: contacts.filter((c: any) => !c.read).length,
          totalProjects: projects.length,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      label: "Total Contacts",
      value: stats.totalContacts,
      icon: MessageSquare,
      color: "from-blue-500 to-blue-600",
    },
    {
      label: "Unread Messages",
      value: stats.unreadContacts,
      icon: Mail,
      color: "from-amber-500 to-orange-500",
    },
    {
      label: "Total Projects",
      value: stats.totalProjects,
      icon: FolderKanban,
      color: "from-green-500 to-emerald-500",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400 text-sm mt-1">
          Welcome back! Here&apos;s an overview of your portfolio.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {statCards.map((card, index) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative rounded-xl p-[1px] bg-gradient-to-br from-white/10 to-white/5"
          >
            <div className="bg-[#0a0a1a] rounded-xl p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-xs uppercase tracking-wider">
                    {card.label}
                  </p>
                  <p className="text-3xl font-bold text-white mt-2">
                    {loading ? (
                      <span className="inline-block w-12 h-8 bg-white/5 rounded animate-pulse" />
                    ) : (
                      card.value
                    )}
                  </p>
                </div>
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-r ${card.color} flex items-center justify-center`}
                >
                  <card.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
