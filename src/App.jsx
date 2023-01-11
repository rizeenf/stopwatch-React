import { useEffect, useState } from "react";

import "./App.css";

function App() {
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [ms, setMs] = useState(0);
  const [isStart, setIsStart] = useState(false);
  const [history, setHistory] = useState("");

  const toggle = () => {
    setIsStart(!isStart);
  };

  let interval = null;

  useEffect(() => {
    if (isStart) {
      interval = setInterval(() => {
        setMs((ms) => ms + 1);

        if (ms == 9) {
          setMs(0);
          setSecond((second) => second + 1);
        } else if (second == 59) {
          setSecond(0);
          setMinute((minute) => minute + 1);
        } else if (minute == 59) {
          setMinute(0);
          setHour((hour) => hour + 1);
        }
      }, 100);
    }

    return function () {
      clearInterval(interval);
    };
  }, [isStart, ms]);

  const stopTimer = () => {
    clearInterval(interval);
    setIsStart(false);
  };

  const resetTimer = () => {
    setHour(0);
    setMinute(0);
    setSecond(0);
    setMs(0);
    setIsStart(false);
    clearInterval(interval);
  };

  const recordTime = () => {
    setHistory(`${hour} : ${minute} : ${second} : ${ms}`);
  };

  return (
    <div className="App">
      <h1>
        {hour == 0 ? "00" : <span>{hour}</span>}:
        {minute == 0 ? "00" : <span>{minute}</span>}:
        {second == 0 ? "00" : <span>{second}</span>},
        {ms == 0 ? "00" : <span className="ms">{ms}</span>}
      </h1>
      <button onClick={toggle}>{isStart ? "Pause" : "Start"}</button>
      <button onClick={stopTimer}>Stop</button>
      <button onClick={resetTimer}>Reset</button>
      <button onClick={recordTime}>Record</button>
      <h2>{history}</h2>
    </div>
  );
}

export default App;
