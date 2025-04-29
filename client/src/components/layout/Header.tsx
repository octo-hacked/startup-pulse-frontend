import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [_, setLocation] = useLocation();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleNavigation = (path: string) => {
    setLocation(path);
    closeMobileMenu();
  };

  return (
    <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" onClick={() => handleNavigation("/")} className="flex-shrink-0 flex items-center">
              <span className="text-primary font-heading font-bold text-2xl">
                Startup<span className="text-secondary">Pulse</span>
              </span>
            </Link>
            <nav className="hidden md:ml-10 md:flex md:space-x-8">
              <Link href="/" onClick={() => handleNavigation("/")} className="text-dark hover:text-primary px-3 py-2 text-sm font-medium">Home</Link>
              <a href="/#services" className="text-dark hover:text-primary px-3 py-2 text-sm font-medium">Services</a>
              <a href="/#about" className="text-dark hover:text-primary px-3 py-2 text-sm font-medium">About</a>
              <a href="/#testimonials" className="text-dark hover:text-primary px-3 py-2 text-sm font-medium">Testimonials</a>
              <a href="/#faq" className="text-dark hover:text-primary px-3 py-2 text-sm font-medium">FAQ</a>
            </nav>
          </div>
          <div className="hidden md:flex items-center">
            <a href="/#contact">
              <Button variant="default" className="bg-primary hover:bg-primary-dark">
                Contact Us
              </Button>
            </a>
          </div>
          <div className="flex items-center md:hidden">
            <button 
              type="button" 
              onClick={toggleMobileMenu}
              className="mobile-menu-button bg-white inline-flex items-center justify-center p-2 rounded-md text-dark hover:text-primary hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
              aria-expanded={mobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`md:hidden bg-white ${mobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link href="/" onClick={() => handleNavigation("/")} className="text-dark hover:text-primary block px-3 py-2 rounded-md text-base font-medium">Home</Link>
          <a href="/#services" onClick={closeMobileMenu} className="text-dark hover:text-primary block px-3 py-2 rounded-md text-base font-medium">Services</a>
          <a href="/#about" onClick={closeMobileMenu} className="text-dark hover:text-primary block px-3 py-2 rounded-md text-base font-medium">About</a>
          <a href="/#testimonials" onClick={closeMobileMenu} className="text-dark hover:text-primary block px-3 py-2 rounded-md text-base font-medium">Testimonials</a>
          <a href="/#faq" onClick={closeMobileMenu} className="text-dark hover:text-primary block px-3 py-2 rounded-md text-base font-medium">FAQ</a>
          <a href="/#contact" onClick={closeMobileMenu} className="text-primary hover:bg-primary-dark hover:text-white block px-3 py-2 rounded-md text-base font-medium">Contact Us</a>
        </div>
      </div>
    </header>
  );
};

export default Header;
