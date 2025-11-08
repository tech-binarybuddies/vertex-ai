import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Calendar } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import axios from "axios";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  message: z.string().trim().min(1, "Message is required").max(1000),
});

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      contactSchema.parse(formData);

      await axios.post(`${import.meta.env.VITE_API_URL}/admin/contact`, formData);

      toast({
        title: "Message sent!",
        description: "We'll get back to you soon.",
      });
      setFormData({ name: "", email: "", message: "" });
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Validation Error",
          description: error.errors[0].message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to send message.",
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <section className="py-20 bg-gradient-subtle">
        <div className="container">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">Contact Us</h1>
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
              Ready to transform your business with AI? Fill out the form below or book a free consultation directly.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="border-2 hover:border-accent transition-all animate-scale-in">
              <CardHeader>
                <CardTitle className="text-2xl">Send Us a Message</CardTitle>
                <CardDescription>We'll respond within 24 hours</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Your Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Your Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="message">Your Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your project..."
                      required
                      className="mt-1 min-h-[120px]"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg" disabled={loading}>
                    {loading ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="border-2 hover:border-accent transition-all animate-scale-in" style={{ animationDelay: '0.1s' }}>
                <CardHeader>
                  <CardTitle className="text-2xl">Get in Touch</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Mail className="w-5 h-5 text-accent mt-0.5" />
                    <div>
                      <p className="font-medium">Email Us</p>
                      <a href="mailto:hello@vectorax.ai" className="text-foreground/80 hover:text-accent transition-colors">
                        hello@vectorax.ai
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Phone className="w-5 h-5 text-accent mt-0.5" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <a href="tel:+919000000000" className="text-foreground/80 hover:text-accent transition-colors">
                        +91 90000 00000
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-accent mt-0.5" />
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-foreground/80">Pune, Maharashtra, India</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-accent bg-gradient-primary hover:shadow-xl transition-all animate-scale-in" style={{ animationDelay: '0.2s' }}>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center">
                    <Calendar className="w-6 h-6 mr-2 text-accent" />
                    Book a Free Consultation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/80 mb-4">
                    Schedule a 30-minute call to discuss your AI needs and explore how we can help.
                  </p>
                  <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg">
                    Schedule Now
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
