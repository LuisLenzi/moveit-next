import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContext } from "./ChallengeContext";

let countdownTimeout: NodeJS.Timeout;

interface CountdownContextData{
    minutes: number,
    seconds: number,
    finished: boolean,
    active: boolean,
    startCountdown: () => void;
    resetCountdown:() => void;
}

interface CountdownProviderProps{
    children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData)

export function CountdownProvider({ children }){
    const { startNewChallenge } = useContext(ChallengesContext);
    const value = 0.05 * 60;
    const [time, setTime] = useState(value);
    const [active, setActive] = useState(false);
    const [finished, setfinished] = useState(false);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    function startCountdown() {
        setActive(true);
    }

    function resetCountdown() {
        clearTimeout(countdownTimeout);
        setActive(false);
        setTime(value);
    }

    useEffect(() => {
        if (active && time > 0) {
            countdownTimeout = setTimeout(() => {
                setTime(time - 1);
            }, 1000)
        } else if (active && time === 0) {
            setfinished(true);
            setActive(false);
            startNewChallenge();
        }
    }, [active, time])

    return (
        <CountdownContext.Provider value={{
            minutes,
            seconds,
            finished,
            active,
            startCountdown,
            resetCountdown
        }}>
            { children }
        </CountdownContext.Provider>
    )
}