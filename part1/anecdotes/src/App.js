import { useState } from "react";

const Anecdote = (props) => {
  return (
    <div>
      <p>{props.anecdote}</p>
      <p>Has {props.votes} votes</p>
    </div>
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));
  const [highest, setHighest] = useState(undefined);

  // Get a new number that it different from the current one
  const setNext = () => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * anecdotes.length);
    } while (newIndex === selected);
    setSelected(newIndex);
  };

  const addVote = () => {
    const newVotes = [...votes];
    newVotes[selected] = votes[selected] + 1;
    setVotes(newVotes);
    setHighest(
      newVotes.reduce(
        (maxIndex, currentValue, currentIndex) =>
          currentValue > newVotes[maxIndex] ? currentIndex : maxIndex,
        0
      )
    );
  };

  return (
    <div>
      <div>
        <h1>Anecdote of the day</h1>
        <Anecdote anecdote={anecdotes[selected]} votes={votes[selected]} />
        <div>
          <button onClick={addVote}>Vote</button>
          <button onClick={setNext}>Next anecdote</button>
        </div>
      </div>
      {highest !== undefined && (
        <div>
          <h1>Anecdote with most votes</h1>
          <Anecdote anecdote={anecdotes[highest]} votes={votes[highest]} />
        </div>
      )}
    </div>
  );
};

export default App;
