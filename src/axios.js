import axios from 'axios';

export function get_date( {datetime} ) { 
    // Simple POST request with a JSON body using axios
    const article = {date: datetime};
    axios.post('/api/date', article)
    // axios.get('/api/date', {
    //     params: {
    //         from: datetime.From.toJSON(),
    //         To: datetime.To.toJSON()
    // }})
    .then(response => console.log(response))
    .catch(error => console.log(error));
}

export function get_route( route_short_name ) {
    return axios.get('/api/route', {
        params: {
            route_short_name: route_short_name
        }}
    ).then(response => response.data[0].geometry)
    .catch(error => console.log(error));
}

export function get_stops( route_short_name ) {
    return axios.get('/api/stops', {
        params: {
            route_short_name: route_short_name
        }}
    ).then(response => response.data[0].stops)
   .catch(error => console.log(error));
}

export function get_top_five_delay_route() {
    return axios.get('/api/top_route')
    .then(response => response.data[0].list);
}