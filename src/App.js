import React, { useEffect, useState } from 'react';
import EventList from './components/EventList';
import { getEvents } from './services/EventSearch';

const App = () => {
    const [events, setEvents] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        // Events to display when the page loads
        getEvents('classificationName=music')
            .then((data) => setEvents(data))
            .catch((error) => console.error(error));
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const data = await getEvents(`keyword=${searchQuery}`);
            setEvents(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleCategoryClick = async (classificationName) => {
        try {
            const data = await getEvents(`classificationName=${classificationName}`);
            setEvents(data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <div className="header">
                    <h1 className="logo">boombox</h1>
                    <ul className="event-categories">
                        <li
                            className="event-search-item"
                            onClick={() => handleCategoryClick('music')}
                        >
                            MUSIC
                        </li>
                        <li
                            className="event-search-item"
                            onClick={() => handleCategoryClick('sport')}
                        >
                            SPORT
                        </li>
                        <li
                            className="event-search-item"
                            onClick={() => handleCategoryClick('theatre')}
                        >
                            THEATRE
                        </li>
                        <li
                            className="event-search-item"
                            onClick={() => handleCategoryClick('comedy')}
                        >
                            COMEDY
                        </li>
                    </ul>
                <form className="search-bar" onSubmit={handleSearch}>
                    <input
                        className="search-input"
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="search for an event"
                    />
                    <button className="search-btn" type="submit">
                        search
                    </button>
                </form>
            </div>

            <div>
                <EventList events={events} />
            </div>
        </div>
    );
};

export default App;