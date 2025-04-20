
// Local storage utilities for the mood tracker

// Save data to local storage
export function saveToLocalStorage(key: string, data: any): void {
  try {
    const serializedData = JSON.stringify(data);
    localStorage.setItem(key, serializedData);
  } catch (error) {
    console.error(`Error saving to localStorage (${key}):`, error);
  }
}

// Get data from local storage
export function getFromLocalStorage(key: string): any {
  try {
    const serializedData = localStorage.getItem(key);
    if (serializedData === null) {
      return null;
    }
    return JSON.parse(serializedData);
  } catch (error) {
    console.error(`Error getting from localStorage (${key}):`, error);
    return null;
  }
}

// Remove data from local storage
export function removeFromLocalStorage(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing from localStorage (${key}):`, error);
  }
}

// Clear all data from local storage
export function clearLocalStorage(): void {
  try {
    localStorage.clear();
  } catch (error) {
    console.error("Error clearing localStorage:", error);
  }
}

// Check if local storage is available
export function isLocalStorageAvailable(): boolean {
  try {
    const testKey = "__storage_test__";
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return true;
  } catch (error) {
    return false;
  }
}

// Export mood data as JSON file
export function exportMoodData(): void {
  try {
    const moodData = getFromLocalStorage("mood-entries");
    if (!moodData || !moodData.length) {
      throw new Error("No mood data available to export");
    }
    
    const dataStr = JSON.stringify(moodData, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement("a");
    link.href = url;
    link.download = `mood-journal-export-${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error exporting mood data:", error);
    throw error;
  }
}
