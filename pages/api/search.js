import {scrapeSearch} from '../../parser.js'

export default async function handler(req, res){
    try {
        
        const keyw = req.query.keyw
        const page = req.query.page

        const data = await scrapeSearch({ keyw: keyw, page: page })
        
        if(data.length === 0){
            throw new Error('No results found')
        }

        res.status(200).json(data)

    } catch (err) {
        res.status(500).json({
            status: 500,
            error: "Internal Error",
            message: err,
        })
    }
}