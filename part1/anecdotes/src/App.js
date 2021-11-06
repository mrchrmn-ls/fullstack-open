import React, { useState } from 'react'

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ];
   
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

  const mostVotesIndex = () => votes.indexOf(votes.slice().sort((a, b) => b - a)[0]);
  const handleRandomClick = () => setSelected(Math.floor(Math.random() * anecdotes.length));
  const handleVote = () => setVotes(votes.map((vote, index) => index === selected ? vote + 1 : vote));
  
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>anecdote has {votes[selected]} votes</p>
      <p>
        <Button text="random anecdote" onClick={handleRandomClick} />
        <Button text="vote" onClick={handleVote} />
      </p>
      <h1>Anecdote with most votes ({votes[mostVotesIndex()]}):</h1>
      <p>{anecdotes[mostVotesIndex()]}</p>
    </div>
  );
}

export default App