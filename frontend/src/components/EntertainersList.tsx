import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EntertainerSummary } from '../types/EntertainerSummary';
import { fetchEntertainerSummaries } from '../api/EntertainerAPI';

interface EntertainersListProps {
  refreshTrigger: boolean;
}

const EntertainersList = ({ refreshTrigger }: EntertainersListProps) => {
  const [entertainers, setEntertainers] = useState<EntertainerSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const loadEntertainers = async () => {
      try {
        setLoading(true);
        const data = await fetchEntertainerSummaries();
        setEntertainers(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadEntertainers();
  }, [refreshTrigger]);

  if (loading) return <p>Loading entertainers...</p>;
  if (error) return <p className="text-danger">Error: {error}</p>;

  return (
    <div className="row">
      {entertainers.map((ent) => (
        <div className="col-md-6 mb-3" key={ent.entertainerID}>
          <div className="card shadow">
            <div className="card-body">
              <h5 className="card-title">{ent.entStageName}</h5>
              <p>
                <strong>Bookings:</strong> {ent.bookingCount}
              </p>
              <p>
                <strong>Last Booking Date:</strong>{' '}
                {ent.lastBookingDate ?? 'Never'}
              </p>
              <button
                className="btn btn-outline-primary"
                onClick={() => navigate(`/entertainer/${ent.entertainerID}`)}
              >
                Details
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EntertainersList;
