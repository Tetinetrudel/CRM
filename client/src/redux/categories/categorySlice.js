import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  categories: [],
  error: null,
  loading: false,
}

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    getCategoriesStart: (state) => {
      state.loading = true
      state.error = null
    },
    getCategoriesSuccess: (state, action) => {
      state.categories = action.payload
      state.loading = false
      state.error = null
    },
    getCategoriesFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    clearAllCategories: (state) => {
        state.categories = []
        state.error = null
        state.loading = false
    }
  },
})

export const {
  getCategoriesStart,
  getCategoriesSuccess,
  getCategoriesFailure,
  clearAllCategories
} = categorySlice.actions

export default categorySlice.reducer