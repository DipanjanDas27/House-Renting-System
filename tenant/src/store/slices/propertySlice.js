import { createSlice, isAnyOf } from "@reduxjs/toolkit"
import {
  getFilteredProperties,
  getProperty
} from "@/services/tenantPropertyThunks.js"

const initialState = {
  properties: [],
  property: null,
  loading: false,
  error: null
}

const propertySlice = createSlice({
  name: "property",
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    builder
      .addCase(getFilteredProperties.fulfilled, (state, action) => {
        state.properties = action.payload
      })
      .addCase(getProperty.fulfilled, (state, action) => {
        state.property = action.payload
      })

    builder
      .addMatcher(
        isAnyOf(
          getFilteredProperties.pending,
          getProperty.pending
        ),
        (state) => {
          state.loading = true
          state.error = null
        }
      )
      .addMatcher(
        isAnyOf(
          getFilteredProperties.fulfilled,
          getProperty.fulfilled
        ),
        (state) => {
          state.loading = false
        }
      )
      .addMatcher(
        isAnyOf(
          getFilteredProperties.rejected,
          getProperty.rejected
        ),
        (state, action) => {
          state.loading = false
          state.error = action.payload
        }
      )
  }
})

export default propertySlice.reducer