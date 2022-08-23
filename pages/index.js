import { useState } from 'react';
import { client } from '../lib/strapiClient';
import styles from '../styles/about.module.css';
import Image from 'next/image';
import HTML from '../components/html';

const Home = ({ bios }) => {
  const [bio, setBio] = useState('long');

  return (
    <>
      <div className={styles.image_container}>
        <Image
          src={bios.data.attributes.frontpageImage.data.attributes.url}
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
        <HTML content={bios.data.attributes.long_bio} />
      ) : (
        <HTML content={bios.data.attributes.short_bio} />
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
    revalidate: 10,
  };
};

export default Home;
