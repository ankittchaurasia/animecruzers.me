function refcond(ref){
        if(ref.match(/^https?:\/\/([^\/]+\.)?animecruzers\.me(\/|$)/i)){
            return true
        }else if(ref.match(/^https?:\/\/([^\/]+\.)?localhost\:3000(\/|$)/i)){
            return true
        }else{
            return false
        }
}

export default function auth(req){
    if(req.headers['user-agent'] && refcond(req.headers.referer)){
        return true
    }else{
        throw new Error("Baka!")
    }
}