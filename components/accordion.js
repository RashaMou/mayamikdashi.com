import { useState } from 'react';
import AccordionSection from './AccordionSection';

const Accordion = ({ children }) => {
  const [openSections, setOpenSections] = useState({});

  children.forEach((child) => {
    if (child.props.isOpen) {
      openSections[child.props.label] = true;
    }
  });

  const onClick = (label) => {
    console.log(isOpen);
    const isOpen = !!openSections[label];
    setOpenSections({ [label]: !isOpen });
    console.log(isOpen);
  };

  return (
    <div style={{ border: '2px solid #008f68' }}>
      {children.map((child, idx) => (
        <AccordionSection
          key={idx}
          isOpen={!!openSections[child.props.label]}
          label={child.props.label}
          onClick={onClick}
        >
          {child.props.children}
        </AccordionSection>
      ))}
    </div>
  );
};

export default Accordion;
