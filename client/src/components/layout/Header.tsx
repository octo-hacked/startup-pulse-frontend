import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Menu, X, User } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [_, setLocation] = useLocation();
  const { token, setToken } = useAppContext();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
    setDropdownOpen(false);
    setLocation('/');
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

          <div className="hidden md:flex items-center gap-4">
            <a href="/#contact">
              <Button variant="default" className="bg-primary hover:bg-primary-dark">
                Contact Us
              </Button>
            </a>
            {!token ? (
              <>
                <Link href="/login">
                  <Button variant="outline" className="text-sm">Login</Button>
                </Link>
                <Link href="/signup">
                  <Button variant="default" className="bg-secondary hover:bg-secondary-dark text-white text-sm">
                    Sign Up
                  </Button>
                </Link>
              </>
            ) : (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={toggleDropdown}
                  className="p-2 rounded-full border hover:bg-gray-100 focus:outline-none"
                >
                  <User className="h-5 w-5 text-dark" />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50">
                    <Link
                      href="/dashboard"
                      onClick={() => {
                        setDropdownOpen(false);
                        handleNavigation('/dashboard');
                      }}
                      className="block px-4 py-2 text-sm text-dark hover:bg-gray-100"
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/subscriptions"
                      onClick={() => {
                        setDropdownOpen(false);
                        handleNavigation('/subscriptions');
                      }}
                      className="block px-4 py-2 text-sm text-dark hover:bg-gray-100"
                    >
                      Subscriptions
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
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

      <div className={`md:hidden bg-white ${mobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link href="/" onClick={() => handleNavigation("/")} className="text-dark hover:text-primary block px-3 py-2 rounded-md text-base font-medium">Home</Link>
          <a href="/#services" onClick={closeMobileMenu} className="text-dark hover:text-primary block px-3 py-2 rounded-md text-base font-medium">Services</a>
          <a href="/#about" onClick={closeMobileMenu} className="text-dark hover:text-primary block px-3 py-2 rounded-md text-base font-medium">About</a>
          <a href="/#testimonials" onClick={closeMobileMenu} className="text-dark hover:text-primary block px-3 py-2 rounded-md text-base font-medium">Testimonials</a>
          <a href="/#faq" onClick={closeMobileMenu} className="text-dark hover:text-primary block px-3 py-2 rounded-md text-base font-medium">FAQ</a>
          <a href="/#contact" onClick={closeMobileMenu} className="text-primary hover:bg-primary-dark hover:text-white block px-3 py-2 rounded-md text-base font-medium">Contact Us</a>

          {!token ? (
            <>
              <Link href="/login" onClick={closeMobileMenu} className="block px-3 py-2 text-base text-dark hover:text-primary">Login</Link>
              <Link href="/signup" onClick={closeMobileMenu} className="block px-3 py-2 text-base text-dark hover:text-primary">Sign Up</Link>
            </>
          ) : (
            <>
              <Link href="/dashboard" onClick={closeMobileMenu} className="block px-3 py-2 text-base text-dark hover:text-primary">Dashboard</Link>
              <Link href="/subscriptions" onClick={closeMobileMenu} className="block px-3 py-2 text-base text-dark hover:text-primary">Subscriptions</Link>
              <button onClick={handleLogout} className="block w-full text-left px-3 py-2 text-base text-red-600 hover:bg-gray-100">Logout</button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
