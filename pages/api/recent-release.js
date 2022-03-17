import {scrapeRecentRelease} from '../../parser.js'

export default async(req, res) => {
    try {
        
        const page = req.query.page
        const type = req.query.type

        const data = await scrapeRecentRelease({ page: page, type: type })

        res.status(200).json(data)

    } catch (err) {
        res.status(500).json({
            status: 500,
            error: "Internal Error",
            message: err,
        })
    }
}