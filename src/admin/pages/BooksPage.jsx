import { useState, useMemo, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Plus, Filter, LayoutGrid, List, Edit3, Trash2, Eye, Download,
  ChevronDown, BookOpen, X, Upload,
} from 'lucide-react';
import Modal, { FormInput, ToggleSwitch } from '../components/Modal';
import { useDebounce } from '../hooks/useCustomHooks';
import { getBooks, getBook, createBook, updateBook, deleteBook, saveChapters } from '../../services/bookService';
import { uploadFile } from '../../services/uploadService';
import { fileUrl, errorMessage } from '../../services/api';

const ResolvedImage = ({ src, alt, className, onError, placeholder = '/bookcover.webp' }) => (
  <img loading="lazy" decoding="async"
    src={fileUrl(src) || placeholder}
    alt={alt}
    className={className}
    onError={onError}
  />
);

// Status badge styles
const statusStyles = {
  Published: 'bg-emerald-50 text-emerald-600 border-emerald-200',
  Draft: 'bg-gray-100 text-gray-600 border-gray-200',
  'Under Review': 'bg-amber-50 text-amber-600 border-amber-200',
};

const classOptions = [
  'All Classes',
  'Class 1',
  'Class 2',
  'Class 3',
  'Class 4',
  'Class 5',
  'Class 6',
  'Class 7',
  'Class 8',
  'Class 9',
  'Class 10',
  'Class 11',
  'Class 12',
];

/**
 * Books Management Page (Live Connected to Textbooks Section)
 * Full CRUD interface with search, filters, table/grid toggle, add, edit, delete & live sync.
 */
