import { createAsyncThunk } from "@reduxjs/toolkit"
import api from "./api"

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/register", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      })
      return res.data.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Registration failed")
    }
  }
)

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/login", credentials)
      return res.data.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed")
    }
  }
)

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await api.post("/auth/logout")
      return true
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Logout failed")
    }
  }
)

export const sendOtp = createAsyncThunk(
  "auth/sendOtp",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/send-otp")
      return res.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to send OTP")
    }
  }
)

export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async (otp, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/verify-otp", { otp })
      return res.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "OTP verification failed")
    }
  }
)

export const sendForgotPasswordOtp = createAsyncThunk(
  "auth/sendForgotPasswordOtp",
  async (email, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/forgot-password", { email })
      return res.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to send OTP")
    }
  }
)

export const verifyForgotPasswordOtp = createAsyncThunk(
  "auth/verifyForgotPasswordOtp",
  async (otp, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/verify-forgot-otp", { otp })
      return res.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "OTP verification failed")
    }
  }
)

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/reset-password", data)
      return res.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Password reset failed")
    }
  }
)

export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.patch("/auth/me/change-password", data)
      return res.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Password change failed")
    }
  }
)