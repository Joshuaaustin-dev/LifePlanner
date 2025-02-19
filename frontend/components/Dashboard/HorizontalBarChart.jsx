import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";

const HorizontalBarChart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/dummy")
      .then((response) => {
        if (response.data && response.data.skills) {
          const processedData = response.data.skills.map((skill) => {
            const completed = skill.day.filter((d) => d.completed).length;
            const incomplete = skill.day.length - completed;

            return {
              name: skill.name, 
              completed,
              incomplete,
            };
          });

          setChartData(processedData);
        }
      })
      .catch((error) => console.error("Error fetching chart data:", error));
  }, []);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        layout="vertical"
        data={chartData}
        margin={{ top: 20, right: 30, left: 40, bottom: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" />
        <YAxis dataKey="name" type="category" />
        <Tooltip />
        <Legend />
        <Bar dataKey="completed" fill="#4CAF50" barSize={30} name="Completed" />
        <Bar dataKey="incomplete" fill="#F44336" barSize={30} name="Incomplete" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default HorizontalBarChart;
