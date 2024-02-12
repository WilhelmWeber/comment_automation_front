<script lang="ts">
    import { PaperReading, BookReview } from "$lib";
    import ResearchPresentation from "./ResearchPresentation.svelte";
    import type { AdminData, CommentType } from "./stores";
    export let comment: AdminData;
    export let selected: CommentType;
</script>

{#if selected=="paper_reading"}
<PaperReading paper_reading={comment.paper_reading}/>
{:else if selected=="book_review"}
<BookReview book_review={comment.book_review}/>
{:else}
<ResearchPresentation research_presentation={comment.research_presentation}/>
{/if}