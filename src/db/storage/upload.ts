import { storage } from "@/lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

export const uploadImage = async (file: File): Promise<string | null> => {
  try {
    const storageRef = ref(storage, `videos/${uuidv4()}-${file.name}`); // Folder path in storage
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading file:", error);
    return null;
  }
};
