import {scrapeNewSeason} from "../../bone/parser"
import auth from "../../bone/auth"
export default async(req, res) => {
    try{
        auth(req)
        const page = req.query.page

        const data = await scrapeNewSeason({ page: page })

        res.status(200).json(data)

    } catch (err) {
        res.status(500).json({
            status: 500,
            error: "Internal Error",
            message: err,
        })
    }
}