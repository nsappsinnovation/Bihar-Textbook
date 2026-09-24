import { useState, useCallback } from 'react';
import { uploadFile } from '../../services/uploadService';

/**
 * Tracks uploads in progress so pages can show "Uploading… 42%" and block saving until they finish.
 *
 *   const { upload, isUploading, progressOf } = useFileUpload();
 *   const path = await upload('cover', file, 'image', UPLOAD_FOLDERS.bookCovers);
 *   progressOf('cover') // 0–100 while uploading, undefined otherwise
 *
 * key: any id for the upload slot (e.g. 'photo', a chapter row id). One page can run several at once.
 */
export function useFileUpload() {
  const [uploads, setUploads] = useState({});

  const upload = useCallback(async (key, file, kind, folder) => {
    setUploads((prev) => ({ ...prev, [key]: 0 }));
    try {
      return await uploadFile(file, kind, folder, (percent) =>
        setUploads((prev) => (key in prev ? { ...prev, [key]: percent } : prev)),
      );
    } finally {
      setUploads((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  }, []);

  const progressOf = useCallback((key) => uploads[key], [uploads]);

  return { upload, progressOf, isUploading: Object.keys(uploads).length > 0 };
}
