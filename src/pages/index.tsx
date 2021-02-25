import { CompletedChallenges } from "../components/CompletedChallenges";
import { Countdown } from "../components/Countdown";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import { ChallengeBox } from "../components/ChallengeBox";
import Head from 'next/head';
import styles from '../styles/pages/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
          <Head>
            <title>Move.it</title>
          </Head>
          <ExperienceBar />
          <section>
            <div>
              <Profile />
              <CompletedChallenges />
              <Countdown />
            </div>
              <ChallengeBox />
            <div>

            </div>
          </section>
    </div>
  )
}
