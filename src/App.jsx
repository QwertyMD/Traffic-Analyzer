import React, { useState } from "react";
import TrafficAnalysis from "./components/TrafficAnalysis";
import { User } from "lucide-react";
import AnalyzedReport from "./components/AnalyzedReport";
import Login from "./components/Login";

const App = () => {
  const currentTime = new Date().getHours();
  const [result, setResult] = useState([]);
  const [showReport, setShowReport] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const getGreeting = () => {
    if (currentTime < 12) return "Good Morning";
    if (currentTime < 17) return "Good Afternoon";
    return "Good Evening";
  };

  return isLogin ? (
    <Login setIsLogin={setIsLogin} />
  ) : (
    <div className="min-h-screen bg-[aliceblue]">
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <div className="flex items-center space-x-4 rounded-lg p-6 shadow-md bg-white">
          <div className="relative w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
            <User className="w-8 h-8 text-blue-500" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {getGreeting()}, User!
            </h1>
            <p className="text-gray-600">
              Welcome to Traffic Analysis Dashboard
            </p>
          </div>
        </div>
        <TrafficAnalysis
          result={result}
          setResult={setResult}
          showReport={showReport}
          setShowReport={setShowReport}
        />
        {showReport && <AnalyzedReport result={result} />}
      </div>
    </div>
  );
};

export default App;
