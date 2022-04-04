// export default async(req, res) => {
//     try {
//             const gogoid = req.query.id
//             const animixapi = "/api/live"+Buffer.from(gogoid+ "LTXs3GrU8we9O" + Buffer.from(gogoid).toString('base64')).toString('base64')
//             var https = require('https');

//             const options = {
//                 hostname: 'animixplay.to',
//                 path: animixapi,
//                 headers: { 'User-Agent': 'Mozilla/5.0' }
//             }

//             // const request = new Promise((resolve, reject) => {
//             //     try {
//             //         https.get(options, (response)=>resolve({location: response.headers.location.includes('https://')? response.headers.location : 'https://animixplay.to/'+response.headers.location}));
//             //     }catch(er){
//             //       reject(er)
//             //     }
//             //   })
//             const request = new Promise((resolve, reject) => {
//                 try {
//                     https.get(options, (response)=>resolve(response));
//                 }catch(er){
//                   reject(er)
//                 }
//               })

//             res.status(200).json(await request);

//     } catch (err) {
//             res.status(500).json({
//                 status: 500,
//                 error: "Internal Error",
//                 message: err,
//             }).end();
//     }
// }


export default async(req, res) => {
    try {
            const gogoid = req.query.id
            const path = "/view/"+gogoid
            var https = require('https');

            const options = {
                hostname: 'gogoanime-tv.pro',
                path: path,
                headers: { 'User-Agent': 'Mozilla/5.0' }
            }

            const request = new Promise((resolve, reject) => {
                try {
                    https.get(options, (response)=>resolve(response.headers.location));
                }catch(er){
                  reject(er)
                  console.log(er)
                }
              })
            
            const location = await request
            
            res.status(200).json({location: "https://gogoanime-tv.pro/embed/"+location.split('/').pop()});

    } catch (err) {
            res.status(500).json({
                status: 500,
                error: "Internal Error",
                message: err,
            });
    }
}
