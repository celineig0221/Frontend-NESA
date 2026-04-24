function FormInput({ label, type, name, value, onChange, placeholder, required, readOnly }) {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-medium mb-2">
        {label}
      </label>
      <input
        type={type || 'text'}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder || ''}
        required={required || false}
        readOnly={readOnly || false}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
      />
    </div>
  )
}

export default FormInput