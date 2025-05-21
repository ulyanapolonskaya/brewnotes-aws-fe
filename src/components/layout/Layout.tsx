import { Outlet, Link } from 'react-router-dom';

function Layout() {
  return (
    <>
      <header className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h2 className="text-2xl font-bold">Brew Notes</h2>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link to="/" className="hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/beans/new" className="hover:underline">
                  Add Bean
                </Link>
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
    </>
  );
}

export default Layout;
