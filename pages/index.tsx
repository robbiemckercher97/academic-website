import type { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import styles from '../styles/Home.module.css';

interface Paper {
  id: number;
  title: string;
  authors?: string;
  description?: string;
  links?: Array<{ text: string; url: string }>;
}

const papers: Paper[] = [
  {
    id: 1,
    title: 'Dividend Taxation and Income Shifting within the Family',
    authors: 'Robert McKercher',
    description: 'Job market paper. [Description to be added]',
    links: [],
  },
  {
    id: 2,
    title: 'Should I Stay or Should I Go? The Impact of Taxation on Canadian Inter-Provincial Migration',
    authors: 'Robert McKercher, Adam Lavecchia, and Alisa Tazhitdinova',
    description: '[Description to be added]',
    links: [],
  },
  {
    id: 3,
    title: 'The Impact of Government Social Spending on the Elasticity of Taxable Income',
    authors: 'Robert McKercher',
    description: '[Description to be added]',
    links: [],
  },
  {
    id: 4,
    title: 'Labour Supply Responses to Marginal Tax Rates, Average Tax Rates, and Tax Progressivity',
    authors: 'Robert McKercher and Li-Hsin Lin',
    description: '[Description to be added]',
    links: [],
  },
];

const Home: NextPage = () => {
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
              <a onClick={() => scrollToSection('about')} style={{ cursor: 'pointer' }}>
                About
              </a>
            </li>
            <li>
              <a onClick={() => scrollToSection('research')} style={{ cursor: 'pointer' }}>
                Research
              </a>
            </li>
            <li>
              <a onClick={() => scrollToSection('cv')} style={{ cursor: 'pointer' }}>
                CV
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <div className={styles.container}>
        {/* About Section */}
        <div id="about" className={styles.section}>
          <div className={styles.heroSection}>
            <div className={styles.photoContainer}>
              <img
                src="/me.jpg"
                alt="Robert McKercher"
                className={styles.photo}
              />
            </div>
            <div className={styles.bioContainer}>
              <div className={styles.name}>Robert McKercher</div>
              <div className={styles.title}>PhD Candidate in Economics</div>
              <div className={styles.subtitle}>Department of Economics, McMaster University</div>
              <p className={styles.bioText}>
                [Your bio and research interests to be added]
              </p>
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
        </div>

        {/* CV Section */}
        <div id="cv" className={styles.section}>
          <div className={styles.sectionTitle}>Curriculum Vitae</div>
          <div className={styles.cvSection}>
            <a href="/cv.pdf" className={styles.cvButton}>
              Download CV (PDF)
            </a>
            <p className={styles.cvNote}>
              Upload your CV as public/cv.pdf
            </p>
          </div>
        </div>

        {/* Research Section */}
        <div id="research" className={styles.section}>
          <div className={styles.sectionTitle}>Research</div>
          <div className={styles.papersContainer}>
            {papers.map((paper) => (
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
