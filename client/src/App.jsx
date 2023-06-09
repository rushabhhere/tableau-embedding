import { Route, Switch, useLocation } from 'wouter';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Workspace from './pages/Workspace';
import NotFound from './pages/404';
import CreateSite from './pages/CreateSite';
import { useContext, useEffect } from 'react';
import { AuthContext } from './contexts/AuthContext';

function App() {
  const { user, userLoading } = useContext(AuthContext);
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!userLoading && !user) {
      setLocation('/login');
    }
  }, [user, userLoading]);

  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/new" component={CreateSite} />
      <Route path="/workspace/:siteId" component={Workspace} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default App;
