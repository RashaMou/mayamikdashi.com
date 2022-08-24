import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';
import twitter from '../public/twitter.png';
import email from '../public/email.png';
import styles from '../styles/layout.module.css';

const Layout = ({ children }) => {
  const [current, setCurrent] = useState('home');
  const [showMenu, setShowMenu] = useState(false);

  return (
    <main>
      <div className={styles.body}>
        <div className={styles.inner_container}>
          <h1 className={styles.title}>MAYA MIKDASHI</h1>
          <nav className={styles.nav}>
            <ul className={styles.top_menu}>
              <li className={styles.menu_item}>
                <Link
                  href='/'
                  className={
                    current === 'home'
                      ? 'styles.selected styles.link'
                      : styles.link
                  }
                  onClick={() => setCurrent('home')}
                >
                  HOME
                </Link>
              </li>
              <div
                onMouseEnter={() => setShowMenu(true)}
                onMouseLeave={() => setShowMenu(false)}
              >
                <li className={styles.menu_item}>
                  <Link
                    href='/publications'
                    className={
                      current === 'publications'
                        ? 'styles.selected styles.link'
                        : styles.link
                    }
                    onClick={() => setCurrent('publications')}
                  >
                    PUBLICATIONS
                  </Link>
                </li>
                {showMenu && (
                  <ul
                    className={styles.submenu_container}
                    onClick={() => console.log('clicked')}
                  >
                    <li className={styles.submenu_item}>Sextarianism</li>
                  </ul>
                )}
              </div>
              <li className={styles.menu_item}>
                <Link
                  href='/research'
                  className={
                    current === 'research'
                      ? 'styles.selected styles.link'
                      : styles.link
                  }
                  onClick={() => setCurrent('research')}
                >
                  RESEARCH
                </Link>
              </li>
              <li className={styles.menu_item}>
                <Link
                  href='/events'
                  className={
                    current === 'events'
                      ? 'styles.selected styles.link'
                      : styles.link
                  }
                  onClick={() => setCurrent('events')}
                >
                  EVENTS
                </Link>
              </li>
              <li className={styles.menu_item}>
                <Link
                  href='/films'
                  className={
                    current === 'films'
                      ? 'styles.selected styles.link'
                      : styles.link
                  }
                  onClick={() => setCurrent('films')}
                >
                  FILMS
                </Link>
              </li>
            </ul>
          </nav>
          <div className={styles.content_container}>{children}</div>
          <footer className={styles.footer}>
            <ul className={styles.footer_links}>
              <li className={styles.logo}>
                <Link href='https://www.twitter.com/mayamikdashi'>
                  <Image src={twitter} width={35} height={35} alt='twitter' />
                </Link>
              </li>
              <li className={styles.logo}>
                <Link href='mailto:mtmikdashi@gmail.com'>
                  <Image src={email} width={35} height={35} alt='email' />
                </Link>
              </li>
            </ul>
          </footer>
        </div>
      </div>
    </main>
  );
};

export default Layout;
