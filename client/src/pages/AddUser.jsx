import React, { useState } from 'react';
import axios from 'axios';
import { storage } from '../firebaseStorage';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useDropzone } from 'react-dropzone';
import CircularProgress from '@mui/material/CircularProgress';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import DashSidebar from '../components/DashSidebar';

const AddUser = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    isAdmin: false,
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const defaultImage =
    'https://firebasestorage.googleapis.com/v0/b/e-learning-9e559.appspot.com/o/profilPics%2Fde7834s-6515bd40-8b2c-4dc6-a843-5ac1a95a8b55.jpg?alt=media&token=03d1a2e9-28fc-4396-bbc5-350fbef270e7';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked });
  };

  const onDrop = (acceptedFiles) => {
    setFormData({ ...formData, image: acceptedFiles[0] });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let imageUrl = defaultImage;

    if (formData.image) {
      const fileRef = ref(storage, `profilPics/${formData.image.name}`);
      await uploadBytes(fileRef, formData.image);
      imageUrl = await getDownloadURL(fileRef);
    }

    const userPayload = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      isAdmin: formData.isAdmin,
      image: imageUrl,
    };

    try {
      const response = await axios.post('/api/users', userPayload);
      console.log(response.data); // Optional: log the response
      setFormData({
        name: '',
        email: '',
        password: '',
        isAdmin: false,
        image: null,
      });
      alert('User added successfully!');
    } catch (error) {
      console.error('Error adding user:', error);
      alert('Failed to add user. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <DashSidebar />
      <div className="flex-1 flex justify-center items-center p-4">
        <div className="w-full max-w-sm p-6 shadow-md rounded-lg bg-white">
          <h2 className="text-2xl font-bold mb-6">Add User</h2>
          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <div
              className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center mb-4 cursor-pointer relative"
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p className="text-blue-500">Drop the image here...</p>
              ) : (
                <>
                  <img
                    src={
                      formData.image
                        ? URL.createObjectURL(formData.image)
                        : defaultImage
                    }
                    alt="Profile"
                    className="w-full h-full object-cover rounded-lg"
                  />
                  {loading && (
                    <CircularProgress className="absolute inset-0 m-auto" />
                  )}
                  <AddPhotoAlternateIcon className="text-blue-500 absolute bottom-2 right-2" />
                </>
              )}
            </div>
            <div className="flex flex-col w-full">
              <div className="mb-4">
                <label className="block text-gray-700">Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter name"
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Password:</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">
                  <input
                    type="checkbox"
                    name="isAdmin"
                    checked={formData.isAdmin}
                    onChange={handleCheckboxChange}
                  />
                  &nbsp; Admin
                </label>
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg"
              >
                Add User
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
