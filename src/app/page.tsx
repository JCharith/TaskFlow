import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <div className="container">
          <nav className={styles.nav}>
            <div className={styles.logo}>TaskFlow</div>
            <div className={styles.authLinks}>
              <Link href="/login" className={styles.loginLink}>Login</Link>
              <Link href="/register" className={styles.signupButton}>Sign Up</Link>
            </div>
          </nav>
        </div>
      </header>

      <main>
        <section className={styles.hero}>
          <div className="container">
            <div className={styles.heroContent}>
              <h1 className={styles.title}>
                Manage Projects with <span className={styles.accent}>Precision.</span>
              </h1>
              <p className={styles.subtitle}>
                A beautiful, high-performance task management system designed for teams that demand excellence. Track progress, assign roles, and hit deadlines.
              </p>
              <div className={styles.heroActions}>
                <Link href="/register" className={styles.primaryButton}>Get Started Free</Link>
              </div>
            </div>
          </div>
          <div className={styles.heroVisual}>
            <div className={styles.glow1}></div>
            <div className={styles.glow2}></div>
          </div>
        </section>

        <section className={styles.features}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Why TaskFlow?</h2>
            <div className={styles.featureGrid}>
              <div className={`${styles.featureCard} glass`}>
                <h3>Role-Based Access</h3>
                <p>Granular controls for Admins and Members to keep your team organized.</p>
              </div>
              <div className={`${styles.featureCard} glass`}>
                <h3>Real-time Tracking</h3>
                <p>Monitor project health and task status with our intuitive dashboard.</p>
              </div>
              <div className={`${styles.featureCard} glass`}>
                <h3>Modern Aesthetics</h3>
                <p>A premium dark interface that looks as good as it performs.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className="container">
          <p>&copy; 2026 TaskFlow. Built for the future of work.</p>
        </div>
      </footer>
    </div>
  );
}
