import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import DashboardPage from './pages/DashboardPage';
import BooksPage from './pages/BooksPage';
import OfficersPage from './pages/OfficersPage';
import NoticesPage from './pages/NoticesPage';
import MessagesPage from './pages/MessagesPage';
import DepartmentsPage from './pages/DepartmentsPage';
import UsersPage from './pages/UsersPage';
import ReportsPage from './pages/ReportsPage';
import SettingsPage from './pages/SettingsPage';
import ToastContainer from './components/ToastContainer';
import { useToast } from './hooks/useCustomHooks';

function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { toasts, addToast, removeToast } = useToast();

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <DashboardPage addToast={addToast} />;
      case 'books':
        return <BooksPage addToast={addToast} />;
      case 'officers':
        return <OfficersPage addToast={addToast} />;
      case 'notices':
        return <NoticesPage addToast={addToast} />;
      case 'messages':
        return <MessagesPage addToast={addToast} />;
      case 'departments':
        return <DepartmentsPage addToast={addToast} />;
      case 'users':
        return <UsersPage addToast={addToast} />;
      case 'reports':
        return <ReportsPage addToast={addToast} />;
      case 'settings':
        return <SettingsPage addToast={addToast} />;
      default:
        return <DashboardPage addToast={addToast} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-gray-800 overflow-x-hidden flex">
      {/* Sidebar */}
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        isMobileOpen={isMobileMenuOpen}
        setIsMobileOpen={setIsMobileMenuOpen}
      />

      {/* Main Content Area */}
      <div className="flex-1 lg:ml-64 min-h-screen transition-all duration-300 ease-in-out p-4 md:p-6 bg-[#F8FAFC]">
        {/* The Card Container */}
        <div className="flex flex-col min-h-[calc(100vh-3rem)] bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
          {/* Navbar inside the card */}
          <Navbar 
            isMobileOpen={isMobileMenuOpen} 
            setIsMobileOpen={setIsMobileMenuOpen}
            activePage={activePage}
          />

          {/* Page Content inside the card */}
          <main className="flex-1 p-6 md:p-8 overflow-y-auto overflow-x-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePage}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="max-w-[1250px] mx-auto"
              >
                {renderPage()}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
}

export default App;
