import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import DashboardPage from './pages/DashboardPage';
import BooksPage from './pages/BooksPage';
import NoticesPage from './pages/NoticesPage';
import MessagesPage from './pages/MessagesPage';
import DepartmentsPage from './pages/DepartmentsPage';
import UsersPage from './pages/UsersPage';
import ReportsPage from './pages/ReportsPage';
import SettingsPage from './pages/SettingsPage';
import CollaborativeLearningPage from './pages/CollaborativeLearningPage';
import EventsManagementPage from './pages/EventsManagementPage';
import EducationExcellencePage from './pages/EducationExcellencePage';
import LeadersManagementPage from './pages/LeadersManagementPage';
import WebsiteEditorPage from './pages/WebsiteEditorPage';
import EmployeesManagementPage from './pages/EmployeesManagementPage';
import WholesalerDepotPage from './pages/WholesalerDepotPage';
import RegisterPrintersPage from './pages/RegisterPrintersPage';
import CSRPolicyPage from './pages/CSRPolicyPage';
import WebsiteManagementHub from './pages/WebsiteManagementHub';
import NotificationsPage from './pages/NotificationsPage';
import ToastContainer from './components/ToastContainer';
import { useToast } from './hooks/useCustomHooks';

function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { toasts, addToast, removeToast } = useToast();

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <DashboardPage addToast={addToast} setActivePage={setActivePage} />;
      case 'books':
        return <BooksPage addToast={addToast} />;
      case 'website-management':
        return <WebsiteManagementHub setActivePage={setActivePage} />;
      case 'notices':
        return <NoticesPage addToast={addToast} forcedCategory="Notice" />;
      case 'tenders':
        return <NoticesPage addToast={addToast} forcedCategory="Tender" />;
      case 'notifications':
        return <NotificationsPage setActivePage={setActivePage} />;
      case 'settings':
        return <SettingsPage addToast={addToast} />;
      case 'cl':
        return <EducationExcellencePage addToast={addToast} title="Latest Initiatives" storageKey="website_initiatives" />;
      case 'ev':
        return <EventsManagementPage addToast={addToast} />;
      case 'ee':
        return <LeadersManagementPage addToast={addToast} />;
      case 'csr':
        return <CSRPolicyPage addToast={addToast} />;
      case 'ku-employee':
        return <EmployeesManagementPage addToast={addToast} />;
      case 'ku-wholeseller':
        return <WholesalerDepotPage addToast={addToast} />;
      case 'ku-printers':
        return <RegisterPrintersPage addToast={addToast} />;
      default:
        // Handle Books Sub-items (Class 1-12)
        if (activePage.startsWith('book-class-')) {
          const className = `Class ${activePage.split('-').pop()}`;
          return <BooksPage addToast={addToast} forcedClass={className} />;
        }
        
        // Handle all other modules (Know Us, Gallery, Documents, etc.)
        if (activePage.startsWith('ku-') || 
            activePage.startsWith('gl-') || 
            activePage.startsWith('dc-') ||
            ['opmp', 'ku', 'gl', 'dc'].includes(activePage)) {
          return <WebsiteEditorPage module={activePage} addToast={addToast} />;
        }

        if (activePage === 'tr') {
          return <EducationExcellencePage addToast={addToast} title="Tools & Resources" storageKey="website_missions" />;
        }

        // Default to dashboard
        return <DashboardPage addToast={addToast} setActivePage={setActivePage} />;
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
      <div className="flex-1 lg:ml-64 min-h-screen transition-all duration-300 ease-in-out p-4 md:p-6 bg-[#F8FAFC] overflow-hidden">
        {/* The Card Container */}
        <div className="flex flex-col min-h-[calc(100vh-3rem)] bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
          {/* Navbar inside the card */}
          <Navbar 
            isMobileOpen={isMobileMenuOpen} 
            setIsMobileOpen={setIsMobileMenuOpen}
            activePage={activePage}
            setActivePage={setActivePage}
          />

          {/* Page Content inside the card */}
          <main className="flex-1 p-6 md:p-8 overflow-y-auto overflow-x-hidden scrollbar-hide" data-lenis-prevent="true">
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
