import { IChat } from '../types'

// Utility function to save state to local storage
export const saveToLocalStorage = (key: string, value: [IChat]) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error(`Error saving to localStorage key=${key}: `, error)
  }
}

// Utility function to load state from local storage
export const loadFromLocalStorage = (key: string, defaultValue: IChat) => {
  try {
    const savedValue = localStorage.getItem(key)
    if (savedValue) {
      return JSON.parse(savedValue)
    }
  } catch (error) {
    console.error(`Error loading from localStorage key=${key}: `, error)
  }

  return defaultValue
}
