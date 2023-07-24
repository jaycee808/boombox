import React from 'react';

const EventList = ({ events }) => {
    return (
        <div>
            <h2>Events List</h2>
            <ul>
                {events.map((event) => (
                    <li key={event.id}>
                        <h3>{event.name}</h3>
                        {event._embedded?.venues?.length > 0 ? (
                            <p>Venue: {event._embedded.venues[0].name}</p>
                        ) : (
                            <p>Venue information not available</p>
                        )}
                        <p>Date: {event.dates.start.localDate}</p>
                        <p>Time: {event.dates.start.localTime}</p>
                        <p>URL: <a href={event.url} target="_blank" rel="noopener noreferrer">{event.url}</a></p>
                        <hr />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EventList;
