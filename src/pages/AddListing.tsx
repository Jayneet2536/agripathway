
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Minus, Leaf, Save } from 'lucide-react';
import { toast } from 'sonner';
import { CROP_OPTIONS } from '@/types';
import Navbar from '@/components/Navbar';
import PageTransition from '@/components/PageTransition';

interface CropInput {
  id: string;
  name: string;
  price: string;
  unit: string;
  quantity: string;
  description: string;
}

const AddListing = () => {
  const [dealerName, setDealerName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [location, setLocation] = useState('');
  const [crops, setCrops] = useState<CropInput[]>([
    { 
      id: '1', 
      name: '', 
      price: '', 
      unit: 'quintal', 
      quantity: '', 
      description: '' 
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is logged in
    const userString = localStorage.getItem('agropath_user');
    if (!userString) {
      toast.error('You must be logged in to add a listing');
      navigate('/login');
      return;
    }
    
    const user = JSON.parse(userString);
    if (user.email) {
      setEmail(user.email);
    }
    if (user.name) {
      setDealerName(user.name);
    }
  }, [navigate]);

  const handleAddCrop = () => {
    setCrops([
      ...crops, 
      { 
        id: String(crops.length + 1), 
        name: '', 
        price: '', 
        unit: 'quintal', 
        quantity: '', 
        description: '' 
      }
    ]);
  };

  const handleRemoveCrop = (id: string) => {
    if (crops.length === 1) {
      toast.error('You must have at least one crop');
      return;
    }
    setCrops(crops.filter(crop => crop.id !== id));
  };

  const handleCropChange = (id: string, field: keyof CropInput, value: string) => {
    setCrops(crops.map(crop => {
      if (crop.id === id) {
        return { ...crop, [field]: value };
      }
      return crop;
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate inputs
    if (!dealerName || !email || !contact || !location) {
      toast.error('Please fill in all dealer information fields');
      return;
    }
    
    // Validate crops
    const invalidCrop = crops.find(crop => !crop.name || !crop.price || !crop.quantity);
    if (invalidCrop) {
      toast.error('Please fill in all crop details');
      return;
    }
    
    setIsLoading(true);

    try {
      // This will be replaced with actual Supabase data insertion
      // For now, simulate with a delay
      setTimeout(() => {
        toast.success('Listing added successfully');
        setIsLoading(false);
        navigate('/dashboard');
      }, 1500);
    } catch (error) {
      console.error('Error adding listing:', error);
      toast.error('Failed to add listing. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <PageTransition>
        <div className="pt-24 pb-12">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Add New Listing</h1>
              <p className="mt-1 text-gray-500">Create a new dealer listing with your crop details</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-soft p-6 md:p-8">
              <form onSubmit={handleSubmit}>
                <div className="space-y-8">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Dealer Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="dealerName" className="block text-sm font-medium text-gray-700 mb-1">
                          Dealer Name *
                        </label>
                        <input
                          id="dealerName"
                          type="text"
                          required
                          value={dealerName}
                          onChange={(e) => setDealerName(e.target.value)}
                          className="input-field"
                          placeholder="Your business name"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address *
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
                        <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-1">
                          Contact Number *
                        </label>
                        <input
                          id="contact"
                          type="tel"
                          required
                          value={contact}
                          onChange={(e) => setContact(e.target.value)}
                          className="input-field"
                          placeholder="+91 9876543210"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                          Location *
                        </label>
                        <input
                          id="location"
                          type="text"
                          required
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          className="input-field"
                          placeholder="City, State"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-semibold text-gray-900">Crop Details</h2>
                      <button
                        type="button"
                        onClick={handleAddCrop}
                        className="inline-flex items-center px-3 py-1 border border-transparent rounded-md text-sm font-medium text-white bg-agro-600 hover:bg-agro-700"
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Add Crop
                      </button>
                    </div>
                    
                    <div className="space-y-6">
                      {crops.map((crop, index) => (
                        <motion.div
                          key={crop.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-4 border border-gray-200 rounded-lg bg-gray-50 relative"
                        >
                          <button
                            type="button"
                            onClick={() => handleRemoveCrop(crop.id)}
                            className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          
                          <h3 className="font-medium text-gray-700 mb-3">Crop #{index + 1}</h3>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label htmlFor={`crop-name-${crop.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                                Crop Type *
                              </label>
                              <select
                                id={`crop-name-${crop.id}`}
                                value={crop.name}
                                onChange={(e) => handleCropChange(crop.id, 'name', e.target.value)}
                                required
                                className="input-field"
                              >
                                <option value="">Select a crop</option>
                                {CROP_OPTIONS.map(option => (
                                  <option key={option.value} value={option.value}>
                                    {option.label}
                                  </option>
                                ))}
                              </select>
                            </div>
                            
                            <div>
                              <label htmlFor={`crop-price-${crop.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                                Price (₹) *
                              </label>
                              <input
                                id={`crop-price-${crop.id}`}
                                type="number"
                                min="0"
                                required
                                value={crop.price}
                                onChange={(e) => handleCropChange(crop.id, 'price', e.target.value)}
                                className="input-field"
                                placeholder="2000"
                              />
                            </div>
                            
                            <div>
                              <label htmlFor={`crop-unit-${crop.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                                Unit *
                              </label>
                              <select
                                id={`crop-unit-${crop.id}`}
                                value={crop.unit}
                                onChange={(e) => handleCropChange(crop.id, 'unit', e.target.value)}
                                required
                                className="input-field"
                              >
                                <option value="quintal">Quintal</option>
                                <option value="kg">Kilogram</option>
                                <option value="ton">Ton</option>
                              </select>
                            </div>
                            
                            <div>
                              <label htmlFor={`crop-quantity-${crop.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                                Quantity Available *
                              </label>
                              <input
                                id={`crop-quantity-${crop.id}`}
                                type="number"
                                min="1"
                                required
                                value={crop.quantity}
                                onChange={(e) => handleCropChange(crop.id, 'quantity', e.target.value)}
                                className="input-field"
                                placeholder="100"
                              />
                            </div>
                            
                            <div className="md:col-span-2">
                              <label htmlFor={`crop-description-${crop.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                                Description
                              </label>
                              <textarea
                                id={`crop-description-${crop.id}`}
                                value={crop.description}
                                onChange={(e) => handleCropChange(crop.id, 'description', e.target.value)}
                                className="input-field min-h-[80px]"
                                placeholder="Additional details about the crop"
                              />
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="pt-4">
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
                          <Save className="h-5 w-5 mr-2" />
                          Save Listing
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </PageTransition>
    </div>
  );
};

export default AddListing;
