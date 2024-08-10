// import React, { useContext, useState } from 'react';
// import { Link } from 'react-router-dom';
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import Footer from '../components/Footer';
// import { UserContext } from '../../context/userContext';

// function Formation() {
//   const { user } = useContext(UserContext);

  
//   const [selectedVideo, setSelectedVideo] = useState(null);

//   // You can manually provide the video links here
//   const videos = [
//       '6QAELgirvjs',
//     '7LxA9qXUY5k',
//     'QG5aEmS9Fu0',
//     'dVgTBEYCseU',
//     '3lXuWHtm7PM',
//     'sBFemL2Mfj4',
//     'XxkX8wnRq3s',
//   ];
  
//   const handleVideoClick = (videoId) => {
//     setSelectedVideo(videoId);
//   };

//   return (
//     <>
    
    
//     <header className="bg-[--primary-color] text-xl font-semibold lg:flex lg:flex-row sm:flex sm:flex-col sm:items-center justify-center items-center p-4 px-7">
//         <div>
//         <Link to="/" className="">
//           <img src="./white-logo.svg" alt="logo" className=" object-cover w-16 cursor-pointer" />
//           </Link>
//         </div>
//       </header>


//       <div className="h-full p-6 bg-[--secondary-color]">

//         <h1 className=" flex justify-center text-[--button-color] text-5xl font-bold p-4 text-center leading-[100%]">
//           Grow up your skills by online courses with  <span className='text-6xl ml-2'>  LogoName</span> 
//         </h1>

//         <div className="w-full flex flex-col items-center justify-center p-12 ">
//           <div className="flex gap-10 justify-between w-full bg-none">
//           <div className="flex flex-col gap-4 p-1 mb-8 w-48  max-w-52 h-[490px]   rounded-md   max-h-[720px]  overflow-x-auto scrollbar-thin ">
//               {videos.map((videoId, index) => (
//                 <img
//                 key={index}
//                 src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`}
//                 alt="Video Thumbnail"
//                 className="rounded-md shadow-xl cursor-pointer   "
//                 onClick={() => handleVideoClick(videoId)}
//               />
              
//               ))}
//             </div>
//             <div className='w-11/12  h-full rounded-md shadow-md shadow-black '>
//               {selectedVideo && (
//                 <div className=" h-[490px]">
//                   <iframe
//                     id="player"
//                     type="text/html"
//                     width="100%"
//                     height="100%"
//                     src={`https://www.youtube.com/embed/${selectedVideo}?enablejsapi=1&origin=http://localhost:3000`}
//                     frameBorder="0"
//                     allowFullScreen
//                     className="rounded-md shadow-xl"
//                   ></iframe>
//                   <script src="https://www.youtube.com/iframe_api"></script>
//                   <script>
//                     {`
//                       let player;
//                       function onYouTubeIframeAPIReady() {
//                         player = new YT.Player('player', {
//                           events: {
//                             'onReady': onPlayerReady
//                           }
//                         });
//                       }
//                       function onPlayerReady(event) {
//                         event.target.playVideo();
//                       }
//                     `}
//                   </script>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

        
//       </div>
//       <Footer />

//     </>
//   );
// }

// export default Formation;





// src/pages/Formation.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import CourseCard from '../components/Card';
import Footer from '../components/Footer';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Link } from 'react-router-dom';


const Formation = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('/api/courses');
        console.log(response.data); // Log the response to see the structure
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
  
    fetchCourses();
  }, []);
  

  return (
    <>
    <Navbar/>
    <div>
      <h1 className="flex flex-col items-center text-[--button-color] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold p-4 text-center leading-tight sm:leading-snug lg:leading-[100%]">
  Grow up your skills by online courses with 
  <span className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl ml-2'>LogoName</span>
</h1>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {courses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      </div>

      

        <div className="flex justify-center items-center">
          <Link to="/form">
            <button
              type="button"
              className="bg-[--button-color] text-[--text-color] hover:text-[--button-color] hover:bg-transparent border-[3px]  hover:border-[--button-color] text-lg font-bold rounded-xl p-4 mb-5"
            >
              Request Your Certificate
            </button>
          </Link>
        </div>
    </div>
       <Footer />

  </>
  );
};

export default Formation;