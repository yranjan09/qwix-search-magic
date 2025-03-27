
import React from 'react';
import { Link } from 'react-router-dom';
import { Search, BellRing, User, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  
  return (
    <header className="sticky top-0 z-50 glass border-b border-border/40">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <span className="font-bold text-xl tracking-tight">Qwix.it</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link 
              to="/" 
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Home
            </Link>
            <Link 
              to="/search" 
              className="text-sm font-medium transition-colors text-primary border-b-2 border-primary"
            >
              Search
            </Link>
            <Link 
              to="/services" 
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Services
            </Link>
            <Link 
              to="/professionals" 
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Professionals
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="hover:bg-accent rounded-full">
            <BellRing className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
          
          <Button variant="ghost" size="icon" className="hover:bg-accent rounded-full">
            <User className="h-5 w-5" />
            <span className="sr-only">Account</span>
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden hover:bg-accent rounded-full"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Menu</span>
          </Button>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={cn(
        "md:hidden absolute w-full bg-background border-b border-border overflow-hidden transition-all duration-300 ease-in-out",
        isMenuOpen ? "max-h-64" : "max-h-0"
      )}>
        <nav className="flex flex-col p-4 gap-4">
          <Link 
            to="/" 
            className="text-sm font-medium p-2 hover:bg-accent rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/search" 
            className="text-sm font-medium p-2 bg-accent rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Search
          </Link>
          <Link 
            to="/services" 
            className="text-sm font-medium p-2 hover:bg-accent rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Services
          </Link>
          <Link 
            to="/professionals" 
            className="text-sm font-medium p-2 hover:bg-accent rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Professionals
          </Link>
        </nav>
      </div>
    </header>
  );
}
