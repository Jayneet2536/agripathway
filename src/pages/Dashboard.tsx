
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, Plus, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import { DealerWithCrops, CROP_OPTIONS } from '@/types';
import Navbar from '@/components/Navbar';
import DealerCard from '@/components/DealerCard';
import PageTransition from '@/components/PageTransition';

// Sample data for demonstration
const SAMPLE_DEALERS: DealerWithCrops[] = [
  {
    id: '1',
    name: 'Raj Agricultural Supplies',
    email: 'raj@example.com',
    contact: '+91 9876543210',
    location: 'Mumbai, Maharashtra',
    createdAt: new Date().toISOString(),
    crops: [
      {
        id: '101',
        name: 'rice',
        price: 2800,
        unit: 'quintal',
        quantity: 50,
        description: 'Premium Basmati Rice',
        dealerId: '1',
        createdAt: new Date().toISOString()
      },
      {
        id: '102',
        name: 'wheat',
        price: 2200,
        unit: 'quintal',
        quantity: 75,
        description: 'High quality wheat',
        dealerId: '1',
        createdAt: new Date().toISOString()
      }
    ]
  },
  {
    id: '2',
    name: 'Punjab Organics',
    email: 'punjaborganics@example.com',
    contact: '+91 9876123456',
    location: 'Amritsar, Punjab',
    createdAt: new Date().toISOString(),
    crops: [
      {
        id: '201',
        name: 'wheat',
        price: 2100,
        unit: 'quintal',
        quantity: 100,
        description: 'Organic wheat',
        dealerId: '2',
        createdAt: new Date().toISOString()
      },
      {
        id: '202',
        name: 'potato',
        price: 1800,
        unit: 'quintal',
        quantity: 80,
        description: 'Fresh potatoes',
        dealerId: '2',
        createdAt: new Date().toISOString()
      },
      {
        id: '203',
        name: 'onion',
        price: 2500,
        unit: 'quintal',
        quantity: 60,
        description: 'Red onions',
        dealerId: '2',
        createdAt: new Date().toISOString()
      }
    ]
  },
  {
    id: '3',
    name: 'South India Traders',
    email: 'south@example.com',
    contact: '+91 8765432109',
    location: 'Chennai, Tamil Nadu',
    createdAt: new Date().toISOString(),
    crops: [
      {
        id: '301',
        name: 'rice',
        price: 3000,
        unit: 'quintal',
        quantity: 120,
        description: 'Premium South Indian rice',
        dealerId: '3',
        createdAt: new Date().toISOString()
      },
      {
        id: '302',
        name: 'tea',
        price: 35000,
        unit: 'quintal',
        quantity: 15,
        description: 'High quality tea leaves',
        dealerId: '3',
        createdAt: new Date().toISOString()
      }
    ]
  }
];

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCrop, setSelectedCrop] = useState<string>('');
  const [dealers, setDealers] = useState<DealerWithCrops[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem('agropath_user');
    if (!user) {
      toast.error('You must be logged in to view this page');
      navigate('/login');
      return;
    }
    
    // Fetch dealers data
    const fetchDealers = async () => {
      try {
        // This will be replaced with Supabase query
        // For now, use sample data with a delay to simulate loading
        setTimeout(() => {
          setDealers(SAMPLE_DEALERS);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching dealers:', error);
        toast.error('Failed to load dealer data');
        setIsLoading(false);
      }
    };

    fetchDealers();
  }, [navigate]);

  const handleRefresh = () => {
    setIsLoading(true);
    // Simulate refresh
    setTimeout(() => {
      setDealers(SAMPLE_DEALERS);
      setIsLoading(false);
      toast.success('Data refreshed successfully');
    }, 1000);
  };

  const filteredDealers = dealers.filter(dealer => {
    const matchesSearch = 
      dealer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      dealer.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCrop = selectedCrop 
      ? dealer.crops.some(crop => crop.name === selectedCrop)
      : true;
    
    return matchesSearch && matchesCrop;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <PageTransition>
        <div className="pt-24 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Dealer Listings</h1>
                <p className="mt-1 text-gray-500">Browse and connect with agricultural dealers</p>
              </div>
              
              <div className="mt-4 md:mt-0 flex space-x-3">
                <button 
                  onClick={handleRefresh}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  disabled={isLoading}
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </button>
                
                <button 
                  onClick={() => navigate('/add-listing')}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-agro-600 hover:bg-agro-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Listing
                </button>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                <div className="flex-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search by dealer name or location"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 input-field"
                  />
                </div>
                
                <div className="md:w-64 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Filter className="h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    value={selectedCrop}
                    onChange={(e) => setSelectedCrop(e.target.value)}
                    className="pl-10 input-field appearance-none"
                  >
                    <option value="">All Crops</option>
                    {CROP_OPTIONS.map(crop => (
                      <option key={crop.value} value={crop.value}>
                        {crop.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            
            {isLoading ? (
              <div className="flex justify-center items-center py-16">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-agro-600"></div>
              </div>
            ) : filteredDealers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDealers.map((dealer) => (
                  <DealerCard key={dealer.id} dealer={dealer} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <h3 className="text-lg font-medium text-gray-900 mb-2">No dealers found</h3>
                <p className="text-gray-500">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>
        </div>
      </PageTransition>
    </div>
  );
};

export default Dashboard;
