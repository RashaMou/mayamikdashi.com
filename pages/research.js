import StrapiClient from '../lib/strapiClient';
import ReactMarkdown from 'react-markdown';

const client = new StrapiClient();

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
  };
};
export default Research;
