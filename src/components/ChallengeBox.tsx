import { useContext} from 'react';
import { ChallengesContext } from '../contexts/ChallengeContext';
import styles from '../styles/components/ChallengeBox.module.css';

export function ChallengeBox() {
    const { activeChallenge, resetChallenge, completeChallenge } = useContext(ChallengesContext);
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
                            onClick={resetChallenge}
                            className={styles.challengeFailedButton}>Falhei</button>
                        <button
                            type="button"
                            onClick={completeChallenge}
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