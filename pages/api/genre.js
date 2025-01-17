import { scrapeGenre } from "../../bone/parser"
import auth from "../../bone/auth"
export default async(req, res) => {
    try {
        auth(req)
        const genre = req.query.genre
        const page = req.query.page

        const data = await scrapeGenre({ genre: genre, page: page })

        res.status(200).json(data)

    } catch (err) {
        res.status(500).send({
            status: 500,
            error: "Internal Error",
            message: err,
        })
    }
}