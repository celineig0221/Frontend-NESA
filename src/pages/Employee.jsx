import { useState, useEffect } from 'react'
import FormInput from '../components/FormInput'

function Employee() {
  const [form, setForm] = useState({
    employeeNumber: '',
    firstName: '',
    lastName: '',
    position: '',
    address: '',
    telephone: '',
    gender: '',
    hiredDate: '',
    departmentCode: ''
  })

  const [employees, setEmployees] = useState([])
  const [departments, setDepartments] = useState([])

  useEffect(() => {
    const savedEmployees = JSON.parse(localStorage.getItem('employees')) || []
    const savedDepts = JSON.parse(localStorage.getItem('departments')) || []
    setEmployees(savedEmployees)
    setDepartments(savedDepts)
  }, [])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const newEmployee = {
      id: Date.now(),
      ...form
    }

    const updatedEmployees = [...employees, newEmployee]
    setEmployees(updatedEmployees)
    localStorage.setItem('employees', JSON.stringify(updatedEmployees))

    setForm({
      employeeNumber: '',
      firstName: '',
      lastName: '',
      position: '',
      address: '',
      telephone: '',
      gender: '',
      hiredDate: '',
      departmentCode: ''
    })

    alert('Employee added successfully!')
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Add Employee
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <form onSubmit={handleSubmit}>
            <FormInput
              label="Employee Number"
              name="employeeNumber"
              value={form.employeeNumber}
              onChange={handleChange}
              placeholder="e.g. EMP001"
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <FormInput
                label="First Name"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder="John"
                required
              />
              <FormInput
                label="Last Name"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Doe"
                required
              />
            </div>

            <FormInput
              label="Position"
              name="position"
              value={form.position}
              onChange={handleChange}
              placeholder="e.g. Manager"
              required
            />

            <FormInput
              label="Address"
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="e.g. Rubavu"
              required
            />

            <FormInput
              label="Telephone"
              name="telephone"
              value={form.telephone}
              onChange={handleChange}
              placeholder="e.g. 0780000000"
              required
            />

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Gender</label>
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <FormInput
              label="Hired Date"
              type="date"
              name="hiredDate"
              value={form.hiredDate}
              onChange={handleChange}
              required
            />

            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Department</label>
              <select
                name="departmentCode"
                value={form.departmentCode}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Department</option>
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.departmentCode}>
                    {dept.departmentCode} - {dept.departmentName}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-colors"
            >
              Add Employee
            </button>
          </form>
        </div>

        {/* Table */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-bold text-gray-700 mb-4">
            Employee List
          </h3>

          {employees.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No employees added yet.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-3 text-left">Emp No</th>
                    <th className="p-3 text-left">Name</th>
                    <th className="p-3 text-left">Position</th>
                    <th className="p-3 text-left">Dept</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((emp) => (
                    <tr key={emp.id} className="border-b">
                      <td className="p-3">{emp.employeeNumber}</td>
                      <td className="p-3">{emp.firstName} {emp.lastName}</td>
                      <td className="p-3">{emp.position}</td>
                      <td className="p-3">{emp.departmentCode}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Employee