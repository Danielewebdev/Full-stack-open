import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const StatisticLine = ({ text, value }) => (
  <p>{text} {value}</p>
)

const Statistics = ({ good, neutral, bad, total, average, positiveFeedback }) => {
  
  if (total == 0) {
    return <p>No feedback given</p>;
}

  return (
    <div>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={total} />
      <StatisticLine text="average" value={average} />
      <StatisticLine text="positive" value={positiveFeedback} />
    </div>
  )

}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const total = good + neutral + bad;
  const average =  total > 0 ? (good - bad) / total : 0;
  const positiveFeedback = total > 0 ? (good / total) * 100 : 0;

  const addGood = () => setGood(prevGood => prevGood + 1)
  const addNeutral = () => setNeutral(prevNeutral => prevNeutral + 1)
  const addBad = () => setBad(prevBad => prevBad + 1)
  

  return (
    <div>
      <h1>Pls gib feedback</h1>
      <Button handleClick={addGood} text="good" />
      <Button handleClick={addNeutral} text="neutral" />
      <Button handleClick={addBad} text="bad" />

      <h1>Statistics</h1>
      <Statistics 
      good={good} 
      neutral={neutral} 
      bad={bad} 
      total={total}
      average={average}
      positiveFeedback={positiveFeedback} /> 


    </div>
  )
}

export default App