import {scrapePopularAnime} from '../../parser.js'

export default async(req, res) => {
    try {
        if(!(req.headers.referer === 'http://localhost:3000/' || req.headers.referer === 'https://animecruzers.me/' || req.headers.referer === 'http://animecruzers.me/') ) {
            res.statusCode = 403;
            res.end('Forbidden');
            return false;
        }
        const page = req.query.page

        const data = await scrapePopularAnime({ page: page })

        res.status(200).json(data)

    } catch (err) {
        res.status(500).json({
            status: 500,
            error: "Internal Error",
            message: err,
        })
    }
}