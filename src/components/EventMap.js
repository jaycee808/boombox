import React from 'react';
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';

const EventMap = ({ event }) => {
    // map display styles
    const mapDisplay = {
        width: '100%',
        height: '300px',
    };

    const center = {
        lat: parseFloat(event._embedded?.venues?.[0]?.location?.latitude),
        lng: parseFloat(event._embedded?.venues?.[0]?.location?.longitude),
    };

    return (
        <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
        <GoogleMap mapContainerStyle={mapDisplay} center={center} zoom={12}>
            <Marker position={center} />
        </GoogleMap>
        </LoadScript>
    );
};

export default EventMap;