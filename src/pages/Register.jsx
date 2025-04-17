import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { registerUser } from '../redux/slices/authSlice';

export default function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();

    const passwordValidation = validatePassword(password);
    if (passwordValidation !== true) {
      setPasswordError(passwordValidation);
      return;
    }
    setPasswordError('');

    dispatch(registerUser({ email, password, navigate }));
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleRegister} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2"
        />
        {passwordError && <p className="text-red-500">{passwordError}</p>}
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
}

const validatePassword = (password) => {
  const minLength = 6;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  if (password.length < minLength) {
    return 'Password must be at least 6 characters long';
  }
  if (!hasUpperCase) {
    return 'Password must contain at least one uppercase letter';
  }
  if (!hasNumber) {
    return 'Password must contain at least one number';
  }

  return true;
};
