import axios from 'axios';

export function get_route( route_short_name ) {
    console.log( 'get_route' );
    return axios.get('/api/route', {
        params: {
            route_short_name: route_short_name
        }}
    ).then(response => {
    
        return response.data[0].geometry;
    })
    .catch(error => console.log(error));
}

export function get_stops( route_short_name ) {
    console.log( 'get_stops' );
    return axios.get('/api/stops', {
        params: {
            route_short_name: route_short_name
        }}
    ).then(response => {
        
        return response.data[0].stops;
    })
   .catch(error => console.log(error));
}

export function get_top_five_delay_route( timestamp ) {
    console.log( 'get_top_five_delay_route' );
    return axios.get('/api/top_route', {
        params: {
            fromDate: timestamp.fromDate,
            toDate: timestamp.toDate,
            fromTime: timestamp.fromTime,
            toTime: timestamp.toTime,
        }}
    )
    .then(response => {
        
        return response.data[0].list;
    });
}

export function get_delay_in_hours( route_short_name, timestamp ) {
    console.log( 'get_delay_in_hours' );
    return axios.get('/api/delay_in_hours', {
        params: {
            route_short_name: route_short_name,
            from: timestamp.from,
            to: timestamp.to
        }}
    ).then(response => {
        if (response.data.length > 0) {
            return response.data[0].delays;
        }
        return [];
    })
  .catch(error => console.log(error));
}