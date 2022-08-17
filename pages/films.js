import StrapiClient from '../lib/strapiClient';
import ReactMarkdown from 'react-markdown';
import { useState } from 'react';
import Image from 'next/image';
import styles from '../styles/films.module.css';

const client = new StrapiClient();
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

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
                  <h2 className={styles.title}>{film.attributes.title}</h2>
                  <h2 className={styles.title}>({film.attributes.year})</h2>
                </div>
                <>
                  {selected.isOpen && selected.id == film.id ? (
                    <>
                      <div className={styles.film_image}>
                        <Image
                          src={`${baseUrl}${film.attributes.image.data[0].attributes.url}`}
                          objectFit='contain'
                          layout='fill'
                          alt='image'
                        />
                      </div>
                      <ReactMarkdown>{selected.film_description}</ReactMarkdown>
                    </>
                  ) : null}
                </>
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
  };
};
export default Films;