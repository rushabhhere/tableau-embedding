import { useContext, useEffect, useState } from 'react';
import { WorkspaceContext } from '../contexts/WorkspaceContext';
import useMediaQuery from '../hooks/useMediaQuery';

function Embed({ activeSiteId }) {
  const { activeView, edit } = useContext(WorkspaceContext);
  const [token, setToken] = useState(null);
  const [device, setDevice] = useState('desktop');
  const isMobile = useMediaQuery('(max-width: 600px)');
  const isTablet = useMediaQuery('(max-width: 900px)');

  useEffect(() => {
    const getToken = async () => {
      if (activeView) {
        const data = await fetch(`/api/tableau/token?siteId=${activeSiteId}`);
        const response = await data.json();

        if (!response.error) {
          setToken(response.token);
        }
      }
    };

    getToken();
  }, [activeView, edit]);

  useEffect(() => {
    if (isMobile) {
      return setDevice('phone');
    }
    if (isTablet) {
      return setDevice('tablet');
    }
    setDevice('desktop');
  }, [isMobile, isTablet]);

  return (
    <div className="max-h-full overflow-y-hidden overflow-x-auto flex-1">
      {activeView && token ? (
        // https://help.tableau.com/current/api/embedding_api/en-us/docs/embedding_api_configure.html
        edit ? (
          <tableau-authoring-viz
            id="tableauViz"
            height="100%"
            width="100%"
            hide-tabs
            src={activeView.embedUrl}
            toolbar="top"
            token={token}
            hide-close-button
          ></tableau-authoring-viz>
        ) : (
          <tableau-viz
            id="tableauViz"
            height="100%"
            width="100%"
            hide-tabs
            hide-edit-button
            src={activeView.embedUrl}
            device={device}
            toolbar="top"
            token={token}
          ></tableau-viz>
        )
      ) : (
        <div className="h-full min-w-min flex-1 grid place-items-center">
          <div className="bg-blue-600 text-white text-center font-medium text-xl px-3 py-2 rounded-md mx-4 whitespace-nowrap">
            Please select a view <br /> from the sidebar!
          </div>
        </div>
      )}
    </div>
  );
}

export default Embed;
