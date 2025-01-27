import { useState } from "react";
import axios from "axios";

const AIExample = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const handlePromptChange = (e) => setPrompt(e.target.value);

  //TODO: Modify this handler to use the API key
  const handleSendToAI = () => {
    if (prompt) {
      setResponse("Hello World");
    } else {
      setResponse("Please enter a prompt");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">AI Integration</h1>
      <textarea
        className="w-full border p-2"
        rows="4"
        value={prompt}
        placeholder="Enter a prompt..."
        onChange={handlePromptChange}
      />
      <br></br>
      <button
        onClick={handleSendToAI}
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

export default AIExample;
