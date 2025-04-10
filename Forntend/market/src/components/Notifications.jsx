import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config';

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        fetchNotifications();
        // Poll for new notifications every 30 seconds
        const interval = setInterval(fetchNotifications, 30000);
        return () => clearInterval(interval);
    }, []);

    const fetchNotifications = async () => {
        try {
            const token = localStorage.getItem('access');
            if (!token) {
                setError('Please log in to view notifications');
                setLoading(false);
                return;
            }

            console.log('Fetching notifications with token:', token);
            const response = await axios.get(`${API_BASE_URL}/api/notifications/`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log('Notifications response:', response.data);
            setNotifications(response.data);
            setLoading(false);
            setError('');
        } catch (error) {
            console.error('Error fetching notifications:', error);
            if (error.response) {
                console.error('Error response:', error.response.data);
                if (error.response.status === 401) {
                    setError('Please log in to view notifications');
                } else if (error.response.status === 404) {
                    setError('Notifications endpoint not found');
                } else {
                    setError(`Error: ${error.response.data.error || 'Failed to load notifications'}`);
                }
            } else if (error.request) {
                console.error('Error request:', error.request);
                setError('No response from server. Please check your connection.');
            } else {
                setError('An unexpected error occurred');
            }
            setLoading(false);
        }
    };

    const handleNotificationClick = async (notification) => {
        try {
            const token = localStorage.getItem('access');
            if (!token) {
                setError('Not authenticated');
                return;
            }

            console.log('Marking notification as read:', notification.id);
            await axios.post(
                `${API_BASE_URL}/api/notifications/${notification.id}/mark_read/`,
                {},
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            // Remove the notification from the list
            setNotifications(notifications.filter(n => n.id !== notification.id));
            
            // Close the notifications dropdown
            setIsOpen(false);
        } catch (error) {
            console.error('Error marking notification as read:', error);
            if (error.response) {
                setError(`Error: ${error.response.data.error || 'Failed to mark notification as read'}`);
            } else {
                setError('Failed to mark notification as read');
            }
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-12">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
            >
                <div className="relative">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-gray-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                        />
                    </svg>
                    {notifications.length > 0 && (
                        <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
                    )}
                </div>
            </button>

            {/* Notifications Dropdown */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-50">
                    <div className="p-4 border-b">
                        <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                        {error ? (
                            <div className="p-4 text-center text-red-500">
                                {error}
                            </div>
                        ) : notifications.length === 0 ? (
                            <div className="p-4 text-center text-gray-500">
                                No new notifications
                            </div>
                        ) : (
                            notifications.map((notification) => (
                                <div
                                    key={notification.id}
                                    className="p-4 border-b hover:bg-gray-50 cursor-pointer"
                                    onClick={() => handleNotificationClick(notification)}
                                >
                                    <p className="text-sm text-gray-900">
                                        {notification.message_content}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {new Date(notification.timestamp).toLocaleString()}
                                    </p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Notifications; 