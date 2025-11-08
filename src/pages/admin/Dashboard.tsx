import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Users, FileText, DollarSign } from "lucide-react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const [stats, setStats] = useState({
    messages: 0,
    clients: 0,
    prompts: 0,
    pricing: 0,
    users: 0,
  });
  const { toast } = useToast();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/admin/dashboard-stats`, {
          headers: {
            "x-auth-token": token,
          },
        });
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
        toast({
          title: "Error",
          description: "Failed to fetch dashboard statistics.",
          variant: "destructive",
        });
      }
    };

    fetchStats();
  }, [toast]);

  const statCards = [
    {
      title: "Total Messages",
      value: stats.messages,
      description: "Contact form submissions",
      icon: MessageSquare,
      color: "text-blue-500",
    },
    {
      title: "Clients",
      value: stats.clients,
      description: "Registered clients",
      icon: Users,
      color: "text-green-500",
    },
    {
      title: "Total Users",
      value: stats.users,
      description: "Registered users",
      icon: Users,
      color: "text-cyan-500",
    },
    {
      title: "Prompt Templates",
      value: stats.prompts,
      description: "Available prompts",
      icon: FileText,
      color: "text-purple-500",
    },
    {
      title: "Pricing Plans",
      value: stats.pricing,
      description: "Active plans",
      icon: DollarSign,
      color: "text-orange-500",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your business metrics</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Welcome to Admin Dashboard</CardTitle>
          <CardDescription>
            Manage your messages, clients, prompts, pricing, and more from this central hub.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Use the sidebar navigation to access different sections of your admin panel.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
