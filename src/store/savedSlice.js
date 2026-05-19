import { createSlice } from '@reduxjs/toolkit'

const loadFromStorage = () => {
  try {
    const stored = localStorage.getItem('foodfacts-saved')
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

const savedSlice = createSlice({
  name: 'saved',
  initialState: {
    items: loadFromStorage(),
  },
  reducers: {
    addItem: (state, action) => {
      const exists = state.items.some((item) => item.code === action.payload.code)
      if (!exists) {
        state.items.push(action.payload)
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.code !== action.payload)
    },
  },
})

export const { addItem, removeItem } = savedSlice.actions
export default savedSlice.reducer
