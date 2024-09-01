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
                <div className="logo-container">
                    <div className="logo-top">BOOM</div>
                    <div className="logo-bottom">BOX.</div>
                </div>

                <div>
                    <ul className="event-categories-list">
                        <div className="top-row">
                            <li className="event-search-item" onClick={() => handleCategoryClick('music')}>
                            Music
                            </li>
                            <li className="event-search-item" onClick={() => handleCategoryClick('sport')}>
                            Sport
                            </li>
                        </div>
                        <div className="bottom-row">
                            <li className="event-search-item" onClick={() => handleCategoryClick('theatre')}>
                            Theatre
                            </li>
                            <li className="event-search-item" onClick={() => handleCategoryClick('comedy')}>
                            Comedy
                            </li>
                        </div>
                    </ul>
                </div>

                <div className="search-bar">
                    <form onSubmit={handleSearch}>
                        <input
                            className="search-input"
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search for an event"
                        />
                        <button className="search-btn" type="submit">
                            Search
                        </button>
                    </form>
                </div>

            </div>

            <div>
                <EventList events={events} />
            </div>
        </div>
    );
};

export default App;