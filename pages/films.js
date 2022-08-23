import { client } from '../lib/strapiClient';
import HTML from '../components/html';
import { useState } from 'react';
import Image from 'next/image';
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
                  <h2 className={styles.title}>{film.attributes.title}</h2>
                  <h2 className={styles.title}>({film.attributes.year})</h2>
                </div>
                <>
                  {selected.isOpen && selected.id == film.id ? (
                    <div>
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
                    </div>
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
    revalidate: 10,
  };
};
export default Films;
