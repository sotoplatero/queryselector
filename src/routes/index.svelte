<script context="module">
	export async function load({ page, fetch, session, context }) {
		const url = page.query.get('url') || ''
		const selector = page.query.get('selector') || ''
		const properties = page.query.get('properties') || ''

		const querystring = encodeURI(page.query.toString())
		const res = await fetch(`/data.json?${querystring}`);

		if (res.ok) {
			const data = await res.json()
			return {
				props: { url, selector,	properties,	data }
			};
		}
		return { props: {} }
	}
</script>

<script>
	// import onMount from 'svelte'
	import Download from './_download.svelte'

	export let data = []
	export let url = ''
	export let selector = ''
	export let properties = ''

	let api
	let loading = false

	let examples = {
		wikipedia: {
			url: 'https://en.wikipedia.org/wiki/Main_Page',
			selector: '#mp-tfa',
		}, 
		nyt: {
			url: 'https://www.nytimes.com/',
			selector: '.story-wrapper',
			properties: ['h3','p']
		}
	}

	$: api = `/data.json?url=${url}&selector=${encodeURIComponent(selector)}&properties=${encodeURIComponent(properties)}`

	// onMount(async () => {

	// })
	async function getData(){
		loading = true
		const res = await fetch(api)
		data = await res.json()
		loading = false
	}
	function execExample(site){
		const ex = examples[site]
		url = ex.url
		selector = ex.selector
		properties = !!ex.properties ? ex.properties.join("\n") : ''
	}
</script>
<main>
	<header>
		<h1>QuerySelector</h1>
		<p>
			Extract data from any web site easy and fast. Ex: get feature article from <a href on:click|preventDefault={ () => execExample('wikipedia') }>Wikipedia</a> or extract the title and summary of each news in the <a href on:click|preventDefault={ () => execExample('nyt') }>New York Times</a> web.
		
		</p>
	</header>
	
	<form action="" on:submit|preventDefault={getData}>
		<div>
			<label for="url"><b>URL</b></label>
			<input type="text" name="url" bind:value={url} >

			<br>

			<label for="selector"><b>Object Selector</b></label>
			<input type="text" name="selector" bind:value={selector} >

			<br>

			<label for="selector"><b>Property Selectors</b></label>
			<textarea bind:value={properties} name="properties"></textarea>
		</div>
		<br>
		<button disabled={!(!!url && !!selector)}>
			JSON
		</button>
		{#if loading}
			<span>loading...</span>
		{/if}
	</form>
	{#if data.length}
		<br>
		<table>
			<tbody>
			  <tr>
			    <td><Download {data}/></td>
			    <td><a href="/data.csv?url={url}&selector={encodeURIComponent(selector)}&properties={encodeURIComponent(properties)}" target="_blank" >CSV API</a></td>
			    <td><a href="{api}" target="_blank" >JSON API</a></td>
			  </tr>
			</tbody>
		</table>		
		<pre class="language-json"><code class="language-json">
			{JSON.stringify(data,null, 3)}
		</code></pre>
	{/if}
	<br><br>
</main>

