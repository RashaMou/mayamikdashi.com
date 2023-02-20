const AccordionSection = (props) => {
  const onClick = () => {
    props.onClick(props.label);
  };
  return (
    <div
      style={{
        background: props.isOpen ? '#fae042' : '#6db65b',
        border: '1px solid #008f68',
        padding: '5px 10px',
      }}
    >
      <div onClick={onClick} style={{ cursor: 'pointer' }}>
        {props.label}
        <div style={{ float: 'right' }}>
          {!props.isOpen && <span>&#9650;</span>}
          {props.isOpen && <span>&#9660;</span>}
        </div>
      </div>
      {props.isOpen && (
        <div
          style={{
            background: '#6db65b',
            border: '2px solid #008f68',
            marginTop: 10,
            padding: '10px 20px',
          }}
        >
          {props.children}
        </div>
      )}
    </div>
  );
};

export default AccordionSection;
