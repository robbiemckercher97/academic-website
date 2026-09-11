import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import styles from '../styles/Home.module.css';
import cvStyles from '../styles/CV.module.css';

// Set up the worker
if (typeof window !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
}

const CVPage: NextPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [numPages, setNumPages] = useState(0);

  useEffect(() => {
    const renderPDF = async () => {
      try {
        setLoading(true);
        setError(null);

        const pdf = await pdfjsLib.getDocument('/McKercher_CV_2026.pdf').promise;
        setNumPages(pdf.numPages);

        if (containerRef.current) {
          containerRef.current.innerHTML = '';
        }

        // Render each page
        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          const page = await pdf.getPage(pageNum);

          // Create page container
          const pageDiv = document.createElement('div');
          pageDiv.className = cvStyles.pdfPage;

          // Create canvas for rendering
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');

          if (!context) {
            throw new Error('Failed to get canvas context');
          }

          // Set scale for high DPI displays
          const scale = window.devicePixelRatio || 1;
          const viewport = page.getViewport({ scale });

          canvas.width = viewport.width;
          canvas.height = viewport.height;

          // Render page to canvas
          await page.render({ canvasContext: context, viewport }).promise;

          pageDiv.appendChild(canvas);

          // Add text layer for selection and links
          const textLayerDiv = document.createElement('div');
          textLayerDiv.className = cvStyles.pdfTextLayer;

          const textContent = await page.getTextContent();
          const textItems = textContent.items as any[];

          textItems.forEach((item) => {
            if (item.str && item.str.trim()) {
              const span = document.createElement('span');
              span.textContent = item.str;
              span.style.position = 'absolute';
              span.style.left = `${item.transform[4]}px`;
              span.style.top = `${viewport.height - item.transform[5]}px`;
              span.style.fontSize = `${Math.max(item.height, 0)}px`;
              span.style.fontFamily = item.fontName || 'Arial';
              span.style.color = 'transparent';
              span.style.whiteSpace = 'pre';
              textLayerDiv.appendChild(span);
            }
          });

          pageDiv.appendChild(textLayerDiv);

          if (containerRef.current) {
            containerRef.current.appendChild(pageDiv);
          }
        }

        setLoading(false);
      } catch (err) {
        console.error('Error rendering PDF:', err);
        setError(err instanceof Error ? err.message : 'Failed to render PDF');
        setLoading(false);
      }
    };

    renderPDF();
  }, []);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/McKercher_CV_2026.pdf';
    link.download = 'McKercher_CV_2026.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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

      {/* CV Content */}
      <div className={styles.container}>
        <div className={cvStyles.cvSection}>
          <h1 className={cvStyles.cvHeading}>Curriculum Vitae</h1>

          <button className={cvStyles.downloadButton} onClick={handleDownload}>
            ↓ Download CV
          </button>

          {loading && <div className={cvStyles.loading}>Loading PDF...</div>}

          {error && (
            <div className={cvStyles.error}>
              <p>Error loading PDF: {error}</p>
              <a href="/McKercher_CV_2026.pdf" download className={cvStyles.fallbackLink}>
                Download CV directly
              </a>
            </div>
          )}

          <div className={cvStyles.pdfContainer} ref={containerRef} />
        </div>
      </div>
    </>
  );
};

export default CVPage;
