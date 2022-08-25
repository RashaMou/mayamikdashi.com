import { client } from '../lib/strapiClient';
import HTML from '../components/html';
import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '../styles/films.module.css';

const Films = ({ films }) => {
  const [selected, setSelected] = useState({
    id: 0,
    isOpen: false,
    film_description: '',
  });

  const handleClick = (film) => {
    setSelected({
      id: film.id,
      isOpen: !selected.isOpen,
      film_description: film.attributes.description,
    });
  };

  films.sort((a, b) => {
    return a.attributes.year - b.attributes.year;
  });

  return (
    <div className={styles.films_container}>
      <div>
        {films.map((film) => {
          return (
            <div className={styles.films} key={film.id}>
              <div className={styles.film} onClick={() => handleClick(film)}>
                <div className={styles.title_block}>
                  <Image src='/arrow.svg' alt='arrow' width={10} height={10} />
                  <h3 className={styles.title}>{film.attributes.title}</h3>
                  <h3 className={styles.title}>({film.attributes.year})</h3>
                </div>
                <AnimatePresence initial={false}>
                  {selected.isOpen && selected.id == film.id ? (
                    <motion.section
                      key='content'
                      initial='collapsed'
                      animate='open'
                      exit='collapsed'
                      variants={{
                        open: { opacity: 1 },
                        collapsed: { opacity: 0 },
                      }}
                      transition={{
                        duration: 0.8,
                        ease: [0.04, 0.62, 0.23, 0.98],
                      }}
                    >
                      <div className={styles.film_image}>
                        <Image
                          src={film.attributes.image.data[0].attributes.url}
                          objectFit='contain'
                          layout='fill'
                          alt='image'
                          priority={true}
                        />
                      </div>
                      <HTML content={selected.film_description} />
                    </motion.section>
                  ) : null}
                </AnimatePresence>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const getStaticProps = async () => {
  const response = await client.fetchData('films?populate=*');
  return {
    props: {
      films: response.data,
    },
    revalidate: 10,
  };
};
export default Films;
