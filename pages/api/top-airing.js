import {scrapeTopAiringAnime} from '../../parser.js';

export default async(req, res) => {
    try {
        if(!(req.headers.host === 'localhost:3000' || req.headers.host === 'animecruzers.me') ) {
            res.statusCode = 403;
            res.end('Forbidden');
            return false;
        }
        const page = req.query.page

        const data = await scrapeTopAiringAnime({ page: page })

        res.status(200).json(data)

    } catch (err) {
        res.status(500).send({
            status: 500,
            error: "Internal Error",
            message: err,
        })
    }
}