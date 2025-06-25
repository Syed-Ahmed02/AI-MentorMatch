'use client'
import { 
    collection, 
    addDoc, 
    query, 
    where, 
    orderBy, 
    getDocs,
    onSnapshot,
    serverTimestamp,
    doc,
    updateDoc,
    deleteDoc,
    DocumentReference,
    QuerySnapshot,
    DocumentData,
    Unsubscribe
  } from 'firebase/firestore';
  import { db } from '../lib/firebase.sdk';
  import { Message, MessageInput } from '../types';
  
  // Collection name
  const MESSAGES_COLLECTION = 'messages';
  
  // Add a new message
  export async function addMessage(
    userId: string, 
    message: string, 
    isAI: boolean = false
  ): Promise<string> {
    try {
      const docRef: DocumentReference = await addDoc(collection(db, MESSAGES_COLLECTION), {
        userId,
        message,
        isAI,
        timestamp: serverTimestamp(),
        createdAt: new Date().toISOString()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error adding message:', error);
      throw error;
    }
  }
  
  // Get all messages for a user
  export async function getUserMessages(userId: string): Promise<Message[]> {
    try {
      const q = query(
        collection(db, MESSAGES_COLLECTION),
        where('userId', '==', userId),
        orderBy('timestamp', 'asc')
      );
      
      const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q);
      const messages: Message[] = [];
      
      querySnapshot.forEach((doc) => {
        messages.push({
          id: doc.id,
          ...doc.data()
        } as Message);
      });
      
      return messages;
    } catch (error) {
      console.error('Error getting messages:', error);
      throw error;
    }
  }
  
  // Real-time listener for user messages
  export function subscribeToUserMessages(
    userId: string, 
    callback: (messages: Message[]) => void
  ): Unsubscribe {
    const q = query(
      collection(db, MESSAGES_COLLECTION),
      where('userId', '==', userId),
      orderBy('timestamp', 'asc')
    );
    
    return onSnapshot(q, (querySnapshot: QuerySnapshot<DocumentData>) => {
      const messages: Message[] = [];
      querySnapshot.forEach((doc) => {
        messages.push({
          id: doc.id,
          ...doc.data()
        } as Message);
      });
      callback(messages);
    });
  }
  
  // Update a message
  export async function updateMessage(
    messageId: string, 
    updates: Partial<MessageInput>
  ): Promise<void> {
    try {
      const messageRef = doc(db, MESSAGES_COLLECTION, messageId);
      await updateDoc(messageRef, {
        ...updates,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating message:', error);
      throw error;
    }
  }
  
  // Delete a message
  export async function deleteMessage(messageId: string): Promise<void> {
    try {
      await deleteDoc(doc(db, MESSAGES_COLLECTION, messageId));
    } catch (error) {
      console.error('Error deleting message:', error);
      throw error;
    }
  }
  
  // Add a conversation (user message + AI response)
  export async function addConversation(
    userId: string, 
    userMessage: string, 
    aiResponse: string
  ): Promise<boolean> {
    try {
      // Add user message
      await addMessage(userId, userMessage, false);
      
      // Add AI response
      await addMessage(userId, aiResponse, true);
      
      return true;
    } catch (error) {
      console.error('Error adding conversation:', error);
      throw error;
    }
  }