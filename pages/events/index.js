import { Fragment } from 'react';
import { useRouter } from 'next/router';

import { getAlllEvents } from '../../helpers/api-utils';
import EventList from '../../components/events/event-list';
import EventsSearch from '../../components/events/events-search';

function AllEventsPage(props) {
  const router = useRouter();
  const events = props.events;

  function findEventsHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;
    
    router.push(fullPath);
  }

  return (
    <Fragment>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </Fragment>
  );
}


export async function getStaticProps(){
  const events = await getAlllEvents();
  return{
    props:{
      events: events,
    },
    revalidate:60,

  }
}
export default AllEventsPage;
