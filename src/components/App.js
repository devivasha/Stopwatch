import React, {useState, useRef} from 'react';
import useDoubleClick from 'use-double-click';

const App = () => {
    const [timer, setTimer] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const countRef = useRef(null);

    const handleStart = () => {
        setIsActive(true);
        setIsPaused(true);
        countRef.current = setInterval(() => {
            setTimer((timer) => timer + 1)
        }, 1000)
    }
    const handleStop = () => {
        clearInterval(countRef.current);
        setIsPaused(false);
    }
    const handleReset = () => {
        clearInterval(countRef.current);
        setIsActive(false);
        setIsPaused(false);
        setTimer(0)
    }
    const formatTime = () => {
        const getSeconds = `0${(timer % 60)}`.slice(-2);
        const minutes = `${Math.floor(timer / 60)}`;
        const getMinutes = `0${minutes % 60}`.slice(-2);
        const getHours = `0${Math.floor(timer / 3600)}`.slice(-2);
        return `${getHours} : ${getMinutes} : ${getSeconds}`
    }
    const Button = () => {
        const buttonRef = useRef();
        useDoubleClick({
            onSingleClick: e => {
                console.log(e, 'single click');
            },
            onDoubleClick: e => {
                console.log(e, 'double click');
                clearInterval(countRef.current);
                setIsPaused(false);
            },
            ref: buttonRef,
            latency: 300
        });

        return <button style={{color:"white", backgroundColor:'grey', margin:'10px', width:"60px", borderRadius:"5px"}} ref={buttonRef}>Wait</button>
    }
    return (
        <div style={{marginTop:"70px", marginLeft:"35%"}}>
            <h3 style={{color:"darkgray", marginLeft:"50px", fontSize:'30px'}}>Stopwatch</h3>
            <h1 style={{marginLeft:"40px"}}>{formatTime()}</h1>
            <button style={{color:"white", backgroundColor:'grey', margin:'10px', width:"60px", borderRadius:"5px"}}
                    onClick={()=>{isActive && isPaused ? handleStop():handleStart()}}>{isActive && isPaused ?"Stop":"Start"}</button>
            <Button >Wait</Button>
            <button style={{color:"white", backgroundColor:'grey', margin:'10px', width:"60px", borderRadius:"5px"}}
                    onClick={handleReset} disabled={!isActive}>Reset</button>
        </div>
    )
}

export default App;


