import React from "react";
import TrafficAnalysis from "./components/TrafficAnalysis";
import { User } from "lucide-react";

const App = () => {
  const currentTime = new Date().getHours();

  const getGreeting = () => {
    if (currentTime < 12) return "Good Morning";
    if (currentTime < 17) return "Good Afternoon";
    return "Good Evening";
  };


  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-center space-x-4 bg-white rounded-lg p-6 shadow-md">
        <div className="relative w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
          <User className="w-8 h-8 text-blue-500" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            {getGreeting()}, User!
          </h1>
          <p className="text-gray-600">Welcome to Traffic Analysis Dashboard</p>
        </div>
      </div>
      <TrafficAnalysis />
    </div>
  );
};

export default App;
