
const getAuthHeaders = () => {
    // Grabbing the authentication token from the local storage & if there is no token return an empty object
    const jwtData = JSON.parse(localStorage.authToken || '{}');

    //Injecting token into the headers, has to be in the header so that the back end is 
    // going to read the authorization key in the header in order to allow someone to interact with the api
    return {
        headers: {
            "Authorization": jwtData.token
        }
    }
}

/*

fetchAPI is a wrapper arounds $.ajax that inserts localStorage authToken autommatically,
so the server can validates it
*/
const fetchApi = (options) => {

    //Authorization in header
    const defaultHeaders = getAuthHeaders();
    // Object.assign is a way to merge two objects while maintaining non-collidding data from the first object
    /*
      const obj1 { a: 1, b: 2, c: 3 }
      const obj2: { c: 10, e: 34 }
      Object.assign(obj1, obj2) // { a: 1, b: 2, c: 10, e: 35}
    */
    const mergeOptions = Object.assign(defaultHeaders, options); // { url: apiUrl, method: "POST", headers: { Authorization: "JWT ey2131312313" } }
    return $.ajax(mergeOptions) // Same options passed to an ajax object { url: apiUrl, method: "POST" }
    //Does an ajax call with the options and default headers
}


//.catch only if the user is not authenticated
const ensureLoggedIn = () => fetchApi({ url: '/api/verifyToken', method: "POST" }).catch((err) => { window.location.href = '/login'; });