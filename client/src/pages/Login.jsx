import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Link, useLocation } from 'wouter';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login } = useContext(AuthContext);

  const [, setLocation] = useLocation();

  const handleLogin = async e => {
    e.preventDefault();

    try {
      await login(email, password);
      setEmail('');
      setPassword('');
      setLocation('/');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-blue-200">
      <h1 className="text-4xl font-bold">Login</h1>
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
        <button
          className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-2 rounded-md self-center mt-3"
          type="submit"
        >
          Submit
        </button>
        <span className="text-center mt-3">Don't have an account?</span>
        <Link className="text-center text-blue-600 underline" href="/register">
          Register
        </Link>
      </form>
    </div>
  );
}

export default Login;
