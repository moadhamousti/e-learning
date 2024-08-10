import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { storage } from '../firebaseStorage';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import loaderGif from '../assets/spin.gif'; // Add the correct path to your loader GIF
import DashSidebar from '../components/DashSidebar';

const EditUser = () => {
  const { userId } = useParams();
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    isAdmin: false,
    image: null,
  });
  const [view, setView] = useState('home'); // Default to 'users' view



  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/api/users/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    fetchUser();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleFileChange = (file) => {
    setUser({ ...user, image: file });
  };

  const handleDropdownChange = (e) => {
    setUser({ ...user, isAdmin: e.target.value === 'admin' });
  };

  const handleImageUpload = async () => {
    let imageUrl = user.image;

    if (user.image && typeof user.image !== 'string') {
      setLoading(true);
      try {
        const fileRef = ref(storage, `profilPics/${user.image.name}`);
        await uploadBytes(fileRef, user.image);
        imageUrl = await getDownloadURL(fileRef);
        setLoading(false);
      } catch (error) {
        console.error('Error uploading image:', error);
        setLoading(false);
      }
    }

    return imageUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const imageUrl = await handleImageUpload();

    const updatedUser = {
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      image: imageUrl,
    };

    if (user.password) {
      updatedUser.password = user.password;
    }

    try {
      await axios.put(`/api/users/${userId}`, updatedUser);
      // Handle success or navigate to another page
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFileChange(file);
  };

  const imageSrc = user.image && typeof user.image === 'string' 
    ? user.image 
    : user.image instanceof File 
      ? URL.createObjectURL(user.image) 
      : '/path-to-default-image.jpg'; // Replace with your default image path

  return (
    
    <div className="min-h-screen  flex">
      {/* Sidebar */}
      <DashSidebar setView={setView} />
      <h1 className="text-4xl font-bold m-4 text-[--button-color]">View User</h1>

    <div className=" p-8  min-h-screen  w-[605px]">
      {/* <h2 className="text-4xl font-bold mb-8">Edit User</h2> */}
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 w-full max-w-3xl">
        <div className="flex  items-center justify-center mb-6 ">
          <div
            className="relative w-48 h-48 border-2  border-dashed border-gray-300 rounded-md flex items-center justify-center bg-gray-50 cursor-pointer"
            onClick={() => document.getElementById('fileInput').click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
          >
            {loading ? (
              <img src={loaderGif} alt="Loading" className="w-16 h-16" />
            ) : (
              <img
                src={imageSrc}
                alt="Profile"
                className="w-full h-full object-cover rounded-full "
              />
            )}
            <input
              id="fileInput"
              type="file"
              onChange={(e) => handleFileChange(e.target.files[0])}
              className="hidden "
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Name:</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            className="w-full p-3 border rounded-md text-[--grey-color]"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Email:</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="w-full p-3  border border-[#858585] rounded-md text-[--grey-color]"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Password:</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            className="w-full p-3 border rounded-md text-[--grey-color]"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Role:</label>
          <select
            name="role"
            value={user.isAdmin ? 'admin' : 'user'}
            onChange={handleDropdownChange}
            className="w-full p-3 border rounded-md text-[--grey-color]"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button
          type="submit"
          // className="w-full bg-blue-100 text-blue-900 font-semibold py-2 px-4 rounded-md text-[--grey-color] hover:bg-blue-200"
          className="w-full bg-[--button-color] border-[3px] cursor-pointer border-transparent text-[--text-color] text-xl font-semibold py-2 px-4 rounded-2xl hover:bg-transparent hover:text-[--button-color] hover:border-[--button-color] focus:outline-none focus:bg-[--primary-color] focus:text-[--text-color]"
          >
          Update
        </button>
      </form>
    </div>
    </div>
  );
};

export default EditUser;
