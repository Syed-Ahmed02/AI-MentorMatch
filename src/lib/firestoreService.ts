import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  deleteDoc,
  doc,
  updateDoc,
  serverTimestamp,
  DocumentData,
  QuerySnapshot
} from 'firebase/firestore';
import { db } from './firebase.sdk';

export interface ResumeDocument {
  id?: string;
  userId: string;
  fileName: string;
  originalFileName: string;
  storagePath: string;
  downloadURL: string;
  fileSize: number;
  uploadDate: any; // Firestore timestamp
  lastIndexed?: any; // Firestore timestamp
  documentsIndexed?: number;
  status: 'uploaded' | 'indexed' | 'failed' | 'analyzed';
  score?: number;
  strengths?: string;
  improvements?: string;
  missingSkills?: string[];
  resources?: { skill: string; resources: string[] }[];
  jobDescription?: string;
  error?: string;
  summary?: string;
}

export interface SessionDocument {
  id?: string;
  userId: string;
  resumeId: string; // Reference to resumes collection
  jobDescription: string;
  score?: number;
  strengths?: string;
  improvements?: string;
  missingSkills?: string[];
  resources?: { skill: string; resources: string[] }[];
  summary?: string;
  createdAt: any; // Firestore timestamp
  transcript?: { role: string; text: string }[];
}

export class FirestoreService {
  private collectionName = 'resumes';
  private sessionCollection = 'sessions';

  /**
   * Add a new resume document to Firestore
   */
  async addResume(resumeData: Omit<ResumeDocument, 'id' | 'uploadDate'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, this.collectionName), {
        ...resumeData,
        uploadDate: serverTimestamp(),
      });
      return docRef.id;
    } catch (error) {
      console.error('Error adding resume to Firestore:', error);
      throw new Error('Failed to save resume metadata');
    }
  }

  /**
   * Get all resumes for a specific user
   */
  async getUserResumes(userId: string): Promise<ResumeDocument[]> {
    try {
      const q = query(
        collection(db, this.collectionName),
        where('userId', '==', userId),
        orderBy('uploadDate', 'desc')
      );
      
      const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as ResumeDocument[];
    } catch (error) {
      console.error('Error getting user resumes:', error);
      throw new Error('Failed to fetch user resumes');
    }
  }

  /**
   * Get a specific resume by ID
   */
  async getResume(resumeId: string): Promise<ResumeDocument | null> {
    try {
      const docRef = doc(db, this.collectionName, resumeId);
      const docSnap = await getDocs(query(collection(db, this.collectionName), where('__name__', '==', resumeId)));
      
      if (docSnap.empty) {
        return null;
      }
      
      const docData = docSnap.docs[0];
      return {
        id: docData.id,
        ...docData.data()
      } as ResumeDocument;
    } catch (error) {
      console.error('Error getting resume:', error);
      throw new Error('Failed to fetch resume');
    }
  }

  /**
   * Update resume indexing status
   */
  async updateResumeStatus(
    resumeId: string, 
    status: ResumeDocument['status'], 
    documentsIndexed?: number,
    error?: string
  ): Promise<void> {
    try {
      const docRef = doc(db, this.collectionName, resumeId);
      const updateData: any = {
        status,
        lastIndexed: serverTimestamp(),
      };
      
      if (documentsIndexed !== undefined) {
        updateData.documentsIndexed = documentsIndexed;
      }
      
      if (error) {
        updateData.error = error;
      }
      
      await updateDoc(docRef, updateData);
    } catch (error) {
      console.error('Error updating resume status:', error);
      throw new Error('Failed to update resume status');
    }
  }

  /**
   * Delete a resume document
   */
  async deleteResume(resumeId: string): Promise<void> {
    try {
      const docRef = doc(db, this.collectionName, resumeId);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error deleting resume:', error);
      throw new Error('Failed to delete resume');
    }
  }

  /**
   * Check if user has access to a specific resume
   */
  async checkUserAccess(userId: string, resumeId: string): Promise<boolean> {
    try {
      const resume = await this.getResume(resumeId);
      return resume?.userId === userId;
    } catch (error) {
      console.error('Error checking user access:', error);
      return false;
    }
  }

  /**
   * Get resume count for a user
   */
  async getUserResumeCount(userId: string): Promise<number> {
    try {
      const q = query(
        collection(db, this.collectionName),
        where('userId', '==', userId)
      );
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.size;
    } catch (error) {
      console.error('Error getting user resume count:', error);
      return 0;
    }
  }

  // SESSION METHODS
  /**
   * Add a new session document to Firestore
   */
  async addSession(sessionData: Omit<SessionDocument, 'id' | 'createdAt'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, this.sessionCollection), {
        ...sessionData,
        createdAt: serverTimestamp(),
      });
      return docRef.id;
    } catch (error) {
      console.error('Error adding session to Firestore:', error);
      throw new Error('Failed to save session');
    }
  }

  /**
   * Get all sessions for a specific user
   */
  async getUserSessions(userId: string): Promise<SessionDocument[]> {
    try {
      const q = query(
        collection(db, this.sessionCollection),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as SessionDocument[];
    } catch (error) {
      console.error('Error getting user sessions:', error);
      throw new Error('Failed to fetch user sessions');
    }
  }

  /**
   * Get a specific session by ID
   */
  async getSession(sessionId: string): Promise<SessionDocument | null> {
    try {
      const docSnap = await getDocs(query(collection(db, this.sessionCollection), where('__name__', '==', sessionId)));
      if (docSnap.empty) {
        return null;
      }
      const docData = docSnap.docs[0];
      return {
        id: docData.id,
        ...docData.data()
      } as SessionDocument;
    } catch (error) {
      console.error('Error getting session:', error);
      throw new Error('Failed to fetch session');
    }
  }
}

// Export singleton instance
export const firestoreService = new FirestoreService(); 