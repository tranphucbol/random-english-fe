
function handleResponse(response){
    return response.then(text => {
        const data = data.json();
        if (!response.ok) {
            if ([401, 403].indexOf(response.status) !== -1) {
                localStorage.removeItem("login");
                window.location.reload();
            }
            return false;
        }
        return data;
    });
}

export default handleResponse;