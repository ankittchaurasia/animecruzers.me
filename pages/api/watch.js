import { scrapeMP4 } from "../../parser.js"

export default async(req, res) => {
    try {
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