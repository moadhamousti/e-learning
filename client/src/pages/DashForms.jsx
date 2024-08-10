import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ConfirmDeletePopup from '../components/ConfirmDeletePopupForm'; // Make sure this component exists
import loaderGif from '../assets/spin.gif'; 

function DashForms() {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFormId, setSelectedFormId] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await axios.get('/api/form');
        setForms(response.data);
      } catch (error) {
        console.error('There was an error fetching the forms!', error);
      } finally {
        setLoading(false);
      }
    };

    fetchForms();
  }, []);

  const handleDeleteForm = async () => {
    if (!selectedFormId) return;
    try {
      const response = await axios.delete(`/api/form/${selectedFormId}`);
      if (response.status === 200) {
        setForms(forms.filter(form => form._id !== selectedFormId));
        console.log('Form deleted successfully');
      } else {
        console.error('Failed to delete form');
      }
    } catch (error) {
      console.error('Error deleting form', error);
    } finally {
      setPopupOpen(false);
      setSelectedFormId(null);
    }
  };

  const handleOpenPopup = (formId) => {
    setSelectedFormId(formId);
    setPopupOpen(true);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
    setSelectedFormId(null);
  };

  // Show loader while form data is being fetched
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <img src={loaderGif} alt="Loading..." className="w-16 h-16" />
      </div>
    );
  }

  return (
    <div className="flex-1 py-8 pl-4 pr-4">
      <h1 className="text-3xl font-semibold mb-6">Forms Section</h1>
      <div className="bg-white p-2  rounded-lg shadow-lg">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wide sm:px-4 sm:py-2 sm:text-sm md:px-2 md:py-2 md:text-base lg:text-base">First Name</th>
              <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wide sm:px-4 sm:py-2 sm:text-sm md:px-2 md:py-2 md:text-base lg:text-base">Last Name</th>
              <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wide sm:px-4 sm:py-2 sm:text-sm md:px-2 md:py-2 md:text-base lg:text-base">Phone Number</th>
              <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wide sm:px-4 sm:py-2 sm:text-sm md:px-2 md:py-2 md:text-base lg:text-base">Email</th>
              <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wide sm:px-4 sm:py-2 sm:text-sm md:px-2 md:py-2 md:text-base lg:text-base">Localisation</th>
              <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wide sm:px-4 sm:py-2 sm:text-sm md:px-2 md:py-2 md:text-base lg:text-base">Status</th>
              <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wide sm:px-4 sm:py-2 sm:text-sm md:px-2 md:py-2 md:text-base lg:text-base">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white sm:bg-gray-50 md:bg-gray-100 lg:bg-gray-200 divide-y divide-gray-200 sm:divide-gray-300 md:divide-gray-400 lg:divide-gray-500">
            {forms.map((form) => (
              <tr key={form._id}>
                <td className="px-2 py-1 sm:px-4 sm:py-2 md:px-6 md:py-4 lg:px-3 lg:py-3 whitespace-nowrap">{form.firstName}</td>
                <td className="px-2 py-1 sm:px-4 sm:py-2 md:px-6 md:py-4 lg:px-3 lg:py-3 whitespace-nowrap">{form.lastName}</td>
                <td className="px-2 py-1 sm:px-4 sm:py-2 md:px-6 md:py-4 lg:px-3 lg:py-3 whitespace-nowrap">{form.phoneNumber}</td>
                <td className="px-2 py-1 sm:px-4 sm:py-2 md:px-6 md:py-4 lg:px-3 lg:py-3 whitespace-nowrap">{form.email}</td>
                <td className="px-2 py-1 sm:px-4 sm:py-2 md:px-6 md:py-4 lg:px-3 lg:py-3 whitespace-nowrap">{form.localisation}</td>
                <td className="px-2 py-1 sm:px-4 sm:py-2 md:px-6 md:py-4 lg:px-3 lg:py-3 whitespace-nowrap">{form.status}</td>
                <td className="px-2 py-1 sm:px-4 sm:py-2 md:px-6 md:py-4 lg:px-3 lg:py-3 whitespace-nowrap">
                  <div className="flex gap-3">
                    <Link
                      to={`/view-form/${form._id}`}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
                    >
                      View
                    </Link>
                    <Link
                      to={`/edit-form/${form._id}`}
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleOpenPopup(form._id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ConfirmDeletePopup
        open={popupOpen}
        handleClose={handleClosePopup}
        handleConfirm={handleDeleteForm}
      />
    </div>
  );
}

export default DashForms;
