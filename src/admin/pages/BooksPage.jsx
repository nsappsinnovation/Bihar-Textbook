import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Plus, Filter, LayoutGrid, List, Edit3, Trash2, Eye, Download,
  ChevronDown, BookOpen, X,
} from 'lucide-react';
import Modal, { FormInput, ToggleSwitch } from '../components/Modal';
import { books, classOptions, subjectOptions } from '../data/dummyData';
import { useDebounce } from '../hooks/useCustomHooks';

// Status badge styles
const statusStyles = {
  Published: 'bg-emerald-50 text-emerald-600 border-emerald-200',
  Draft: 'bg-gray-100 text-gray-600 border-gray-200',
  'Under Review': 'bg-amber-50 text-amber-600 border-amber-200',
};

/**
 * Books Management Page
 * Full CRUD interface with search, filters, table/grid toggle, and add modal
 */
export default function BooksPage({ addToast }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClass, setSelectedClass] = useState('All Classes');
  const [selectedSubject, setSelectedSubject] = useState('All Subjects');
  const [viewMode, setViewMode] = useState('table');
  const [showAddModal, setShowAddModal] = useState(false);
  const [bookStatus, setBookStatus] = useState(true);

  const debouncedSearch = useDebounce(searchQuery);

  // Filtered books
  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const matchesSearch = book.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        book.subject.toLowerCase().includes(debouncedSearch.toLowerCase());
      const matchesClass = selectedClass === 'All Classes' || book.class === selectedClass;
      const matchesSubject = selectedSubject === 'All Subjects' || book.subject === selectedSubject;
      return matchesSearch && matchesClass && matchesSubject;
    });
  }, [debouncedSearch, selectedClass, selectedSubject]);

  const handleAction = (action, bookName) => {
    addToast(`${action}: ${bookName}`, action === 'Deleted' ? 'error' : 'success');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Books Management</h1>
          <p className="text-sm text-gray-500 mt-0.5">Manage all textbooks in the system</p>
        </div>
        <motion.button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-primary text-white text-sm font-semibold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-shadow"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          id="add-book-btn"
        >
          <Plus className="w-4 h-4" />
          Add Book
        </motion.button>
      </div>

      {/* Filters Bar */}
      <div className="bg-white rounded-2xl p-4 shadow-card border border-gray-100/50 mb-6">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search books by name or subject..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 transition-all"
              id="search-books"
            />
          </div>

          {/* Class Filter */}
          <div className="relative">
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="appearance-none w-full lg:w-40 px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 transition-all pr-10"
              id="filter-class"
            >
              {classOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>

          {/* Subject Filter */}
          <div className="relative">
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="appearance-none w-full lg:w-40 px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 transition-all pr-10"
              id="filter-subject"
            >
              {subjectOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>

          {/* View Toggle */}
          <div className="flex items-center bg-gray-100 rounded-xl p-1 gap-0.5">
            <button
              onClick={() => setViewMode('table')}
              className={`p-2 rounded-lg transition-all ${viewMode === 'table' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              aria-label="Table view"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              aria-label="Grid view"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <p className="text-sm text-gray-500 mb-4">
        Showing <span className="font-semibold text-gray-700">{filteredBooks.length}</span> of {books.length} books
      </p>

      {/* Table View */}
      <AnimatePresence mode="wait">
        {viewMode === 'table' ? (
          <motion.div
            key="table"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-white rounded-2xl shadow-card border border-gray-100/50 overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px]">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">Book</th>
                    <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-4">Class</th>
                    <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-4">Subject</th>
                    <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-4">Upload Date</th>
                    <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-4">Status</th>
                    <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBooks.map((book, index) => (
                    <motion.tr
                      key={book.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.03 }}
                      className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors group"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center text-lg border border-blue-100/50">
                            {book.cover}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-800">{book.name}</p>
                            <p className="text-xs text-gray-400 truncate max-w-[200px]">{book.description}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="text-sm text-gray-600">{book.class}</span>
                      </td>
                      <td className="px-4 py-4">
                        <span className="text-sm text-gray-600">{book.subject}</span>
                      </td>
                      <td className="px-4 py-4">
                        <span className="text-sm text-gray-500">
                          {new Date(book.uploadDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${statusStyles[book.status]}`}>
                          {book.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => handleAction('Previewing', book.name)}
                            className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 hover:bg-blue-100 transition-colors"
                            title="Preview"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleAction('Editing', book.name)}
                            className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600 hover:bg-amber-100 transition-colors"
                            title="Edit"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleAction('Downloading', book.name)}
                            className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center text-green-600 hover:bg-green-100 transition-colors"
                            title="Download"
                          >
                            <Download className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleAction('Deleted', book.name)}
                            className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-red-500 hover:bg-red-100 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredBooks.length === 0 && (
              <div className="py-16 text-center">
                <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-sm font-medium text-gray-500">No books found</p>
                <p className="text-xs text-gray-400 mt-1">Try adjusting your search or filters</p>
              </div>
            )}
          </motion.div>
        ) : (
          /* Grid View */
          <motion.div
            key="grid"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
          >
            {filteredBooks.map((book, index) => (
              <motion.div
                key={book.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl shadow-card hover:shadow-card-hover border border-gray-100/50 overflow-hidden group transition-all duration-300"
              >
                {/* Cover */}
                <div className="h-36 bg-gradient-to-br from-blue-50 via-indigo-50 to-cyan-50 flex items-center justify-center text-5xl relative">
                  {book.cover}
                  <div className="absolute top-3 right-3">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${statusStyles[book.status]}`}>
                      {book.status}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-4">
                  <h4 className="text-sm font-bold text-gray-800 mb-1 truncate">{book.name}</h4>
                  <p className="text-xs text-gray-500 mb-3">{book.class} • {book.subject}</p>
                  <p className="text-xs text-gray-400 line-clamp-2 mb-4">{book.description}</p>

                  {/* Actions */}
                  <div className="flex items-center gap-1 pt-3 border-t border-gray-100">
                    <button
                      onClick={() => handleAction('Previewing', book.name)}
                      className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-xs text-blue-600 hover:bg-blue-50 transition-colors font-medium"
                    >
                      <Eye className="w-3 h-3" />
                      View
                    </button>
                    <button
                      onClick={() => handleAction('Editing', book.name)}
                      className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-xs text-amber-600 hover:bg-amber-50 transition-colors font-medium"
                    >
                      <Edit3 className="w-3 h-3" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleAction('Deleted', book.name)}
                      className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-xs text-red-500 hover:bg-red-50 transition-colors font-medium"
                    >
                      <Trash2 className="w-3 h-3" />
                      Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}

            {filteredBooks.length === 0 && (
              <div className="col-span-full py-16 text-center">
                <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-sm font-medium text-gray-500">No books found</p>
                <p className="text-xs text-gray-400 mt-1">Try adjusting your search or filters</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Book Modal */}
      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="Add New Book" size="lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
          <FormInput label="Book Name" placeholder="Enter book name" required id="book-name" />
          <FormInput label="Class" type="text" placeholder="e.g., Class 10" required id="book-class" />
          <FormInput label="Subject" type="text" placeholder="e.g., Mathematics" required id="book-subject" />
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Status</label>
            <ToggleSwitch label={bookStatus ? 'Published' : 'Draft'} checked={bookStatus} onChange={setBookStatus} id="book-status-toggle" />
          </div>
        </div>
        <FormInput label="Description" type="textarea" placeholder="Enter book description..." id="book-description" />
        <FormInput label="Upload PDF" type="file" id="book-pdf" />
        <FormInput label="Upload Cover Image" type="file" id="book-cover" />

        <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-gray-100">
          <button
            onClick={() => setShowAddModal(false)}
            className="px-5 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <motion.button
            onClick={() => {
              setShowAddModal(false);
              addToast('Book added successfully!', 'success');
            }}
            className="px-5 py-2.5 rounded-xl gradient-primary text-white text-sm font-semibold shadow-lg shadow-blue-500/20"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Add Book
          </motion.button>
        </div>
      </Modal>
    </motion.div>
  );
}
