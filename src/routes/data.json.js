// import cheerio from 'cheerio'
import HTMLParser from 'fast-html-parser'

export async function get({ query }) {
	// the `slug` parameter is available because this file
	// is called [slug].json.js
	const url = decodeURIComponent(query.get('url') || '');
	const selector = decodeURIComponent(query.get('selector') || '');
	let props = decodeURIComponent((query.get('properties') || ''))

	props = props ? props.split(/\n/).filter( el => !!el ) : ''

	if (!url && !selector ) {
		return { body: [] }
	}

	const res = await fetch(url);
	const html = await res.text()
	var doc = HTMLParser.parse(html);

	console.log('prosp:' + typeof props)
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