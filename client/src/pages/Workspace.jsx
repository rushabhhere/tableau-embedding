import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { WorkspaceProvider } from '../contexts/WorkspaceContext';
import Loading from '../components/Loading';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Embed from '../components/Embed';

function Workspace({ params }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const [, setLocation] = useLocation();

  useEffect(() => {
    const getProjects = async () => {
      const data = await fetch(`/api/tableau/projects?siteId=${params.siteId}`);
      const response = await data.json();

      if (!response.error) {
        setProjects(response.projects);
      } else {
        alert(response.message);
        return setLocation('/');
      }

      setLoading(false);
    };

    getProjects();
  }, [params.siteId]);

  if (loading) {
    return (
      <div className="h-screen bg-blue-200 grid place-items-center">
        <Loading />
      </div>
    );
  }

  return (
    <WorkspaceProvider>
      <div className="h-screen">
        <Header />
        <div className={`h-[calc(100%-45px)] flex`}>
          <Sidebar projects={projects} />
          <Embed activeSiteId={params.siteId} />
        </div>
      </div>
    </WorkspaceProvider>
  );
}

export default Workspace;
