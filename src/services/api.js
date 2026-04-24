import axios from 'axios'

const API_URL = 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const loginUser = (data) => api.post('/auth/login', data)
export const logoutUser = () => api.post('/auth/logout')
export const getEmployees = () => api.get('/employees')
export const addEmployee = (data) => api.post('/employees', data)
export const getDepartments = () => api.get('/departments')
export const addDepartment = (data) => api.post('/departments', data)
export const getSalaries = () => api.get('/salaries')
export const addSalary = (data) => api.post('/salaries', data)
export const updateSalary = (id, data) => api.put(`/salaries/${id}`, data)
export const deleteSalary = (id) => api.delete(`/salaries/${id}`)
export const getMonthlyReport = (month) => api.get(`/reports/monthly?month=${month}`)

export default api