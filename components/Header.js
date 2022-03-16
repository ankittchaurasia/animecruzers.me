import Head from "next/head"

export default function Header(props) {
    return (
       <Head>
        <meta name='robots' content='index, follow' />
        <meta property="og:type" content="website" />
        <title>{props.title}</title>
        <meta name="description" content={props.desc} />
        <link rel="canonical" href="https://animecruzers.me/" />
        <meta property="og:title" content={props.title} />
        <meta property="og:description" content={props.desc} />
        <meta property="og:url" content="https://animecruzers.me" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property='twitter:title' content='/assets/img/favicon.png' />
        <link rel="apple-touch-icon" href="/assets/img/favicon.png" />
        <meta name="msapplication-TileImage" content="/assets/img/favicon.png" />
        <link rel="icon" href="/assets/img/favicon.png" />
        <meta property="og:site_name" content="Animecruzers" />
        <meta property='og:image' content={props.img} />
        <meta property='twitter:image' content={props.img} />
        <meta property='og:image:width' content='650' />
        <meta property='og:image:height' content='350' />
       </Head> 
    )
}

Header.defaultProps = {
    title: 'Animecruzers - Watch HD Anime (No Ads)',
    desc: 'Watch HD Anime (No Ads)',
    img: ''
}