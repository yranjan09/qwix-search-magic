import React, { useState, useEffect } from 'react';
import { Search, Filter, X, Clock, Calendar, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';

// Mock data for services
const services = [
  { id: 1, name: 'Plumbing' },
  { id: 2, name: 'Electrical' },
  { id: 3, name: 'Cleaning' },
  { id: 4, name: 'Painting' },
  { id: 5, name: 'Gardening' },
  { id: 6, name: 'Carpentry' },
];

// Mock data for packages
const mockPackages = [
  {
    package_id: 1,
    service_name: 'Plumbing',
    name: 'Basic Plumbing Service',
    professional_name: 'John Doe',
    professional_id: 101,
    experience: 5,
    price: 800,
    phone: '+91 9876543210',
  },
  {
    package_id: 2,
    service_name: 'Electrical',
    name: 'Full Home Wiring',
    professional_name: 'Jane Smith',
    professional_id: 102,
    experience: 8,
    price: 1200,
    phone: '+91 9876543211',
  },
  {
    package_id: 3,
    service_name: 'Cleaning',
    name: 'Deep Home Cleaning',
    professional_name: 'Robert Johnson',
    professional_id: 103,
    experience: 3,
    price: 600,
    phone: '+91 9876543212',
  },
  {
    package_id: 4,
    service_name: 'Painting',
    name: 'Interior Painting',
    professional_name: 'Emily Davis',
    professional_id: 104,
    experience: 12,
    price: 1500,
    phone: '+91 9876543213',
  },
  {
    package_id: 5,
    service_name: 'Gardening',
    name: 'Garden Maintenance',
    professional_name: 'Michael Wilson',
    professional_id: 105,
    experience: 4,
    price: 450,
    phone: '+91 9876543214',
  },
  {
    package_id: 6,
    service_name: 'Carpentry',
    name: 'Custom Furniture',
    professional_name: 'Sarah Brown',
    professional_id: 106,
    experience: 10,
    price: 2000,
    phone: '+91 9876543215',
  },
];

const SearchPage = () => {
  const [searchedText, setSearchedText] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [serviceFilter, setServiceFilter] = useState('');
  const [expFilter, setExpFilter] = useState('');
  const [packages, setPackages] = useState(mockPackages);
  const [filteredPackages, setFilteredPackages] = useState(mockPackages);
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);
  
  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters();
  };

  // Function to apply all filters
  const applyFilters = () => {
    let filtered = [...packages];
    
    // Apply text search
    if (searchedText) {
      filtered = filtered.filter(pkg => 
        pkg.name.toLowerCase().includes(searchedText.toLowerCase()) ||
        pkg.service_name.toLowerCase().includes(searchedText.toLowerCase()) ||
        pkg.professional_name.toLowerCase().includes(searchedText.toLowerCase())
      );
    }
    
    // Apply price filter
    if (priceFilter) {
      switch (priceFilter) {
        case '500':
          filtered = filtered.filter(pkg => pkg.price <= 500);
          break;
        case '1000':
          filtered = filtered.filter(pkg => pkg.price > 500 && pkg.price <= 1000);
          break;
        case '1500':
          filtered = filtered.filter(pkg => pkg.price > 1000 && pkg.price <= 1500);
          break;
        case 'max':
          filtered = filtered.filter(pkg => pkg.price > 1500);
          break;
      }
    }
    
    // Apply service filter
    if (serviceFilter) {
      filtered = filtered.filter(pkg => pkg.service_name === serviceFilter);
    }
    
    // Apply experience filter
    if (expFilter) {
      switch (expFilter) {
        case '0-1':
          filtered = filtered.filter(pkg => pkg.experience <= 1);
          break;
        case '1-3':
          filtered = filtered.filter(pkg => pkg.experience > 1 && pkg.experience <= 3);
          break;
        case '3-5':
          filtered = filtered.filter(pkg => pkg.experience > 3 && pkg.experience <= 5);
          break;
        case '5-10':
          filtered = filtered.filter(pkg => pkg.experience > 5 && pkg.experience <= 10);
          break;
        case '10+':
          filtered = filtered.filter(pkg => pkg.experience > 10);
          break;
      }
    }
    
    setFilteredPackages(filtered);
  };
  
  // Reset all filters
  const handleReset = () => {
    setSearchedText('');
    setPriceFilter('');
    setServiceFilter('');
    setExpFilter('');
    setFilteredPackages(packages);
  };
  
  // Book a service
  const handleBooking = (e: React.FormEvent<HTMLFormElement>, packageId: number, professionalId: number) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const date = formData.get('date') as string;
    const time = formData.get('time') as string;
    
    if (!date || !time) {
      toast({
        title: "Error",
        description: "Please select both date and time",
        variant: "destructive"
      });
      return;
    }
    
    // Here you would normally send a request to your backend
    console.log(`Booking service: Package ID ${packageId}, Professional ID ${professionalId}, Date: ${date}, Time: ${time}`);
    
    toast({
      title: "Booking Successful",
      description: `Your service has been booked for ${format(new Date(date), 'PPP')} at ${time}`,
      variant: "default"
    });
    
    // Reset the form
    e.currentTarget.reset();
  };
  
  useEffect(() => {
    // Initialize animations for elements
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.animate-on-scroll').forEach(element => {
      observer.observe(element);
    });
    
    return () => observer.disconnect();
  }, []);
  
  // Apply filters when any filter changes
  useEffect(() => {
    applyFilters();
  }, [searchedText, priceFilter, serviceFilter, expFilter]);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-1">
        <div className="search-container">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Find Professional Services</h1>
            <p className="text-muted-foreground">
              Discover and book qualified service providers for your needs
            </p>
          </div>
          
          {/* Search Bar */}
          <div className="search-bar">
            <form onSubmit={handleSearch} className="search-form">
              <div className="flex items-center flex-1 relative">
                <Search className="absolute left-3 h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  value={searchedText}
                  onChange={(e) => setSearchedText(e.target.value)}
                  placeholder="Search for services, professionals..."
                  className="search-input pl-10"
                />
              </div>
              
              <div className="flex items-center gap-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="filter-button"
                  onClick={() => setIsFiltersVisible(!isFiltersVisible)}
                >
                  <Filter className="h-4 w-4" />
                  <span className="hidden sm:inline">Filters</span>
                </Button>
                
                <Button type="submit" className="search-button">
                  <Search className="h-4 w-4" />
                  <span className="hidden sm:inline">Search</span>
                </Button>
              </div>
            </form>
            
            {/* Filters */}
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isFiltersVisible ? 'max-h-48' : 'max-h-0'}`}>
              <div className="p-3 border-t border-border/40 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-medium mb-1 block text-muted-foreground">Price Range</label>
                  <select
                    value={priceFilter}
                    onChange={(e) => setPriceFilter(e.target.value)}
                    className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  >
                    <option value="">All Prices</option>
                    <option value="500">₹0 - ₹500</option>
                    <option value="1000">₹500 - ₹1000</option>
                    <option value="1500">₹1000 - ₹1500</option>
                    <option value="max">₹1500+</option>
                  </select>
                </div>
                
                <div>
                  <label className="text-xs font-medium mb-1 block text-muted-foreground">Service Category</label>
                  <select
                    value={serviceFilter}
                    onChange={(e) => setServiceFilter(e.target.value)}
                    className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  >
                    <option value="">All Services</option>
                    {services.map(service => (
                      <option key={service.id} value={service.name}>{service.name}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="text-xs font-medium mb-1 block text-muted-foreground">Experience Level</label>
                  <select
                    value={expFilter}
                    onChange={(e) => setExpFilter(e.target.value)}
                    className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  >
                    <option value="">Any Experience</option>
                    <option value="0-1">0-1 years</option>
                    <option value="1-3">1-3 years</option>
                    <option value="3-5">3-5 years</option>
                    <option value="5-10">5-10 years</option>
                    <option value="10+">10+ years</option>
                  </select>
                </div>
              </div>
              
              <div className="p-3 border-t border-border/40 flex justify-end">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleReset}
                  className="text-sm"
                >
                  <X className="h-4 w-4 mr-1" />
                  Reset Filters
                </Button>
              </div>
            </div>
          </div>
          
          {/* Active Filters */}
          {(searchedText || priceFilter || serviceFilter || expFilter) && (
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-sm text-muted-foreground">Active filters:</span>
              {searchedText && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Search: {searchedText}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => setSearchedText('')} />
                </Badge>
              )}
              {priceFilter && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Price: {
                    priceFilter === '500' ? '₹0 - ₹500' :
                    priceFilter === '1000' ? '₹500 - ₹1000' :
                    priceFilter === '1500' ? '₹1000 - ₹1500' : '₹1500+'
                  }
                  <X className="h-3 w-3 cursor-pointer" onClick={() => setPriceFilter('')} />
                </Badge>
              )}
              {serviceFilter && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Service: {serviceFilter}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => setServiceFilter('')} />
                </Badge>
              )}
              {expFilter && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Experience: {expFilter}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => setExpFilter('')} />
                </Badge>
              )}
            </div>
          )}
          
          {/* Results Count */}
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">
              Showing {filteredPackages.length} results
            </p>
          </div>
          
          {/* Results Table */}
          <div className="results-table animate-on-scroll">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="table-header rounded-tl-2xl">ID</th>
                    <th className="table-header">Service</th>
                    <th className="table-header">Package</th>
                    <th className="table-header">Professional</th>
                    <th className="table-header">Experience</th>
                    <th className="table-header">Price</th>
                    <th className="table-header">Phone</th>
                    <th className="table-header rounded-tr-2xl">Booking</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPackages.length > 0 ? (
                    filteredPackages.map((pkg) => (
                      <tr key={pkg.package_id} className="table-row animate-on-scroll">
                        <td className="table-cell">{pkg.package_id}</td>
                        <td className="table-cell">
                          <Badge variant="outline">{pkg.service_name}</Badge>
                        </td>
                        <td className="table-cell font-medium">{pkg.name}</td>
                        <td className="table-cell">{pkg.professional_name}</td>
                        <td className="table-cell">{pkg.experience} yrs</td>
                        <td className="table-cell font-medium">₹{pkg.price.toFixed(0)}</td>
                        <td className="table-cell">{pkg.phone}</td>
                        <td className="booking-cell">
                          <form 
                            onSubmit={(e) => handleBooking(e, pkg.package_id, pkg.professional_id)}
                            className="flex flex-col sm:flex-row gap-2 w-full"
                          >
                            <div className="flex items-center gap-1 bg-muted/40 rounded-lg px-2 py-1">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <input
                                type="time"
                                name="time"
                                required
                                className="bg-transparent border-none outline-none text-sm w-20"
                              />
                            </div>
                            <div className="flex items-center gap-1 bg-muted/40 rounded-lg px-2 py-1">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <input
                                type="date"
                                name="date"
                                required
                                className="bg-transparent border-none outline-none text-sm w-28"
                              />
                            </div>
                            <Button type="submit" className="book-button">
                              <span>Book</span>
                              <ArrowRight className="h-3 w-3 ml-1" />
                            </Button>
                          </form>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8} className="py-10 text-center text-muted-foreground">
                        No results found. Please try different search criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SearchPage;
