const http = require('http');

http.get('http://localhost:5005/home', (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
        try {
            const json = JSON.parse(data);
            console.log("API mapEmbedUrl:", json.data.location.info.mapEmbedUrl);
        } catch (e) {
            console.log("Error parsing:", e.message);
        }
    });
}).on('error', (err) => {
    console.log("Error:", err.message);
});
