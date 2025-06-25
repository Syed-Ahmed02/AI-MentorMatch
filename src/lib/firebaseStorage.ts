import { 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject,
  listAll,
  StorageReference
} from 'firebase/storage';
import { storage } from './firebase.sdk';

export interface UploadResult {
  success: boolean;
  downloadURL?: string;
  filePath?: string;
  error?: string;
}

export interface DownloadResult {
  success: boolean;
  buffer?: Buffer;
  error?: string;
}

export class FirebaseStorageService {
  private basePath = 'resumes';

  /**
   * Upload a file to Firebase Storage
   */
  async uploadFile(file: File, userId?: string): Promise<UploadResult> {
    try {
      // Create a unique filename
      const timestamp = Date.now();
      const fileName = `${timestamp}_${file.name}`;
      const filePath = userId 
        ? `${this.basePath}/${userId}/${fileName}`
        : `${this.basePath}/${fileName}`;
      
      // Create storage reference
      const storageRef = ref(storage, filePath);
      
      // Upload the file
      const snapshot = await uploadBytes(storageRef, file);
      
      // Get download URL
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      return {
        success: true,
        downloadURL,
        filePath: snapshot.ref.fullPath
      };
    } catch (error) {
      console.error('Upload error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Upload failed'
      };
    }
  }

  /**
   * Download a file from Firebase Storage
   */
  async downloadFile(filePath: string): Promise<DownloadResult> {
    try {
      // Get download URL
      const storageRef = ref(storage, filePath);
      const downloadURL = await getDownloadURL(storageRef);
      
      // Fetch the file
      const response = await fetch(downloadURL);
      if (!response.ok) {
        throw new Error(`Failed to download file: ${response.statusText}`);
      }
      
      // Convert to buffer
      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      
      return {
        success: true,
        buffer
      };
    } catch (error) {
      console.error('Download error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Download failed'
      };
    }
  }

  /**
   * Delete a file from Firebase Storage
   */
  async deleteFile(filePath: string): Promise<{ success: boolean; error?: string }> {
    try {
      const storageRef = ref(storage, filePath);
      await deleteObject(storageRef);
      return { success: true };
    } catch (error) {
      console.error('Delete error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Delete failed'
      };
    }
  }

  /**
   * List all files for a user
   */
  async listUserFiles(userId: string): Promise<{ success: boolean; files?: string[]; error?: string }> {
    try {
      const userPath = `${this.basePath}/${userId}`;
      const storageRef = ref(storage, userPath);
      const result = await listAll(storageRef);
      
      const files = result.items.map(item => item.fullPath);
      return { success: true, files };
    } catch (error) {
      console.error('List files error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to list files'
      };
    }
  }

  /**
   * Get file metadata
   */
  async getFileMetadata(filePath: string): Promise<{ success: boolean; metadata?: any; error?: string }> {
    try {
      const storageRef = ref(storage, filePath);
      const downloadURL = await getDownloadURL(storageRef);
      
      return {
        success: true,
        metadata: {
          fullPath: storageRef.fullPath,
          downloadURL
        }
      };
    } catch (error) {
      console.error('Get metadata error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get metadata'
      };
    }
  }
}

// Export singleton instance
export const firebaseStorage = new FirebaseStorageService(); 