import type { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

interface Paper {
  id: number;
  title: string;
  authors?: string;
  description?: string;
  links?: Array<{ text: string; url: string }>;
}

const jobMarketPaper: Paper = {
  id: 1,
  title: 'Dividend Taxation and Income Shifting within the Family',
  authors: '',
  description: '[Description to be added]',
  links: [],
};

const workingPapers: Paper[] = [
  {
    id: 2,
    title: 'Should I Stay or Should I Go? The Impact of Taxation on Canadian Inter-Provincial Migration',
    authors: 'With Adam Lavecchia and Alisa Tazhitdinova',
    description: 'Reject and Resubmit, Journal of Public Economics',
    links: [],
  },
  {
    id: 3,
    title: 'The Impact of Government Social Spending on the Elasticity of Taxable Income',
    authors: '',
    description: '[Description to be added]',
    links: [],
  },
  {
    id: 4,
    title: 'Labour Supply Responses to Marginal Tax Rates, Average Tax Rates, and Tax Progressivity',
    authors: 'With Li-Hsin Lin',
    description: '[Description to be added]',
    links: [],
  },
];

const Home: NextPage = () => {
  const [expandedBio, setExpandedBio] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Head>
        <title>Robert McKercher - Economist</title>
        <meta name="description" content="Robert McKercher - PhD Candidate in Economics, McMaster University" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Navigation */}
      <nav className={styles.nav}>
        <div className={styles.navContainer}>
          <div className={styles.navBrand}>Robert McKercher</div>
          <ul className={styles.navLinks}>
            <li>
              <a onClick={() => scrollToSection('research')} style={{ cursor: 'pointer' }}>
                Research
              </a>
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
        {/* Hero Section - Photo Left, Name/Info Centered */}
        <div className={styles.heroLayout}>
          <div className={styles.photoContainer}>
            <img
              src="/me.jpeg"
              alt="Robert McKercher"
              className={styles.photo}
            />
          </div>
          <div className={styles.heroCentered}>
            <div className={styles.name}>Robert McKercher</div>
            <div className={styles.title}>PhD Candidate in Economics</div>
            <div className={styles.subtitle}>Department of Economics, McMaster University</div>
            <div className={styles.contact}>
              <p>
                <strong>Email:</strong> mckerchr@mcmaster.ca
              </p>
              <p>
                <strong>Office:</strong> Kenneth Taylor Hall (KTH), Room 706
              </p>
              <p>
                <strong>Department of Economics</strong>
                <br />
                McMaster University
                <br />
                1280 Main Street West
                <br />
                Hamilton, Ontario, Canada L8S 4M4
              </p>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className={styles.section}>
          <div className={styles.sectionTitle}>About Me</div>
          <p className={styles.bioText}>
            [Brief bio goes here]
          </p>
          <button
            className={styles.expandButton}
            onClick={() => setExpandedBio(!expandedBio)}
          >
            {expandedBio ? 'Show Less' : 'Show More'}
          </button>
          {expandedBio && (
            <div className={styles.expandedBio}>
              <p>
                [More detailed bio and research interests go here]
              </p>
            </div>
          )}
        </div>

        {/* Job Market Paper Section */}
        <div id="research" className={styles.section}>
          <div className={styles.sectionTitle}>Job Market Paper</div>
          <div className={styles.paper}>
            <div className={styles.paperTitle}>{jobMarketPaper.title}</div>
            {jobMarketPaper.authors && <div className={styles.paperAuthors}>{jobMarketPaper.authors}</div>}
            {jobMarketPaper.description && <div className={styles.paperDescription}>{jobMarketPaper.description}</div>}
            {jobMarketPaper.links && jobMarketPaper.links.length > 0 && (
              <div className={styles.paperLinks}>
                {jobMarketPaper.links.map((link, index) => (
                  <a key={index} href={link.url} target="_blank" rel="noopener noreferrer">
                    {link.text}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Working Papers Section */}
        <div className={styles.section}>
          <div className={styles.sectionTitle}>Working Papers</div>
          <div className={styles.papersContainer}>
            {workingPapers.map((paper) => (
              <div key={paper.id} className={styles.paper}>
                <div className={styles.paperTitle}>{paper.title}</div>
                {paper.authors && <div className={styles.paperAuthors}>{paper.authors}</div>}
                {paper.description && <div className={styles.paperDescription}>{paper.description}</div>}
                {paper.links && paper.links.length > 0 && (
                  <div className={styles.paperLinks}>
                    {paper.links.map((link, index) => (
                      <a key={index} href={link.url} target="_blank" rel="noopener noreferrer">
                        {link.text}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
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

export default Home;