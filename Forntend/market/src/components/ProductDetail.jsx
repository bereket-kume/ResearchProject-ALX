import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/items/${id}/`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch(error => {
        console.error('Error fetching product data:', error);
      });
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleChatClick = () => {
    setShowChat(true); // Show "Chat Here" message when Contact button is clicked
  };

  return (
    <div className="container mx-auto p-4 mt-24">
      <div className="bg-white shadow-md rounded-lg overflow-hidden md:flex">
        <div className="md:w-1/2">
          <img 
            src={`http://127.0.0.1:8000/${product.image}`} 
            alt={product.name} 
            className="w-full h-64 object-cover md:h-full"
          />
        </div>
        <div className="p-4 md:w-1/2">
          <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-700 mb-4">{product.descripation}</p>
          <p className="text-xl font-semibold mb-4 text-gray-900">{product.price} Birr</p>
          <button 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={handleChatClick}
          >
            Contact
          </button>
          {showChat && ( // Conditionally render "Chat Here" based on showChat state
            <div className="mt-4 border border-gray-600 p-4 rounded">
              <h1>Chat Here</h1>
              <input 
                type="text" 
                className="w-full p-2 border border-gray-300 rounded mt-4 text-gray-900" 
                placeholder="Your message" 
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
