import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

const CV: NextPage = () => {
  return (
    <>
      <Head>
        <title>CV - Robert McKercher</title>
        <meta name="description" content="Curriculum Vitae - Robert McKercher" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Navigation */}
      <nav className={styles.nav}>
        <div className={styles.navContainer}>
          <div className={styles.navBrand}>
            <Link href="/">
              <a>Robert McKercher</a>
            </Link>
          </div>
          <ul className={styles.navLinks}>
            <li>
              <Link href="/">
                <a>Research</a>
              </Link>
            </li>
            <li>
              <Link href="/cv">
                <a>CV</a>
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <div className={styles.container}>
        {/* CV Section */}
        <div className={styles.section}>
          <div className={styles.sectionTitle}>Curriculum Vitae</div>
          <div className={styles.cvSection}>
            <a href="/McKercher_CV_2026.pdf" className={styles.cvButton} download>
              Download CV (PDF)
            </a>
          </div>

          {/* Embedded PDF viewer */}
          <div className={styles.pdfContainer}>
            <iframe
              src="/McKercher_CV_2026.pdf#toolbar=1"
              className={styles.pdfViewer}
              title="CV - Robert McKercher"
            />
          </div>
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <p>&copy; {new Date().getFullYear()} Robert McKercher. All rights reserved.</p>
        </div>
      </div>
    </>
  );
};

export default CV;
