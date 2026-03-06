import { configureStore } from "@reduxjs/toolkit"

import authReducer from "./slices/authSlice.js"
import userReducer from "./slices/userSlice.js"
import propertyReducer from "./slices/propertySlice.js"
import paymentReducer from "./slices/paymentSlice.js"
import rentalReducer from "./slices/rentalSlice.js"

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    property: propertyReducer,
    payment: paymentReducer,
    rental: rentalReducer
  }
})

export default store