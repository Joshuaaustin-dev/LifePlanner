import { useState } from "react";
import axios from "axios";

const Planner = () => {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [plan, setPlan] = useState([]);
  const [timePeriod, setTimePeriod] = useState("1 Month");

  const HTTP = "http://localhost:5000/chat";
  const queryPlan = "Create a structured learning plan for the subject:";
  const queryTime = "The plan should span over";
  const queryStyle = "Format the output as follows: Each day should start with '$' and include learning tasks. Then end the day with a @";

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const combinePrompt = `${queryPlan} ${prompt}. ${queryTime} ${timePeriod}. ${queryStyle}`;
    console.log(combinePrompt);
    
    axios
      //uses the backend server
      .post(`${HTTP}`, { prompt: combinePrompt })
      .then((res) => {
        // Split the response into daily tasks
        const dailyTasks = res.data.split('$').slice(1).map((day) => {
          const [dayNumber, ...tasks] = day.split('@');
          return {
            day: dayNumber.trim(),
            tasks: tasks.join(' ').trim().split('.').map(task => task.trim()).filter(Boolean),
          };
        });
        setPlan(dailyTasks); 
      })
      .catch((error) => {
        console.log(error);
      });
    
    setIsLoading(false);
    setPrompt("");
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">AI Integration</h1>
      <textarea
        className="w-full border p-2"
        rows="4"
        value={prompt}
        placeholder="Enter a prompt..."
        onChange={(e) => setPrompt(e.target.value)}
      />
      
      <div className="mt-2">
        <label className="block font-semibold">Select Time Period:</label>
        <select
          className="w-full border p-2 mt-1"
          value={timePeriod}
          onChange={(e) => setTimePeriod(e.target.value)}
        >
          <option>1 Month</option>
          <option>2 Months</option>
          <option>3 Months</option>
        </select>
      </div>
      
      <button
        onClick={handleSubmit}
        className="mt-4 bg-blue-500 px-4 py-2 rounded text-black"
      >
        Send to AI
      </button>
      
      <section>
        {isLoading && <p>Loading ... </p>}
        {plan.length > 0 && (
          <div className="p-4 border rounded bg-gray-100 mt-4">
            <h2 className="font-semibold">Learning Plan:</h2>
            <div>
              {plan.map((day, index) => (
                <div key={index} className="mb-4">
                  <h3 className="font-semibold">Day {day.day}:</h3>
                  <ul>
                    {day.tasks.map((task, i) => (
                      <li key={i}>{task}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Planner;
