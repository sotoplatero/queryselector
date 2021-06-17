<script>
	import Download from './_download.svelte'

	let url
	let selector
	let props = ''
	let data
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
			props: ['h3','p']
		}
	}


	$: api = `/data.json?url=${url}&selector=${encodeURIComponent(selector)}&props=${encodeURIComponent(props)}`

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
		props = !!ex.props ? ex.props.join("\n") : ''
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
			<textarea bind:value={props} name="props"></textarea>
		</div>
		<br>
		<button disabled={!(!!url && !!selector)}>
			JSON
		</button>
		{#if loading}
			<span>loading...</span>
		{/if}
	</form>
	{#if data}
		<br>
		<table>
			<tbody>
			  <tr>
			    <td><Download {data}/></td>
			    <td><a href="/data.csv?url={url}&selector={encodeURIComponent(selector)}&props={encodeURIComponent(props)}" target="_blank" >CSV API</a></td>
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

