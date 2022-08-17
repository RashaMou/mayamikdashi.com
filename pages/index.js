import { useState } from 'react';
import StrapiClient from '../lib/strapiClient';
import styles from '../styles/about.module.css';
import ReactMarkdown from 'react-markdown';

const client = new StrapiClient();

const Home = ({ bios }) => {
  const [bio, setBio] = useState('long');

  return (
    <>
      <ul className={styles.bios}>
        <li
          onClick={() => setBio('long')}
          className={
            bio === 'long' ? 'styles.selected styles.link' : styles.link
          }
        >
          ABOUT
        </li>
        <li
          onClick={() => setBio('speaker')}
          className={
            bio === 'speaker' ? 'styles.selected styles.link' : styles.link
          }
        >
          SPEAKER BIO
        </li>
      </ul>
      {bio == 'long' ? (
        <ReactMarkdown>{bios.data.attributes.long_bio}</ReactMarkdown>
      ) : (
        <ReactMarkdown>{bios.data.attributes.short_bio}</ReactMarkdown>
      )}
    </>
  );
};

export const getStaticProps = async () => {
  const response = await client.fetchData('bio');
  return {
    props: {
      bios: response,
    },
  };
};

export default Home;
