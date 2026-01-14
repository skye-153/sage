import { University } from '@/lib/types';
import { mockUniversities, mockScholarships, mockAccommodations, mockVisa, mockFinances } from '@/lib/mock-data';

const STORAGE_KEYS = {
  UNIVERSITIES: 'sage_universities',
  ACCOMMODATIONS: 'sage_accommodations',
  SCHOLARSHIPS: 'sage_scholarships',
  FINANCES: 'sage_finances',
  VISAS: 'sage_visas',
};

// Initialize localStorage with mock data if empty
export const initializeStorage = () => {
  if (typeof window === 'undefined') return;

  if (!localStorage.getItem(STORAGE_KEYS.UNIVERSITIES)) {
    localStorage.setItem(STORAGE_KEYS.UNIVERSITIES, JSON.stringify(mockUniversities));
  }
  if (!localStorage.getItem(STORAGE_KEYS.ACCOMMODATIONS)) {
    localStorage.setItem(STORAGE_KEYS.ACCOMMODATIONS, JSON.stringify(mockAccommodations));
  }
  if (!localStorage.getItem(STORAGE_KEYS.SCHOLARSHIPS)) {
    localStorage.setItem(STORAGE_KEYS.SCHOLARSHIPS, JSON.stringify(mockScholarships));
  }
  if (!localStorage.getItem(STORAGE_KEYS.FINANCES)) {
    localStorage.setItem(STORAGE_KEYS.FINANCES, JSON.stringify(mockFinances));
  }
  if (!localStorage.getItem(STORAGE_KEYS.VISAS)) {
    localStorage.setItem(STORAGE_KEYS.VISAS, JSON.stringify(mockVisa));
  }
};

// Get all universities
export const getUniversities = (): University[] => {
  if (typeof window === 'undefined') return mockUniversities;
  
  const data = localStorage.getItem(STORAGE_KEYS.UNIVERSITIES);
  return data ? JSON.parse(data) : mockUniversities;
};

// Get single university by ID
export const getUniversityById = (id: string): University | null => {
  const universities = getUniversities();
  return universities.find(u => u.id === id) || null;
};

// Save universities
export const saveUniversities = (universities: University[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.UNIVERSITIES, JSON.stringify(universities));
};

// Add or update a university
export const saveUniversity = (university: University) => {
  const universities = getUniversities();
  const index = universities.findIndex(u => u.id === university.id);
  
  if (index >= 0) {
    universities[index] = university;
  } else {
    universities.push(university);
  }
  
  saveUniversities(universities);
};

// Delete a university
export const deleteUniversity = (id: string) => {
  const universities = getUniversities();
  const filtered = universities.filter(u => u.id !== id);
  saveUniversities(filtered);
};

// Get all data for a specific page type
export const getPageData = (pageType: string): any[] => {
  if (typeof window === 'undefined') return [];
  
  const pageLower = pageType.toLowerCase();
  const entry = Object.entries(STORAGE_KEYS).find(([k, v]) => {
    const kLower = k.toLowerCase();
    // match exact, plural, or singular forms
    return (
      kLower === pageLower ||
      kLower === `${pageLower}s` ||
      (kLower.endsWith('s') && kLower.slice(0, -1) === pageLower)
    );
  });

  const key = entry?.[1];
  if (!key) return [];
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

// Save page data
export const savePageData = (pageType: string, data: any[]) => {
  if (typeof window === 'undefined') return;
  
  const pageLower = pageType.toLowerCase();
  const entry = Object.entries(STORAGE_KEYS).find(([k, v]) => {
    const kLower = k.toLowerCase();
    return (
      kLower === pageLower ||
      kLower === `${pageLower}s` ||
      (kLower.endsWith('s') && kLower.slice(0, -1) === pageLower)
    );
  });

  const key = entry?.[1];
  if (key) {
    localStorage.setItem(key, JSON.stringify(data));
  }
};

// Add row to page data
export const addRowToPage = (pageType: string, row: any) => {
  const data = getPageData(pageType);
  data.push({ id: Date.now().toString(), ...row });
  savePageData(pageType, data);
};

// Delete row from page data
export const deleteRowFromPage = (pageType: string, id: string) => {
  const data = getPageData(pageType);
  const filtered = data.filter(item => item.id !== id);
  savePageData(pageType, filtered);
};

// Update row in page data
export const updateRowInPage = (pageType: string, id: string, updates: any) => {
  const data = getPageData(pageType);
  const index = data.findIndex(item => item.id === id);
  if (index >= 0) {
    data[index] = { ...data[index], ...updates };
    savePageData(pageType, data);
  }
};
