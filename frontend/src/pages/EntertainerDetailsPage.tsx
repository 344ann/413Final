import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Entertainer } from '../types/Entertainer';
import { deleteEntertainer, fetchEntertainerById } from '../api/EntertainerAPI';
import EditEntertainerForm from '../components/EditEntertainerForm';

const EntertainerDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [entertainer, setEntertainer] = useState<Entertainer | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const loadEntertainer = async () => {
      try {
        if (!id) return;
        const data = await fetchEntertainerById(parseInt(id));
        setEntertainer(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadEntertainer();
  }, [id]);

  const handleDelete = async () => {
    if (!entertainer) return;

    const confirm = window.confirm(
      'Are you sure you want to delete this entertainer?'
    );
    if (!confirm) return;

    try {
      await deleteEntertainer(entertainer.entertainerID);
      navigate('/entertainers');
    } catch (err) {
      alert('Failed to delete entertainer.');
    }
  };

  const handleEditSuccess = () => {
    setEditing(false);
    if (id) {
      fetchEntertainerById(parseInt(id)).then(setEntertainer);
    }
  };

  if (loading) return <p>Loading entertainer...</p>;
  if (error) return <p className="text-danger">Error: {error}</p>;
  if (!entertainer) return <p>Entertainer not found.</p>;

  return (
    <div className="container mt-4">
      <h2>Entertainer Details</h2>
      {!editing ? (
        <>
          <ul className="list-group mb-4">
            <li className="list-group-item">
              <strong>Stage Name:</strong> {entertainer.entStageName}
            </li>
            <li className="list-group-item">
              <strong>SSN:</strong> {entertainer.entSSN}
            </li>
            <li className="list-group-item">
              <strong>Street Address:</strong> {entertainer.entStreetAddress}
            </li>
            <li className="list-group-item">
              <strong>City:</strong> {entertainer.entCity}
            </li>
            <li className="list-group-item">
              <strong>State:</strong> {entertainer.entState}
            </li>
            <li className="list-group-item">
              <strong>Zip Code:</strong> {entertainer.entZipCode}
            </li>
            <li className="list-group-item">
              <strong>Phone Number:</strong> {entertainer.entPhoneNumber}
            </li>
            <li className="list-group-item">
              <strong>Web Page:</strong> {entertainer.entWebPage}
            </li>
            <li className="list-group-item">
              <strong>Email Address:</strong> {entertainer.entEMailAddress}
            </li>
            <li className="list-group-item">
              <strong>Date Entered:</strong> {entertainer.dateEntered}
            </li>
          </ul>

          <button
            className="btn btn-primary me-2"
            onClick={() => setEditing(true)}
          >
            Edit
          </button>
          <button className="btn btn-danger" onClick={handleDelete}>
            Delete
          </button>
          <br />
          <button
            className="btn btn-secondary mt-2"
            onClick={() => navigate('/entertainers')}
          >
            Go Back
          </button>
        </>
      ) : (
        <EditEntertainerForm
          entertainer={entertainer}
          onSuccess={handleEditSuccess}
          onCancel={() => setEditing(false)}
        />
      )}
    </div>
  );
};

export default EntertainerDetailsPage;
