import React from 'react';
import EventMap from './EventMap';

const EventList = ({ events }) => {
    const filteredEvents = events.filter((event, index, self) => {
        const foundIndex = self.findIndex(
            (e) => e.dates.start.localDate === event.dates.start.localDate && 
            e._embedded?.venues?.[0]?.name === event._embedded?.venues?.[0]?.name
        );
        return foundIndex === index;
    });

    return (
        <div className="event-list-container">
            <div className="event-list">
                {filteredEvents.map((event) => (
                    <div key={event.id} className="event-item">
                    <img className="event-image" src={event.images[0].url} alt={event.name} />
                        <div className="event-item-content">
                            <h3 className="event-name">{event.name}</h3>
                            <div className="event-details">
                                <p className="event-date">
                                    {new Date(event.dates.start.localDate).getDate()}{' '}
                                    {new Date(event.dates.start.localDate).toLocaleString('default', { month: 'long' })}{' '}
                                    {new Date(event.dates.start.localDate).getFullYear()}
                                </p>
                                {event._embedded?.venues?.length > 0 ? (
                                    <div className="event-venue">
                                        <p>Venue: {event._embedded.venues[0].name}</p>
                                        <EventMap event={event} />
                                    </div>
                                ) : (
                                    <p className="event-venue">Venue information not available</p>
                                )}
                                <button className="ticket-btn">
                                    <a href={event.url} target="_blank" rel="noopener noreferrer">
                                        Find Tickets
                                    </a>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EventList;