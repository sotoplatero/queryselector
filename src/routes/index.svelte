<script>
	let url
	let selector
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
			selector: '.story-wrapper h3',
		}
	}
	$: api = `/data.json?url=${url}&selector=${encodeURIComponent(selector)}`

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
		// await getData()
	}
</script>
<main>
	<header>
		<h1>QuerySelector</h1>
		<p>
			Extract data from any web site easy and fast. Ex: get feature article from <a href on:click|preventDefault={ () => execExample('wikipedia') }>Wikipedia</a> or headline from the <a href on:click|preventDefault={ () => execExample('nyt') }>New York Times</a>
		
		</p>
	</header>
	
	<form action="" on:submit|preventDefault={getData}>
		<div>
			<label for="url"><b>URL</b></label>
			<input type="text" name="url" bind:value={url} >
		</div>
		<br>
		<div>
			<label for="selector"><b>CSS Selector</b></label>
			<input type="text" name="selector" bind:value={selector} >
		</div>
		<br>
		<button>JSON</button>
		{#if loading}
			<span>loading...</span>
		{/if}
	</form>
	{#if data}
		<pre class="language-json"><code class="language-json">
			{JSON.stringify(data,null, 3)}
		</code></pre>
		<a href="{api}" target="_blank" rel ="noreferer noopener">Endpoint</a>
	{/if}
	<br><br>
</main>

