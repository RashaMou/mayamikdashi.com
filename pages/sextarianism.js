import { client } from '../lib/strapiClient';
import Image from 'next/image';
import styles from '../styles/book.module.css';
import HTML from '../components/html';

const Sextarianism = ({ book }) => {
  return (
    <>
      <div className={styles.image_container}>
        <Image
          src={book.attributes.book_cover.data.attributes.url}
          alt={book.attributes.book_cover.data.attributes.caption}
          layout='fill'
          objectFit='contain'
          priority={true}
        />
      </div>
      <h2>{book.attributes.title}</h2>
      <HTML content={book.attributes.description} />
    </>
  );
};

export const getStaticProps = async () => {
  const response = await client.fetchData('books?populate=*');
  const data = response.data;
  const book = data.filter((entry) => {
    return entry.attributes.slug === 'sextarianism';
  });
  return {
    props: {
      book: book[0],
    },
    revalidate: 10,
  };
};

export default Sextarianism;
