<script lang="ts">
    import type { BR } from "./stores";

    export let book_review: BR | undefined
</script>

{#if book_review}
<div class="content">
    <h3>書名</h3>
    <p>{book_review.title}</p>
    <hr>
    <h3>著書URL</h3>
    <a href={book_review.book_url}>{book_review.book_url}</a>
    <hr>
    <h3>書評情報</h3>
    <p>{book_review.info}</p>
    <hr>
    <h3>書評URL</h3>
    <p>{book_review.review_url}</p>
    <h3>本文</h3>
    <p>{book_review.body}</p>
</div>
{:else}
<p>TBD</p>
{/if}