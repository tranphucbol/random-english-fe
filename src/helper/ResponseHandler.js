
function handleResponse(response){
    return response.text().then(text => {
        const res = JSON.parse(text);
        if (!response.ok) {
            if ([400,401, 403].indexOf(response.status) !== -1) {
                localStorage.removeItem("login");
                localStorage.removeItem("user");
                window.location.reload();
            }
            return false;
        }
        return res.data;
    });
}

export default handleResponse;