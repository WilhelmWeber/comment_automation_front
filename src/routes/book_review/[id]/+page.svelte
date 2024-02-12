<script lang="ts">
    import { form, field } from 'svelte-forms';
    import { max, required, url } from 'svelte-forms/validators';
    import { page } from "$app/stores";
    import { comments, isAuth, type BR } from "$lib/stores";
    import Redirect from "$lib/Redirect.svelte";
    import { UPDATEHandler } from "$lib/onMountAPI";
    import { reviewInfo } from "$lib/infoFetch";
    
    const date = field('date', '', [required()]);
    const title = field('title', '', [required()]);
    const book_url = field('book_url', '', [required(), url()]);
    const info = field('info', '', [required()]);
    const review_url = field('review_url', '', [required(), url()]);
    const body = field('body', '', [required(), max(1000)]);
    const myForm = form(date, title, book_url, info, review_url, body);
    const id: string = $page.params.id;
    const comment: any = $comments.find(el => String(el._id) === id && el.type === 'book_review');
    if (comment) {
        $title.value = comment.title;
        $date.value = comment.date;
        $body.value = comment.body;
        $book_url.value = comment.book_url;
        $info.value = comment.info;
        $review_url.value = comment.review_url;
    }

    const submitHandler = async() => {
        const data: BR = {
            title: $title.value,
            date: $date.value,
            body: $body.value,
            book_url: $book_url.value,
            info: $info.value,
            review_url: $review_url.value,
            type: 'book_review',
        }
        console.log(data);
        await UPDATEHandler(data, 'paper_reading', id);
    };

    const reviewInfoFetchHandler = async() => {
        try {
            const res: string = await reviewInfo($review_url.value);
            $info.value = res;
        } catch (error: any) {
            alert('何らかの理由で取得に失敗しました');
            console.log(error);
        }
    };
</script>

{#if isAuth}
{#if comment}
<div class="container is-max-desktop">
    <form on:submit|preventDefault={submitHandler}>
        <div class="field">
            <p class="label">日付</p>
            <div class="control">
                <input type="date" class="input" bind:value={$date.value} required>
            </div>
            {#if $myForm.hasError('date.required')}
            <p class="help is-danger">日付を入力してください</p>           
            {/if}
        </div>
        <div class="field">
            <p class="label">著書名</p>
            <div class="control">
                <input type="text" class="input" placeholder="例：John Doe, <i>History of Something.</i>NewYork: ABC Press, 2022." bind:value={$title.value} required>
            </div>
            {#if $myForm.hasError('title.required')}
            <p class="help is-danger">著書名を入力してください</p>           
            {/if}
        </div>
        <div class="field">
            <p class="label">著書URL</p>
            <div class="control">
                <input type="text" class="input" placeholder="出版元のURLを入力してください" bind:value={$book_url.value} required>
            </div>
            {#if $myForm.hasError('book_url.required')}
            <p class="help is-danger">URLを入力してください</p>           
            {/if}
            {#if $myForm.hasError('book_url.url')}
            <p class="help is-danger">正しいURLの形式で入力してください</p>           
            {/if}
        </div>
        <div class="field">
            <p class="label">書評情報</p>
            <div class="control">
                <input type="text" class="input" placeholder="例：Review by U. N. Owen, Something Journal 14 (2000): 11-12." bind:value={$info.value} required>
            </div>
            {#if $myForm.hasError('info.required')}
            <p class="help is-danger">書評情報を入力してください</p>           
            {/if}
        </div>
        <p class="label">書評URL(DOI)</p>
        <div class="field has-addons">
            <div class="control is-expanded">
                <input type="text" class="input" placeholder="https://~" bind:value={$review_url.value} required>
            </div>
            <div class="control">
                <button class="button is-info" on:click|preventDefault={reviewInfoFetchHandler}>書評情報出力</button>
            </div>
        </div>
        {#if $myForm.hasError('review_url.required')}
        <p class="help is-danger">URLを入力してください</p>           
        {/if}
        {#if $myForm.hasError('review_url.url')}
        <p class="help is-danger">正しいURLの形式で入力してください</p>           
        {/if}
        <div class="field">
            <p class="label">本文</p>
            <div class="control">
                <textarea class="textarea" placeholder="コメント" bind:value={$body.value} rows="10" required></textarea>
            </div>
        </div>
        {#if $myForm.hasError('body.required')}
        <p class="help is-danger">本文を入力してください</p>           
        {/if}
        {#if $myForm.hasError('body.max')}
        <p class="help is-danger">1000文字以内で入力してください</p>           
        {/if}
        <div class="field">
            <input class="button is-link" type="submit" value="投稿" disabled={!$myForm.valid}>
        </div>
    </form>
</div>
{:else}
<h1>404</h1>
<p>Not Found</p>
{/if}
{:else}
<Redirect />
{/if}