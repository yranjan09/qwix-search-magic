
import React from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      
      <main className="flex-1 bg-background">
        {/* Hero Section */}
        <section className="py-16 md:py-24 glass border-b border-border/40">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-6 animate-fade-up">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Find Professional Services <br className="hidden md:inline" />
                <span className="text-primary">with Ease</span>
              </h1>
              <p className="max-w-[700px] text-lg text-muted-foreground">
                Qwix.it connects you with reliable professionals for all your service needs.
                Book appointments, track your requests, and get the job done.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <Button asChild size="lg" className="gap-2">
                  <Link to="/search">
                    <Search className="h-5 w-5" />
                    Search Services
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href="#categories">
                    Explore Categories
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Featured Categories */}
        <section id="categories" className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Popular Service Categories</h2>
              <p className="text-muted-foreground max-w-[700px]">
                Browse through our most requested service categories
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: 'Plumbing', icon: '🔧', description: 'Fix leaks, install fixtures, and solve plumbing issues' },
                { name: 'Electrical', icon: '⚡', description: 'Wiring, repairs, installations, and electrical solutions' },
                { name: 'Cleaning', icon: '✨', description: 'Home cleaning, deep cleaning, and maintenance services' },
                { name: 'Painting', icon: '🎨', description: 'Interior and exterior painting for homes and offices' },
                { name: 'Gardening', icon: '🌱', description: 'Lawn care, landscaping, and garden maintenance' },
                { name: 'Carpentry', icon: '🪚', description: 'Custom furniture, repairs, and woodworking services' },
              ].map((category, index) => (
                <div 
                  key={index} 
                  className="rounded-xl p-6 glass border border-border/40 hover:shadow-lg transition-all duration-300 animate-on-scroll"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="text-4xl mb-4">
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                  <p className="text-muted-foreground mb-4">{category.description}</p>
                  <Button asChild variant="link" className="p-0">
                    <Link to={`/search`} className="inline-flex items-center gap-1">
                      View Services
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* How It Works */}
        <section className="py-16 md:py-24 bg-accent">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
              <p className="text-muted-foreground max-w-[700px]">
                Get started with Qwix.it in just a few simple steps
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              {[
                { 
                  title: 'Search Services', 
                  description: 'Browse through our range of professional services and select what you need.',
                  number: '01',
                },
                { 
                  title: 'Choose a Professional', 
                  description: 'Compare professionals based on experience, ratings, and pricing.',
                  number: '02',
                },
                { 
                  title: 'Book & Confirm', 
                  description: 'Schedule an appointment and get your service request confirmed.',
                  number: '03',
                },
              ].map((step, index) => (
                <div 
                  key={index} 
                  className="flex flex-col items-center text-center p-6 animate-on-scroll"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center font-bold mb-6">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
            
            <div className="flex justify-center mt-12">
              <Button asChild size="lg">
                <Link to="/search">
                  Get Started
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
