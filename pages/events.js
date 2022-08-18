import { client } from '../lib/strapiClient';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';
import styles from '../styles/events.module.css';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const Events = ({ events }) => {
  return (
    <div>
      {events.map((event) => {
        return (
          <div className={styles.event_container} key={event.id}>
            <div className={styles.image_container}>
              <Image
                src={`${baseUrl}${event.attributes.image.data.attributes.url}`}
                alt={event.attributes.image.data.attributes.caption}
                layout='fill'
                objectFit='contain'
                priority={true}
              />
            </div>
            <div>
              <h4>{event.attributes.Title}</h4>
              <div>{event.attributes.date_time}</div>
              <ReactMarkdown>{event.attributes.Address}</ReactMarkdown>
              <ReactMarkdown>{event.attributes.Description}</ReactMarkdown>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export const getStaticProps = async () => {
  const response = await client.fetchData('events?populate=*');
  return {
    props: {
      events: response.data,
    },
  };
};

export default Events;
