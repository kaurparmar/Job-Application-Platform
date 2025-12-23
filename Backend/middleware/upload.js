import multer from 'multer';


// Use memory storage for simplicity; swap to diskStorage or cloud uploads as needed
const storage = multer.memoryStorage();
const upload = multer({ storage }).single('file');

export default upload;