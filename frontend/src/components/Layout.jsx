import Navbar from './Navbar';
import Sidebar from './Sidebar';

function Layout({ children }) {
  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="flex-1 bg-neutral-50 p-4">
        {children}
      </div>
    </>
  );
}

export default Layout;