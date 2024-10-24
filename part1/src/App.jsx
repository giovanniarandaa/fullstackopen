import { useState } from "react";

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticLine = ({ name, value }) => (
  <p>{name} {value}</p>
)

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
          <StatisticLine name="good" value={good} />
          <StatisticLine name="neutral" value={neutral} />
          <StatisticLine name="bad" value={bad} />
          <StatisticLine name="all" value={total} />
          <StatisticLine name="average" value={average} />
          <StatisticLine name="positive" value={positive + "%"} />
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
      <Button handleClick={() => setGood((p) => p + 1)} text="good" />
      <Button handleClick={() => setNeutral((p) => p + 1)} text="neutral" />
      <Button handleClick={() => setBad((p) => p + 1)} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
}

export default App;
