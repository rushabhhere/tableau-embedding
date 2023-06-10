import { useState } from 'react';
import { useLocation } from 'wouter';

function CreateSite() {
  const [name, setName] = useState('');
  const [tableauUsername, setTableauUsername] = useState('');
  const [tableauClientId, setTableauClientId] = useState('');
  const [tableauSecretId, setTableauSecretId] = useState('');
  const [tableauSecretValue, setTableauSecretValue] = useState('');
  const [tableauPatName, setTableauPatName] = useState('');
  const [tableauPatSecret, setTableauPatSecret] = useState('');
  const [tableauApiBaseUrl, setTableauApiBaseUrl] = useState('');
  const [tableauSiteName, setTableauSiteName] = useState('');

  const [, setLocation] = useLocation();

  const addSite = async e => {
    e.preventDefault();

    try {
      const response = await fetch('/api/sites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          tableau_username: tableauUsername,
          tableau_client_id: tableauClientId,
          tableau_secret_id: tableauSecretId,
          tableau_secret_value: tableauSecretValue,
          tableau_pat_name: tableauPatName,
          tableau_pat_secret: tableauPatSecret,
          tableau_api_base_url: tableauApiBaseUrl,
          tableau_site_name: tableauSiteName,
        }),
      });
      const data = await response.json();

      if (!data.error) {
        setLocation('/');
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen py-5 flex flex-col items-center justify-center bg-blue-200">
      <h1 className="text-4xl font-bold">Add Site</h1>
      <form onSubmit={addSite} className="flex flex-col mt-8 w-72 max-w-[90%]">
        <input
          className="px-3 py-2 rounded-md border-2 border-blue-600 outline-none"
          type="text"
          required
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Site Name"
        />
        <input
          className="px-3 py-2 rounded-md border-2 border-blue-600 outline-none mt-3"
          type="text"
          required
          value={tableauUsername}
          onChange={e => setTableauUsername(e.target.value)}
          placeholder="Tableau Username"
        />
        <input
          className="px-3 py-2 rounded-md border-2 border-blue-600 outline-none mt-3"
          type="text"
          required
          value={tableauClientId}
          onChange={e => setTableauClientId(e.target.value)}
          placeholder="Tableau Client ID"
        />
        <input
          className="px-3 py-2 rounded-md border-2 border-blue-600 outline-none mt-3"
          type="text"
          required
          value={tableauSecretId}
          onChange={e => setTableauSecretId(e.target.value)}
          placeholder="Tableau Secret ID"
        />
        <input
          className="px-3 py-2 rounded-md border-2 border-blue-600 outline-none mt-3"
          type="password"
          required
          value={tableauSecretValue}
          onChange={e => setTableauSecretValue(e.target.value)}
          placeholder="Tableau Secret Value"
        />
        <input
          className="px-3 py-2 rounded-md border-2 border-blue-600 outline-none mt-3"
          type="text"
          required
          value={tableauPatName}
          onChange={e => setTableauPatName(e.target.value)}
          placeholder="Tableau PAT Name"
        />
        <input
          className="px-3 py-2 rounded-md border-2 border-blue-600 outline-none mt-3"
          type="password"
          required
          value={tableauPatSecret}
          onChange={e => setTableauPatSecret(e.target.value)}
          placeholder="Tableau PAT Secret"
        />
        <input
          className="px-3 py-2 rounded-md border-2 border-blue-600 outline-none mt-3"
          type="text"
          required
          value={tableauApiBaseUrl}
          onChange={e => setTableauApiBaseUrl(e.target.value)}
          placeholder="Tableau API Base URL"
        />
        <input
          className="px-3 py-2 rounded-md border-2 border-blue-600 outline-none mt-3"
          type="text"
          required
          value={tableauSiteName}
          onChange={e => setTableauSiteName(e.target.value)}
          placeholder="Tableau Site Name"
        />
        <button
          className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-2 rounded-md self-center mt-3"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreateSite;
