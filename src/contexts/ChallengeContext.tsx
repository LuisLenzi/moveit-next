import Cookies from 'js-cookie';
import { createContext, useState, ReactNode, useEffect } from 'react';
import challenges from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';

interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallengesContextData {
    level: number;
    currentExperience: number;
    experienceToNextLevel: number;
    challengesCompleted: number;
    activeChallenge: Challenge;
    levelUp: () => void;
    startNewChallenge: () => void;
    resetChallenge: () => void;
    completeChallenge: () => void;
    closeLevelUpModal: () => void;
}

interface ChallengesProviderProps {
    children: ReactNode;
    level: number;
    currentExperience: number;
    challengesCompleted: number;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ 
    children, 
    ...rest
}: ChallengesProviderProps) {
    const [level, setLevel] = useState(rest.level ?? 1);
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);
    const [activeChallenge, setActiveChallenge] = useState(null);
    const [LevelUpModalOpen, setLevelUpModalOpen] = useState(false);
    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

    useEffect(() => {
        Cookies.set('level', String(level))
        Cookies.set('currentExperience', String(currentExperience))
        Cookies.set('challengesCompleted', String(challengesCompleted))
    }, [level, currentExperience, challengesCompleted])

    useEffect(() => {
        Notification.requestPermission()
    }, [])

    function levelUp() {
        setLevel(level + 1);
        setLevelUpModalOpen(true);
    }

    function closeLevelUpModal(){
        setLevelUpModalOpen(false);
    }

    function startNewChallenge() {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];
        setActiveChallenge(challenge);

        if (Notification.permission === 'granted') {
            new Audio('/notification.mp3').play();
            new Notification('[Novo Desafio 🔥]', {
                body: `
                Move.It
                Valendo ${challenge.amount} XP
                `
            })
        }
    }

    function resetChallenge() {
        setActiveChallenge(null)
    }

    function completeChallenge() {
        if (!activeChallenge) {
            return;
        }

        const { amount } = activeChallenge;
        let finalExpirence = currentExperience + amount;

        if (finalExpirence >= experienceToNextLevel) {
            finalExpirence = finalExpirence - experienceToNextLevel;
            levelUp();
        }

        setCurrentExperience(finalExpirence);
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted + 1);
    }

    return (
        <ChallengesContext.Provider
            value={{
                level,
                currentExperience,
                challengesCompleted,
                experienceToNextLevel,
                activeChallenge,
                levelUp,
                startNewChallenge,
                resetChallenge,
                completeChallenge,
                closeLevelUpModal,
            }}>
            { children}
            {LevelUpModalOpen && <LevelUpModal/>}
        </ChallengesContext.Provider>
    )
}