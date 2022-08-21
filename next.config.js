/** @type {import('next').NextConfig} */
module.exports = {
    async rewrites() {
        return {
            beforeFiles:[
                {
                    source: '/',
                    destination:'/index.html'
                }
            ]
        }
    }
}
