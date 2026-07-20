import initialData from "../pages/navbar_pages/books/Book.json";

const STORAGE_KEY = "bihar_textbooks_data_v2";

export const getStoredTextbooksData = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (err) {
    console.error("Error reading textbooks storage:", err);
  }
  // Initialize storage with Book.json if empty
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
  } catch (err) {
    console.error("Error initializing textbooks storage:", err);
  }
  return initialData;
};

export const saveStoredTextbooksData = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    // Dispatch custom storage event so active tabs/components re-render immediately
    window.dispatchEvent(new Event("textbooks_updated"));
  } catch (err) {
    console.error("Error saving textbooks storage:", err);
  }
};

export const resetTextbooksData = () => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
    window.dispatchEvent(new Event("textbooks_updated"));
    return initialData;
  } catch (err) {
    console.error("Error resetting textbooks storage:", err);
    return initialData;
  }
};

// Flatten all books across classes for Admin Table/Grid view
export const getAllTextbooksFlat = () => {
  const data = getStoredTextbooksData();
  const flatList = [];
  
  if (!data || !data.classes) return flatList;

  data.classes.forEach((cls) => {
    (cls.books || []).forEach((book) => {
      flatList.push({
        ...book,
        classId: cls.id,
        className: cls.name,
        title: book.title || "Untitled Book",
        author: book.author || "Bihar Board",
        subject: book.subject || "General",
        image: book.image || "/bookcover.png",
        description:
          book.description ||
          `Official Bihar Board ${cls.name} textbook for '${book.title}'.`,
        status: book.status || (book.localOnly ? "Draft" : "Published"),
        uploadDate: book.uploadDate || "2026-06-15",
      });
    });
  });

  return flatList;
};

export const addTextbook = (newBook) => {
  const data = getStoredTextbooksData();
  const targetClassId = Number(newBook.classId) || 1;
  const targetClass = data.classes.find((c) => c.id === targetClassId);

  if (!targetClass) return false;

  if (!targetClass.books) targetClass.books = [];

  const bookObj = {
    id: `c${targetClassId}b_${Date.now()}`,
    title: newBook.title,
    author: newBook.author || "Bihar Board",
    subject: (newBook.subject || "General").toLowerCase(),
    image: newBook.image || "/bookcover.png",
    description: newBook.description,
    status: newBook.status || "Published",
    uploadDate: new Date().toISOString().split("T")[0],
    localOnly: newBook.status === "Draft",
    chapters: newBook.chapters || [],
  };

  targetClass.books.push(bookObj);
  saveStoredTextbooksData(data);
  return bookObj;
};

export const updateTextbook = (bookId, updatedFields) => {
  const data = getStoredTextbooksData();
  let foundBook = null;
  let currentClassId = null;

  // Find book and its current class
  for (const cls of data.classes) {
    const idx = (cls.books || []).findIndex((b) => b.id === bookId);
    if (idx !== -1) {
      foundBook = cls.books[idx];
      currentClassId = cls.id;
      break;
    }
  }

  if (!foundBook) return false;

  const targetClassId = Number(updatedFields.classId) || currentClassId;

  // If class changed, remove from old class and add to new class
  if (targetClassId !== currentClassId) {
    const oldClass = data.classes.find((c) => c.id === currentClassId);
    if (oldClass && oldClass.books) {
      oldClass.books = oldClass.books.filter((b) => b.id !== bookId);
    }
    const newClass = data.classes.find((c) => c.id === targetClassId);
    if (newClass) {
      if (!newClass.books) newClass.books = [];
      const movedBook = {
        ...foundBook,
        ...updatedFields,
        subject: (updatedFields.subject || foundBook.subject || "General").toLowerCase(),
        localOnly: updatedFields.status === "Draft",
      };
      newClass.books.push(movedBook);
    }
  } else {
    // Same class update
    Object.assign(foundBook, {
      ...updatedFields,
      subject: (updatedFields.subject || foundBook.subject || "General").toLowerCase(),
      localOnly: updatedFields.status === "Draft",
    });
  }

  saveStoredTextbooksData(data);
  return true;
};

export const deleteTextbook = (bookId) => {
  const data = getStoredTextbooksData();
  let deleted = false;

  data.classes.forEach((cls) => {
    if (cls.books) {
      const initialLen = cls.books.length;
      cls.books = cls.books.filter((b) => b.id !== bookId);
      if (cls.books.length !== initialLen) {
        deleted = true;
      }
    }
  });

  if (deleted) {
    saveStoredTextbooksData(data);
  }
  return deleted;
};
