import { useContext, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useLocation } from 'wouter';

function Workspace({ params }) {
  return <div>Workspace {params.siteId}</div>;
}

export default Workspace;
