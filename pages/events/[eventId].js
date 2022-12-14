import { Fragment } from 'react';
import { getFeaturedEvents, getEventById } from '../../helpers/api-utils';
import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';
import ErrorAlert from '../../components/ui/error-alert';
function EventDetailPage(props) {
  const event = props.selectedEvent;

  if (!event) {
    return (
      <div className="center">
        <p>No event found!</p>
      </div>
    );
  }

  return (
    <Fragment>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
}



export async function getStaticProps(context) {
      const eventId = context.params.eventId;
      const event = await getEventById(eventId);
      return{
        props: {
          selectedEvent: event
        }
      }
}

export async function getStaticPaths() {
  const events = await getFeaturedEvents();
  const paths = events.map(evnt => ({params: {
    eventId: evnt.id,
  }}))
    return{
      paths:paths,
      fallback:true
    }
}
export default EventDetailPage;
