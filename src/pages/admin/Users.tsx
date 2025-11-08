import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Shield, ShieldOff } from "lucide-react";
import axios from "axios";

interface UserProfile {
  _id: string;
  email: string;
  fullName: string | null;
  role: "user" | "admin";
  createdAt: string;
}

const Users = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const fetchData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/admin/users`, {
        headers: {
          "x-auth-token": token,
        },
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast({
        title: "Error",
        description: "Failed to fetch users.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return users;
    return users.filter(u =>
      (u.fullName || "").toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q)
    );
  }, [users, query]);

  const promoteToAdmin = async (userId: string) => {
    setActionLoading(userId);
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${import.meta.env.VITE_API_URL}/admin/users/${userId}`,
        { role: "admin" },
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );
      toast({ title: "Role updated", description: "User promoted to admin." });
      await fetchData();
    } catch (error) {
      console.error("Error promoting user:", error);
      toast({
        title: "Error",
        description: "Failed to promote user.",
        variant: "destructive",
      });
    } finally {
      setActionLoading(null);
    }
  };

  const demoteAdmin = async (userId: string) => {
    setActionLoading(userId);
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${import.meta.env.VITE_API_URL}/admin/users/${userId}`,
        { role: "user" },
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );
      toast({ title: "Role updated", description: "Admin role removed." });
      await fetchData();
    } catch (error) {
      console.error("Error demoting user:", error);
      toast({
        title: "Error",
        description: "Failed to demote user.",
        variant: "destructive",
      });
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">User Roles</h1>
        <p className="text-muted-foreground">Promote or demote admins securely.</p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle>All Users</CardTitle>
          <div className="w-full max-w-sm">
            <Input
              placeholder="Search by name or email"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" /> Loading users...
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Roles</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((u) => {
                  const isAdmin = u.role === "admin";
                  return (
                    <TableRow key={u._id}>
                      <TableCell className="font-medium">{u.fullName || "—"}</TableCell>
                      <TableCell>{u.email}</TableCell>
                      <TableCell className="space-x-2">
                        {isAdmin && <Badge variant="default">admin</Badge>}
                        {!isAdmin && <Badge variant="secondary">user</Badge>}
                      </TableCell>
                      <TableCell className="text-right">
                        {isAdmin ? (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => demoteAdmin(u._id)}
                            disabled={actionLoading === u._id}
                          >
                            {actionLoading === u._id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <>
                                <ShieldOff className="h-4 w-4 mr-2" /> Demote
                              </>
                            )}
                          </Button>
                        ) : (
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => promoteToAdmin(u._id)}
                            disabled={actionLoading === u._id}
                          >
                            {actionLoading === u._id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <>
                                <Shield className="h-4 w-4 mr-2" /> Promote
                              </>
                            )}
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
                {filtered.length === 0 && !loading && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-muted-foreground">
                      No users found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Users;
