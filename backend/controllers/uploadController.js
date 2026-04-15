import asyncHandler from 'express-async-handler';
import cloudinary from '../utils/cloudinary.js';

const uploadImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error('Image file is required');
  }

  const result = await new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'mern-ecommerce-products' },
      (error, uploadResult) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(uploadResult);
      }
    );

    stream.end(req.file.buffer);
  });

  res.status(201).json({
    imageUrl: result.secure_url,
    publicId: result.public_id
  });
});

export { uploadImage };
