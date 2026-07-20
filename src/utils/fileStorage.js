import { useState, useEffect } from "react";

const DB_NAME = "bihar_board_files_db";
const STORE_NAME = "files_store";

function getDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = (e) => resolve(e.target.result);
    request.onerror = (e) => reject(request.error);
  });
}

export async function storeFile(key, file) {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    const request = store.put(file, key);
    request.onsuccess = () => resolve(key);
    request.onerror = () => reject(request.error);
  });
}

export async function getFile(key) {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);
    const request = store.get(key);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function deleteFile(key) {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    const request = store.delete(key);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

const objectUrlCache = new Map();

export async function resolveFileUrl(url) {
  if (!url) return url;
  if (url.startsWith("db:")) {
    const key = url.substring(3);
    if (objectUrlCache.has(key)) {
      return objectUrlCache.get(key);
    }
    try {
      const blob = await getFile(key);
      if (blob) {
        const objectUrl = URL.createObjectURL(blob);
        objectUrlCache.set(key, objectUrl);
        return objectUrl;
      }
    } catch (e) {
      console.error("Failed to load file from IndexedDB:", e);
    }
    return null;
  }
  return url;
}

export function useResolvedUrl(url) {
  const [resolved, setResolved] = useState(() => {
    if (url && url.startsWith("db:")) {
      // Return cached url synchronously if available
      const key = url.substring(3);
      if (objectUrlCache.has(key)) {
        return objectUrlCache.get(key);
      }
      return ""; // Asynchronously resolved shortly after mount
    }
    return url;
  });

  useEffect(() => {
    let active = true;
    if (url && url.startsWith("db:")) {
      const key = url.substring(3);
      if (objectUrlCache.has(key)) {
        setResolved(objectUrlCache.get(key));
        return;
      }
      resolveFileUrl(url).then(res => {
        if (active && res) {
          setResolved(res);
        }
      });
    } else {
      setResolved(url);
    }
    return () => {
      active = false;
    };
  }, [url]);

  return resolved;
}
