// create a react component that inputd a text area messaage then performs a fetch request to localhost 3001 gets back a response as a data.message and displays that message in a box below
import React, { useState } from "react";
import "./App.css";

function App() {
    const [message, setMessage] = useState("");
    const [response, setResponse] = useState("");

    // OpenAI API call submit form
    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("http://localhost:3001/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ message }),
        })
            .then((res) => res.json())
            .then((data) => setResponse(data.message));
    };
    return (
        <div className="App">
            <div className="min-h-full">
                <div className="bg-gray-800 pb-32">
                    <header className="py-10">
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <h1 className="text-3xl font-bold tracking-tight text-white">
                                AI Powered Sommelier
                            </h1>
                        </div>
                    </header>
                </div>

                <main className="-mt-32">
                    <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
                        {/* Replace with your content */}
                        <div className="rounded-lg bg-white px-5 py-6 shadow sm:px-6">
                            <div className="h-96 rounded-lg ">
                                {/* START ==== CHAT ROOM */}
                                <form onSubmit={handleSubmit}>
                                    <label
                                        htmlFor="comment"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        What are you eating?
                                    </label>
                                    <div className="mt-1">
                                        <textarea
                                            rows={4}
                                            name="comment"
                                            id="comment"
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            value={message}
                                            onChange={(e) =>
                                                setMessage(e.target.value)
                                            }
                                        ></textarea>
                                    </div>
                                    <div className="flex-shrink-0">
                                        <button
                                            type="submit"
                                            className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                        >
                                            Post
                                        </button>
                                    </div>
                                </form>
                                {response && (
                                    <div>
                                        <b>Sommelier:</b> {response}
                                    </div>
                                )}
                                {/* /END ==== CHAT ROOM */}
                            </div>
                        </div>
                        {/* /End replace */}
                    </div>
                </main>
            </div>
        </div>
    );
}
export default App;
