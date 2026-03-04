import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImage = async (image: File): Promise<string> => {
  // Convert File to base64 data URI
  const arrayBuffer = await image.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const base64 = buffer.toString('base64');
  const dataUri = `data:${image.type};base64,${base64}`;

  // Upload to Cloudinary
  const result = await cloudinary.uploader.upload(dataUri, {
    folder: 'vybe-store',
  });

  return result.secure_url;
};

export const deleteImage = async (url: string) => {
  // Extract public_id from Cloudinary URL
  // URL format: https://res.cloudinary.com/<cloud>/image/upload/v123/vybe-store/filename.ext
  const parts = url.split('/');
  const uploadIndex = parts.indexOf('upload');
  if (uploadIndex === -1) return;

  // Get everything after "upload/vXXXX/" and remove the file extension
  const pathAfterUpload = parts.slice(uploadIndex + 2).join('/');
  const publicId = pathAfterUpload.replace(/\.[^/.]+$/, ''); // remove extension

  await cloudinary.uploader.destroy(publicId);
};
