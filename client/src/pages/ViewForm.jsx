import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import DashSidebar from '../components/DashSidebar';

const ViewForm = () => {
  const { formId } = useParams();
  const [form, setForm] = useState(null);
  const [view, setView] = useState(''); // Add view state if needed

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const response = await axios.get(`/api/form/${formId}`, {
          withCredentials: true, // if needed for authentication
        });
        setForm(response.data);
      } catch (error) {
        console.error('Error fetching form:', error);
      }
    };

    fetchForm();
  }, [formId]);

  // Handle view switching based on view state
  useEffect(() => {
    if (view) {
      navigate(`/${view}`); // Navigate to the route based on view
    }
  }, [view]);

  if (!form) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg font-semibold">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <DashSidebar setView={setView} /> {/* Pass setView to DashSidebar */}

      {/* Main Content */}
      <div className="flex flex-col items-center flex-grow">
        <h1 className="text-4xl font-bold m-4 text-[--button-color]">View Form</h1>
        <div className="flex flex-col items-center pt-14 min-h-screen w-1/2">
          <div className="flex flex-col items-center justify-center shadow-lg shadow-black rounded-lg w-2/4 p-6 bg-white">
            <p className="text-xl capitalize font-bold mb-4">
              First Name: <span className="font-normal ml-2">{form.firstName}</span>
            </p>
            <p className="text-xl capitalize font-bold mb-4">
              Last Name: <span className="font-normal ml-2">{form.lastName}</span>
            </p>
            <p className="text-xl font-bold mb-4">
              Phone Number: <span className="font-normal ml-2">{form.phoneNumber}</span>
            </p>
            <p className="text-xl font-bold mb-4">
              Email: <span className="font-normal ml-2">{form.email}</span>
            </p>
            <p className="text-xl font-bold mb-4">
              Localisation: <span className="font-normal ml-2">{form.localisation}</span>
            </p>
            <p className="text-xl font-bold mb-4">
              Status: <span className="font-normal ml-2">{form.status}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewForm;
