import { useState } from 'react';
import { Entertainer } from '../types/Entertainer';
import { updateEntertainer } from '../api/EntertainerAPI';

interface EditEntertainerFormProps {
  entertainer: Entertainer;
  onSuccess: () => void;
  onCancel: () => void;
}

const EditEntertainerForm = ({
  entertainer,
  onSuccess,
  onCancel,
}: EditEntertainerFormProps) => {
  const [formData, setFormData] = useState<Entertainer>({ ...entertainer });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateEntertainer(formData.entertainerID, formData);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h4>Edit Entertainer</h4>
      {[
        { label: 'Stage Name', name: 'entStageName' },
        { label: 'SSN', name: 'entSSN' },
        { label: 'Street Address', name: 'entStreetAddress' },
        { label: 'City', name: 'entCity' },
        { label: 'State', name: 'entState' },
        { label: 'Zip Code', name: 'entZipCode' },
        { label: 'Phone Number', name: 'entPhoneNumber' },
        { label: 'Web Page', name: 'entWebPage' },
        { label: 'Email Address', name: 'entEMailAddress' },
        { label: 'Date Entered (YYYY-MM-DD)', name: 'dateEntered' },
      ].map(({ label, name }) => (
        <div className="form-group mb-2" key={name}>
          <label>{label}</label>
          <input
            className="form-control"
            type="text"
            name={name}
            value={(formData as any)[name]}
            onChange={handleChange}
          />
        </div>
      ))}

      <div className="d-flex gap-2 mt-3">
        <button className="btn btn-success" type="submit">
          Save Changes
        </button>
        <button className="btn btn-secondary" type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditEntertainerForm;
