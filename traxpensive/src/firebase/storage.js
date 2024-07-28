
import { format } from 'date-fns';
import { deleteObject, getDownloadURL as getStorageDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from './firebase';

const BUCKET_URL = "gs://traxpensive.appspot.com"; 

export async function uploadImage(image, uid) {
  const formattedDate = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss'Z'");
  const path = `${uid}/${formattedDate}.jpg`;
  const bucket = `${BUCKET_URL}/${path}`;
  const storageRef = ref(storage, bucket);

  try {
    await uploadBytes(storageRef, image);
    const downloadURL = await getStorageDownloadURL(storageRef);
    return downloadURL; 
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
}

export async function replaceImage(image, bucket) {
  await uploadBytes(ref(storage, bucket), image);
}

export async function deleteImage(bucket) {
  await deleteObject(ref(storage, bucket));
}

export async function getDownloadURL(bucket) {
  return await getStorageDownloadURL(ref(storage, bucket));
}

