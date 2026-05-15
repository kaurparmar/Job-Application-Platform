const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000"

export const USER_API_ENDPOINT = `${API_BASE}/api/users`
export const JOB_API_ENDPOINT = `${API_BASE}/api/job`
export const APPLICATION_API_ENDPOINT = `${API_BASE}/api/application`
export const COMPANY_API_ENDPOINT = `${API_BASE}/api/company`