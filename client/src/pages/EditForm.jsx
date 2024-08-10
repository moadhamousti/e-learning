import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import DashSidebar from '../components/DashSidebar';

const EditForm = () => {
  const { formId } = useParams();
  const navigate = useNavigate(); // Hook for navigation
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    localisation: '',
    status: 'pending',
  });
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState('home'); // Default to 'home' view

  useEffect(() => {
    const fetchForm = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/form/${formId}`);
        setForm(response.data);
      } catch (error) {
        console.error('Error fetching form:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchForm();
  }, [formId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'status') {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/form/${formId}`, { status: form.status });
      // Redirect to /dashboard/forms on successful status update
      navigate('/dashboard/forms');
    } catch (error) {
      console.error('Error updating form:', error);
    }
  };

  return (
    <div className="min-h-screen flex">
      <DashSidebar setView={setView} />
      <div className="p-8 min-h-screen w-full">
        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <div className="text-lg font-semibold">Loading...</div>
          </div>
        ) : (
          <div>
            <h1 className="text-4xl font-bold mb-6 text-[--button-color]">Edit Form</h1>
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 w-full max-w-3xl">
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">First Name:</label>
                <input
                  type="text"
                  name="firstName"
                  value={form.firstName}
                  readOnly
                  className="w-full p-3 border rounded-md text-gray-600"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Last Name:</label>
                <input
                  type="text"
                  name="lastName"
                  value={form.lastName}
                  readOnly
                  className="w-full p-3 border rounded-md text-gray-600"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Phone Number:</label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={form.phoneNumber}
                  readOnly
                  className="w-full p-3 border rounded-md text-gray-600"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Email:</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  readOnly
                  className="w-full p-3 border rounded-md text-gray-600"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Localisation:</label>
                <input
                  type="text"
                  name="localisation"
                  value={form.localisation}
                  readOnly
                  className="w-full p-3 border rounded-md text-gray-600"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Status:</label>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-md text-gray-600"
                >
                  <option value="pending">Pending</option>
                  <option value="accepted">Accepted</option>
                  <option value="declined">Declined</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-[--button-color] text-white font-semibold py-2 px-4 rounded-md hover:bg-transparent hover:text-[--button-color] border border-transparent hover:border-[--button-color]"
              >
                Update Status
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditForm;
