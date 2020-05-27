
const getAuthHeaders = () => {
    const getToken = () => {
        const jwtData = JSON.parse(localStorage.authToken || '{}');
        return jwtData.token;
    }

    return {
        headers: {
            "Authorization": getToken()
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
    const mergeOptions = Object.assign(defaultHeaders, options);
    return $.ajax(mergeOptions) // Sane options passed to an ajax object { url: apiUrl, method: "POST" }
}


//.catch only if the user is not authenticated
const ensureLoggedIn = () => fetchApi({ url: '/api/verifyToken', method: "POST" }).catch((err) => { window.location.href = '/login'; });