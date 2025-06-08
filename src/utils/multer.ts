import multer from 'multer';

// Use memory storage instead of disk storage
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB limit
    }
});

export default upload; 