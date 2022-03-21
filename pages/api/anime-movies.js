import {scrapeAnimeMovies} from "../../bone/parser"
import auth from "../../bone/auth"
export default async(req, res) => {
    try {
        auth(req)
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