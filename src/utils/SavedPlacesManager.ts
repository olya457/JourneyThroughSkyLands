import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Place {
  id: string;
  imageName: string;
  title: string;
  description: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

const STORAGE_KEY = 'saved_places';

const SavedPlacesManager = {
  async getAll(): Promise<Place[]> {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  async save(place: Omit<Place, 'id'>): Promise<void> {
    const existing = await SavedPlacesManager.getAll();
    const alreadySaved = existing.some(p => p.title === place.title);
    if (!alreadySaved) {
      const newPlace: Place = {
        ...place,
        id: place.title, 
      };
      const updated = [...existing, newPlace];
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    }
  },

  async remove(title: string): Promise<void> {
    const existing = await SavedPlacesManager.getAll();
    const updated = existing.filter(p => p.title !== title);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  },

  async isSaved(title: string): Promise<boolean> {
    const existing = await SavedPlacesManager.getAll();
    return existing.some(p => p.title === title);
  },
};

export default SavedPlacesManager;
