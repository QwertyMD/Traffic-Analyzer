import React, { useState } from "react";
import { Upload, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GoogleGenerativeAI } from "@google/generative-ai";

const TrafficAnalysis = () => {
  const [image, setImage] = useState(null);
  const [analysisResult, setAnalysisResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      console.log("Uploaded file:", file);
      console.log("Image URL:", imageURL);
      setImage(imageURL);
    }
  };

  const handleSearch = async () => {
    if (!image) {
      alert("Please upload an image first.");
      return;
    }

    setIsLoading(true);
    setAnalysisResult("");

    try {
      // Convert the image URL to a Base64 string
      const response = await fetch(image);
      const blob = await response.blob();
      const base64 = await blobToBase64(blob);
      console.log("Base64 image:", base64);

      // Initialize Google Generative AI
      const genAI = new GoogleGenerativeAI(
        "AIzaSyDdx1uCYQo5NgFTnR7FCNVRObWeBKaWpAI"
      );
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      // Analyze the image
      const result = await model.generateContent([
        `
         [OUTPUT FORMAT SHALL BE LIKE THE GIVEN FORMAT AND MAKE SURE ITS LIKE THE GIVEN JSOn]
    {
  "traffic_density": "",
  "vehicles": {
    "cars": "",
    "buses": "",
    "trucks": "",
    "motorcycles": "",
    "other": ""
  },
  "road_condition": {
    "status": "",
    "condition_score": "",
    "details": ""
  },
  "incident_detection": {
    "incidents": "",
    "details": ""
  },
  "environmental_conditions": {
    "visibility": "",
    "weather": "",
    "temperature": ""
  },
  "data_timestamp": "",
  "location": {
    "latitude": "",
    "longitude": "",
    "road_segment": ""
  },
  "flow_rate": {
    "cars_per_hour": "",
    "total_vehicles_per_hour": ""
  },
  "average_speed": "",
  "congestion_level": "",
  "future_predictions": {
    "15_min": "",
    "1_hour": ""
  }
}
         `,
        {
          inlineData: {
            mimeType: blob.type,
            data: base64.split(",")[1], // Remove the Base64 prefix
          },
        },
      ]);

      console.log("API response:", result);
      setAnalysisResult(result.response.text());
    } catch (error) {
      console.error("Error analyzing image:", error);
      setAnalysisResult("Failed to analyze the image. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to convert Blob to Base64
  const blobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-6">
          <div>
            <label className="flex flex-col items-center justify-center w-1/2 h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-10 h-10 text-gray-400 mb-3" />
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500">
                  PNG, JPG, or JPEG (MAX. 800x400px)
                </p>
              </div>
              <input
                type="file"
                className="hidden"
                onChange={handleImageUpload}
                accept="image/*"
              />
            </label>
          </div>

          {image && (
            <div className="relative w-full h-48 rounded-lg overflow-hidden">
              <img
                src={image}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="flex justify-center">
            <Button
              onClick={handleSearch}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
              disabled={isLoading}
            >
              <Search className="h-5 w-5" />
              <span>{isLoading ? "Analyzing..." : "Analyze Traffic"}</span>
            </Button>
          </div>

          {analysisResult && (
            <div className="mt-4 p-4 bg-gray-100 rounded-lg">
              <h3 className="font-semibold mb-2">Analysis Result:</h3>
              <p>{analysisResult}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TrafficAnalysis;
