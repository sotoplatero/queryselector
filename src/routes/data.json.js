import cheerio from 'cheerio'

export async function get({ query }) {
	// the `slug` parameter is available because this file
	// is called [slug].json.js
	const url = query.get('url');
	const selector = query.get('selector');

	const res = await fetch(url);
	const html = await res.text()
	const $ =  cheerio.load(html)

	const data = $(selector)?.map( (i,node) => $(node).text().trim() ).get()

	return {
		body: data
	};
}