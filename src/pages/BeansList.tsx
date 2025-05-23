import React, { useState } from 'react';
import { useCoffeeBeans } from '../hooks/useCoffeeBeans';
import NoDataState from '../components/NoDataState';
import ErrorMessage from '../components/ErrorMessage';
import AddBeanModal from '../components/AddBeanModal';
import DeleteBeanModal from '../components/DeleteBeanModal';
import { Button } from '../components/ui/button';
import { Trash2 } from 'lucide-react';

const BeansList: React.FC = () => {
  const { beans, loading, error, deleteBean, refreshBeans } = useCoffeeBeans();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [beanToDelete, setBeanToDelete] = useState<{id: string, name: string} | null>(null);

  if (loading) return <div className="p-6 text-center">Loading beans...</div>;
  if (error)
    return <ErrorMessage message={`Error: ${error}`} retryAction={() => window.location.reload()} />;

  return (
    <div className="max-w-7xl mx-auto p-6 w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-brown-800">Coffee Beans</h2>
        <Button onClick={() => setIsAddModalOpen(true)}>
          Add Bean
        </Button>
      </div>

      {beans.length === 0 ? (
        <NoDataState
          message="No beans found. Start by adding your first coffee bean!"
          buttonText="Add New Bean"
          onAction={() => setIsAddModalOpen(true)}
        />
      ) : (
        <div className="space-y-6">
          {beans.map((bean) => (
            <section
              key={bean.id}
              className="bg-white rounded-lg shadow-md overflow-hidden border border-amber-100"
            >
              <div className="bg-gradient-to-r from-amber-600 to-brown-700 p-4 flex justify-between items-center">
                <h2 className="text-xl font-semibold text-white">
                  {bean.name}
                </h2>
                <div className="flex items-center space-x-3">
                  <div className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full font-semibold">
                    Rating: {bean.rating || 'N/A'}
                  </div>
                  <button 
                    onClick={() => {
                      setBeanToDelete({ id: bean.id, name: bean.name });
                      setIsDeleteModalOpen(true);
                    }}
                    className="text-white hover:text-amber-200 transition-colors"
                    style={{ background: 'none', border: 'none' }}
                    aria-label="Delete bean"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              <div className="p-5">
                <p className="text-gray-700">
                  {bean.description ||
                    'No description available for this coffee bean.'}
                </p>
              </div>
            </section>
          ))}
        </div>
      )}
      
      <AddBeanModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onBeanAdded={refreshBeans}
      />
      
      {beanToDelete && (
        <DeleteBeanModal
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setBeanToDelete(null);
          }}
          onConfirm={async () => await deleteBean(beanToDelete.id)}
          beanName={beanToDelete.name}
        />
      )}
    </div>
  );
};

export default BeansList;
