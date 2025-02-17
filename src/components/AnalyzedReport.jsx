import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import TrafficCharts from "./TrafficCharts";

const AnalyzedReport = ({ result }) => {
  if (!result) return null;

  const renderVehicles = () => {
    if (!result.vehicles) return null;
    return Object.entries(result.vehicles).map(([key, value]) => (
      <li key={key}>{`${key}: ${value}`}</li>
    ));
  };

  return (
    <Card className="mt-6 bg-slate-50 border-t-4 border-t-blue-500 shadow-md">
      <CardContent className="p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-slate-800 border-b pb-4 flex items-center">
          <span className="bg-blue-500 w-2 h-8 mr-3 rounded hidden md:block"></span>
          Traffic Analysis Report
        </h2>

        <div className="mb-8">
          <TrafficCharts result={result} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <section className="transition-all hover:shadow-lg rounded-lg overflow-hidden">
            <div className="h-full bg-white rounded-lg border border-slate-200">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 md:p-4">
                <h3 className="text-lg md:text-xl font-semibold text-white">
                  Traffic Overview
                </h3>
              </div>
              <div className="p-4 md:p-5 space-y-3">
                <div className="bg-slate-50 p-4 rounded-lg">
                  <p className="flex justify-between items-center py-2">
                    <span className="text-slate-600">Density:</span>
                    <span className="font-medium text-slate-900 bg-white px-3 py-1 rounded-full shadow-sm">
                      {result.traffic_density || "N/A"}
                    </span>
                  </p>
                  <p className="flex justify-between items-center py-2">
                    <span className="text-slate-600">Congestion:</span>
                    <span className="font-medium text-slate-900 bg-white px-3 py-1 rounded-full shadow-sm">
                      {result.congestion_level || "N/A"}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="transition-all hover:shadow-lg rounded-lg overflow-hidden">
            <div className="h-full bg-white rounded-lg border border-slate-200">
              <div className="bg-gradient-to-r from-green-500 to-green-600 p-3 md:p-4">
                <h3 className="text-lg md:text-xl font-semibold text-white">
                  Environmental Conditions
                </h3>
              </div>
              {result.environmental_conditions && (
                <div className="p-4 md:p-5">
                  <div className="grid grid-cols-2 gap-3 md:gap-4">
                    <div className="bg-slate-50 p-4 rounded-lg hover:bg-slate-100 transition-colors">
                      <span className="block text-sm text-slate-500 mb-1">
                        Visibility
                      </span>
                      <span className="font-medium text-slate-900">
                        {result.environmental_conditions.visibility || "N/A"}
                      </span>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-lg hover:bg-slate-100 transition-colors">
                      <span className="block text-sm text-slate-500 mb-1">
                        Weather
                      </span>
                      <span className="font-medium text-slate-900">
                        {result.environmental_conditions.weather || "N/A"}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>

          <section className="transition-all hover:shadow-lg rounded-lg overflow-hidden">
            <div className="h-full bg-white rounded-lg border border-slate-200">
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-3 md:p-4">
                <h3 className="text-lg md:text-xl font-semibold text-white">
                  Traffic Flow
                </h3>
              </div>
              {result.road_condition && (
                <div className="p-4 md:p-5">
                  <div className="bg-slate-50 p-4 rounded-lg hover:bg-slate-100 transition-colors">
                    <span className="block text-sm text-slate-500 mb-1">
                      Road Condition
                    </span>
                    <span className="font-medium text-slate-900">
                      {result.road_condition.status || "N/A"}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </section>

          {result.incident_detection && (
            <section className="transition-all hover:shadow-lg rounded-lg overflow-hidden">
              <div className="h-full bg-white rounded-lg border border-slate-200">
                <div className="bg-gradient-to-r from-red-500 to-red-600 p-3 md:p-4">
                  <h3 className="text-lg md:text-xl font-semibold text-white">
                    Incident Detection
                  </h3>
                </div>
                <div className="p-4 md:p-5">
                  <div className="bg-slate-50 p-4 rounded-lg space-y-3">
                    <p className="flex justify-between items-center">
                      <span className="text-slate-600">Incidents:</span>
                      <span className="font-medium text-slate-900 bg-white px-3 py-1 rounded-full shadow-sm">
                        {result.incident_detection.incidents || "N/A"}
                      </span>
                    </p>
                    <div className="border-t pt-3">
                      <span className="block text-sm text-slate-500 mb-1">
                        Details
                      </span>
                      <span className="text-slate-900">
                        {result.incident_detection.details || "N/A"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalyzedReport;
