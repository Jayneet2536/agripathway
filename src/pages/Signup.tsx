
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Leaf, UserPlus } from 'lucide-react';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import PageTransition from '@/components/PageTransition';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isDealer, setIsDealer] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    setIsLoading(true);

    try {
      // This will be replaced with actual Supabase authentication
      // For now, let's simulate a signup
      if (name && email && password) {
        // Store in localStorage for demo purposes
        localStorage.setItem('agropath_user', JSON.stringify({
          id: '123',
          email,
          name,
          isDealer
        }));
        
        toast.success('Account created successfully');
        navigate('/dashboard');
      } else {
        toast.error('Please fill in all required fields');
      }
    } catch (error) {
      console.error('Signup error:', error);
      toast.error('Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-agro-50/30">
      <Navbar />
      <PageTransition>
        <div className="pt-32 pb-12">
          <div className="max-w-md mx-auto p-6 sm:p-8 bg-white rounded-xl shadow-soft">
            <div className="flex justify-center mb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 260, 
                  damping: 20 
                }}
                className="h-16 w-16 rounded-full bg-agro-100 flex items-center justify-center"
              >
                <Leaf className="h-8 w-8 text-agro-600" />
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">Create an account</h2>
              <p className="text-center text-gray-500 mb-6">Join Agropath and connect with agricultural dealers</p>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input-field"
                    placeholder="John Doe"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-field"
                    placeholder="you@example.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="input-field pr-10"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="input-field"
                    placeholder="••••••••"
                  />
                </div>
                
                <div className="flex items-center">
                  <input
                    id="is-dealer"
                    name="is-dealer"
                    type="checkbox"
                    checked={isDealer}
                    onChange={(e) => setIsDealer(e.target.checked)}
                    className="h-4 w-4 text-agro-600 focus:ring-agro-500 border-gray-300 rounded"
                  />
                  <label htmlFor="is-dealer" className="ml-2 block text-sm text-gray-700">
                    Register as a dealer
                  </label>
                </div>
                
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full btn-primary flex justify-center items-center py-3"
                  >
                    {isLoading ? (
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : (
                      <>
                        <UserPlus className="h-5 w-5 mr-2" />
                        Create Account
                      </>
                    )}
                  </button>
                </div>
              </form>
              
              <div className="mt-4 text-center text-sm">
                <span className="text-gray-500">Already have an account?</span>
                <Link to="/login" className="ml-1 font-medium text-agro-600 hover:text-agro-500">
                  Sign in
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </PageTransition>
    </div>
  );
};

export default Signup;
