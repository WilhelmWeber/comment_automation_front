<script lang="ts">
    import { comments, isAuth } from "$lib/stores";
    import { typeToJapanese } from "$lib/utility";
    import { DELETEHandler } from "$lib/onMountAPI";
    import Redirect from "$lib/Redirect.svelte";
</script>

{#if $isAuth}
<div class="container is-max-widescreen">
    <table class="table">
        <thead>
            <tr>
                <th>日付</th>
                <th>タイプ</th>
                <th>タイトル</th>
                <th>更新</th>
                <th>削除</th>
            </tr>
        </thead>
        <tbody>
            {#each $comments as comment}
                <tr id={String(comment._id)}>
                    <th>{ comment.date }</th>
                    <th>{ typeToJapanese(comment.type) }</th>
                    <th>{ comment.title }</th>
                    <th>
                        <a href={`/${comment.type}/${String(comment._id)}`} class="button">更新</a>
                    </th>
                    <th>
                        <button class="button is-primary" on:click|preventDefault={() => DELETEHandler(String(comment._id),comment.type)}>削除</button>
                    </th>
                </tr>
            {/each}
        </tbody>
    </table>
</div>
{:else}
<Redirect />
{/if}