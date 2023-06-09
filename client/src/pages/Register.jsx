import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Link, useLocation } from 'wouter';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { register } = useContext(AuthContext);

  const [, setLocation] = useLocation();

  const handleLogin = async e => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return alert('Passwords do not match');
    }

    try {
      await register(email, password);
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setLocation('/');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-blue-200">
      <h1 className="text-4xl font-bold">Register</h1>
      <form
        onSubmit={handleLogin}
        className="flex flex-col mt-8 w-72 max-w-[90%]"
      >
        <input
          className="px-3 py-2 rounded-md border-2 border-blue-600 outline-none"
          type="email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          className="px-3 py-2 rounded-md border-2 border-blue-600 outline-none mt-3"
          type="password"
          required
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
        />
        <input
          className="px-3 py-2 rounded-md border-2 border-blue-600 outline-none mt-3"
          type="password"
          required
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
        />
        <button
          className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-2 rounded-md self-center mt-3"
          type="submit"
        >
          Submit
        </button>
        <span className="text-center mt-3">Already have an account?</span>
        <Link className="text-center text-blue-600 underline" href="/login">
          Login
        </Link>
      </form>
    </div>
  );
}

export default Login;
