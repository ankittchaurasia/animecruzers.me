/** @type {import('next').NextConfig} */
module.exports = {
    async rewrites() {
        return {
            beforeFiles:[
                {
                    source: '/:path*',
                    destination:'/index.html'
                }
            ]
        }
    }
}
