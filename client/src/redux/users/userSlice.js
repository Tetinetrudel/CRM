import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentUser: null,
  error: null,
  errorPassword: null,
  loading: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true
      state.error = null
      state.errorPassword = null
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload
      state.loading = false
      state.error = null
      state.errorPassword = null
    },
    signInFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
      state.errorPassword = null
    },
    updateUserStart: (state) => {
      state.loading = true
      state.error = null
      state.errorPassword = null
    },
    updateUserPasswordStart: (state) => {
      state.loading = true
      state.error = null
      state.errorPassword = null
    },
    updateUserSuccess: (state, action) => {
      state.currentUser = action.payload
      state.loading = false
      state.error = null
      state.errorPassword = null
    },
    updateUserPasswordSuccess: (state, action) => {
      state.currentUser = action.payload
      state.loading = false
      state.error = null
      state.errorPassword = null
    },
    updateUserFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
      state.errorPassword = null
    },
    updateUserPasswordFailure: (state, action) => {
      state.loading = false
      state.error = null
      state.errorPassword = action.payload
    },
    deleteUserStart: (state) => {
      state.loading = true
      state.error = null
      state.errorPassword = null
    },
    deleteUserSuccess: (state) => {
      state.currentUser = null
      state.loading = false
      state.error = null
      state.errorPassword = null
    },
    deleteUserFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
      state.errorPassword = null
    },
    signoutSuccess: (state) => {
      state.currentUser = null
      state.error = null
      state.loading = false
      state.errorPassword = null
    },
  },
})

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signoutSuccess,
  updateUserPasswordStart,
  updateUserPasswordSuccess,
  updateUserPasswordFailure
} = userSlice.actions

export default userSlice.reducer