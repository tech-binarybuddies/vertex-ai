import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Work = () => {
  const caseStudies = [
    {
      title: "E-commerce Support Bot",
      description: "Reduced response time from 8h to 30min and cut tickets by 42%",
      impact: "42% reduction in support tickets",
    },
    {
      title: "Lead Automation for B2B SaaS",
      description: "Increased demos by 65%",
      impact: "65% increase in demo bookings",
    },
    {
      title: "Content AI for Media",
      description: "Boosted engagement by 22%",
      impact: "22% engagement growth",
    },
  ];

  const partners = ["Startup A", "Startup B", "Startup C"];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <section className="py-20 bg-gradient-subtle">
        <div className="container">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">Our Work / Case Studies</h1>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {caseStudies.map((study, index) => (
              <Card key={index} className="border-2 hover:border-accent transition-all hover:shadow-xl group animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader>
                  <CardTitle className="text-xl">{study.title}</CardTitle>
                  <CardDescription className="text-base">{study.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-accent/10 rounded-lg p-4 mb-4">
                    <p className="text-accent font-semibold text-lg">{study.impact}</p>
                  </div>
                  <Button variant="outline" size="sm" className="w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground group">
                    Learn More
                    <ExternalLink className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center animate-fade-in">
            <h2 className="text-3xl font-bold text-primary mb-8">Our Partners</h2>
            <div className="flex flex-wrap justify-center gap-8 items-center">
              {partners.map((partner, index) => (
                <div key={index} className="bg-card border-2 border-border rounded-lg px-8 py-6 hover:border-accent transition-all hover:shadow-lg">
                  <p className="text-xl font-semibold text-foreground">{partner}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Work;
