import type { NextPage } from 'next';
import Head from 'next/head';
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

      <div className={styles.cvPageContainer}>
        <div className={styles.cvHeader}>
          <a href="/McKercher_CV_2026.pdf" className={styles.cvDownloadButton} download>
            Download CV
          </a>
        </div>

        {/* Embedded PDF viewer - full page */}
        <div className={styles.cvFullPage}>
          <iframe
            src="/McKercher_CV_2026.pdf#toolbar=1"
            className={styles.cvFullPageViewer}
            title="CV - Robert McKercher"
          />
        </div>
      </div>
    </>
  );
};

export default CV;
