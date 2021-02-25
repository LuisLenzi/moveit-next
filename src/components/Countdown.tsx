import { useState, useEffect } from 'react';
import styles from '../styles/components/Countdown.module.css'

let countdownTimeout: NodeJS.Timeout;

export function Countdown() {
    const value = 0.05 * 60;
    const [time, setTime] = useState(value);
    const [active, setActive] = useState(false);
    const [finished, setfinished] = useState(false);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

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
        }
    }, [active, time])

    return (
        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>
            </div>
            {finished ? (
                <button disabled className={styles.countdownButton}>
                    Ciclo Encerrado
                    <img src="icons/check.svg" alt=""/>
                </button>
            ) : (
                    <>
                        {active ? (
                            <button type="button" className={`${styles.countdownButton} ${styles.countdownButtonActive}`} onClick={resetCountdown}>Abandonar Ciclo</button>

                        ) : (
                                <button type="button" className={styles.countdownButton} onClick={startCountdown}>Iniciar um ciclo</button>
                            )}
                    </>

                )}


        </div>
    );
}