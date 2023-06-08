import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useLocation } from 'wouter';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { login } = useContext(AuthContext);

  const [, setLocation] = useLocation();

  const handleLogin = async e => {
    e.preventDefault();

    try {
      await login(username, password);
      setUsername('');
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
        className="flex flex-col mt-8 w-72 max-w-[90%] gap-3"
      >
        <input
          className="px-3 py-2 rounded-md border-2 border-blue-600 outline-none"
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          className="px-3 py-2 rounded-md border-2 border-blue-600 outline-none"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-2 rounded-md self-center"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Login;
