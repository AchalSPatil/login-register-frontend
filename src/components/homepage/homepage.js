import React, { useState, useEffect } from 'react';
import "./homepage.css"

const Homepage = ({updateUser}) => {

    const [workTime, setWorkTime] = useState(4 * 60); // 4 minutes in seconds
  const [breakTime, setBreakTime] = useState(2 * 60); // 2 minutes in seconds
  const [timerActive, setTimerActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  useEffect(() => {
    let timerInterval;

    if (timerActive && workTime > 0) {
      timerInterval = setInterval(() => {
        setWorkTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timerActive && workTime === 0 && !isBreak) {
      // Work timer has completed, switch to break timer
      clearInterval(timerInterval);
      setTimerActive(false);
      setIsBreak(true);
      setTimeout(() => {
        setTimerActive(true);
        setIsBreak(false);
        setWorkTime(4 * 60); // Reset work timer for the next cycle
      }, breakTime * 1000);
    }

    return () => {
      clearInterval(timerInterval);
    };
  }, [timerActive, workTime, isBreak, breakTime]);

  const startTimer = () => {
    setTimerActive(true);
  };

  const pauseTimer = () => {
    setTimerActive(false);
  };

  const resetTimer = () => {
    setTimerActive(false);
    setIsBreak(false);
    setWorkTime(4 * 60);
    setBreakTime(2 * 60); // Reset break timer as well
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

    return (
        <div className="homepage">
            {/* <h1>Hello Homepage</h1> */}
            <div className="button" onClick={() => updateUser({})} >Logout</div>

            <h1>{isBreak ? 'Break Timer' : 'Work Timer'}: {formatTime(workTime)}</h1>
      {timerActive ? (
        <button className='btn' onClick={pauseTimer}>Pause</button>
      ) : (
        <button className='btn' onClick={startTimer}>Start</button>
      )}
      <button className='btn' onClick={resetTimer}>Reset</button>

      <h2>Next Timer: {isBreak ? 'Work' : 'Break'}</h2>

            </div>
//     <div className="flex flex-col items-center justify-center w-1/2 h-1/2 rounded-2xl shadow-lg bg-white relative">
//     <div className="bg-blue-500 border border-blue-500 text-white text-lg py-2 px-4 rounded-lg cursor-pointer" onClick={() => updateUser({})}>Logout</div>
  
//     <h1 className="text-xl font-bold mb-2">{isBreak ? 'Break Timer' : 'Work Timer'}: {formatTime(workTime)}</h1>
  
//     {timerActive ? (
//       <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full outline-none focus:outline-none" onClick={pauseTimer}>Pause</button>
//     ) : (
//       <button className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-full outline-none focus:outline-none" onClick={startTimer}>Start</button>
//     )}
  
//     <button className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-full outline-none focus:outline-none mt-2" onClick={resetTimer}>Reset</button>
  
//     <h2 className="text-lg mt-2">Next Timer: {isBreak ? 'Work' : 'Break'}</h2>
//   </div>
    )
}

export default Homepage
