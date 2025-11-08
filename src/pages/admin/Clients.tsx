import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Pencil, Trash2, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import axios from "axios";

interface Client {
  _id: string;
  name: string;
  email: string;
  company: string;
  createdAt: string;
}

const Clients = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
  });
  const { toast } = useToast();

  const fetchClients = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/admin/clients`, {
        headers: {
          "x-auth-token": token,
        },
      });
      setClients(response.data);
    } catch (error) {
      console.error("Error fetching clients:", error);
      toast({
        title: "Error",
        description: "Failed to fetch clients.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (editingClient) {
        await axios.put(
          `${import.meta.env.VITE_API_URL}/admin/clients/${editingClient._id}`,
          formData,
          {
            headers: {
              "x-auth-token": token,
            },
          }
        );
        toast({ title: "Success", description: "Client updated successfully" });
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/admin/clients`, formData, {
          headers: {
            "x-auth-token": token,
          },
        });
        toast({ title: "Success", description: "Client created successfully" });
      }
    } catch (error) {
      console.error("Error saving client:", error);
      toast({
        title: "Error",
        description: `Failed to ${editingClient ? "update" : "create"} client.`,
        variant: "destructive",
      });
    }

    setIsOpen(false);
    setEditingClient(null);
    setFormData({
      name: "",
      email: "",
      company: "",
    });
    fetchClients();
  };

  const handleEdit = (client: Client) => {
    setEditingClient(client);
    setFormData({
      name: client.name,
      email: client.email,
      company: client.company,
    });
    setIsOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this client?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${import.meta.env.VITE_API_URL}/admin/clients/${id}`, {
        headers: {
          "x-auth-token": token,
        },
      });
      toast({ title: "Success", description: "Client deleted successfully" });
    } catch (error) {
      console.error("Error deleting client:", error);
      toast({
        title: "Error",
        description: "Failed to delete client.",
        variant: "destructive",
      });
    }
    fetchClients();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Clients</h1>
          <p className="text-muted-foreground">Manage client information and testimonials</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingClient(null)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Client
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingClient ? "Edit Client" : "Add Client"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Client Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Client Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit">Save</Button>
                <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {clients.map((client) => (
          <Card key={client._id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{client.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{client.email}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {client.company && `${client.company} - `}
                    {new Date(client.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(client)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(client._id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Removed testimonial and case study fields as they are not in the backend model */}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Clients;
