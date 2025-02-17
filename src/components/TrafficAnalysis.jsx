import React, { useState } from "react";
import { Upload, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GoogleGenerativeAI } from "@google/generative-ai";

const TrafficAnalysis = ({ result, setResult, showReport, setShowReport }) => {
  const [image, setImage] = useState(null);
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

    try {
      const response = await fetch(image);
      const blob = await response.blob();
      const base64 = await blobToBase64(blob);
      console.log("Base64 image:", base64);

      const genAI = new GoogleGenerativeAI(
        "AIzaSyDdx1uCYQo5NgFTnR7FCNVRObWeBKaWpAI"
      );
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

      const result = await model.generateContent([
        `
         [OUTPUT FORMAT SHALL BE LIKE THE GIVEN FORMAT AND MAKE SURE ITS LIKE THE GIVEN JSON ALSO DONT FORGET TO GIVE THE VEHICLES LIKE CARS BUSES TRUCKS MOTORCYCLES AND OTHERS]
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
            data: base64.split(",")[1],
          },
        },
      ]);

      console.log("API response:", result);
      const resultText = result.response.text();

      const jsonMatch = resultText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error("No JSON found in response");
      }

      try {
        const jsonResult = JSON.parse(jsonMatch[0]);
        setResult(jsonResult);
        setShowReport(true);
      } catch (parseError) {
        console.error("Error parsing result:", parseError);
        setResult(null);
      }
    } catch (error) {
      console.error("Error analyzing image:", error);
      setResult(null);
    } finally {
      setIsLoading(false);
    }
  };

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
          {!image ? (
            <div>
              <label className="flex flex-col items-center justify-center w-full h-96 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-10 h-10 text-gray-400 mb-3" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">
                      Click to upload an Image
                    </span>
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
          ) : (
            <div className="relative w-full h-96 rounded-lg overflow-hidden">
              <img
                src={image}
                alt="Preview"
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setImage(null)}
                className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
              >
                <Upload className="w-5 h-5 text-gray-600" />
              </button>
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
        </div>
      </CardContent>
    </Card>
  );
};

export default TrafficAnalysis;
