import { useState } from "react";



// no need for 'props' with an all-javascript component
// reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
const randomAnecdote = (anecdotes) => {
  const output = anecdotes.length;
  return Math.floor(Math.random() * output);
};

const incrementVote = (votes, selected) => {
  const copy = [...votes]; // copy the array using the spread operator
  copy[selected] += 1;
  return copy;
}

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));
  const [selected, setSelected] = useState(0);

  return (
  <div>
    <p>{anecdotes[selected]}</p>
    <p>has {votes[selected]} votes</p>
    <button onClick={() => setVotes(incrementVote(votes, selected))}>vote this</button>
    <button onClick={() => setSelected(randomAnecdote(anecdotes))}>next random anecdote</button>
  </div>
  );
};

export default App;
