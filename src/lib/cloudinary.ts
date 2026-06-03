type CloudinaryUploadResponse = {
  secure_url: string;
  public_id: string;
  width: number;
  height: number;
  format: string;
  bytes: number;
};

type CloudinaryResourceType = 'image' | 'video';

export type UploadedCloudinaryImage = {
  originalUrl: string;
  webpUrl: string;
  publicId: string;
  width: number;
  height: number;
  format: string;
  bytes: number;
};

export type UploadedCloudinaryVideo = {
  originalUrl: string;
  optimizedUrl: string;
  posterUrl: string;
  publicId: string;
  width: number;
  height: number;
  format: string;
  bytes: number;
};

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

export function getOptimizedWebpUrl(imageUrl: string, width = 1600) {
  return imageUrl.replace('/upload/', `/upload/f_webp,q_auto,c_limit,w_${width}/`);
}

export function getOptimizedVideoUrl(videoUrl: string, width = 1280) {
  return videoUrl.replace('/upload/', `/upload/f_auto,q_auto,vc_auto,c_limit,w_${width}/`);
}

export function getVideoPosterUrl(videoUrl: string, width = 1280) {
  return videoUrl
    .replace('/video/upload/', `/video/upload/f_webp,q_auto,so_0,c_limit,w_${width}/`)
    .replace(/\.[^/.]+$/, '.webp');
}

async function uploadToCloudinary(
  file: File,
  resourceType: CloudinaryResourceType,
  folder: string,
) {
  if (!CLOUD_NAME || !UPLOAD_PRESET) {
    throw new Error('Faltan VITE_CLOUDINARY_CLOUD_NAME o VITE_CLOUDINARY_UPLOAD_PRESET.');
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', UPLOAD_PRESET);

  const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${resourceType}/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    let detail = '';
    try {
      const errBody = await response.json();
      detail = errBody?.error?.message || JSON.stringify(errBody);
    } catch (e) {
      detail = `HTTP ${response.status} ${response.statusText}`;
    }
    throw new Error(`Error de Cloudinary: ${detail}`);
  }

  const uploaded = (await response.json()) as CloudinaryUploadResponse;

  return uploaded;
}

export async function uploadImageToCloudinary(file: File, folder = 'mingeotop/proyectos') {
  const uploaded = await uploadToCloudinary(file, 'image', folder);

  return {
    originalUrl: uploaded.secure_url,
    webpUrl: getOptimizedWebpUrl(uploaded.secure_url),
    publicId: uploaded.public_id,
    width: uploaded.width,
    height: uploaded.height,
    format: uploaded.format,
    bytes: uploaded.bytes,
  } satisfies UploadedCloudinaryImage;
}

export async function uploadVideoToCloudinary(file: File, folder = 'mingeotop/videos') {
  const uploaded = await uploadToCloudinary(file, 'video', folder);

  return {
    originalUrl: uploaded.secure_url,
    optimizedUrl: getOptimizedVideoUrl(uploaded.secure_url),
    posterUrl: getVideoPosterUrl(uploaded.secure_url),
    publicId: uploaded.public_id,
    width: uploaded.width,
    height: uploaded.height,
    format: uploaded.format,
    bytes: uploaded.bytes,
  } satisfies UploadedCloudinaryVideo;
}
