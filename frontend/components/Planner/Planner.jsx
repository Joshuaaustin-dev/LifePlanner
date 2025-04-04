import { useState, useEffect } from "react";
import axios from "axios";
import "./Planner.css";
import useUser from "../Hooks/userUser";

const Planner = () => {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [plan, setPlan] = useState([]);
  const [timePeriod, setTimePeriod] = useState("2");
  const [goalSpeed, setGoalSpeed] = useState("1");
  const { user, coins, setCoins } = useUser();

  const speedOptions = ["Slow", "Moderate", "Fast"];

  const HTTP = "http://localhost:5000/chat";
  const today = new Date().toISOString().split("T")[0];

  const queryPlan = "Create a structured learning plan for the subject:";
  const queryTime = "The plan should span over";
  const queryStyle = `Make the name the subject, do not include json at the top or escape sequences.
                      Do not contain the day in content and keep it brief but with individual steps the user can take,
                      each subject should take an hour a day.
                      The first day should be ${today}. 
                      Format the output as follows: {"name":"Chess","day":[{"date":"2025-02-01","content":"Some objective goal for the day"}]},
                      make sure it is an objective doable goal in a day. 
                      Make sure the "name" is reduced to the subject name if it is too long.
                      Things should make logical sense, you don't buy a cake and then bake it the next day.`;
  /*
    GPT has difficulty understanding pace adjustments dynamically.
    const pace = `Plan it at a ${speedOptions[goalSpeed]} pace. By pace I mean increase how many more tasks to do in a day.
                  For example if I did slow I want to practice learning the board and playing 1 game.
                  If I did fast I want to play multiple games rather than 1`;
  */

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const combinePrompt = `${queryPlan} ${prompt}. ${queryTime} ${timePeriod} days. ${queryStyle}`;

    if (coins < 100) {
      setIsError(true);
      setIsLoading(false);
      return;
    }

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

            axios
              .post("http://localhost:5000/deduct-coins", {
                email: user.email,
              })
              .then((coinResponse) => {
                setCoins(coinResponse.data.coins); 
              })
              .catch((error) => console.error("Error updating coins:", error));

            setPlan(Array.isArray(skill.day) ? skill.day : []);
            setIsError(false);
            setIsLoading(false);
          })
          .catch((error) => {
            console.log("Error adding skill:", error.response?.data);
            setIsError(true);
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
    <div className="Planner responsive">
      <div className="card">
        <h1>Generate a new plan!</h1>
        <h3>Current amount of coins: {coins}</h3>

        <textarea
          className="textbox"
          rows="4"
          value={prompt}
          placeholder="Enter a prompt..."
          onChange={(e) => setPrompt(e.target.value)}
        />
        <p className="ms-1">
          Tip: Being more <b>specific</b> will create a more detailed plan. (e.g., Chess vs Chess Openings)
        </p>

        <div className="slider-container">
          <label htmlFor="days-range" className="slider-label">
            Plan Duration: {timePeriod} {timePeriod === 1 ? "day" : "days"}
          </label>
          <input
            type="range"
            id="days-range"
            className="range-slider"
            min="1"
            max="30"
            value={timePeriod}
            onChange={(e) => setTimePeriod(parseInt(e.target.value))}
          />
        </div>

        <button
          className="button"
          onClick={handleSubmit}
          disabled={isLoading || prompt.trim() === ""}
        >
          Send to AI
        </button>

        {isError && (
          <p className="text-center text-danger">
            Not enough coins to generate a plan!
          </p>
        )}
      </div>

      {isLoading && <p>Loading ...</p>}

      {plan.length > 0 && !isLoading && (
        <section className="planSection">
          <div className="p-2 bg-white-100 mt-1">
            <h2 className="font-semibold text-center mb-4">Learning Plan</h2>
            <hr className="border-bottom border-2 " />
            <div>
              {plan.map((day, index) => (
                <div key={index} className="mb-4">
                  <h3>
                    {new Date(day.date).toLocaleDateString()}: {day.content}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Planner;
