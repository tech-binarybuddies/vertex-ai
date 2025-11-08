import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Pricing = () => {
  const plans = [
    {
      name: "Starter",
      price: "₹35,000",
      period: "/project",
      description: "Basic automation/chatbot",
      features: [
        "Initial AI Consultation",
        "1 Simple Chatbot or Automation",
        "Email Support",
      ],
      cta: "Get Started",
      highlighted: false,
    },
    {
      name: "Business",
      price: "₹1,20,000",
      period: "/project",
      description: "Advanced integrations",
      features: [
        "Comprehensive AI Strategy",
        "Custom Automation Workflow",
        "Advanced Chatbot Integration",
        "Priority Support",
      ],
      cta: "Get Started",
      highlighted: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "/quote",
      description: "ML + analytics",
      features: [
        "Dedicated AI Team",
        "Bespoke AI Model Development",
        "Full-Scale AI Implementation",
        "24/7 Premium Support",
      ],
      cta: "Contact for Quote",
      highlighted: false,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <section className="py-20 bg-gradient-subtle">
        <div className="container">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">Pricing</h1>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <Card 
                key={index} 
                className={`border-2 transition-all hover:shadow-xl animate-scale-in ${
                  plan.highlighted ? 'border-accent shadow-lg scale-105' : 'hover:border-accent'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription className="text-base">{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-primary">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <Check className="w-5 h-5 text-accent mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-foreground/80">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    asChild 
                    className={`w-full ${
                      plan.highlighted 
                        ? 'bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg' 
                        : 'bg-primary text-primary-foreground hover:bg-primary/90'
                    }`}
                  >
                    <Link to="/contact">{plan.cta}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Pricing;
