import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Pencil, Trash2, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface PricingPlan {
  id: string;
  name: string;
  price: string;
  description: string | null;
  features: any;
  is_popular: boolean;
  sort_order: number;
}

const PricingEditor = () => {
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<PricingPlan | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    features: "",
    is_popular: false,
    sort_order: 0,
  });
  const { toast } = useToast();

  const fetchPlans = async () => {
    // TODO: Implement fetching pricing plans without Supabase
    const data: PricingPlan[] = []; // Simulated data
    setPlans(data);
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const features = formData.features.split("\n").filter((f) => f.trim());
    const planData = {
      ...formData,
      features,
    };

    if (editingPlan) {
      // TODO: Implement updating pricing plan without Supabase
      toast({ title: "Success", description: "Pricing plan updated successfully (simulated)" });
    } else {
      // TODO: Implement inserting pricing plan without Supabase
      toast({ title: "Success", description: "Pricing plan created successfully (simulated)" });
    }

    setIsOpen(false);
    setEditingPlan(null);
    setFormData({
      name: "",
      price: "",
      description: "",
      features: "",
      is_popular: false,
      sort_order: 0,
    });
    fetchPlans();
  };

  const handleEdit = (plan: PricingPlan) => {
    setEditingPlan(plan);
    setFormData({
      name: plan.name,
      price: plan.price,
      description: plan.description || "",
      features: plan.features.join("\n"),
      is_popular: plan.is_popular,
      sort_order: plan.sort_order,
    });
    setIsOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this pricing plan?")) return;

    // TODO: Implement deleting pricing plan without Supabase
    toast({ title: "Success", description: "Pricing plan deleted successfully (simulated)" });
    fetchPlans();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Pricing Plans</h1>
          <p className="text-muted-foreground">Manage pricing plans and features</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingPlan(null)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Plan
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingPlan ? "Edit Plan" : "Add Plan"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Plan Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="features">Features (one per line)</Label>
                <Textarea
                  id="features"
                  value={formData.features}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  rows={6}
                  placeholder="✓ Feature 1&#10;✓ Feature 2&#10;✓ Feature 3"
                />
              </div>
              <div>
                <Label htmlFor="sort_order">Sort Order</Label>
                <Input
                  id="sort_order"
                  type="number"
                  value={formData.sort_order}
                  onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) })}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="is_popular"
                  checked={formData.is_popular}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_popular: checked === true })}
                />
                <Label htmlFor="is_popular">Mark as Popular</Label>
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

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan) => (
          <Card key={plan.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{plan.name}</CardTitle>
                  <p className="text-2xl font-bold mt-2">{plan.price}</p>
                  {plan.description && (
                    <p className="text-sm text-muted-foreground">{plan.description}</p>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(plan)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(plan.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                {Array.isArray(plan.features) && plan.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
              {plan.is_popular && (
                <div className="mt-4">
                  <span className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded">
                    Popular
                  </span>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PricingEditor;
