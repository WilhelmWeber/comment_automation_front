<script lang="ts">
    import type { RP } from "./stores";

    export let research_presentation: RP | undefined;
</script>

{#if research_presentation}
<div class="content">
    <h3>研究発表表題</h3>
    <p>{research_presentation.title}</p>
    <hr>
    <h3>本文</h3>
    <p>{research_presentation.body}</p>
</div>
{:else}
<p>TBD</p>
{/if}