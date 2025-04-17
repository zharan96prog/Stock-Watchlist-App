export default function Input({ placeholder, className, ...props }) {
  let placeholderText = placeholder || 'Enter text';
  return (
    <input
      {...props}
      className={`border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent ${className}`}
      placeholder={placeholderText}
    />
  );
}
