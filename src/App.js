import React, { useEffect, useState } from 'react';
import EventList from './components/EventList';
import { getEvents } from './services/EventSearch';

const App = () => {
    const [events, setEvents] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('music');

    useEffect(() => {
        // Events to display when the page loads
        handleCategoryClick('music');
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const data = await getEvents(`keyword=${searchQuery}`);
            setEvents(data);
            setActiveTab('');
        } catch (error) {
            console.error(error);
        }
    };

    const handleCategoryClick = async (classificationName) => {
        try {
            const data = await getEvents(`classificationName=${classificationName}`);
            setEvents(data);
            setActiveTab(classificationName);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <div className="header">
                <h1 className="logo">boombox</h1>
                <form className="search-bar" onSubmit={handleSearch}>
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

            <div className="search-results-display">
                <div className="event-categories">
                    <div
                        className={`event-search-item ${activeTab === 'music' ? 'active' : ''}`}
                        onClick={() => handleCategoryClick('music')}
                    >
                        Music
                    </div>
                    <div
                        className={`event-search-item ${activeTab === 'sport' ? 'active' : ''}`}
                        onClick={() => handleCategoryClick('sport')}
                    >
                        Sport
                    </div>
                    <div
                        className={`event-search-item ${activeTab === 'theatre' ? 'active' : ''}`}
                        onClick={() => handleCategoryClick('theatre')}
                    >
                        Theatre
                    </div>
                    <div
                        className={`event-search-item ${activeTab === 'comedy' ? 'active' : ''}`}
                        onClick={() => handleCategoryClick('comedy')}
                    >
                        Comedy
                    </div>
                </div>
                <EventList events={events} />
            </div>
        </div>
    );
};

export default App;