'use server';

import { collection, getDocs, doc, getDoc, setDoc, updateDoc, deleteDoc, addDoc } from 'firebase/firestore';
import { db } from './config';
import { University } from '../types';
import { mockUniversities } from '../mock-data';
import { revalidatePath } from 'next/cache';

const USE_MOCK_DATA = true; // Set to false to use live Firestore data

const universitiesCollection = collection(db, 'universities');

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function getUniversities(): Promise<University[]> {
  if (USE_MOCK_DATA) {
    await delay(500);
    return Promise.resolve(mockUniversities);
  }

  try {
    const snapshot = await getDocs(universitiesCollection);
    const universities = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    } as University));
    return universities;
  } catch (error) {
    console.error("Error fetching universities: ", error);
    return [];
  }
}

export async function getUniversityById(id: string): Promise<University | null> {
  if (USE_MOCK_DATA) {
    await delay(300);
    const university = mockUniversities.find(uni => uni.id === id) || null;
    return Promise.resolve(university);
  }

  try {
    const docRef = doc(db, 'universities', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as University;
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching university by ID: ", error);
    return null;
  }
}

export async function addUniversity(universityData: Omit<University, 'id'>): Promise<string | null> {
  if (USE_MOCK_DATA) {
    await delay(500);
    const newId = (mockUniversities.length + 1).toString();
    const newUniversity = { id: newId, ...universityData };
    mockUniversities.push(newUniversity);
    console.log("Mock addUniversity called", newUniversity);
    revalidatePath('/admin');
    revalidatePath('/universities');
    return newId;
  }
  
  try {
    const docRef = await addDoc(universitiesCollection, universityData);
    revalidatePath('/admin');
    revalidatePath('/universities');
    return docRef.id;
  } catch (error) {
    console.error("Error adding university: ", error);
    return null;
  }
}

export async function updateUniversity(id: string, updates: Partial<University>): Promise<boolean> {
   if (USE_MOCK_DATA) {
    await delay(500);
    const index = mockUniversities.findIndex(uni => uni.id === id);
    if (index !== -1) {
      mockUniversities[index] = { ...mockUniversities[index], ...updates };
      console.log("Mock updateUniversity called", mockUniversities[index]);
      revalidatePath('/admin');
      revalidatePath('/universities');
      revalidatePath(`/universities/${id}`);
      return true;
    }
    return false;
  }
  try {
    const docRef = doc(db, 'universities', id);
    await updateDoc(docRef, updates);
    revalidatePath('/admin');
    revalidatePath('/universities');
    revalidatePath(`/universities/${id}`);
    return true;
  } catch (error) {
    console.error("Error updating university: ", error);
    return false;
  }
}

export async function deleteUniversity(id: string): Promise<boolean> {
  if (USE_MOCK_DATA) {
    await delay(500);
    const index = mockUniversities.findIndex(uni => uni.id === id);
    if (index !== -1) {
        mockUniversities.splice(index, 1);
        console.log("Mock deleteUniversity called for id:", id);
        revalidatePath('/admin');
        revalidatePath('/universities');
        return true;
    }
    return false;
  }
  try {
    const docRef = doc(db, 'universities', id);
    await deleteDoc(docRef);
    revalidatePath('/admin');
    revalidatePath('/universities');
    return true;
  } catch (error) {
    console.error("Error deleting university: ", error);
    return false;
  }
}
