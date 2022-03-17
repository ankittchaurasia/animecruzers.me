import {scrapeAnimeMovies} from '../../parser.js'

export default async(req, res) => {
    try {
        if(!(req.headers.referer === 'http://localhost:3000/' || req.headers.referer === 'https://animecruzers.me/' || req.headers.referer === 'http://animecruzers.me/') ) {
            res.statusCode = 403;
            res.end('Forbidden');
            return false;
        }
        const page = req.query.page
        const alphabet = req.query.aph

        const data = await scrapeAnimeMovies({ page: page, aph: alphabet })

        res.status(200).json(data)

    } catch (err) {
        res.status(500).send({
            status: 500,
            error: "Internal Error",
            message: err,
        })
    }
}