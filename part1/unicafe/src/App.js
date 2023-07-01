import { useState } from "react";

const Button = (props) => {
  const { text, handleClick } = props;
  return <button onClick={handleClick}>{text}</button>;
};

const Statistics = (props) => {
  const { statistics } = props;
  return (
    <table>
      <tbody>
        {statistics.map((stat) => (
          <StatisticsLine key={stat.name} name={stat.name} value={stat.value} />
        ))}
      </tbody>
    </table>
  );
};

const StatisticsLine = (props) => {
  const { name, value } = props;
  return (
    <tr>
      <td>{name}</td>
      <td>{value}</td>
    </tr>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [average, setAverage] = useState(0);
  const [positive, setPositive] = useState("");
  const [total, setTotal] = useState(0);

  const addGood = () => {
    const newGood = good + 1;
    const newTotal = total + 1;
    const newAverage = ((newGood - bad) / newTotal).toFixed(2);
    const newPositive = ((newGood / newTotal) * 100).toFixed(2);
    setGood(newGood);
    setAverage(newAverage);
    setTotal(newTotal);
    setPositive(newPositive + " %");
  };

  const addNeutral = () => {
    const newNeutral = neutral + 1;
    const newTotal = total + 1;
    const newAverage = ((good - bad) / newTotal).toFixed(2);
    const newPositive = ((good / newTotal) * 100).toFixed(2);
    setNeutral(newNeutral);
    setAverage(newAverage);
    setTotal(newTotal);
    setPositive(newPositive + " %");
  };

  const addBad = () => {
    const newBad = bad + 1;
    const newTotal = total + 1;
    const newAverage = ((good - newBad) / newTotal).toFixed(2);
    const newPositive = ((good / newTotal) * 100).toFixed(2);
    setBad(newBad);
    setAverage(newAverage);
    setTotal(newTotal);
    setPositive(newPositive + " %");
  };

  const statistics = [
    { name: "Good", value: good },
    { name: "Neutral", value: neutral },
    { name: "Bad", value: bad },
    { name: "All", value: total },
    { name: "Average", value: average },
    { name: "Positive", value: positive },
  ];

  return (
    <div>
      <h1>Give feedback</h1>
      <div>
        <Button text="Good" handleClick={addGood} />
        <Button text="Neutral" handleClick={addNeutral} />
        <Button text="Bad" handleClick={addBad} />
      </div>
      <h1>Statistics</h1>
      {total > 0 ? (
        <div>
          <Statistics statistics={statistics} />
        </div>
      ) : (
        <p>No feedback given</p>
      )}
    </div>
  );
};

export default App;
