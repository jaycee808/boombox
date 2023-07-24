import React, { useRef } from 'react';

const EventList = ({ events }) => {
    const eventListRef = useRef(null);

    // Function to handle horizontal scrolling
    const handleScroll = (scrollOffset) => {
        if (eventListRef.current) {
        eventListRef.current.scrollBy({
            left: scrollOffset,
            behavior: 'smooth',
        });
        }
    };

    // Filter events to remove duplicates with the same date and venue
    const filteredEvents = events.filter((event, index, self) => {
        const foundIndex = self.findIndex(
        (e) => e.dates.start.localDate === event.dates.start.localDate && 
        e._embedded?.venues?.[0]?.name === event._embedded?.venues?.[0]?.name
        );
        return foundIndex === index;
    });

    return (
        <div className="event-list-container">
        <h2 className="event-list-title">Events List</h2>
        <div className="nav-arrow left-arrow" onClick={() => handleScroll(-300)}>
            &#8249;
        </div>
        <ul className="event-list" ref={eventListRef}>
            {filteredEvents.map((event) => (
            <li key={event.id} className="event-item">
                {event.images && event.images.length > 0 && (
                <img className="event-image" src={event.images[0].url} alt={event.name} />
                )}
                <div className="event-details">
                <h3 className="event-name">{event.name}</h3>
                {event._embedded?.venues?.length > 0 ? (
                    <p className="event-venue">Venue: {event._embedded.venues[0].name}</p>
                ) : (
                    <p className="event-venue">Venue information not available</p>
                )}
                <p className="event-date">Date: {event.dates.start.localDate}</p>
                <p className="event-time">Time: {event.dates.start.localTime}</p>
                <p className="event-url">
                    URL: <a href={event.url} target="_blank" rel="noopener noreferrer">{event.url}</a>
                </p>
                </div>
            </li>
            ))}
        </ul>
        <div className="nav-arrow right-arrow" onClick={() => handleScroll(300)}>
            &#8250;
        </div>
        </div>
    );
};

export default EventList;
