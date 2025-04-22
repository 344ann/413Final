// src/pages/EntertainersListPage.tsx
import { useState } from 'react';
import EntertainersList from '../components/EntertainersList';
import AddEntertainerForm from '../components/AddEntertainerForm';

const EntertainersListPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [refreshList, setRefreshList] = useState(false); // used to refresh entertainers list after add

  const handleSuccess = () => {
    setRefreshList(!refreshList); // Toggle to trigger re-fetch in child
    setShowForm(false);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">List of Entertainers</h2>
      <EntertainersList refreshTrigger={refreshList} />

      {!showForm && (
        <div className="text-center mt-4">
          <button className="btn btn-primary" onClick={() => setShowForm(true)}>
            Add Entertainer
          </button>
        </div>
      )}

      {showForm && (
        <div className="mt-4">
          <AddEntertainerForm
            onSuccess={handleSuccess}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}
    </div>
  );
};

export default EntertainersListPage;
