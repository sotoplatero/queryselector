<script>
	let url
	let selector
	let data
	let api

	let examples = [
		{
			title: 'Wikipedia',
			url: 'https://en.wikipedia.org/wiki/Main_Page',
			selector: '#mp-tfa',
		}, {
			title: 'New York Times',
			url: 'https://www.nytimes.com/',
			selector: '.story-wrapper h3',
		}
	]
	$: api = `/data.json?url=${url}&selector=${encodeURIComponent(selector)}`

	async function getData(){
		data = null
		const res = await fetch(api)
		data = await res.json()
	}
	async function execExample(ex){
		url = ex.url
		selector = ex.selector
		// await getData()
	}
</script>
<main>
	<header>
		<h1>querySelectorAll</h1>
		<p>
			Extract data from any web site easy and fast. ex: 
			{#each examples as ex, index}
				<a href on:click|preventDefault={()=>execExample(ex)}>{ex.title}</a>&nbsp;
			{/each}			
		</p>
	</header>
	
	<form action="" on:submit|preventDefault={getData}>
		<div>
			<label for="url">URL</label>
			<input type="text" name="url" bind:value={url} >
		</div>
		<br>
		<div>
			<label for="selector">CSS Selector</label>
			<input type="text" name="selector" bind:value={selector} >
		</div>
		<br>
		<button>JSON</button>
	</form>
	{#if data}
		<pre><code>
			{JSON.stringify(data,null, 3)}
		</code></pre>
		<a href="{api}" target="_blank" rel ="noreferer noopener">Endpoint</a>
	{/if}
</main>

