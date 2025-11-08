import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PromptKit = () => {
  const prompts = [
    {
      title: "Lead Qualifier Chatbot Prompt",
      content: "Act as a lead qualification bot. Your goal is to determine if a prospect is a good fit for our B2B SaaS product. Ask questions about their company size, industry, current challenges, and budget. If they meet criteria, offer to book a demo. If not, politely decline.",
    },
    {
      title: "Support Response Generator",
      content: "Generate a concise and helpful support response for a customer reporting [issue]. Acknowledge their problem, provide a clear solution or next steps, and maintain a friendly, professional tone. Include a closing statement inviting further questions.",
    },
    {
      title: "SEO Blog Brief Prompt",
      content: "Create an SEO-optimized blog brief for an article titled 'AI automation for small business'. Include target keywords, a compelling meta description, 3-5 subheadings with brief descriptions, and a call to action for a free consultation.",
    },
  ];

  const copyToClipboard = (text: string, title: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${title} copied to clipboard!`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <section className="py-20 bg-gradient-subtle">
        <div className="container">
          <div className="text-center mb-16 animate-fade-in max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">Client Prompt Kit</h1>
            <p className="text-lg text-foreground/80">
              Unlock the power of AI with our exclusive Client Prompt Kit. Get access to prebuilt, high-performance AI prompts designed to accelerate your business growth, optimize marketing campaigns, and enhance content creation. Start leveraging AI effectively from day one!
            </p>
          </div>
          
          <div className="grid gap-8 max-w-4xl mx-auto">
            {prompts.map((prompt, index) => (
              <Card key={index} className="border-2 hover:border-accent transition-all hover:shadow-xl animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader>
                  <CardTitle className="text-xl flex items-center justify-between">
                    {prompt.title}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(prompt.content, prompt.title)}
                      className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copy
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    <code className="block bg-muted p-4 rounded-lg text-sm text-foreground">
                      "{prompt.content}"
                    </code>
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12 space-y-4">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg">
              Download Prompt Kit (Coming Soon)
            </Button>
            <br />
            <Button variant="outline" size="lg" className="border-2 border-primary hover:bg-primary hover:text-primary-foreground">
              Request Custom Prompt
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PromptKit;
