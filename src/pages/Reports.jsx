import { useState } from 'react'

function Reports() {
  const [selectedMonth, setSelectedMonth] = useState('')

  const salaries = JSON.parse(localStorage.getItem('salaries')) || []

  const filteredSalaries = selectedMonth
    ? salaries.filter((sal) => sal.month === selectedMonth)
    : salaries

  const totalGross = filteredSalaries.reduce((sum, sal) => sum + Number(sal.grossSalary), 0)
  const totalDeduction = filteredSalaries.reduce((sum, sal) => sum + Number(sal.totalDeduction), 0)
  const totalNet = filteredSalaries.reduce((sum, sal) => sum + Number(sal.netSalary), 0)

  const months = [...new Set(salaries.map((sal) => sal.month))].sort()

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Monthly Payroll Report
      </h2>

      {/* Filter */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="flex flex-wrap items-center gap-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Select Month
            </label>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Months</option>
              {months.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handlePrint}
            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium"
          >
            Print Report
          </button>
        </div>
      </div>

      {/* Report */}
      <div className="bg-white p-6 rounded-lg shadow-md" id="report">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">SmartPark</h1>
          <h2 className="text-lg text-gray-600">Monthly Employee Payroll Report</h2>
          <p className="text-gray-500">
            {selectedMonth ? `Month: ${selectedMonth}` : 'All Months'}
          </p>
          <p className="text-gray-500">Total Employees: {filteredSalaries.length}</p>
        </div>

        {filteredSalaries.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            No salary records found for this period.
          </p>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-blue-600 text-white">
                  <tr>
                    <th className="p-3 text-left">No</th>
                    <th className="p-3 text-left">First Name</th>
                    <th className="p-3 text-left">Last Name</th>
                    <th className="p-3 text-left">Position</th>
                    <th className="p-3 text-left">Department</th>
                    <th className="p-3 text-right">Net Salary (RWF)</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSalaries.map((sal, index) => (
                    <tr key={sal.id} className={`border-b ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                      <td className="p-3">{index + 1}</td>
                      <td className="p-3">{sal.firstName}</td>
                      <td className="p-3">{sal.lastName}</td>
                      <td className="p-3">{sal.position}</td>
                      <td className="p-3">{sal.departmentCode}</td>
                      <td className="p-3 text-right font-medium">
                        {Number(sal.netSalary).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Summary */}
            <div className="mt-6 p-4 bg-gray-100 rounded-lg">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-gray-600">Total Gross Salary</p>
                  <p className="text-xl font-bold text-blue-600">
                    {totalGross.toLocaleString()} RWF
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Total Deductions</p>
                  <p className="text-xl font-bold text-red-600">
                    {totalDeduction.toLocaleString()} RWF
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Total Net Salary</p>
                  <p className="text-xl font-bold text-green-600">
                    {totalNet.toLocaleString()} RWF
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Reports