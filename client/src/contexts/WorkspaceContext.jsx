import { createContext, useState } from 'react';

export const WorkspaceContext = createContext();

export function WorkspaceProvider({ children }) {
  const [activeView, setActiveView] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(
    window.matchMedia('(min-width: 600px)').matches
  );
  const [edit, setEdit] = useState(false);

  return (
    <WorkspaceContext.Provider
      value={{
        activeView,
        setActiveView,
        sidebarOpen,
        setSidebarOpen,
        edit,
        setEdit,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
}
