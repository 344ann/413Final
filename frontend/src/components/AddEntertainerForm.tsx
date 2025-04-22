import { useState } from 'react';
import { Entertainer } from '../types/Entertainer';
import { addEntertainer } from '../api/EntertainerAPI';

interface AddEntertainerFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const AddEntertainerForm = ({
  onSuccess,
  onCancel,
}: AddEntertainerFormProps) => {
  const [formData, setFormData] = useState<Entertainer>({
    entertainerID: 0,
    entStageName: '',
    entSSN: '',
    entStreetAddress: '',
    entCity: '',
    entState: '',
    entZipCode: '',
    entPhoneNumber: '',
    entWebPage: '',
    entEMailAddress: '',
    dateEntered: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addEntertainer(formData);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h4>Add New Entertainer</h4>
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
            required
          />
        </div>
      ))}

      <div className="d-flex gap-2 mt-3">
        <button className="btn btn-success" type="submit">
          Add Entertainer
        </button>
        <button className="btn btn-secondary" type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AddEntertainerForm;
