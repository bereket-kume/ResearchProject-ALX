import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
    const { id: productId } = useParams();
    const [product, setProduct] = useState({});
    const [message, setMessage] = useState("");
    const [showChat, setShowChat] = useState(false);
    const [chatId, setChatId] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const token = localStorage.getItem('access');
                if (!token) {
                    console.error('Access token not found in local storage');
                    return;
                }

                const response = await axios.get(`http://localhost:8000/api/items/${productId}/`);
                setProduct(response.data);
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };

        fetchProduct();
    }, [productId]);
    
    const createChat = async () => {
        try {
            const token = localStorage.getItem('access');
            const userId = localStorage.getItem('userId');
            if (!userId) {
                console.error('User ID not found in local storage');
                return;
            }

            const receiver = product.created_by;
            console.log("Receiver:", receiver);
            console.log("UserId:", userId)

            const response = await axios.post(
                `http://localhost:8000/api/items/${id}/chats/`,
                {
                    product: productId,
                    buyer: userId,
                    seller: receiver,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            console.log("Chat created successfully:", response.data);
            setChatId(response.data.id); // Store chat ID in state
            setShowChat(true);
        }
        catch (error) {
            console.error("Error creating chat:", error);
        }
    }

    const sendMessage = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('access');
            const userId = localStorage.getItem('userId'); // Assuming userId is the current user
           
            if (!userId) {
                console.error('User ID not found in local storage');
                return;
            }
    
            const receiver = product.created_by; // Assuming created_by is the seller
    
            const response = await axios.post(
                `http://localhost:8000/api/items/items/${id}/chats/${chatId}/message`,
                {
                    content: message,
                    chat: chatId,
                    sender: userId,
                    receiver: receiver,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            console.log("Message sent successfully:", response.data);
            setMessage(""); 
            setShowChat(false); 
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };
    

    return (
        <div className="container mx-auto p-6 mt-10 flex flex-row mt-20">
            <div className="w-3/5">
                <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                {product.image && <img src={`http://127.0.0.1:8000/${product.image}`} alt={product.name} className="w-full h-64 object-cover mb-4" />}
                <p className="text-lg mb-4 text-gray-600">{product.descripation}</p>
                <p className="text-xl font-bold mb-4 text-gray-900">${product.price}</p>
            </div>
            <div className="w-2/5">
                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-200"
                    onClick={createChat}
                >
                     "Message Seller"
                </button>

               <div>
                    {showChat && (  
                        <div>
                            <h2 className="text-2xl font-bold mt-4">Chat</h2>
                            <div className="border-t border-b border-gray-200 mt-4">
                                <div className="flex flex-row items-center justify-between p-4">
                                    <div className="flex flex-row items-center">
                                        <img src="https://randomuser.me/api/portraits" alt="User" className="w-10 h-10 object-cover rounded-full" />
                                        <p className="text-lg font-bold ml-2">Seller</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
               </div>
                    
                <div>
                <form onSubmit={sendMessage} className="mt-4">
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="form-textarea mt-1 block w-full bg-white text-gray-700 border border-gray-300 rounded-md"
                            placeholder="Type your message here"
                            required
                        ></textarea>
                        <button
                            type="submit"
                            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mt-2 transition duration-200"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
                   

            </div>
        </div>
    );
};

export default ProductDetail;
