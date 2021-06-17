// import cheerio from 'cheerio'
import HTMLParser from 'fast-html-parser'

export async function get({ query }) {
	const url = decodeURIComponent(query.get('url'));
	const selector = decodeURIComponent(query.get('selector'));
	const props = decodeURIComponent(query.get('props')).split(/\n/).filter( el => !!el )

	const res = await fetch(url);
	const html = await res.text()
	var doc = HTMLParser.parse(html);

	const data = doc
		.querySelectorAll(selector)
		?.map( node => { 
			if (!!props) {
				return props.map( 	
					sel => node.querySelector(sel)?.rawText.trim() || ''
				).join("\t")
			}
			return node?.rawText.trim()
		})
		.join("\n")

	return {
		headers: {
			"Content-Type": "text/csv"
		},
		body: data 
	}
}