import { client } from '../lib/strapiClient';
import HTML from '../components/html';

const Sextarianism = () => {
  return <div></div>;
};

export const getStaticProps = async () => {
  const response = await client.fetchData('books?populate=*');
  const data = response.data;
  return {
    props: {
      book: data,
    },
    revalidate: 10,
  };
};

export default Sextarianism;
