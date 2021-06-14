<script>
    export let data;

    function download() {
        const text = data.map( el => Object.values(el).filter(el=>!!el).join("\t") ).join("\n");
        console.log(text)
        let element = document.createElement('a')
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        const filename = `queryselector-${(new Date).toISOString()}.csv`
        element.setAttribute('download', filename);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }
    
</script>
<a href
    on:click|preventDefault="{download}"
    title="Download CSV"
>
    Download CSV
</a >  