import React, { useState, useEffect } from 'react';

function Salary() {
  const [salaryData, setSalaryData] = useState({
    employeeNumber: '',
    grossSalary: '',
    totalDeduction: '',
    netSalary: '',
    month: ''
  });

  const [salaries, setSalaries] = useState([]);
  const [message, setMessage] = useState('');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchSalaries();
  }, []);

  const calculateNetSalary = () => {
    const gross = parseFloat(salaryData.grossSalary) || 0;
    const deduction = parseFloat(salaryData.totalDeduction) || 0;
    return gross - deduction;
  };

  const handleChange = (e) => {
    const updatedData = {
      ...salaryData,
      [e.target.name]: e.target.value
    };
    setSalaryData(updatedData);
    
    // Auto-calculate net salary
    if (e.target.name === 'grossSalary' || e.target.name === 'totalDeduction') {
      const gross = e.target.name === 'grossSalary' ? parseFloat(e.target.value) || 0 : parseFloat(salaryData.grossSalary) || 0;
      const deduction = e.target.name === 'totalDeduction' ? parseFloat(e.target.value) || 0 : parseFloat(salaryData.totalDeduction) || 0;
      const net = gross - deduction;
      setSalaryData(prev => ({ ...prev, netSalary: net.toString() }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const netSalary = calculateNetSalary();
    const newSalary = {
      ...salaryData,
      netSalary: netSalary.toString(),
      id: Date.now()
    };
    
    setSalaries([...salaries, newSalary]);
    setMessage('Salary record added successfully!');
    setTimeout(() => setMessage(''), 3000);
    
    setSalaryData({
      employeeNumber: '',
      grossSalary: '',
      totalDeduction: '',
      netSalary: '',
      month: ''
    });
  };

  const handleUpdate = (id) => {
    const salaryToUpdate = salaries.find(s => s.id === id);
    setEditingId(id);
    setSalaryData(salaryToUpdate);
  };

  const handleSaveUpdate = () => {
    const netSalary = calculateNetSalary();
    const updatedSalaries = salaries.map(s => 
      s.id === editingId ? { ...salaryData, netSalary: netSalary.toString(), id: editingId } : s
    );
    setSalaries(updatedSalaries);
    setEditingId(null);
    setMessage('Salary record updated successfully!');
    setTimeout(() => setMessage(''), 3000);
    
    setSalaryData({
      employeeNumber: '',
      grossSalary: '',
      totalDeduction: '',
      netSalary: '',
      month: ''
    });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this salary record?')) {
      const updatedSalaries = salaries.filter(s => s.id !== id);
      setSalaries(updatedSalaries);
      setMessage('Salary record deleted successfully!');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const fetchSalaries = () => {
    // This will be replaced with actual API call
    console.log('Fetching salaries from backend...');
  };

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                   'July', 'August', 'September', 'October', 'November', 'December'];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Salary Management</h2>
        
        {message && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {message}
          </div>
        )}

        <form onSubmit={editingId ? handleSaveUpdate : handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2">Employee Number *</label>
              <input
                type="text"
                name="employeeNumber"
                value={salaryData.employeeNumber}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Month *</label>
              <select
                name="month"
                value={salaryData.month}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                required
              >
                <option value="">Select Month</option>
                {months.map(month => (
                  <option key={month} value={month}>{month}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Gross Salary (RWF)</label>
              <input
                type="number"
                name="grossSalary"
                value={salaryData.grossSalary}
                onChange={handleChange}
                placeholder="Gross Salary"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Total Deduction (RWF)</label>
              <input
                type="number"
                name="totalDeduction"
                value={salaryData.totalDeduction}
                onChange={handleChange}
                placeholder="Total Deduction"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Net Salary (RWF)</label>
              <input
                type="text"
                name="netSalary"
                value={calculateNetSalary()}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-100"
              />
            </div>
          </div>

          <div className="mt-6">
            {editingId ? (
              <div className="space-x-4">
                <button
                  type="button"
                  onClick={handleSaveUpdate}
                  className="bg-yellow-600 text-white px-6 py-2 rounded hover:bg-yellow-700 transition"
                >
                  Update Salary
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(null);
                    setSalaryData({
                      employeeNumber: '',
                      grossSalary: '',
                      totalDeduction: '',
                      netSalary: '',
                      month: ''
                    });
                  }}
                  className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
              >
                Add Salary Record
              </button>
            )}
          </div>
        </form>

        {salaries.length > 0 && (
          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4">Salary Records</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="px-4 py-2 border">Employee #</th>
                    <th className="px-4 py-2 border">Month</th>
                    <th className="px-4 py-2 border">Gross Salary</th>
                    <th className="px-4 py-2 border">Deduction</th>
                    <th className="px-4 py-2 border">Net Salary</th>
                    <th className="px-4 py-2 border">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {salaries.map(salary => (
                    <tr key={salary.id}>
                      <td className="px-4 py-2 border">{salary.employeeNumber}</td>
                      <td className="px-4 py-2 border">{salary.month}</td>
                      <td className="px-4 py-2 border">{salary.grossSalary}</td>
                      <td className="px-4 py-2 border">{salary.totalDeduction}</td>
                      <td className="px-4 py-2 border">{salary.netSalary}</td>
                      <td className="px-4 py-2 border">
                        <button
                          onClick={() => handleUpdate(salary.id)}
                          className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 mr-2"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => handleDelete(salary.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </td>
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

export default Salary;