import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengeContext'
import styles from '../styles/components/Profile.module.css'

export function Profile() {
    const { level } = useContext(ChallengesContext)
    return (
        <div className={styles.profileContainer}>
            <img src="https://github.com/LuisLenzi.png" alt="Luís Lenzi" />
            <div>
                <strong>Luís Lenzi</strong>
                <a href="https://github.com/LuisLenzi">Github User</a>
                <p><img src="icons/level.svg" alt="Level"/>Level {level}</p>
            </div>
        </div>
    )
};