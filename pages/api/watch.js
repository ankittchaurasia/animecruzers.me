import { scrapeMP4 } from "../../parser.js"

export default async(req, res) => {
    try {
        if(!(req.headers.host === 'localhost:3000' || req.headers.host === 'animecruzers.me') ) {
            res.statusCode = 403;
            res.end('Forbidden');
            return false;
        }
        const id = req.query.id

        const data = await scrapeMP4({ id: id })

        res.status(200).json(data)


    } catch (err) {
        res.status(500).json({
            status: 500,
            error: "Internal Error",
            message: err,
        })
    }
}