import { Request, Response } from "express";
import minioClient from "../utils/minio";
import { handleError } from "../utils/errorHandler";
import upload from "../utils/multer";

class FileController {
    uploadMiddleware = upload.single('image');

    async uploadFile(req: Request, res: Response) {
        try {
            if (!req.file) {
                return res.status(400).json({ error: 'No file uploaded' });
            }

            const bucket = 'cave-academy';
            const buffer = req.file.buffer;
            const filename = `${Date.now()}-${req.file.originalname}`;
    
            const exists = await minioClient.bucketExists(bucket);

            if (!exists) {
                await minioClient.makeBucket(bucket, 'us-east-1');
            }
    
            await minioClient.putObject(bucket, filename, buffer, req.file.size, {
                'Content-Type': req.file.mimetype,
            });
            // Return success response with file details
            res.status(200).json({
                success: 1,
                message: 'File uploaded successfully',
                filename: filename,
                bucket: bucket,
                file: {
                    url: `https://${process.env.MINIO_ENDPOINT}:${process.env.MINIO_PORT}/${bucket}/${filename}`
                }
            });

            return;
            
        } catch (error) {
            handleError(error as Error, res);
        }
    }
}

export default FileController;