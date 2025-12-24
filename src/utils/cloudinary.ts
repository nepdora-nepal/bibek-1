export interface CloudinaryUploadResponse {
  secure_url: string;
  public_id: string;
  [key: string]: any;
}

export const uploadToCloudinary = async (
  file: File,
  options?: any
): Promise<string> => {
  console.log("Mock Uploading to Cloudinary:", file.name, options);
  // Return a local object URL as a mock
  return URL.createObjectURL(file);
};

export const optimizeCloudinaryUrl = (
  url: string,
  options?: any
): string => {
  return url;
};

export const convertUnsplashUrl = (url: string): string => {
  return url;
};
