import { useContext, useState } from 'react';
import { WorkspaceContext } from '../contexts/WorkspaceContext';
import ProjectDisplay from './ProjectDisplay';
import { useLocation } from 'wouter';

function Sidebar({ projects }) {
  const [search, setSearch] = useState('');
  const { sidebarOpen, logOut, setEdit, activeView, setActiveView } =
    useContext(WorkspaceContext);

  const [, setLocation] = useLocation();

  const goBack = () => {
    if (activeView) {
      setEdit(false);
      return setActiveView(null);
    }
    setLocation('/');
  };

  return (
    <div
      className={`h-full flex flex-col bg-blue-200 transition-all max-w-[275px] overflow-hidden ${
        sidebarOpen ? 'w-4/5 border-r-2 border-r-blue-600' : 'w-0'
      }`}
    >
      <input
        type="text"
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search..."
        className="border border-blue-600 rounded-sm px-2 py-1 mt-4 mx-4"
      />
      <div className="h-full mt-4 overflow-auto scrollbar-thin scrollbar-thumb-blue-600 scrollbar-track-rounded-md scrollbar-thumb-rounded-md">
        {search === '' ? (
          <ul>
            {projects.map(project => (
              <ProjectDisplay project={project} key={project.id} />
            ))}
          </ul>
        ) : (
          <SearchViews
            search={search}
            resetSearch={() => setSearch('')}
            projects={projects}
          />
        )}
      </div>
      <div className="p-4 border-t-2 border-t-blue-600 flex gap-3">
        <button
          onClick={goBack}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white flex-1 py-2 rounded-md self-center"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.85355 3.14645C7.04882 3.34171 7.04882 3.65829 6.85355 3.85355L3.70711 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H3.70711L6.85355 11.1464C7.04882 11.3417 7.04882 11.6583 6.85355 11.8536C6.65829 12.0488 6.34171 12.0488 6.14645 11.8536L2.14645 7.85355C1.95118 7.65829 1.95118 7.34171 2.14645 7.14645L6.14645 3.14645C6.34171 2.95118 6.65829 2.95118 6.85355 3.14645Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
          <span className="font-medium">Go Back</span>
        </button>
        <button
          onClick={logOut}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white flex-1 py-2 rounded-md self-center"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 1C2.44771 1 2 1.44772 2 2V13C2 13.5523 2.44772 14 3 14H10.5C10.7761 14 11 13.7761 11 13.5C11 13.2239 10.7761 13 10.5 13H3V2L10.5 2C10.7761 2 11 1.77614 11 1.5C11 1.22386 10.7761 1 10.5 1H3ZM12.6036 4.89645C12.4083 4.70118 12.0917 4.70118 11.8964 4.89645C11.7012 5.09171 11.7012 5.40829 11.8964 5.60355L13.2929 7H6.5C6.22386 7 6 7.22386 6 7.5C6 7.77614 6.22386 8 6.5 8H13.2929L11.8964 9.39645C11.7012 9.59171 11.7012 9.90829 11.8964 10.1036C12.0917 10.2988 12.4083 10.2988 12.6036 10.1036L14.8536 7.85355C15.0488 7.65829 15.0488 7.34171 14.8536 7.14645L12.6036 4.89645Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
          <span className="font-medium">Log Out</span>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
