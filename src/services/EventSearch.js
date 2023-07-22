import axios from 'axios';

const TM_API_URL = 'https://app.ticketmaster.com/discovery/v2/';

export const getEvents = async (query) => {
    try {
        const response = await axios.get(
            `${TM_API_URL}events.json?apikey=${process.env.REACT_APP_TICKETMASTER_API_KEY}&${query}`
        );
        return response.data._embedded.events;
        } catch (error) {
        throw new Error('Error, no events found!');
    }
};