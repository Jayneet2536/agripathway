
import { useState } from 'react';
import { PhoneCall, Mail, MapPin, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { DealerWithCrops } from '@/types';

interface DealerCardProps {
  dealer: DealerWithCrops;
}

const DealerCard = ({ dealer }: DealerCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card overflow-hidden"
    >
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">{dealer.name}</h3>
            <div className="flex items-center mt-1 text-gray-500">
              <MapPin className="h-4 w-4 mr-1" />
              <span className="text-sm">{dealer.location}</span>
            </div>
          </div>
          <div className="flex space-x-2">
            <a 
              href={`tel:${dealer.contact}`} 
              className="p-2 rounded-full bg-agro-100 text-agro-600 hover:bg-agro-200 transition-colors"
              title="Call dealer"
            >
              <PhoneCall className="h-4 w-4" />
            </a>
            <a 
              href={`mailto:${dealer.email}`} 
              className="p-2 rounded-full bg-agro-100 text-agro-600 hover:bg-agro-200 transition-colors"
              title="Email dealer"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="flex justify-between items-center">
            <h4 className="font-medium text-gray-700">Available Crops</h4>
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-agro-600 hover:text-agro-700 transition-colors focus:outline-none"
            >
              {isExpanded ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </button>
          </div>
          
          <div className="grid grid-cols-2 gap-2 mt-2">
            {dealer.crops.slice(0, isExpanded ? dealer.crops.length : 2).map((crop) => (
              <div 
                key={crop.id} 
                className="px-3 py-2 bg-agro-50 rounded-lg flex justify-between items-center"
              >
                <span className="text-sm font-medium capitalize">{crop.name}</span>
                <span className="text-sm text-agro-600 font-semibold">
                  ₹{crop.price}/{crop.unit}
                </span>
              </div>
            ))}
          </div>
          
          <AnimatePresence>
            {isExpanded && dealer.crops.length > 2 && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-2 overflow-hidden"
              >
                <div className="grid grid-cols-1 gap-2">
                  {dealer.crops.slice(2).map((crop) => (
                    <div
                      key={crop.id}
                      className="px-3 py-2 bg-agro-50 rounded-lg flex justify-between items-center"
                    >
                      <div>
                        <span className="text-sm font-medium capitalize">{crop.name}</span>
                        <p className="text-xs text-gray-500">{crop.description}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-sm text-agro-600 font-semibold">
                          ₹{crop.price}/{crop.unit}
                        </span>
                        <p className="text-xs text-gray-500">Qty: {crop.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default DealerCard;
