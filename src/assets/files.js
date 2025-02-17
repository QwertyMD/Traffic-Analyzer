import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";

async function filesCreateImage(file) {
  const fileManager = new GoogleAIFileManager(
    "AIzaSyDdx1uCYQo5NgFTnR7FCNVRObWeBKaWpAI"
  );

  const uploadResult = await fileManager.uploadFile(file, {
    mimeType: file.type,
    displayName: "traffic image",
  });
  console.log(
    `Uploaded file ${uploadResult.file.displayName} as: ${uploadResult.file.uri}`
  );

  const genAI = new GoogleGenerativeAI(
    "AIzaSyDdx1uCYQo5NgFTnR7FCNVRObWeBKaWpAI"
  );
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const result = await model.generateContent([
    `{
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
}`,
    {
      fileData: {
        fileUri: uploadResult.file.uri,
        mimeType: uploadResult.file.mimeType,
      },
    },
  ]);
  console.log("hello");

  console.log(result.response.text());
  return result.response.text();
}

export { filesCreateImage };
