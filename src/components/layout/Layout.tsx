import { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import AddBeanModal from '../AddBeanModal';

function Layout() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  return (
    <>
      <header className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h2 className="text-2xl font-bold">
            <Link to="/" className="hover:underline">
              Brew Notes
            </Link>
          </h2>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link to="/" className="hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <button 
                  onClick={() => setIsAddModalOpen(true)} 
                  className="hover:underline text-white bg-transparent border-none cursor-pointer"
                >
                  Add Bean
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="bg-gray-800 text-white p-4 mt-8">
        <div className="container mx-auto text-center">
          <p>Brew Notes - Track your coffee journey</p>
        </div>
      </footer>

      <AddBeanModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onBeanAdded={() => {}}
      />
    </>
  );
}

export default Layout;
