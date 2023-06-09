import { useContext } from 'react';
import { WorkspaceContext } from '../../contexts/WorkspaceContext';
import ViewWithPath from './ViewWithPath';

function SearchViews({ search, projects, resetSearch }) {
  const { setActiveView, setSidebarOpen, setEdit } =
    useContext(WorkspaceContext);

  const handleViewClick = view => {
    setActiveView(view);
    if (window.matchMedia('(max-width: 600px)').matches) {
      setSidebarOpen(false);
    }
    setEdit(false);
    resetSearch();
  };

  return (
    <ul>
      {projects.map(project => {
        return project.workbooks.map(workbook => {
          return workbook.views
            .filter(view =>
              view.path.toLowerCase().includes(search.toLowerCase())
            )
            .map(view => (
              <li key={view.id} onClick={() => handleViewClick(view)}>
                <ViewWithPath view={view} />
              </li>
            ));
        });
      })}
    </ul>
  );
}

export default SearchViews;
