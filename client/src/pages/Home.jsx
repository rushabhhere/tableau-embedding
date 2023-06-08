import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

function Home() {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <h1>Home</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}

export default Home;
