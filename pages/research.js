import { client } from '../lib/strapiClient';
import ReactMarkdown from 'react-markdown';

const Research = ({ research }) => {
  return <ReactMarkdown>{research}</ReactMarkdown>;
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
