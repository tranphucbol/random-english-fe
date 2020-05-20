
function handleResponse(res){
    return response.then(text => {
        const data = data.json();
        if (!response.ok) {
            if ([401, 403].indexOf(response.status) !== -1) {
                localStorage.removeItem("login");
                location.reload(true);
            }
            return false;
        }
        return data;
    });
}

export default handleResponse;