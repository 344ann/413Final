// src/pages/LandingPage.tsx
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="container mt-5">
      <div className="row bg-primary text-white text-center p-4 rounded">
        <h1>Welcome to the Entertainment Agency Site</h1>
      </div>
      <div className="text-center mt-4">
        <button
          className="btn btn-success"
          onClick={() => navigate('/entertainers')}
        >
          List of Entertainers
        </button>
      </div>
    </div>
  );
}

export default LandingPage;
