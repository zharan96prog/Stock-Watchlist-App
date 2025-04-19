import { useEffect } from 'react';

export default function NotificationBadge({ message, type, onClose }) {
  const badgeStyles = {
    success: 'bg-green-500 text-white',
    error: 'bg-red-500 text-white',
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed top-4 right-4 px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 ${
        badgeStyles[type] || 'bg-gray-500 text-white'
      }`}
    >
      <span>{message}</span>
      <button
        onClick={onClose}
        className="text-white font-bold hover:opacity-80"
      >
        ✕
      </button>
    </div>
  );
}
