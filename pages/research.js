import { client } from '../lib/strapiClient';
import HTML from '../components/html';

const Research = ({ research }) => {
  return <HTML content={research} />;
};

export const getStaticProps = async () => {
  const response = await client.fetchData('research');
  const data = response.data.attributes.Research;
  return {
    props: {
      research: data,
    },
    revalidate: 10,
  };
};

export default Research;
