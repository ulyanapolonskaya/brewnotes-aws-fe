import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CoffeeIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import src from '/coffee-illustration.svg';
import AddBeanModal from '../components/AddBeanModal';

const Home = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  return (
    <div className="bg-amber-50 min-h-screen">
      <div className="container mx-auto p-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-brown-800 mb-2">Brew Notes</h1>
          <p className="text-brown-600">Your personal coffee bean collection</p>
        </div>

        {/* Hero section with call to actions */}
        <div className="mb-16 bg-gradient-to-r from-amber-700 to-brown-800 rounded-lg p-8 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-8">
              <h2 className="text-3xl font-bold mb-4">Your Coffee Journey</h2>
              <p className="text-amber-100 mb-6">
                Track your favorite beans, brewing methods, and tasting notes
                all in one place.
              </p>
              <div className="flex space-x-4">
                <Link to="/beans">
                  <Button className="bg-amber-500 hover:bg-amber-600 text-brown-900">
                    <CoffeeIcon className="mr-2 h-4 w-4" /> Browse All Beans
                  </Button>
                </Link>
                <Button 
                  className="bg-white text-brown-800 hover:bg-amber-100"
                  onClick={() => setIsAddModalOpen(true)}
                >
                  Add New Bean
                </Button>
              </div>
            </div>
            <div className="hidden md:block">
              <img
                src={src}
                alt="Coffee Beans"
                className="w-64 h-64"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          </div>
        </div>
      </div>
      
      <AddBeanModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onBeanAdded={() => {}}
      />
    </div>
  );
};

export default Home;
