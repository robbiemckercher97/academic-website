import type { NextPage } from 'next';
import Head from 'next/head';
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
  return (
    <>
      <Head>
        <title>Robert McKercher - Economist</title>
        <meta name="description" content="Robert McKercher - Academic Economist, McMaster University" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.container}>
        {/* Header Section */}
        <div className={styles.header}>
          <div className={styles.photo}>
            <img
              src="https://via.placeholder.com/150"
              alt="Robert McKercher"
            />
          </div>
          <div className={styles.bio}>
            <div className={styles.name}>Robert McKercher</div>
            <div className={styles.title}>Economist</div>
            <div className={styles.contact}>
              <p><strong>Email:</strong> mckerchr@mcmaster.ca</p>
              <p><strong>Office:</strong> Kenneth Taylor Hall (KTH), Room 706</p>
              <p>
                <strong>Department of Economics</strong><br />
                McMaster University<br />
                1280 Main Street West<br />
                Hamilton, Ontario, Canada L8S 4M4
              </p>
            </div>
            <p style={{ marginTop: '1rem', color: '#666' }}>
              [Your bio and research interests to be added]
            </p>
          </div>
        </div>

        {/* CV Section */}
        <div className={styles.section}>
          <div className={styles.sectionTitle}>Curriculum Vitae</div>
          <div className={styles.cvSection}>
            <a href="/cv.pdf" className={styles.cvButton}>
              Download CV (PDF)
            </a>
            <p style={{ marginTop: '1rem', color: '#666', fontSize: '0.9rem' }}>
              Upload your CV as public/cv.pdf
            </p>
          </div>
        </div>

        {/* Research Section */}
        <div className={styles.section}>
          <div className={styles.sectionTitle}>Research</div>
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

        {/* Footer */}
        <div className={styles.footer}>
          <p>&copy; {new Date().getFullYear()} Robert McKercher. All rights reserved.</p>
        </div>
      </div>
    </>
  );
};

export default Home;