import React from 'react';
import { useCoffeeBeans } from '../hooks/useCoffeeBeans';
import NoDataState from '../components/NoDataState';
import ErrorMessage from '../components/ErrorMessage';

const BeansList: React.FC = () => {
  const { beans, loading, error } = useCoffeeBeans();

  if (loading) return <div className="p-6 text-center">Loading beans...</div>;
  if (error)
    return <ErrorMessage message={`Error: ${error}`} retryAction={() => window.location.reload()} />;

  return (
    <div className="max-w-7xl mx-auto p-6 w-full">
      <h2 className="text-3xl font-bold text-brown-800 mb-6">Coffee Beans</h2>

      {beans.length === 0 ? (
        <NoDataState
          message="No beans found. Start by adding your first coffee bean!"
          buttonText="Add New Bean"
          onAction={() => {
            /* Add navigation to add new bean page */
          }}
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
                <div className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full font-semibold">
                  Rating: {bean.rating || 'N/A'}
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
    </div>
  );
};

export default BeansList;
