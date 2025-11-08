import { useEffect, useState } from "react";
import { Outlet, useNavigate, Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  MessageSquare,
  Users,
  FileText,
  DollarSign,
  Activity,
  LogOut,
  Menu,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { useToast } from "@/hooks/use-toast";
import logo from "@/assets/vertex.png";
import axios from "axios";

const menuItems = [
  { title: "Dashboard", icon: LayoutDashboard, path: "/admin" },
  { title: "Messages", icon: MessageSquare, path: "/admin/messages" },
  { title: "Clients", icon: Users, path: "/admin/clients" },
  { title: "User Roles", icon: Users, path: "/admin/users" },
  { title: "Prompts", icon: FileText, path: "/admin/prompts" },
  { title: "Pricing", icon: DollarSign, path: "/admin/pricing" },
  { title: "AI Logs", icon: Activity, path: "/admin/ai-logs" },
];

function AdminSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { open } = useSidebar();

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast({
      title: "Logged out",
      description: "You've been successfully logged out.",
    });
    navigate("/auth");
  };

  return (
    <Sidebar collapsible="icon">
      <div className="p-4 border-b">
        <Link to="/" className="flex items-center space-x-3">
          <img src={logo} alt="Vectorax AI" className="h-16 w-auto" />
        </Link>
      </div>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Admin Panel</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton asChild isActive={location.pathname === item.path}>
                    <Link to={item.path}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="mt-auto p-4">
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            <span className="ml-2">Logout</span>
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}

const AdminLayout = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/auth");
        return;
      }

      try {
        const response = await axios.get("http://localhost:5000/api/auth/verify", {
          headers: {
            "x-auth-token": token,
          },
        });
        if (response.data.user.role === "admin") {
          setIsAdmin(true);
        } else {
          toast({
            title: "Access Denied",
            description: "You do not have admin privileges.",
            variant: "destructive",
          });
          navigate("/");
        }
      } catch (error) {
        console.error("Authentication check failed:", error);
        localStorage.removeItem("token");
        navigate("/auth");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [navigate, toast]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AdminSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-14 border-b flex items-center px-6">
            <SidebarTrigger />
          </header>
          <main className="flex-1 p-6 bg-gradient-subtle overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
