import initialPrompts from '../data/initialPrompts.json';
import { fetchFirebasePrompts, saveFirebasePrompt } from './firebase';

const LOCAL_STORAGE_KEY = 'gpt_image2_prompts';
const DELETED_IDS_KEY = 'gpt_image2_deleted_ids';
const FIREBASE_CONFIG_KEY = 'gpt_image2_firebase_config';

export const getStoredPrompts = async () => {
  let localData = [];
  let deletedIds = [];

  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw) localData = JSON.parse(raw);

    const rawDeleted = localStorage.getItem(DELETED_IDS_KEY);
    if (rawDeleted) deletedIds = JSON.parse(rawDeleted);
  } catch (e) {
    console.error('Error reading localStorage', e);
  }

  // Merge initialPrompts with local user additions
  const mergedMap = new Map();
  initialPrompts.forEach(item => {
    if (!deletedIds.includes(item.id)) {
      mergedMap.set(item.id, item);
    }
  });

  localData.forEach(item => {
    if (!deletedIds.includes(item.id)) {
      mergedMap.set(item.id, item);
    }
  });

  // Try fetching from Firebase if available
  const fbPrompts = await fetchFirebasePrompts();
  if (fbPrompts && fbPrompts.length > 0) {
    fbPrompts.forEach(item => {
      if (!deletedIds.includes(item.id)) {
        mergedMap.set(item.id, item);
      }
    });
  }

  return Array.from(mergedMap.values());
};

export const addNewPrompt = async (newPromptData) => {
  const promptItem = {
    id: `custom-${Date.now()}`,
    ...newPromptData,
    createdAt: new Date().toISOString()
  };

  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    const existing = raw ? JSON.parse(raw) : [];
    existing.unshift(promptItem);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(existing));
  } catch (e) {
    console.error('Failed to save to localStorage', e);
  }

  await saveFirebasePrompt(promptItem);
  return promptItem;
};

export const deleteStoredPrompt = (id) => {
  try {
    const rawDeleted = localStorage.getItem(DELETED_IDS_KEY);
    const deletedIds = rawDeleted ? JSON.parse(rawDeleted) : [];
    if (!deletedIds.includes(id)) {
      deletedIds.push(id);
      localStorage.setItem(DELETED_IDS_KEY, JSON.stringify(deletedIds));
    }

    // Also remove from local additions if present
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw) {
      const existing = JSON.parse(raw);
      const filtered = existing.filter(item => item.id !== id);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filtered));
    }
  } catch (e) {
    console.error('Failed to delete prompt', e);
  }
};

export const getSavedFirebaseConfig = () => {
  try {
    const raw = localStorage.getItem(FIREBASE_CONFIG_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const saveFirebaseConfigToStorage = (config) => {
  try {
    localStorage.setItem(FIREBASE_CONFIG_KEY, JSON.stringify(config));
  } catch (e) {
    console.error('Failed to save config', e);
  }
};
