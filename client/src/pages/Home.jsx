import { useContext, useEffect, useState } from 'react';
import { Link } from 'wouter';
import { AuthContext } from '../contexts/AuthContext';
import Loading from '../components/Loading';

function Home() {
  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userLoading } = useContext(AuthContext);

  useEffect(() => {
    const getSites = async () => {
      const response = await fetch('/api/sites');
      const data = await response.json();

      if (!data.error) {
        setSites(data.sites);
      } else {
        alert(data.message);
      }

      setLoading(false);
    };

    if (!userLoading) {
      getSites();
    }
  }, [userLoading]);

  if (userLoading) {
    return (
      <div className="h-screen bg-blue-200 grid place-items-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-blue-200">
      <h1 className="text-4xl text-center font-bold mb-6">Select Site</h1>
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-4 max-w-3xl p-6">
            {sites.map(site => (
              <li key={site.id}>
                <Link
                  href={`/workspace/${site.id}`}
                  className="bg-blue-400 border-2 border-blue-800 hover:bg-blue-500 text-xl text-white font-medium px-4 py-2 rounded-lg"
                >
                  {site.name}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/new"
                className="bg-blue-400 border-2 border-blue-800 hover:bg-blue-500 text-xl text-white font-medium px-4 py-2 rounded-lg flex gap-2 items-center"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
                Add New Site
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}

export default Home;
