import { useContext} from 'react';
import { ChallengesContext } from '../contexts/ChallengeContext';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/ChallengeBox.module.css';

export function ChallengeBox() {
    const { activeChallenge, resetChallenge, completeChallenge } = useContext(ChallengesContext);
    const { resetCountdown } = useContext(CountdownContext);
    function handleChallengeCompleted(){
        completeChallenge();
        resetCountdown();
    }
    function handleChallengeFailed(){
        resetChallenge();
        resetCountdown();
    }
    return (
        <div className={styles.challengeBoxContainer}>
            { activeChallenge ? (
                <div className={styles.challengeIsActive}>
                    <header>Ganhe {activeChallenge.amount} XP</header>

                    <main>
                        <img src={`icons/${activeChallenge.type}.svg`} alt="Ganhe XP" />
                        <strong>Novo Desafio</strong>
                        <p>{activeChallenge.description}</p>
                    </main>

                    <footer>
                        <button
                            type="button"
                            onClick={handleChallengeFailed}
                            className={styles.challengeFailedButton}>Falhei</button>
                        <button
                            type="button"
                            onClick={handleChallengeCompleted}
                            className={styles.challengeCompletedButton}>Completei</button>
                    </footer>
                </div>
            ) : (
                <div className={styles.challengeNotActive}>
                    <div>
                        <img src="logo-full.svg" alt="Move.It"/>
                    </div>
                    <strong>Finalize um ciclo para receber desafios</strong>
                    <p>
                        <img src="icons/level-up.svg" alt="Level Up" />
                            Avance de level completando os desafios.
                    </p>
                </div>
            )}
        </div>
    );
}