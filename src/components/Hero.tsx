
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Leaf, TrendingUp, Users } from 'lucide-react';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden bg-white">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-agro-50/50 to-white"></div>
        <img
          src="https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?auto=format&fit=crop&q=80&w=2000"
          alt="Forest with sunlight"
          className="h-full w-full object-cover opacity-20"
        />
      </div>
      
      <div className="relative pt-32 pb-20 sm:pt-40 sm:pb-24 lg:pb-32 z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">Connect With Agricultural</span>
                <span className="block text-agro-600">Dealers Nationwide</span>
              </h1>
              <p className="mt-6 max-w-lg mx-auto text-lg text-gray-500 sm:max-w-3xl">
                Agropath connects farmers and buyers directly with dealers, providing up-to-date crop pricing 
                and dealer information in one centralized marketplace.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-8 flex justify-center gap-x-4"
            >
              <button
                onClick={() => navigate('/dashboard')}
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-agro-600 px-5 py-3 text-base font-medium text-white hover:bg-agro-700 transition-colors"
              >
                View Listings
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button
                onClick={() => navigate('/signup')}
                className="inline-flex items-center justify-center rounded-md border border-agro-600 bg-white px-5 py-3 text-base font-medium text-agro-600 hover:bg-agro-50 transition-colors"
              >
                Become a Dealer
              </button>
            </motion.div>
          </div>
        </div>
      </div>
      
      <div className="relative z-10 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            <div className="glass-card p-6">
              <div className="h-12 w-12 rounded-md bg-agro-100 flex items-center justify-center text-agro-600 mb-4">
                <Leaf className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">Fresh Produce</h3>
              <p className="mt-2 text-base text-gray-500">
                Connect directly with dealers offering a wide variety of fresh crops at competitive prices.
              </p>
            </div>
            
            <div className="glass-card p-6">
              <div className="h-12 w-12 rounded-md bg-agro-100 flex items-center justify-center text-agro-600 mb-4">
                <TrendingUp className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">Real-time Pricing</h3>
              <p className="mt-2 text-base text-gray-500">
                Get access to up-to-date pricing information from dealers across the country.
              </p>
            </div>
            
            <div className="glass-card p-6">
              <div className="h-12 w-12 rounded-md bg-agro-100 flex items-center justify-center text-agro-600 mb-4">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">Verified Dealers</h3>
              <p className="mt-2 text-base text-gray-500">
                All dealers on our platform are verified to ensure quality and reliability.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
