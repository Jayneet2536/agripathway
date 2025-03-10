
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Leaf, TrendingUp, Users, Star, Clock, Zap } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeatureCard from '@/components/FeatureCard';

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      
      <section className="py-20 bg-agro-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-gray-900 sm:text-4xl"
            >
              Why Choose Agropath?
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="mt-4 max-w-2xl mx-auto text-lg text-gray-500"
            >
              Our platform offers a seamless connection between agricultural dealers and buyers.
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard 
              icon={<Leaf className="h-6 w-6" />}
              title="Wide Crop Selection"
              description="Access a diverse range of crops from dealers across different regions."
              delay={0.1}
            />
            <FeatureCard 
              icon={<TrendingUp className="h-6 w-6" />}
              title="Market Insights"
              description="Stay updated with the latest pricing trends and market conditions."
              delay={0.2}
            />
            <FeatureCard 
              icon={<Users className="h-6 w-6" />}
              title="Direct Communication"
              description="Connect directly with dealers for specific inquiries and negotiations."
              delay={0.3}
            />
            <FeatureCard 
              icon={<Star className="h-6 w-6" />}
              title="Verified Profiles"
              description="All dealers on our platform are verified to ensure reliability."
              delay={0.4}
            />
            <FeatureCard 
              icon={<Clock className="h-6 w-6" />}
              title="Real-time Updates"
              description="Get real-time updates on crop availability and pricing changes."
              delay={0.5}
            />
            <FeatureCard 
              icon={<Zap className="h-6 w-6" />}
              title="Efficient Transactions"
              description="Streamlined process for quick and efficient agricultural transactions."
              delay={0.6}
            />
          </div>
        </div>
      </section>
      
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="lg:w-1/2">
              <motion.h2 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-3xl font-bold text-gray-900 sm:text-4xl"
              >
                Join Our Growing Network
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="mt-4 text-lg text-gray-500"
              >
                Whether you're a dealer looking to expand your reach or a buyer searching for the best crops, 
                Agropath provides the platform you need to succeed in the agricultural marketplace.
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="mt-8"
              >
                <a 
                  href="/signup" 
                  className="inline-flex items-center justify-center rounded-md border border-transparent bg-agro-600 px-5 py-3 text-base font-medium text-white hover:bg-agro-700 transition-colors"
                >
                  Get Started Today
                </a>
              </motion.div>
            </div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mt-10 lg:mt-0 lg:w-1/2"
            >
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&q=80&w=1200"
                  alt="Forest trees"
                  className="rounded-lg shadow-xl object-cover h-[400px] w-full"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-agro-600/20 to-transparent rounded-lg" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Leaf className="h-8 w-8 text-agro-500" />
              <span className="ml-2 text-xl font-bold text-gray-900">Agropath</span>
            </div>
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Agropath. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
