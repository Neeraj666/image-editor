// // 







// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { fabric } from 'fabric';
// import './CanvasPage.css';
// import '../App.css';
// import { BsSearch } from "react-icons/bs";

// // SearchPage component
// const SearchPage = () => {
//   const [query, setQuery] = useState('');
//   const [images, setImages] = useState([]);
//   const navigate = useNavigate();

//   const handleSearch = async () => {
//     try {
//       const response = await axios.get('https://api.unsplash.com/search/photos', {
//         params: { query },
//         headers: {
//           Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_API_KEY}`
//         }
//       });
//       setImages(response.data.results);
//     } catch (error) {
//       console.error('Error fetching images:', error);
//     }
//   };

//   const handleAddCaptions = (image) => {
//     navigate('/canvas', { state: { image } });
//   };

//   return (
//     <div>
//       <div className='container'>
//         <div className='row'>
//           <div className='col-12'>
//             <div className='user'>
//               <label>Name :</label><span> Neeraj Sharma</span><br />
//               <label>Email :</label><span> ns66672@gmail.com</span>
//             </div>
//           </div>
//         </div>
//         <div className='row'>
//           <div className='col-12' style={{ textAlign: 'center' }}>
//             <h1>Image Search</h1>
//             <input className='input' type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search for images..." />
//             <button className='button' onClick={handleSearch}>
//               <BsSearch />&nbsp;&nbsp;Search
//             </button>
//           </div>
//         </div>
//         <div className='row'>
//           {
//             images.map(image => (
//               <div key={image.id} className="image-item col-3">
//                 <div className='card_box'>
//                   <div className='img_box'>
//                     <img src={image.urls.thumb} alt={image.alt_description} width={250} height={280} />
//                   </div>
//                   <button className='button-47' onClick={() => handleAddCaptions(image)}>Add Captions</button>
//                 </div>
//               </div>
//             ))
//           }
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SearchPage;




import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import { BsSearch } from "react-icons/bs";

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [error, setError] = useState(''); // State to track error messages
  const navigate = useNavigate();

  const handleSearch = async () => {
    setError(''); // Reset error message before a new search
    try {
      const response = await axios.get('https://api.unsplash.com/search/photos', {
        params: { query },
        headers: {
          Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_API_KEY}`
        }
      });
      if (response.data.results.length === 0) {
        setError('No images found. Please try a different search term.');
      } else {
        setImages(response.data.results);
      }
    } catch (error) {
      setError('Error fetching images. Please try again later.');
      console.error('Error fetching images:', error);
    }
  };

  const handleAddCaptions = (image) => {
    navigate('/canvas', { state: { image } });
  };

  return (
    <div>
      <div className='container'>
        <div className='row'>
          <div className='col-12'>
            <div className='user'>
              <label>Name :</label><span> Neeraj Sharma</span><br />
              <label>Email :</label><span> ns66672@gmail.com</span>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-12' style={{ textAlign: 'center' }}>
            <h1>Image Search</h1>
            <input className='input' type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search for images..." />
            <button className='button' onClick={handleSearch}>
              <BsSearch />&nbsp;&nbsp;Search
            </button>
          </div>
        </div>
        {error && (
          <div className='row'>
            <div className='col-12' style={{ textAlign: 'center', color: 'red' }}>
              <p>{error}</p>
            </div>
          </div>
        )}
        <div className='row'>
          {
            images.map(image => (
              <div key={image.id} className="image-item col-3">
                <div className='card_box'>
                  <div className='img_box'>
                    <img src={image.urls.thumb} alt={image.alt_description} width={250} height={280} />
                  </div>
                  <button className='button-47' onClick={() => handleAddCaptions(image)}>Add Captions</button>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
