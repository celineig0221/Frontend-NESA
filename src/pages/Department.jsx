import React, { useState } from 'react';

function Department() {
  const [formData, setFormData] = useState({
    departmentCode: '',
    departmentName: '',
    grossSalary: ''
  });

  const [departments, setDepartments] = useState([]);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newDepartment = { ...formData, id: Date.now() };
    setDepartments([...departments, newDepartment]);
    
    setMessage('Department added successfully!');
    setTimeout(() => setMessage(''), 3000);
    
    setFormData({
      departmentCode: '',
      departmentName: '',
      grossSalary: ''
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Department Management</h2>
        
        {message && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {message}
          </div>
        )}

        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Department Information</h3>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full bg-gray-50 border">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2 border">Department Code</th>
                  <th className="px-4 py-2 border">Department Name</th>
                  <th className="px-4 py-2 border">Gross Salary (RWF)</th>
                  <th className="px-4 py-2 border">Total Deduction (RWF)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 border">CW</td>
                  <td className="px-4 py-2 border">Carwash</td>
                  <td className="px-4 py-2 border">300,000</td>
                  <td className="px-4 py-2 border">20,000</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border">ST</td>
                  <td className="px-4 py-2 border">Stock</td>
                  <td className="px-4 py-2 border">200,000</td>
                  <td className="px-4 py-2 border">5,000</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border">MC</td>
                  <td className="px-4 py-2 border">Mechanic</td>
                  <td className="px-4 py-2 border">450,000</td>
                  <td className="px-4 py-2 border">40,000</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border">ADMS</td>
                  <td className="px-4 py-2 border">Administration Staff</td>
                  <td className="px-4 py-2 border">600,000</td>
                  <td className="px-4 py-2 border">70,000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-700 mb-2">Department Code *</label>
              <input
                type="text"
                name="departmentCode"
                value={formData.departmentCode}
                onChange={handleChange}
                placeholder="e.g., HR, IT"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Department Name *</label>
              <input
                type="text"
                name="departmentName"
                value={formData.departmentName}
                onChange={handleChange}
                placeholder="Department Name"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Gross Salary (RWF) *</label>
              <input
                type="number"
                name="grossSalary"
                value={formData.grossSalary}
                onChange={handleChange}
                placeholder="Gross Salary"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
            >
              Add Department
            </button>
          </div>
        </form>

        {departments.length > 0 && (
          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4">Added Departments</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="px-4 py-2 border">Code</th>
                    <th className="px-4 py-2 border">Name</th>
                    <th className="px-4 py-2 border">Gross Salary</th>
                  </tr>
                </thead>
                <tbody>
                  {departments.map(dept => (
                    <tr key={dept.id}>
                      <td className="px-4 py-2 border">{dept.departmentCode}</td>
                      <td className="px-4 py-2 border">{dept.departmentName}</td>
                      <td className="px-4 py-2 border">{dept.grossSalary}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Department;