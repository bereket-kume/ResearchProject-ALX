import React, { useState } from 'react';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";

const ModalLogin = ({ isOpen, onClose }) => {
    const [isLoginMode, setIsLoginMode] = useState(true);

    const toggleMode = () => {
        setIsLoginMode(!isLoginMode);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = {
            username: e.target.elements.username.value,
            password: e.target.elements.password.value,
        };
        if (!isLoginMode) {
            user.email = e.target.elements.email.value;
            try {
                const response = await axios.post(`http://54.144.145.14/api/register/`, user);
                console.log("Registration successful:", response.data);
            } catch (error) {
                console.error("Registration failed:", error);
            }
        }

        try {
            const { data } = await axios.post(`http://54.144.145.14/api/login/`, user);
            localStorage.clear();
            localStorage.setItem('access', data.access);
            localStorage.setItem('refresh', data.refresh);
            localStorage.setItem('username', user.username);

            const decodedToken = jwtDecode(data.access);
            console.log("Decoded Token:", decodedToken); 
            
            const userId = decodedToken.user_id;
            localStorage.setItem('userId', userId);
         

            axios.defaults.headers['Authorization'] = `Bearer ${data.access}`;
            window.location.href = '/';
        } catch (error) {
            console.error("There was an error!", error);
            window.alert("There was an error!");
        }
    };

    return (
        <div className={`fixed inset-0 z-50 overflow-auto ${isOpen ? 'flex' : 'hidden'} justify-center`}>
            {/* Dark overlay */}
            <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>

            {/* Modal content */}
            <div className="flex items-center justify-center min-h-screen">
                <div className="bg-white p-8 rounded-lg shadow-lg w-96 relative" style={{ height: 'fit-content' }}>
                    <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-700" onClick={onClose}>
                        <i className="fa fa-times">X</i>
                    </button>
                    <h2 className="text-2xl font-bold mb-4">{isLoginMode ? 'Login' : 'Register'}</h2>
                    <form className="flex flex-col items-center" onSubmit={handleSubmit}>
                        <div className="mb-4 w-full">
                            <label htmlFor="username" className="block text-sm font-medium text-gray-900">Username</label>
                            <input type="text" id="username" name="username" className="form-input mt-1 block w-full" />
                        </div>
                        {!isLoginMode && (
                            <div className="mb-4 w-full">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                <input type="email" id="email" name="email" className="form-input mt-1 block w-full" />
                            </div>
                        )}
                        <div className="mb-6 w-full">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <input type="password" id="password" name="password" className="form-input mt-1 block w-full" />
                        </div>
                        <div className="flex justify-end w-full">
                            <button className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600`} type='submit'>
                                {isLoginMode ? 'Login' : 'Register'}
                            </button>
                        </div>

                    </form>
                    <p className="mt-4 text-center">
                        {isLoginMode
                            ? "Don't have an account? "
                            : "Already have an account? "}
                        <button className="text-blue-500 hover:underline" onClick={toggleMode}>
                            {isLoginMode ? 'Register here' : 'Login here'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ModalLogin;
