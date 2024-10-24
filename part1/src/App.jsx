import { useState } from "react";

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const average = (good - bad) / total;
  const positive = (good / total) * 100;

  return (
    <>
      <h2>Statistics</h2>
      {good === 0 && neutral === 0 && bad === 0 ? (
        <p>No feedback given</p>
      ) : (
        <>
          <p>good {good}</p>
          <p>neutral {neutral}</p>
          <p>bad {bad}</p>
          <p>all {total}</p>
          <p>average {average}</p>
          <p>positive {positive}%</p>
        </>
      )}
    </>
  );
};

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h2>Give feedback</h2>
      <button type="button" onClick={() => setGood((p) => p + 1)}>
        good
      </button>
      <button type="button" onClick={() => setNeutral((p) => p + 1)}>
        neutral
      </button>
      <button type="button" onClick={() => setBad((p) => p + 1)}>
        bad
      </button>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
}

export default App;
