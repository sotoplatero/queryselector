// import cheerio from 'cheerio'
import HTMLParser from 'fast-html-parser'

export async function get({ query }) {
	// the `slug` parameter is available because this file
	// is called [slug].json.js
	const url = query.get('url');
	const selector = query.get('selector');
	const props = (query.get('props') || '').split(/\n/).filter( el => !!el )

	const res = await fetch(url);
	const html = await res.text()
	var doc = HTMLParser.parse(html);

	const data = doc.querySelectorAll(selector)?.map( node => { 
		if (!!props) {
			let obj = {}
			props.forEach( 	
				sel => obj[sel] = node.querySelector(sel)?.rawText.trim() || ''
			)
			return obj
		}
		return node?.rawText.trim()
	})

	return {
		body: data || []
	}
}