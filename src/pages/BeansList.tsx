import React from 'react';
import { useCoffeeBeans } from '../hooks/useCoffeeBeans';

const BeansList: React.FC = () => {
  const { beans, loading, error } = useCoffeeBeans();

  if (loading) return <div className="p-6 text-center">Loading beans...</div>;
  if (error)
    return <div className="p-6 text-center text-red-600">Error: {error}</div>;

  return (
    <div className="max-w-7xl mx-auto p-6 w-full">
      <h1 className="text-3xl font-bold text-brown-800 mb-6">Coffee Beans</h1>

      {beans.length === 0 ? (
        <div className="bg-amber-50 p-6 rounded-lg border border-amber-200 text-center">
          <p className="text-brown-600">
            No beans found. Start by adding your first coffee bean!
          </p>
          <button
            className="mt-4 bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700"
            onClick={() => {
              /* Add navigation to add new bean page */
            }}
          >
            Add New Bean
          </button>
        </div>
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
