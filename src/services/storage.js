import initialPrompts from '../data/initialPrompts.json';
import { fetchFirebasePrompts, saveFirebasePrompt } from './firebase';

const LOCAL_STORAGE_KEY = 'gpt_image2_prompts';
const DELETED_IDS_KEY = 'gpt_image2_deleted_ids';
const UPDATED_PROMPTS_KEY = 'gpt_image2_updated_prompts';
const FIREBASE_CONFIG_KEY = 'gpt_image2_firebase_config';

export const getStoredPrompts = async () => {
  let localData = [];
  let deletedIds = [];
  let updatedPrompts = {};

  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw) localData = JSON.parse(raw);

    const rawDeleted = localStorage.getItem(DELETED_IDS_KEY);
    if (rawDeleted) deletedIds = JSON.parse(rawDeleted);

    const rawUpdated = localStorage.getItem(UPDATED_PROMPTS_KEY);
    if (rawUpdated) updatedPrompts = JSON.parse(rawUpdated);
  } catch (e) {
    console.error('Error reading localStorage', e);
  }

  const mergedMap = new Map();

  initialPrompts.forEach(item => {
    if (!deletedIds.includes(item.id)) {
      const updated = updatedPrompts[item.id] ? { ...item, ...updatedPrompts[item.id] } : item;
      mergedMap.set(item.id, updated);
    }
  });

  localData.forEach(item => {
    if (!deletedIds.includes(item.id)) {
      const updated = updatedPrompts[item.id] ? { ...item, ...updatedPrompts[item.id] } : item;
      mergedMap.set(item.id, updated);
    }
  });

  const fbPrompts = await fetchFirebasePrompts();
  if (fbPrompts && fbPrompts.length > 0) {
    fbPrompts.forEach(item => {
      if (!deletedIds.includes(item.id)) {
        const updated = updatedPrompts[item.id] ? { ...item, ...updatedPrompts[item.id] } : item;
        mergedMap.set(item.id, updated);
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

export const updateStoredPrompt = (id, updatedFields) => {
  try {
    const rawUpdated = localStorage.getItem(UPDATED_PROMPTS_KEY);
    const existingUpdated = rawUpdated ? JSON.parse(rawUpdated) : {};
    existingUpdated[id] = { ...existingUpdated[id], ...updatedFields };
    localStorage.setItem(UPDATED_PROMPTS_KEY, JSON.stringify(existingUpdated));
  } catch (e) {
    console.error('Failed to update prompt', e);
  }
};

export const deleteStoredPrompt = (id) => {
  try {
    const rawDeleted = localStorage.getItem(DELETED_IDS_KEY);
    const deletedIds = rawDeleted ? JSON.parse(rawDeleted) : [];
    if (!deletedIds.includes(id)) {
      deletedIds.push(id);
      localStorage.setItem(DELETED_IDS_KEY, JSON.stringify(deletedIds));
    }

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
