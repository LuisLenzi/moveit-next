import styles from '../styles/components/ChallengeBox.module.css'

export function ChallengeBox(){
    return(
        <div className={styles.challengeboxContainer}>
            <div className={styles.challengeNotActive}>
                <strong>Inicie um ciclo para receber desafios e o finalize para receber recompensas</strong>
                <p>
                    <img src="icons/level-up.svg" alt="Level Up"/>
                    Suba de nível para receber novos desafios
                </p>
            </div>
        </div>
    );
}