<script lang="ts">
    import { onMount } from 'svelte';
    import { getComments, deleteAuth } from '$lib/onMountAPI';
    import { Error, isAuth } from '$lib/stores';
    import 'bulma/css/bulma.css';

    onMount(() => {
        //ローカルストレージに認証情報が残っていれば、立ち上げたときにコメントを取る
        getComments();
    })
</script>

<nav class="navbar" aria-label="main navigation">
    <div class="navbar-brand">
        <a class="navbar-item" href="/">コメント投稿アプリ</a>
    </div>
    <div class="navbar-menu">
        <div class="navbar-start">
            <a class="navbar-item" href="/">Home</a>
            <div class="navbar-item has-dropdown is-hoverable">
                <a class="navbar-link" href="/">投稿する</a>
                <div class="navbar-dropdown">
                    <a class="navbar-item" href="/paper_reading">論文/文献講読</a>
                    <a class="navbar-item" href="/book_review">書評紹介</a>
                    <a class="navbar-item" href="research_presentation">研究発表</a>
                </div>
            </div>
        </div>
    </div>
    <div class="navbar-end">
        <div class="navbar-item">
            {#if $isAuth}
            <a href="/login" class="button is-primary" on:click|preventDefault={deleteAuth}>ログアウト</a>
            {/if}
        </div>
    </div>
</nav>
<hr class="navbar-divider">
{#if $Error}
<article class="message is-danger is-small">
    <div class="message-body">{$Error}</div>
</article>
{/if}

<slot />
