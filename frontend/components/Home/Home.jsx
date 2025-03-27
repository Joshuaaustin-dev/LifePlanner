import { useState, useEffect } from "react";
import useUser from "../Hooks/userUser";
import axios from "axios";
import "./Home.css";

const Home = () => {
  const { user } = useUser();
  const [userText, setUserText] = useState(null);

  // Greeting messages
  const greetings = [
    "Hey, it's great to see you,",
    "Welcome back,",
    "Hey there, ready to get started,",
    "We're glad you're back,",
    "Hello There,",
    "Welcome back, let's get to work,",
    "It's great to see you again,",
    "We're excited you're here,",
    "Nice to see you,",
    "Let's get started,",
  ];

  // Daily quotes (TODO created an extended version fetched from an API)
  const dailyQuotes = [
    "The only way to do great work is to love what you do. – Steve Jobs",
    "Success is not final, failure is not fatal: It is the courage to continue that counts. – Winston Churchill",
    "The future belongs to those who believe in the beauty of their dreams. – Eleanor Roosevelt",
    "Don’t watch the clock; do what it does. Keep going. – Sam Levenson",
    "Your time is limited, don’t waste it living someone else’s life. – Steve Jobs",
    "The best way to predict the future is to create it. – Abraham Lincoln",
    "It does not matter how slowly you go as long as you do not stop. – Confucius",
    "Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle. – Christian D. Larson",
    "Success usually comes to those who are too busy to be looking for it. – Henry David Thoreau",
    "Don’t wait. The time will never be just right. – Napoleon Hill",
  ];

  // Function to get a random greeting
  const getRandomGreeting = () => {
    return greetings[Math.floor(Math.random() * greetings.length)];
  };

  // Function to get a random quote
  const getRandomQuote = () => {
    return dailyQuotes[Math.floor(Math.random() * dailyQuotes.length)];
  };

  useEffect(() => {
    if (user && user.skills) {
      setUserText(
        <div className="home-main">
          <h1>
            {getRandomGreeting()} {user.name}!
          </h1>
          <hr />

          {/* Daily Quote Section */}
          <section className="quoteSection">
            <h3>Quote of the Day:</h3>
            <p>{getRandomQuote()}</p>
          </section>
          <br />

          {/* Current Skills Section */}
          <h3>Your Current Skills</h3>
          <ul className="home-ul">
            {user.skills.map((skill, skillIndex) => (
              <li key={skillIndex}>
                <h4>{skill.name}</h4>
              </li>
            ))}
          </ul>
          {/* Tutorial Section */}
          <hr />
          <section className="home-tutorialSection">
            <h2>Here’s a quick guide to get you started:</h2>
            <ul className="home-ul">
              <li>
                <strong>Dashboard:</strong> View your goals and track your
                progress with helpful graphs.
              </li>
              <li>
                <strong>Planner:</strong> Use AI to generate a plan for
                achieving your goals.
              </li>
              <li>
                <strong>Profile:</strong> View your stats and completed goals
                (Coming Soon).
              </li>
              <li>
                <strong>Calendar:</strong> Schedule your goals to stay on track.
              </li>
              <li>
                <strong>Shop:</strong> More features coming soon to help you
                achieve even more!
              </li>
            </ul>
          </section>
        </div>
      );
    } else {
      setUserText(null);
    }
  }, [user]);

  return <>{userText}</>;
};

export default Home;
