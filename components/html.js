const HTML = ({ content }) => {
  return <div dangerouslySetInnerHTML={{ __html: content }} />;
};

export default HTML;
