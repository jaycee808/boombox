import React, { useEffect, useState } from 'react';
import EventList from './components/EventList';
import { getEvents } from './services/EventSearch';

const App = () => {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // events to display when page loads
    getEvents('classificationName=music&size=10')
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

  return (
    <div>
      <h1>BOOMBOX</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for an event"
        />
        <button type="submit">Search</button>
      </form>
      <EventList events={events} />
    </div>
  );
};

export default App;