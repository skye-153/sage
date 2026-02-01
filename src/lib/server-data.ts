import fs from 'fs';
import path from 'path';

export interface DataStore {
  universities: any[];
  scholarships: any[];
  accommodations: any[];
  visa: any[];
  finances: any[];
}

const DATA_FILE_PATH = path.join(process.cwd(), 'src/lib/data.json');

// Load data from JSON file
export function loadData(): DataStore {
  try {
    const fileContents = fs.readFileSync(DATA_FILE_PATH, 'utf8');
    return JSON.parse(fileContents) as DataStore;
  } catch (error) {
    console.error('Error loading data:', error);
    // Return empty data structure if file doesn't exist
    return {
      universities: [],
      scholarships: [],
      accommodations: [],
      visa: [],
      finances: [],
    };
  }
}

// Save data to JSON file
export function saveData(data: DataStore): void {
  try {
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
    console.error('Error saving data:', error);
    throw error;
  }
}

// Get a specific data category
export function getDataCategory(category: string): any[] {
  const data = loadData();
  const key = category.toLowerCase() as keyof DataStore;
  return data[key] || [];
}

// Save a specific data category
export function saveDataCategory(category: string, items: any[]): void {
  const data = loadData();
  const key = category.toLowerCase() as keyof DataStore;
  data[key] = items;
  saveData(data);
}
