import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, Brain, LineChart, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Home = () => {
  const services = [
    {
      icon: Brain,
      title: "AI Strategy & Consulting",
      description: "Develop clear roadmaps and ROI-focused plans for integrating AI into your business.",
    },
    {
      icon: Bot,
      title: "Automation & Chatbots",
      description: "Streamline workflows and enhance customer interactions with custom AI-driven solutions.",
    },
    {
      icon: LineChart,
      title: "Custom ML Models",
      description: "Bespoke machine learning solutions for unique challenges, designed for production readiness.",
    },
  ];

  const testimonials = [
    {
      quote: "Vectorax transformed our customer support with their AI chatbot. Response times are down, and satisfaction is up!",
      author: "CEO, E-commerce Innovators",
    },
    {
      quote: "The lead automation system built by Vectorax has been a game-changer for our sales team. Highly recommend!",
      author: "Head of Sales, B2B SaaS Co.",
    },
    {
      quote: "Their custom ML model gave us insights we never had before, leading to significant market advantages.",
      author: "CTO, Fintech Solutions",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iIzFmNGIyYyIgc3Ryb2tlLW9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-20"></div>
        
        <div className="container relative">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6 leading-tight">
              Transforming Businesses with Intelligent AI Solutions
            </h1>
            <p className="text-lg md:text-xl text-foreground/80 mb-8 max-w-2xl mx-auto">
              At Vectorax, we craft advanced AI systems — from chatbots to machine learning models — that help businesses scale effortlessly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all text-lg px-8">
                <Link to="/contact">Book a Free Consultation</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-all text-lg px-8">
                <Link to="/prompt-kit">Explore Prompt Kit</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Our Core Services</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card key={index} className="border-2 hover:border-accent transition-all hover:shadow-xl group animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{service.description}</CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg" className="border-2 border-primary hover:bg-primary hover:text-primary-foreground group">
              <Link to="/services">
                View All Services
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Trusted by Visionary Leaders</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-2 hover:border-accent transition-all animate-scale-in" style={{ animationDelay: `${index * 0.15}s` }}>
                <CardContent className="pt-6">
                  <p className="text-foreground/80 mb-4 italic">"{testimonial.quote}"</p>
                  <p className="text-sm font-medium text-accent">- {testimonial.author}</p>
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

export default Home;
