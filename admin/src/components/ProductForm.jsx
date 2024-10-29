import axios from "axios";
import { useEffect,  useState } from "react";
import socketio from "socket.io-client";

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL; // Updated to use import.meta.env for Vite

export default function Add() {
  const handleSubmit = (e) => {
    e.preventDefault();

    const name = e.target[0].value;
    const message = e.target[1].value;

    axios.post("http://localhost:4000/api", { name, message })
        .then((res) => {
            console.log(res)
        })

    console.log("submitted", name, message)
}

  return (
    <main className="flex p-10 justify-center gap-6">
            <div className="w-full max-w-xs">

                <h2 className="text-center my-5 text-2xl">
                    Send New Notification
                </h2>
                <form className="bg-white shadow-md 
                                 rounded px-8 pt-6 
                                 pb-8 mb-4"
                    onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 
                                       text-sm font-bold mb-2"
                            htmlFor="username"
                        >
                            Notification Title
                        </label>
                        <input
                            className="shadow appearance-none 
                                       border rounded
                                        w-full py-2 px-3 
                                       text-gray-700 leading-tight 
                                        focus:outline-none 
                                       focus:shadow-outline"
                            type="text"
                            placeholder="Title"
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            className="block text-gray-700 
                                       text-sm font-bold mb-2"
                        >
                            Notification Message
                        </label>
                        <input
                            className="shadow appearance-none 
                                       border rounded w-full
                                        py-2 px-3 text-gray-700 
                                       leading-tight 
                                       focus:outline-none
                                         focus:shadow-outline"
                            type="test"
                            placeholder="Message"
                        />

                    </div>
                    <div className="flex items-center 
                                    justify-between">
                        <button className="bg-blue-500 
                                              hover:bg-blue-700 
                                           text-white
                                               font-bold py-2 px-4 
                                              rounded 
                                           focus:outline-none
                                                focus:shadow-outline"
                            type="submit"
                        >
                            Send
                        </button>

                    </div>
                </form>
            </div>
        </main>
  );
}