export default function BooksPage({ addToast, forcedClass }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClass, setSelectedClass] = useState(forcedClass || 'All Classes');
  const [selectedSubject, setSelectedSubject] = useState('All Subjects');
  const [viewMode, setViewMode] = useState('table');
  const [booksList, setBooksList] = useState([]);

  // Add Book Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [addTitle, setAddTitle] = useState('');
  const [addClassId, setAddClassId] = useState('');
  const [addSubject, setAddSubject] = useState('');
  const [addAuthor, setAddAuthor] = useState('Bihar Board');
  const [addImage, setAddImage] = useState('');
  const [addDescription, setAddDescription] = useState('');
  const [addStatus, setAddStatus] = useState(true); // true = Published

  // Edit Book Modal State
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editClassId, setEditClassId] = useState('1');
  const [editSubject, setEditSubject] = useState('');
  const [editAuthor, setEditAuthor] = useState('');
  const [editImage, setEditImage] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editStatus, setEditStatus] = useState(true);
  const [chaptersList, setChaptersList] = useState([]);

  const handleAddChapterRow = () => {
    setChaptersList(prev => [
      ...prev,
      {
        id: `chap_${Date.now()}_${prev.length + 1}`,
        title: '',
        hindiTitle: '',
        pdfUrl: ''
      }
    ]);
  };

  const handleUpdateChapterRow = (index, field, value) => {
    setChaptersList(prev => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  const handleDeleteChapterRow = (index) => {
    setChaptersList(prev => prev.filter((_, idx) => idx !== index));
  };

  const handleOpenAdd = () => {
    setAddTitle('');
    setAddClassId('');
    setAddSubject('');
    setAddAuthor('Bihar Board');
    setAddImage('');
    setAddDescription('');
    setAddStatus(true);
    setChaptersList([]);
    setShowAddModal(true);
  };

  const debouncedSearch = useDebounce(searchQuery);

  const loadBooks = useCallback(() => {
    getBooks()
      .then(setBooksList)
      .catch(() => addToast('Could not load books', 'error'));
  }, [addToast]);

  useEffect(() => {
    loadBooks();
  }, [loadBooks]);

  // Dynamic subjects list from current textbooks
  const subjectOptions = useMemo(() => {
    const subjects = new Set(
      booksList.map((b) => (b.subject ? b.subject.charAt(0).toUpperCase() + b.subject.slice(1) : 'General'))
    );
    return ['All Subjects', ...Array.from(subjects)];
  }, [booksList]);

  // Filtered books
  const filteredBooks = useMemo(() => {
    return booksList.filter((book) => {
      const bookTitle = book.title || book.name || '';
      const bookSub = book.subject || '';
      const matchesSearch =
        bookTitle.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        bookSub.toLowerCase().includes(debouncedSearch.toLowerCase());
      const matchesClass = selectedClass === 'All Classes' || book.className === selectedClass;
      const formattedSubject = bookSub ? bookSub.charAt(0).toUpperCase() + bookSub.slice(1) : 'General';
      const matchesSubject = selectedSubject === 'All Subjects' || formattedSubject === selectedSubject;
      return matchesSearch && matchesClass && matchesSubject;
    });
  }, [booksList, debouncedSearch, selectedClass, selectedSubject]);

  const handleOpenEdit = async (listBook) => {
    let book;
    try {
      book = await getBook(listBook.id); // includes chapters
    } catch (error) {
      addToast(errorMessage(error, 'Could not load book'), 'error');
      return;
    }
    setEditingBook(book);
    setEditTitle(book.title || '');
    setEditClassId(String(book.classId || 1));
    setEditSubject(book.subject || 'General');
    setEditAuthor(book.author || 'Bihar Board');
    setEditImage(book.image || '/bookcover.webp');
    setEditDescription(book.description || '');
    setEditStatus(book.status !== 'Draft');
    setChaptersList(book.chapters || []);
    setShowEditModal(true);
  };

  const handleSaveAdd = async () => {
    if (!addTitle.trim()) {
      addToast('Please enter a book name', 'error');
      return;
    }
    if (!addClassId) {
      addToast('Please select a class', 'error');
      return;
    }
    if (!addSubject.trim()) {
      addToast('Please enter a subject', 'error');
      return;
    }

    try {
      const newBook = await createBook({
        title: addTitle.trim(),
        classId: addClassId,
        subject: addSubject.trim(),
        author: addAuthor.trim() || 'Bihar Board',
        image: addImage,
        description:
          addDescription.trim() ||
          `Official Bihar Board Class ${addClassId} textbook for '${addTitle}'.`,
        status: addStatus ? 'Published' : 'Draft',
      });
      await saveChapters(newBook.id, chaptersList);
    } catch (error) {
      addToast(errorMessage(error, 'Could not add textbook'), 'error');
      return;
    }
    loadBooks();
    setShowAddModal(false);
    // Reset form
    setAddTitle('');
    setAddClassId('');
    setAddSubject('');
    setAddDescription('');
    setChaptersList([]);
    addToast('New textbook added successfully!', 'success');
  };

  const handleSaveEdit = async () => {
    if (!editingBook || !editTitle.trim()) {
      addToast('Please enter a valid book title', 'error');
      return;
    }
    try {
      await updateBook(editingBook.id, {
        title: editTitle.trim(),
        classId: Number(editClassId),
        subject: editSubject.trim() || 'General',
        author: editAuthor.trim() || 'Bihar Board',
        image: editImage,
        description: editDescription.trim(),
        status: editStatus ? 'Published' : 'Draft',
      });
      await saveChapters(editingBook.id, chaptersList, editingBook.chapters);
    } catch (error) {
      addToast(errorMessage(error, 'Could not update textbook'), 'error');
      return;
    }
    loadBooks();
    setShowEditModal(false);
    addToast('Textbook updated successfully!', 'success');
  };

  const handleDelete = async (book) => {
    if (window.confirm(`Are you sure you want to delete '${book.title || book.name}'?`)) {
      try {
        await deleteBook(book.id);
        loadBooks();
        addToast(`Deleted textbook: ${book.title || book.name}`, 'error');
      } catch (error) {
        addToast(errorMessage(error, 'Could not delete textbook'), 'error');
      }
    }
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
          <p className="text-sm text-gray-500 mt-0.5">Live management for Bihar Board Class 1–12 Textbooks</p>
        </div>
        <div className="flex items-center gap-3">

          <motion.button
            onClick={handleOpenAdd}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-primary text-white text-sm font-semibold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-shadow"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            id="add-book-btn"
          >
            <Plus className="w-4 h-4" />
            Add Textbook
          </motion.button>
        </div>
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
              className="appearance-none w-full lg:w-44 px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 transition-all pr-10"
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
              className="appearance-none w-full lg:w-44 px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 transition-all pr-10"
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
        Showing <span className="font-semibold text-gray-700">{filteredBooks.length}</span> of {booksList.length} total textbooks
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
                      transition={{ delay: index * 0.02 }}
                      className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors group cursor-pointer"
                      onClick={() => handleOpenEdit(book)}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-11 h-14 rounded-lg overflow-hidden bg-blue-50 flex items-center justify-center border border-blue-100/60 shrink-0">
                            <img loading="lazy" decoding="async"
                              src={fileUrl(book.image) || '/bookcover.webp'}
                              alt={book.title}
                              className="w-full h-full object-cover"
                              onError={(e) => { e.target.src = '/bookcover.webp'; }}
                            />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-800">{book.title || book.name}</p>
                            <p className="text-xs text-gray-400 truncate max-w-[220px]">By {book.author || 'Bihar Board'}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="text-sm font-medium text-gray-600">{book.className || `Class ${book.classId}`}</span>
                      </td>
                      <td className="px-4 py-4">
                        <span className="text-sm text-gray-600 capitalize">{book.subject}</span>
                      </td>
                      <td className="px-4 py-4">
                        <span className="text-sm text-gray-500">
                          {book.uploadDate}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${statusStyles[book.status] || statusStyles.Published}`}>
                          {book.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              window.open(`/class/${book.classId}/read/${book.subject || 'General'}`, '_blank');
                            }}
                            className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 hover:bg-blue-100 transition-colors"
                            title="Preview Textbook Online"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenEdit(book);
                            }}
                            className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600 hover:bg-amber-100 transition-colors"
                            title="Edit Textbook"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(book);
                            }}
                            className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-red-500 hover:bg-red-100 transition-colors"
                            title="Delete Textbook"
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
                <p className="text-xs text-gray-400 mt-1">Try adjusting your search query or class/subject filters</p>
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
                transition={{ delay: index * 0.03 }}
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl shadow-card hover:shadow-card-hover border border-gray-100/50 overflow-hidden group transition-all duration-300 flex flex-col justify-between cursor-pointer"
                onClick={() => handleOpenEdit(book)}
              >
                {/* Cover Header */}
                <div className="h-44 bg-gradient-to-br from-blue-50/80 via-indigo-50/40 to-white flex items-center justify-center relative p-3 border-b border-gray-100/80">
                  <div className="w-24 h-36 rounded-xl overflow-hidden shadow-md border border-blue-100">
                    <ResolvedImage
                      src={book.image}
                      alt={book.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => { e.target.src = '/bookcover.webp'; }}
                      placeholder="/bookcover.webp"
                    />
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${statusStyles[book.status] || statusStyles.Published}`}>
                      {book.status}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-base font-bold text-gray-800 mb-1 line-clamp-1">{book.title || book.name}</h4>
                    <p className="text-xs font-semibold text-blue-600 mb-2">{book.className} • <span className="capitalize">{book.subject}</span></p>
                    <p className="text-xs text-gray-500 line-clamp-2 mb-4">
                      {book.description ? book.description.replace(/[\s\.]*Complete digital reading material\s*&\s*chapters\.?/gi, "") : ""}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1.5 pt-3 border-t border-gray-100 mt-auto">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(`/class/${book.classId}/read/${book.subject || 'General'}`, '_blank');
                      }}
                      className="flex-1 flex items-center justify-center gap-1 py-2 rounded-xl text-xs text-blue-600 bg-blue-50/60 hover:bg-blue-100 transition-colors font-semibold"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      View
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenEdit(book);
                      }}
                      className="flex-1 flex items-center justify-center gap-1 py-2 rounded-xl text-xs text-amber-600 bg-amber-50/60 hover:bg-amber-100 transition-colors font-semibold"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      Edit
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(book);
                      }}
                      className="px-3 flex items-center justify-center py-2 rounded-xl text-xs text-red-500 bg-red-50/60 hover:bg-red-100 transition-colors font-semibold"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}

            {filteredBooks.length === 0 && (
              <div className="col-span-full py-16 text-center">
                <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-sm font-medium text-gray-500">No books found</p>
                <p className="text-xs text-gray-400 mt-1">Try adjusting your search or class/subject filters</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Book Modal */}
      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="Add New Textbook" size="lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
          <FormInput
            label="Textbook Title"
            placeholder="e.g., Physics Bhag 1"
            value={addTitle}
            onChange={setAddTitle}
            required
            id="add-book-title"
          />
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Class</label>
            <select
              value={addClassId}
              onChange={(e) => setAddClassId(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300"
            >
              <option value="" disabled>Select Class</option>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
                <option key={num} value={num}>Class {num}</option>
              ))}
            </select>
          </div>
          <FormInput
            label="Subject"
            placeholder="e.g., Mathematics, Hindi, Physics"
            value={addSubject}
            onChange={setAddSubject}
            required
            id="add-book-subject"
          />
          <FormInput
            label="Author / Publisher"
            placeholder="e.g., Bihar Board"
            value={addAuthor}
            onChange={setAddAuthor}
            id="add-book-author"
          />
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Cover Image</label>
            {addImage ? (
              <div className="flex items-center justify-between gap-4 p-3 bg-blue-50/50 border border-blue-100 rounded-xl">
                <div className="w-16 h-20 rounded-lg overflow-hidden border border-blue-200 bg-white shadow-sm shrink-0">
                  <ResolvedImage src={addImage} className="w-full h-full object-cover" />
                </div>
                <button
                  type="button"
                  onClick={() => setAddImage('')}
                  className="px-3 py-1.5 text-xs font-bold text-red-600 hover:bg-red-50 border border-red-200 rounded-lg transition-colors cursor-pointer"
                >
                  Remove Cover
                </button>
              </div>
            ) : (
              <div className="relative border-2 border-dashed border-gray-300 rounded-2xl p-6 bg-gray-50/50 hover:bg-gray-100/50 transition-colors flex flex-col items-center justify-center text-center cursor-pointer group min-h-[120px]">
                <Upload className="w-8 h-8 text-gray-400 mb-2 group-hover:text-blue-500 transition-colors" />
                <span className="text-xs font-bold text-gray-700 mb-1">Click to upload cover image</span>
                <span className="text-[10px] text-gray-400 font-medium">JPEG, PNG, WEBP up to 2MB</span>
                <input
                  type="file"
                  accept="image/*"
                  id="upload-add-cover-image"
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      try {
                        setAddImage(await uploadFile(file, 'image'));
                        addToast('Cover image uploaded successfully!', 'success');
                      } catch (err) {
                        addToast(errorMessage(err, 'Failed to upload cover image'), 'error');
                      }
                    }
                  }}
                />
              </div>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Status</label>
            <ToggleSwitch
              label={addStatus ? 'Published (Live)' : 'Draft (Hidden)'}
              checked={addStatus}
              onChange={setAddStatus}
              id="add-book-status-toggle"
            />
          </div>
        </div>
        <FormInput
          label="Description"
          type="textarea"
          placeholder="Enter detailed textbook description and chapters overview..."
          value={addDescription}
          onChange={setAddDescription}
          id="add-book-description"
        />

        {/* --- Chapter & PDF Management Section --- */}
        <div className="mt-6 border-t border-gray-100 pt-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-sm font-semibold text-gray-800">Table of Contents & PDFs</h4>
              <p className="text-[11px] text-gray-500 mt-0.5">Manage chapters and link individual PDF files</p>
            </div>
            <button
              type="button"
              onClick={handleAddChapterRow}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Chapter
            </button>
          </div>

          <div className="max-h-[260px] overflow-y-auto pr-1 space-y-3 custom-scrollbar">
            {chaptersList.length > 0 ? (
              chaptersList.map((chap, idx) => (
                <div key={chap.id || idx} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 p-3 bg-gray-50 border border-gray-100 rounded-xl relative group">
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-[11px] font-bold font-mono">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 flex-1">
                    <input
                      type="text"
                      placeholder="Chapter Name"
                      value={chap.title || ''}
                      onChange={(e) => handleUpdateChapterRow(idx, 'title', e.target.value)}
                      className="px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                      <div className="relative flex items-center h-full min-h-[34px]">
                        {chap.pdfUrl ? (
                          <div className="flex items-center justify-between gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-700 text-xs font-bold w-full h-full">
                            <span className="truncate flex-1">PDF Uploaded</span>
                            <button
                              type="button"
                              onClick={() => handleUpdateChapterRow(idx, 'pdfUrl', '')}
                              className="text-red-500 hover:text-red-700 transition-colors p-0.5 cursor-pointer shrink-0"
                              title="Remove PDF"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : (
                          <div className="relative w-full h-full">
                            <label className="cursor-pointer w-full h-full flex items-center justify-center gap-1.5 px-3 py-1.5 border border-blue-200 hover:border-blue-300 text-blue-600 hover:bg-blue-50/50 rounded-lg text-xs font-bold transition-all bg-white shadow-sm" title="Upload Chapter PDF">
                              <Upload className="w-3.5 h-3.5" />
                              <span>Upload PDF</span>
                              <input
                                type="file"
                                accept="application/pdf"
                                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                                onChange={async (e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    try {
                                      handleUpdateChapterRow(idx, 'pdfUrl', await uploadFile(file, 'document'));
                                      addToast('Chapter PDF uploaded successfully!', 'success');
                                    } catch (err) {
                                      addToast(errorMessage(err, 'Failed to upload PDF'), 'error');
                                    }
                                  }
                                }}
                              />
                            </label>
                          </div>
                        )}
                      </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDeleteChapterRow(idx)}
                    className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-gray-100 transition-colors shrink-0"
                    title="Remove Chapter"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))
            ) : (
              <div className="py-8 text-center bg-gray-50/50 rounded-xl border border-dashed border-gray-200">
                <BookOpen className="w-8 h-8 text-gray-300 mx-auto mb-1.5" />
                <p className="text-xs font-semibold text-gray-500">No chapters added yet</p>
                <p className="text-[10px] text-gray-400 mt-0.5">Click "Add Chapter" above to build the Table of Contents.</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-gray-100">
          <button
            onClick={() => setShowAddModal(false)}
            className="px-5 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <motion.button
            onClick={handleSaveAdd}
            className="px-5 py-2.5 rounded-xl gradient-primary text-white text-sm font-semibold shadow-lg shadow-blue-500/20"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Add Textbook
          </motion.button>
        </div>
      </Modal>

      {/* Edit Book Modal */}
      <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)} title="Edit Textbook" size="lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
          <FormInput
            label="Textbook Title"
            placeholder="e.g., Physics Bhag 1"
            value={editTitle}
            onChange={setEditTitle}
            required
            id="edit-book-title"
          />
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Class</label>
            <select
              value={editClassId}
              onChange={(e) => setEditClassId(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
                <option key={num} value={num}>Class {num}</option>
              ))}
            </select>
          </div>
          <FormInput
            label="Subject"
            placeholder="e.g., Mathematics, Hindi, Physics"
            value={editSubject}
            onChange={setEditSubject}
            required
            id="edit-book-subject"
          />
          <FormInput
            label="Author / Publisher"
            placeholder="e.g., Bihar Board"
            value={editAuthor}
            onChange={setEditAuthor}
            id="edit-book-author"
          />
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Cover Image</label>
            {editImage ? (
              <div className="flex items-center justify-between gap-4 p-3 bg-blue-50/50 border border-blue-100 rounded-xl">
                <div className="w-16 h-20 rounded-lg overflow-hidden border border-blue-200 bg-white shadow-sm shrink-0">
                  <ResolvedImage src={editImage} className="w-full h-full object-cover" />
                </div>
                <button
                  type="button"
                  onClick={() => setEditImage('')}
                  className="px-3 py-1.5 text-xs font-bold text-red-600 hover:bg-red-50 border border-red-200 rounded-lg transition-colors cursor-pointer"
                >
                  Remove Cover
                </button>
              </div>
            ) : (
              <div className="relative border-2 border-dashed border-gray-300 rounded-2xl p-6 bg-gray-50/50 hover:bg-gray-100/50 transition-colors flex flex-col items-center justify-center text-center cursor-pointer group min-h-[120px]">
                <Upload className="w-8 h-8 text-gray-400 mb-2 group-hover:text-blue-500 transition-colors" />
                <span className="text-xs font-bold text-gray-700 mb-1">Click to upload cover image</span>
                <span className="text-[10px] text-gray-400 font-medium">JPEG, PNG, WEBP up to 2MB</span>
                <input
                  type="file"
                  accept="image/*"
                  id="upload-edit-cover-image"
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      try {
                        setEditImage(await uploadFile(file, 'image'));
                        addToast('Cover image uploaded successfully!', 'success');
                      } catch (err) {
                        addToast(errorMessage(err, 'Failed to upload cover image'), 'error');
                      }
                    }
                  }}
                />
              </div>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Status</label>
            <ToggleSwitch
              label={editStatus ? 'Published (Live)' : 'Draft (Hidden)'}
              checked={editStatus}
              onChange={setEditStatus}
              id="edit-book-status-toggle"
            />
          </div>
        </div>
        <FormInput
          label="Description"
          type="textarea"
          placeholder="Enter detailed textbook description and chapters overview..."
          value={editDescription}
          onChange={setEditDescription}
          id="edit-book-description"
        />

        {/* --- Chapter & PDF Management Section --- */}
        <div className="mt-6 border-t border-gray-100 pt-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-sm font-semibold text-gray-800">Table of Contents & PDFs</h4>
              <p className="text-[11px] text-gray-500 mt-0.5">Manage chapters and link individual PDF files</p>
            </div>
            <button
              type="button"
              onClick={handleAddChapterRow}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Chapter
            </button>
          </div>

          <div className="max-h-[260px] overflow-y-auto pr-1 space-y-3 custom-scrollbar">
            {chaptersList.length > 0 ? (
              chaptersList.map((chap, idx) => (
                <div key={chap.id || idx} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 p-3 bg-gray-50 border border-gray-100 rounded-xl relative group">
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-[11px] font-bold font-mono">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 flex-1">
                    <input
                      type="text"
                      placeholder="Chapter Name"
                      value={chap.title || ''}
                      onChange={(e) => handleUpdateChapterRow(idx, 'title', e.target.value)}
                      className="px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                      <div className="relative flex items-center h-full min-h-[34px]">
                        {chap.pdfUrl ? (
                          <div className="flex items-center justify-between gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-700 text-xs font-bold w-full h-full">
                            <span className="truncate flex-1">PDF Uploaded</span>
                            <button
                              type="button"
                              onClick={() => handleUpdateChapterRow(idx, 'pdfUrl', '')}
                              className="text-red-500 hover:text-red-700 transition-colors p-0.5 cursor-pointer shrink-0"
                              title="Remove PDF"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : (
                          <div className="relative w-full h-full">
                            <label className="cursor-pointer w-full h-full flex items-center justify-center gap-1.5 px-3 py-1.5 border border-blue-200 hover:border-blue-300 text-blue-600 hover:bg-blue-50/50 rounded-lg text-xs font-bold transition-all bg-white shadow-sm" title="Upload Chapter PDF">
                              <Upload className="w-3.5 h-3.5" />
                              <span>Upload PDF</span>
                              <input
                                type="file"
                                accept="application/pdf"
                                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                                onChange={async (e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    try {
                                      handleUpdateChapterRow(idx, 'pdfUrl', await uploadFile(file, 'document'));
                                      addToast('Chapter PDF uploaded successfully!', 'success');
                                    } catch (err) {
                                      addToast(errorMessage(err, 'Failed to upload PDF'), 'error');
                                    }
                                  }
                                }}
                              />
                            </label>
                          </div>
                        )}
                      </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDeleteChapterRow(idx)}
                    className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-gray-100 transition-colors shrink-0"
                    title="Remove Chapter"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))
            ) : (
              <div className="py-8 text-center bg-gray-50/50 rounded-xl border border-dashed border-gray-200">
                <BookOpen className="w-8 h-8 text-gray-300 mx-auto mb-1.5" />
                <p className="text-xs font-semibold text-gray-500">No chapters added yet</p>
                <p className="text-[10px] text-gray-400 mt-0.5">Click "Add Chapter" above to build the Table of Contents.</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-gray-100">
          <button
            onClick={() => setShowEditModal(false)}
            className="px-5 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <motion.button
            onClick={handleSaveEdit}
            className="px-5 py-2.5 rounded-xl gradient-primary text-white text-sm font-semibold shadow-lg shadow-blue-500/20"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Save Changes
          </motion.button>
        </div>
      </Modal>
    </motion.div>
  );
}
