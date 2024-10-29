import React, { useEffect, useState } from 'react';
import { FaBell } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { io } from 'socket.io-client';

const socket = io('http://localhost:4000'); // Connect to the backend server

const Notifications = () => {
  const [newNotifications, setNewNotifications] = useState(0);

  useEffect(() => {
    socket.on('newProduct', () => {
      setNewNotifications((prev) => prev + 1);
    });

    return () => {
      socket.off('newProduct');
    };
  }, []);

  const handleIconClick = () => {
    setNewNotifications(0);
  };

  return (
    <div className="relative">
      <Link to="/notification" onClick={handleIconClick}>
        <div className={`p-4 rounded-full ${newNotifications > 0 ? 'bg-red-500' : 'bg-gray-300'}`}>
          <FaBell className="text-3xl text-white" />
          {newNotifications > 0 && (
            <span className="absolute top-0 right-0 bg-red-700 text-white rounded-full px-2 py-1 text-sm font-bold">
              {newNotifications}
            </span>
          )}
        </div>
      </Link>
    </div>
  );
};

export default Notifications;
