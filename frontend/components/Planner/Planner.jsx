import { useState, useEffect } from "react";
import axios from "axios";
import "./Planner.css";

const Planner = () => {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [plan, setPlan] = useState([]);
  const [timePeriod, setTimePeriod] = useState("2 days");
  const [user, setUser] = useState(null);

  useEffect(() => {
    setIsLoading(true); 
    axios
      .get("http://localhost:5000/dummy")
      .then((response) => {
        setUser(response.data);
        setIsLoading(false); 
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
        setIsLoading(false); 
      });
  }, []);

  const HTTP = "http://localhost:5000/chat";
  const queryPlan = "Create a structured learning plan for the subject:";
  const queryTime = "The plan should span over";
  const queryStyle = `Make the name the subject, do not include json at the top or escape sequences, do not contain the day in content and keep it brief. Format the output as follows: {"name":"Chess","day":[{"date":"2025-02-01","content":"Introduction to chess: Learn the board setup, piece movements, and rules. Play games focusing on applying these principles."}]}`;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true); 

    const combinePrompt = `${queryPlan} ${prompt}. ${queryTime} ${timePeriod}. ${queryStyle}`;
    console.log(combinePrompt);

    axios
      .post(`${HTTP}`, { prompt: combinePrompt })
      .then((res) => {
        axios
          .post("http://localhost:5000/add-skill", {
            email: user.email,
            skill: res.data,
          })
          .then((response) => {
            const skill = response.data;
            setPlan(skill.day); 
            setIsLoading(false); 
          })
          .catch((error) => {
            console.error("Error adding skill:", error);
            setIsLoading(false);
          });
      })
      .catch((error) => {
        console.error("Error generating plan:", error);
        setIsLoading(false); 
      });

    setPrompt(""); 
  };

  return (
    <div className="Planner">
      <h1>AI Integration</h1>
      <textarea
        className="textbox"
        rows="4"
        value={prompt}
        placeholder="Enter a prompt..."
        onChange={(e) => setPrompt(e.target.value)}
      />

      <div>
        <select
          className="dropdown"
          value={timePeriod}
          onChange={(e) => setTimePeriod(e.target.value)}
        >
          <option>1 Week</option>
          <option>2 Weeks</option>
          <option>3 Weeks</option>
        </select>
      </div>

      <button className="button" onClick={handleSubmit} disabled={isLoading}>
        Send to AI
      </button>

      <section>
        {isLoading && <p>Loading ...</p>} 
        {plan.length > 0 && !isLoading && (
          <div className="p-4 border rounded bg-gray-100 mt-4">
            <h2 className="font-semibold">Learning Plan:</h2>
            <div>
              {plan.map((day, index) => (
                <div key={index} className="mb-4">
                  <h3 className="font-semibold">
                    {day.date}: {day.content}
                  </h3>
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
