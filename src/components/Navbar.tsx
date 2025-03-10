
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Leaf, Menu, X, LogOut } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<any>(null);
  const location = useLocation();
  const queryClient = useQueryClient();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // This is where we would check if user is logged in with Supabase
  useEffect(() => {
    const checkUser = async () => {
      try {
        // This will be replaced with actual Supabase authentication
        const localUser = localStorage.getItem('agropath_user');
        if (localUser) {
          setUser(JSON.parse(localUser));
        }
      } catch (error) {
        console.error('Error checking user:', error);
      }
    };

    checkUser();
  }, []);

  const handleLogout = async () => {
    try {
      // This will be replaced with actual Supabase logout
      localStorage.removeItem('agropath_user');
      setUser(null);
      queryClient.clear();
      toast.success('Logged out successfully');
      window.location.href = '/';
    } catch (error) {
      console.error('Error logging out:', error);
      toast.error('Error logging out');
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Add Listing', path: '/add-listing' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link to="/" className="flex items-center">
              <span className="sr-only">Agropath</span>
              <motion.div 
                whileHover={{ rotate: 15 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                <Leaf className="h-8 w-8 text-agro-500" />
              </motion.div>
              <span className="ml-2 text-xl font-bold text-agro-800">Agropath</span>
            </Link>
          </div>
          
          <div className="-mr-2 -my-2 md:hidden">
            <button
              type="button"
              className="rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open menu</span>
              {isMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
          
          <nav className="hidden md:flex space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-base font-medium transition-colors relative group ${
                  location.pathname === link.path
                    ? 'text-agro-600'
                    : 'text-gray-700 hover:text-agro-500'
                }`}
              >
                {link.name}
                {location.pathname === link.path && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-agro-500 rounded-full" />
                )}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-agro-500 rounded-full transition-all group-hover:w-full" />
              </Link>
            ))}
          </nav>
          
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-700">
                  {user.name || user.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-agro-500 hover:bg-agro-600"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="whitespace-nowrap text-base font-medium text-gray-700 hover:text-agro-500"
                >
                  Sign in
                </Link>
                <Link
                  to="/signup"
                  className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-agro-500 hover:bg-agro-600"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`${
          isMenuOpen ? 'fixed inset-0 z-40 overflow-y-auto' : 'hidden'
        } md:hidden`}
      >
        <div className="fixed inset-0 bg-black bg-opacity-25" onClick={() => setIsMenuOpen(false)} />
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-xl p-6 overflow-y-auto"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Leaf className="h-8 w-8 text-agro-500" />
              <span className="ml-2 text-xl font-bold text-agro-800">Agropath</span>
            </div>
            <button
              type="button"
              className="rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    location.pathname === link.path
                      ? 'bg-agro-50 text-agro-600'
                      : 'text-gray-700 hover:bg-agro-50 hover:text-agro-500'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <div className="pt-4 border-t border-gray-200">
              {user ? (
                <div className="space-y-4 px-2">
                  <div className="text-base font-medium text-gray-700">
                    {user.name || user.email}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-agro-500 hover:bg-agro-600"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <Link
                    to="/login"
                    className="block w-full px-5 py-3 text-center font-medium text-agro-600 bg-gray-50 hover:bg-gray-100 rounded-md"
                  >
                    Sign in
                  </Link>
                  <Link
                    to="/signup"
                    className="block w-full px-5 py-3 text-center font-medium text-white bg-agro-500 hover:bg-agro-600 rounded-md"
                  >
                    Sign up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </header>
  );
};

export default Navbar;
