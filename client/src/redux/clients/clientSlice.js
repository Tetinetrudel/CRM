import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  clients: [],
  error: null,
  loading: false,
}

const clientSlice = createSlice({
  name: 'client',
  initialState,
  reducers: {
    getClientsStart: (state) => {
      state.loading = true
      state.error = null
    },
    getClientsSuccess: (state, action) => {
      state.clients = action.payload
      state.loading = false
      state.error = null
    },
    getClientsFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    clearAllClients: (state) => {
        state.clients = []
        state.error = null
        state.loading = false
    }
  },
})

export const {
  getClientsStart,
  getClientsSuccess,
  getClientsFailure,
  clearAllClients
} = clientSlice.actions

export default clientSlice.reducer