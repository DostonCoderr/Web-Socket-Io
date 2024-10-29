import React, { useEffect, useState, useRef } from "react";
import socketio from "socket.io-client";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { FaBell } from 'react-icons/fa';

const Home = () => {
    const [notifications, setNotifications] = useState(() => {
        const savedNotifications = localStorage.getItem('notifications');
        return savedNotifications ? JSON.parse(savedNotifications) : [];
    });
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const socket = socketio.connect("http://localhost:4000");

        socket.on('connect', () => {
            console.log(`Connected to server`);
        });

        socket.on('notification', (data) => {
            setNotifications((prevNotifications) => {
                const updatedNotifications = [
                    ...prevNotifications,
                    { ...data, viewed: false }, // New notifications are marked as not viewed
                ];
                localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
                return updatedNotifications;
            });
        });

        socket.on('disconnect', () => {
            console.log(`Disconnected from server`);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    const markAsViewed = (index) => {
        const updatedNotifications = notifications.map((notification, i) =>
            i === index ? { ...notification, viewed: true } : notification
        );
        setNotifications(updatedNotifications);
        localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
    };

    return (
        <div className="p-6 flex flex-col items-center">
            <button 
                onClick={() => setShowDropdown(!showDropdown)}
                className="relative px-5 py-2 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
                <FaBell className="text-3xl text-white" />
                {notifications.filter(n => !n.viewed).length > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full transform translate-x-2 -translate-y-2">
                        {notifications.filter(n => !n.viewed).length}
                    </span>
                )}
            </button>

            {showDropdown && (
                <div ref={dropdownRef} className="relative mt-4 w-full max-w-xs">
                    <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-10 transition transform origin-top-right">
                        <div className="p-5 space-y-4 max-h-96 overflow-y-auto">
                            {notifications.length === 0 ? (
                                <p className="text-center text-gray-500">No notifications yet.</p>
                            ) : (
                                notifications.map((notification, index) => (
                                    <Link 
                                        to={`/products/${notification.id}`} // Assuming your product page route is like this
                                        key={index}
                                        onClick={() => markAsViewed(index)}
                                        className={`flex items-start p-4 rounded-lg shadow-sm transition cursor-pointer hover:bg-gray-300`}
                                    >
                                        {/* Horizontal Indicator */}
                                        <div className={`w-2 h-full rounded-l ${notification.viewed ? "bg-gray-300" : "bg-red-500"}`}></div>
                                        
                                        <img 
                                            className="w-12 h-12 rounded-full border border-gray-300"
                                            src={notification.image || "notification.png"} 
                                            alt="Notification" 
                                        />
                                        <div className="ml-4 flex-1">
                                            <p className="text-xs text-gray-500"><strong>ID:</strong> {notification.id}</p>
                                            <p className="text-sm font-semibold text-gray-900">{notification.name}</p>
                                            <p className="text-sm text-gray-600 mt-1">{notification.description}</p>
                                            <div className="text-xs text-gray-500 mt-1">
                                                <strong>Size:</strong> {notification.size} KB
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
