import { useState } from 'react';

const Header = ({ text }) => <h1>{text}</h1>;

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const StatisticsLine = ({ text, value }) => (
  <table>
    <tbody>
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    </tbody>
  </table>
);

const Statistics = ({ good, neutral, bad }) => {
  const all = good + bad + neutral;
  if (good || neutral || bad) {
    return (
      <>
        <h1>Stats!</h1>
        <StatisticsLine text='good' value={good} />
        <StatisticsLine text='neutral' value={neutral} />
        <StatisticsLine text='bad' value={bad} />
        <StatisticsLine text='Total' value={all} />
        <StatisticsLine text='Average' value={(good + bad * -1) / all} />
        <StatisticsLine text='Positive' value={(good / all) * 100 + '%'} />
      </>
    );
  } else {
    return (
      <>
        <h1>Stats!</h1>
        <p>No Feedback</p>
      </>
    );
  }
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const setGoodValue = () => {
    console.log('good before', good);
    const updatedGood = good + 1;
    setGood(updatedGood);
    console.log('good after', updatedGood);
  };

  const setNeutralValue = () => {
    const updatedNeutral = neutral + 1;
    setNeutral(updatedNeutral);
  };

  const setBadValue = () => {
    const updatedBad = bad + 1;
    setBad(updatedBad);
  };

  const all = good + bad + neutral;

  return (
    <div>
      <Header text='Give Feedback!' />
      <Button handleClick={setGoodValue} text='Good' />
      <Button handleClick={setNeutralValue} text='Neutral' />
      <Button handleClick={setBadValue} text='Bad' />
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  );
};

export default App;
