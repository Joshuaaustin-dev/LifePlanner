import { useState } from "react";
import axios from "axios";

const Planner = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const HTTP = "http://localhost:5000/chat";

  
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${HTTP}`, { prompt })
      .then((res) => {
        setResponse(res.data);
        console.log(prompt);
      })
      .catch((error) => {
        console.log(error);
      });

    setPrompt("");
  };

  const handlePrompt = (e) => {
    setPrompt(e.target.value);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">AI Integration</h1>
      <textarea
        className="w-full border p-2"
        rows="4"
        value={prompt}
        placeholder="Enter a prompt..."
        onChange={handlePrompt}
      />
      <br></br>
      <button
        onClick={handleSubmit}
        className="mt-4 bg-blue-500 px-4 py-2 rounded"
      >
        Send to AI
      </button>
      {response && (
        //TODO modify the response to be from the AI
        <div className="p-4 border rounded bg-gray-100 mt-4">
          <h2 className="font-semibold">Response:</h2>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default Planner;
