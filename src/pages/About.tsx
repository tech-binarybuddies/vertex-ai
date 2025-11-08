import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Lightbulb, Rocket, TrendingUp } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const About = () => {
  const steps = [
    {
      icon: Search,
      title: "Discover",
      description: "Deep dive into your business needs, challenges, and opportunities to define a clear AI strategy.",
    },
    {
      icon: Lightbulb,
      title: "Prototype",
      description: "Rapidly develop and test initial AI concepts, ensuring alignment with your goals and user experience.",
    },
    {
      icon: Rocket,
      title: "Launch",
      description: "Deploy robust, production-ready AI solutions seamlessly into your existing infrastructure.",
    },
    {
      icon: TrendingUp,
      title: "Optimize",
      description: "Continuously monitor, refine, and enhance AI performance to ensure long-term value and scalability.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <section className="py-20 bg-gradient-subtle">
        <div className="container">
          <div className="text-center mb-16 animate-fade-in max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">About Vectorax</h1>
            <p className="text-lg text-foreground/80">
              We are a team of AI innovators led by Shailesh Mitkari, helping businesses automate intelligently and scale efficiently. At Vectorax, we believe in harnessing the power of artificial intelligence to create solutions that are not only technologically advanced but also deeply human-centered, driving real-world impact and sustainable growth for our clients.
            </p>
          </div>
          
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-primary text-center mb-12">How We Work</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <Card key={index} className="border-2 hover:border-accent transition-all hover:shadow-xl text-center group animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                    <CardHeader>
                      <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                        <Icon className="w-8 h-8 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{step.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">{step.description}</CardDescription>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
