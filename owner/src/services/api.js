import axios from "axios"

const api = axios.create({
  baseURL: "https://dwellio.tejasclod.cloud/api/v1",
  withCredentials: true
})

let isRefreshing = false

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config

    // never retry the refresh endpoint itself
    if (originalRequest.url?.includes("/auth/refresh")) {
      return Promise.reject(error)
    }

    if (error.response?.status === 401 && !originalRequest._retry && !isRefreshing) {
      originalRequest._retry = true
      isRefreshing = true
      try {
        await api.post("/auth/refresh")
        isRefreshing = false
        return api(originalRequest)
      } catch (err) {
        isRefreshing = false
        return Promise.reject(err)
      }
    }

    return Promise.reject(error)
  }
)

export default api