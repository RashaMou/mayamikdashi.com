import { useState } from 'react';
import { client } from '../lib/strapiClient';
import styles from '../styles/about.module.css';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';
import { motion } from 'framer-motion';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const Home = ({ bios }) => {
  const [bio, setBio] = useState('long');

  return (
    <>
      <div className={styles.image_container}>
        <Image
          src={`${baseUrl}${bios.data.attributes.frontpageImage.data.attributes.url}`}
          alt='image'
          layout='fill'
          objectFit='contain'
          priority={true}
        />
      </div>
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
        <motion.div
          animate={{ x: 30 }}
          transition={{ type: 'spring', damping: 15 }}
        >
          <ReactMarkdown>{bios.data.attributes.long_bio}</ReactMarkdown>
        </motion.div>
      ) : (
        <motion.div
          animate={{ x: 30 }}
          transition={{ type: 'spring', damping: 15 }}
        >
          <ReactMarkdown>{bios.data.attributes.short_bio}</ReactMarkdown>
        </motion.div>
      )}
    </>
  );
};

export const getStaticProps = async () => {
  const response = await client.fetchData('bio?populate=*');
  return {
    props: {
      bios: response,
    },
  };
};

export default Home;
