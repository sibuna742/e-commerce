import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signin() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      

      if (!res.ok) {
        setError(data.message || 'Login failed');
        return;
      }

      const token = data.token.replace('Bearer ', '');
      // const decoded = JSON.parse(atob(token.split('.')[1])); // Decode payload (for role, id)
      const decoded = data.user;
      // console.log(user);
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify({ name: decoded.name, role: decoded.role }));

      navigate('/');
    } catch (err) {
      setError('Server error');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-green-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Signin;
