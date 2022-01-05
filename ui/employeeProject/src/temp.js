import fetch from 'node-fetch';

var headers = new Headers();
headers.append("X-CSCAPI-KEY", "OUtjUWNuTmx5MGF5ZGtNdmFEUjJrMlo3eWZ5R2w4M3R2bmFldDAwcQ==");

var requestOptions = {
method: 'GET',
headers: headers,
redirect: 'follow'
};

fetch("https://api.countrystatecity.in/IN/states", requestOptions)
.then(response => response.text())
.then(result => console.log(result))
.catch(error => console.log('error', error));
