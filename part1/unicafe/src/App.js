import React, { useState } from 'react'

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const Feedback = ({ handlers, stats }) => {
  const handleClickGood = () => handlers.setGood(stats.good + 1);
  const handleClickNeutral = () => handlers.setNeutral(stats.neutral + 1);
  const handleClickBad = () => handlers.setBad(stats.bad + 1);

  return (
    <>
      <h1> give feedback</h1>
      <Button onClick={handleClickGood} text="good" />
      <Button onClick={handleClickNeutral} text="neutral" />
      <Button onClick={handleClickBad} text="bad" />
    </>
  )
}

const Stat = ({ name, value }) => <p>{name}: {value}</p>;

const Statistics = ({ stats }) => {
  let clickCount = 0;
  for (let key in stats) {
    clickCount += stats[key]
  }
  let average = ((stats.good - stats.bad) / clickCount).toFixed(2);

  if (clickCount > 0) {
    return (
      <>
        <h1>statistics</h1>
        <Stat name="good" value={stats.good} />
        <Stat name="neutral" value={stats.neutral} />
        <Stat name="bad" value={stats.bad} />
        <Stat name="clicks" value={clickCount} />
        <Stat name="average" value={average} />
      </>
    )  
  } else {
    return (
      <>
        <h1>statistics</h1>
        <p>no feedback given, yet</p>
      </>
    )  
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <Feedback handlers={{ setGood, setNeutral, setBad }} stats={{ good, neutral, bad }}/>
      <Statistics stats={{ good, neutral, bad }} />
    </div>
  );
};

export default App