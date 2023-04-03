import { useState } from 'react';

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.',
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Uint8Array(anecdotes.length));

  const selectQuote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
    console.log(selected);
  };

  const vote = () => {
    const copy = [...votes];
    copy[selected]++;
    setVotes(copy);
  };

  return (
    <div>
      {anecdotes[selected]}
      <p></p>
      <Button handleClick={selectQuote} text='Random Quote' />
      <Button handleClick={vote} text='Vote!' />
      {votes[selected]}
      <h1>anecdotes with the most votes!!</h1>
      {anecdotes[votes.indexOf(Math.max(...votes))]}
      <p>
        has
        {votes[votes.indexOf(Math.max(...votes))]} votes!
      </p>
    </div>
  );
};

export default App;
