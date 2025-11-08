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

interface Prompt {
  _id: string; // Changed from 'id' to '_id' to match MongoDB's default ID field
  title: string;
  category: string;
  template: string; // Changed from 'content' to 'template' to match backend model
}

const Prompts = () => {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingPrompt, setEditingPrompt] = useState<Prompt | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    template: "",
  });
  const { toast } = useToast();

  const fetchPrompts = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/admin/prompts`, {
        headers: {
          "x-auth-token": token,
        },
      });
      setPrompts(response.data);
    } catch (error) {
      console.error("Error fetching prompts:", error);
      toast({
        title: "Error",
        description: "Failed to fetch prompts.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchPrompts();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (editingPrompt) {
        await axios.put(
          `${import.meta.env.VITE_API_URL}/admin/prompts/${editingPrompt._id}`,
          formData,
          {
            headers: {
              "x-auth-token": token,
            },
          }
        );
        toast({ title: "Success", description: "Prompt updated successfully" });
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/admin/prompts`, formData, {
          headers: {
            "x-auth-token": token,
          },
        });
        toast({ title: "Success", description: "Prompt created successfully" });
      }
    } catch (error) {
      console.error("Error saving prompt:", error);
      toast({
        title: "Error",
        description: `Failed to ${editingPrompt ? "update" : "create"} prompt.`,
        variant: "destructive",
      });
    }

    setIsOpen(false);
    setEditingPrompt(null);
    setFormData({ title: "", category: "", template: "" });
    fetchPrompts();
  };

  const handleEdit = (prompt: Prompt) => {
    setEditingPrompt(prompt);
    setFormData({
      title: prompt.title,
      category: prompt.category,
      template: prompt.template,
    });
    setIsOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this prompt?")) return;

    // TODO: Implement deleting prompt without Supabase
    toast({ title: "Success", description: "Prompt deleted successfully (simulated)" });
    fetchPrompts();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Prompt Templates</h1>
          <p className="text-muted-foreground">Manage AI prompt templates</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingPrompt(null)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Prompt
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingPrompt ? "Edit Prompt" : "Add Prompt"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="template">Prompt Template</Label>
                <Textarea
                  id="template"
                  value={formData.template}
                  onChange={(e) => setFormData({ ...formData, template: e.target.value })}
                  rows={8}
                  required
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
        {prompts.map((prompt) => (
          <Card key={prompt._id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{prompt.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{prompt.category}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(prompt)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(prompt._id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-mono bg-muted p-3 rounded">{prompt.template}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Prompts;
