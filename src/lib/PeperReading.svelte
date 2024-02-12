<script lang="ts">
    import type { PR } from "./stores";

    export let paper_reading: PR | undefined
</script>

{#if paper_reading}
<div class="content">
    <h3>論文/文献表題</h3>
    <p>{paper_reading.title}</p>
    <hr>
    <h3>URL</h3>
    <a href={paper_reading.url}>{paper_reading.url}</a>
    <hr>
    <h3>本文</h3>
    <p>{paper_reading.body}</p>
</div>
{:else}
<p>TBD</p>
{/if}