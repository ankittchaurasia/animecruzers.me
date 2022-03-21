export default async(req, res) => {
    try {
            const gogoid = req.query.id
            const animixapi = "/api/live"+Buffer.from(gogoid+ "LTXs3GrU8we9O" + Buffer.from(gogoid).toString('base64')).toString('base64')
            var https = require('https');

            const options = {
                hostname: 'animixplay.to',
                path: animixapi,
                headers: { 'User-Agent': 'Mozilla/5.0' }
            }
            https.get(options, (response)=>res.json({location: response.headers.location.includes('https://')? response.headers.location : 'https://animixplay.to/'+response.headers.location}));


    } catch (err) {
            res.status(500).json({
                status: 500,
                error: "Internal Error",
                message: err,
            }).end();
    }
}