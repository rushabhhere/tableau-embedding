import { useContext, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useLocation } from 'wouter';

function Workspace() {
  const { user } = useContext(AuthContext);
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!user) {
      setLocation('/login');
    }
  }, [user]);

  return <div>Workspace</div>;
}

export default Workspace;
