import { client } from '../lib/strapiClient';
import HTML from '../components/html';
import Image from 'next/image';
import styles from '../styles/events.module.css';

const formatDate = (date) => {
  return date.slice(5) + '-' + date.slice(0, 4);
};

const Events = ({ events }) => {
  return (
    <div>
      {events.map((event) => {
        return (
          <div className={styles.event_container} key={event.id}>
            {event.attributes.Image && (
              <div className={styles.image_container}>
                <Image
                  src={event.attributes.Image.data.attributes.url}
                  alt={event.attributes.Image.data.attributes.caption}
                  layout='fill'
                  objectFit='contain'
                  priority={true}
                />
              </div>
            )}
            <div>
              <h4>{event.attributes.Title}</h4>
              <div>{formatDate(event.attributes.Date)}</div>
              <div>{event.attributes.Time}</div>
              <HTML content={event.attributes.Address} />
              <HTML content={event.attributes.Description} />
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
    revalidate: 10,
  };
};

export default Events;
