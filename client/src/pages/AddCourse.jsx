import React, { useState, useRef, useEffect } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import axios from 'axios';
import { storage } from '../firebaseStorage';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import DashSidebar from '../components/DashSidebar';
import Progress from '../components/Progress'; // Import the Progress component

function AddCourse() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState('');
  const [videoLinks, setVideoLinks] = useState(['']);
  const [attachments, setAttachments] = useState([]);
  const [loading, setLoading] = useState(false); // State to track loading
  const quillRef = useRef(null);

  useEffect(() => {
    quillRef.current = new Quill('#editor', {
      theme: 'snow',
      modules: {
        toolbar: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          ['blockquote', 'code-block'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ script: 'sub' }, { script: 'super' }],
          [{ indent: '-1' }, { indent: '+1' }],
          [{ direction: 'rtl' }],
          [{ size: ['small', false, 'large', 'huge'] }],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ color: [] }, { background: [] }],
          [{ font: [] }],
          [{ align: [] }],
          ['clean'],
          ['link', 'image', 'video'],
        ],
      },
    });
  }, []);

  const handleImageUpload = async (file) => {
    if (!file) return;

    const imageRef = ref(storage, `images/${file.name}`);
    try {
      setLoading(true); // Show loader
      await uploadBytes(imageRef, file);
      const url = await getDownloadURL(imageRef);
      setImageURL(url);
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setLoading(false); // Hide loader
    }
  };

  const handleFileUpload = async (files) => {
    const fileURLs = [];
    setLoading(true); // Show loader
    for (const file of files) {
      const fileRef = ref(storage, `files/${file.name}`);
      try {
        await uploadBytes(fileRef, file);
        const url = await getDownloadURL(fileRef);
        fileURLs.push(url);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
    setAttachments(fileURLs);
    console.log('Uploaded files:', fileURLs);
    setLoading(false); // Hide loader
  };

  const handleVideoLinksChange = (e, index) => {
    const newVideoLinks = [...videoLinks];
    newVideoLinks[index] = e.target.value;
    setVideoLinks(newVideoLinks);
  };

  const handleAddVideoLink = () => {
    setVideoLinks([...videoLinks, '']);
  };

  const handleRemoveVideoLink = (index) => {
    const newVideoLinks = videoLinks.filter((_, i) => i !== index);
    setVideoLinks(newVideoLinks);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const courseContent = quillRef.current.root.innerHTML;

    console.log('Submitting course with attachments:', attachments);

    try {
      await axios.post('/api/courses/create', {
        title,
        description,
        course: courseContent,
        image: imageURL,
        videoLinks,
        attachments,
      });
      window.location.assign('/dashboard/courses');
    } catch (error) {
      console.error('There was an error creating the course!', error);
    }
  };

  return (
    <div className="min-h-screen flex">
      <DashSidebar />
      <h1 className="text-4xl font-bold m-4 text-[--button-color]">Add Course</h1>

      <div className="flex-1 flex justify-center items-center p-10">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                Description
              </label>
              <input
                type="text"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="course">
                Course Content
              </label>
              <div
                id="editor"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              ></div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
                Image
              </label>
              <input
                type="file"
                id="image"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setImage(file);
                  handleImageUpload(file);
                }}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            {videoLinks.map((link, index) => (
              <div key={index} className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`videoLink-${index}`}>
                  Video Link {index + 1}
                </label>
                <div className="flex items-center">
                  <input
                    type="text"
                    id={`videoLink-${index}`}
                    value={link}
                    onChange={(e) => handleVideoLinksChange(e, index)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveVideoLink(index)}
                    className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddVideoLink}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Add Another Video Link
            </button>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="attachments">
                Attachments
              </label>
              <input
                type="file"
                id="attachments"
                multiple
                onChange={(e) => {
                  const files = e.target.files;
                  handleFileUpload(files);
                }}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            {loading && <Progress />} {/* Show loader if loading */}
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Add Course
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddCourse;
