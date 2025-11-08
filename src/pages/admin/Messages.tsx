import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Mail, CheckCircle, XCircle, Trash2 } from "lucide-react";
import axios from "axios";

interface Message {
  _id: string; // Changed from 'id' to '_id' to match MongoDB's default ID field
  name: string;
  email: string;
  message: string;
  status: string;
  createdAt: string; // Changed from 'created_at' to 'createdAt' to match backend model
}

const Messages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const { toast } = useToast();

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/admin/messages`, {
        headers: {
          "x-auth-token": token,
        },
      });
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
      toast({
        title: "Error",
        description: "Failed to fetch messages.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteMessage = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this message?")) {
      return;
    }
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${import.meta.env.VITE_API_URL}/admin/messages/${id}`, {
        headers: {
          "x-auth-token": token,
        },
      });
      toast({
        title: "Success",
        description: "Message deleted.",
      });
      fetchMessages();
    } catch (error) {
      console.error("Error deleting message:", error);
      toast({
        title: "Error",
        description: "Failed to delete message.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${import.meta.env.VITE_API_URL}/admin/messages/${id}/status`,
        { status },
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );
      toast({
        title: "Success",
        description: "Message status updated.",
      });
      fetchMessages(); // Re-fetch to update UI
    } catch (error) {
      console.error("Error updating message status:", error);
      toast({
        title: "Error",
        description: "Failed to update message status.",
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "unread":
        return "bg-red-500";
      case "read":
        return "bg-yellow-500";
      case "resolved":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const filteredMessages = messages.filter((message) => {
    const matchesSearch = 
      message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || message.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return <div>Loading messages...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Messages</h1>
        <p className="text-muted-foreground">Manage contact form submissions</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Search by name, email, or message..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:w-48"
        >
          <option value="all">All Status</option>
          <option value="unread">Unread</option>
          <option value="read">Read</option>
          <option value="resolved">Resolved</option>
        </select>
      </div>

      <div className="grid gap-4">
        {filteredMessages.length === 0 ? (
          <Card>
            <CardContent className="py-10 text-center">
              <Mail className="mx-auto h-12 w-12 text-muted-foreground" />
              <p className="mt-4 text-muted-foreground">
                {messages.length === 0 ? "No messages yet" : "No messages match your search"}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredMessages.map((message) => (
            <Card key={message._id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{message.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{message.email}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(message.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <Badge className={getStatusColor(message.status)}>{message.status}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">{message.message}</p>
                <div className="flex gap-2">
                  {message.status !== "read" && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateStatus(message._id, "read")}
                    >
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Mark as Read
                    </Button>
                  )}
                  {message.status !== "resolved" && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateStatus(message._id, "resolved")}
                    >
                      <XCircle className="mr-2 h-4 w-4" />
                      Mark as Resolved
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => deleteMessage(message._id)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default Messages;
