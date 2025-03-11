import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import "./HorizontalBarChart.css";

const HorizontalBarChart = ({ updateTrigger }) => {
  const [chartData, setChartData] = useState([]);
  const [userStore, setUserStore] = useState(null);

  useEffect(() => {
    setUserStore(JSON.parse(localStorage.getItem("user")));
  }, []);

  useEffect(() => {
    if (userStore) {
      axios
        .post("http://localhost:5000/get-user", { email: userStore.email })
        .then((response) => {
          if (response.data && response.data.skills) {
            const processedData = response.data.skills.map((skill) => {
              if (!skill.day || !Array.isArray(skill.day)) {
                console.error(`Invalid "day" data for skill: ${skill.name}`, skill.day);
                return {
                  name: skill.name,
                  completed: 0,
                  total: 0,
                };
              }

              const total = skill.day.length;
              const completed = skill.day.filter((d) => d.completed === true).length;

              console.log(`Skill: ${skill.name}, Completed: ${completed}, Total: ${total}`);

              return {
                name: skill.name,
                completed,
                total,
              };
            });

            setChartData(processedData);
          }
        })
        .catch((error) => console.error("Error fetching chart data:", error));
    }
  }, [userStore, updateTrigger]);

  return (
    <div className="chart-container">
      <h3 className="chart-title">Skill Progress Overview</h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          layout="vertical"
          data={chartData}
          margin={{ top: 20, right: 50, left: 60, bottom: 20 }}
          barGap={10}
          barCategoryGap={15}
        >
          <CartesianGrid className="grid-style" strokeDasharray="3 3" />
          <XAxis className="axis-text" type="number" />
          <YAxis className="axis-text" dataKey="name" type="category" />
          <Tooltip wrapperClassName="tooltip-style" />
          <Legend verticalAlign="top" align="right" className="legend-style" />
          <Bar dataKey="total" fill="red" barSize={25} radius={[6, 6, 0, 0]} name="Total" />
          <Bar dataKey="completed" fill="#42a5f5" barSize={25} radius={[6, 6, 0, 0]} name="Completed" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HorizontalBarChart;
