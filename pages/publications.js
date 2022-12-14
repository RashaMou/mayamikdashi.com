import { client } from '../lib/strapiClient';
import { useState } from 'react';
import Image from 'next/image';
import HTML from '../components/html';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '../styles/publications.module.css';

const Publications = ({ publications }) => {
  const [selected, setSelected] = useState({
    id: 0,
    isOpen: false,
  });

  const handleClick = (pub) => {
    setSelected({
      id: pub.id,
      isOpen: !selected.isOpen,
    });
  };

  const types = {
    public: 'Public work',
    interviews_roundtables_podcasts: 'Interviews, Roundtables, Podcasts',
    chapters: 'Book Chapters',
    peer: 'Peer-reviewed',
    books: 'Books',
  };

  const seen_types = {};

  return (
    <>
      {publications.map((pub, idx) => {
        const type = pub.attributes.type;
        if (type in seen_types) {
          return;
        } else {
          seen_types[type] = 1;
          return (
            <div key={idx}>
              <div className={styles.header} onClick={() => handleClick(pub)}>
                <Image src='/arrow.svg' alt='arrow' width={10} height={10} />
                <h3 className={styles.title}>{types[type]}</h3>
              </div>
              <AnimatePresence initial={false}>
                {publications.map((entry) => {
                  if (
                    entry.attributes.type === type &&
                    selected.isOpen &&
                    selected.id == entry.id
                  ) {
                    return (
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
                          duration: 0.5,
                        }}
                      >
                        <HTML content={entry.attributes.description} />
                      </motion.section>
                    );
                  }
                })}
              </AnimatePresence>
            </div>
          );
        }
      })}
    </>
  );
};

export const getStaticProps = async () => {
  const response = await client.fetchData('publications');
  return {
    props: {
      publications: response.data,
    },
    revalidate: 10,
  };
};

export default Publications;
