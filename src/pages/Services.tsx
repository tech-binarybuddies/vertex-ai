import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Bot, LineChart, Megaphone, Plug, Database } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Services = () => {
  const services = [
    {
      icon: Brain,
      title: "AI Strategy & Consulting",
      description: "Develop clear roadmaps, assess feasibility, and create ROI-focused plans for integrating AI into your business.",
    },
    {
      icon: Bot,
      title: "Automation & Chatbots",
      description: "Streamline workflows, enhance customer interactions, and improve efficiency with custom AI-driven automation and intelligent chatbots.",
    },
    {
      icon: LineChart,
      title: "Custom ML Models",
      description: "Leverage bespoke ML models for classification, forecasting, and complex problem-solving, designed for production readiness.",
    },
    {
      icon: Megaphone,
      title: "AI for Content & Marketing",
      description: "Boost your marketing and content creation with AI-powered generation, SEO automation, and personalization engines.",
    },
    {
      icon: Plug,
      title: "Business Integrations & APIs",
      description: "Seamlessly integrate AI solutions across your existing CRM, helpdesk, marketing, and other business tools via robust APIs.",
    },
    {
      icon: Database,
      title: "Data Engineering & Pipelines",
      description: "Build robust ETL processes, feature stores, and monitoring systems to ensure your AI models are fed with high-quality data.",
    },
    {
      icon: Brain,
      title: "Web Development",
      description: "Build modern, responsive, and scalable web applications with cutting-edge technologies and best practices for optimal performance.",
    },
    {
      icon: Bot,
      title: "App Development",
      description: "Create powerful mobile and desktop applications with seamless user experiences across iOS, Android, and cross-platform solutions.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <section className="py-20 bg-gradient-subtle">
        <div className="container">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">Our Services</h1>
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
              Tailored intelligence. Real results.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card key={index} className="border-2 hover:border-accent transition-all hover:shadow-xl group animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardHeader>
                    <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base mb-4">{service.description}</CardDescription>
                    <Button asChild variant="outline" size="sm" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                      <Link to="/contact">Get This Service</Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
