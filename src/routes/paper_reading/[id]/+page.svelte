<script lang="ts">
    import { page } from "$app/stores";
    import type { PR } from '$lib/stores';
    import { isAuth, comments } from '$lib/stores';
    import { form, field } from 'svelte-forms';
    import { max, required, url } from 'svelte-forms/validators';
    import { paperInfo } from '$lib/infoFetch';
    import { UPDATEHandler } from '$lib/onMountAPI';
    import Redirect from "$lib/Redirect.svelte";

    const title = field('title', '', [required()]);
    const date = field('date', '', [required()]);
    const paper_url = field('url', '', [required(), url()]);
    const body = field('body', '', [required(), max(1000)]);
    const myForm = form(title, date, paper_url, body);
    const id: string = $page.params.id;
    const comment: any = $comments.find(el => String(el._id) === id && el.type === 'paper_reading');
    if (comment) {
        $title.value = comment.title;
        $date.value = comment.date;
        $body.value = comment.body;
        $paper_url.value = comment.url;
    }

    $: bodyLength = $body.value.length;

    const submitHandler = async() => {
        const data: PR = {
            title: $title.value,
            date: $date.value,
            url: $paper_url.value,
            body: $body.value,
            type: 'paper_reading'
        };
        console.log(data);
        await UPDATEHandler(data, 'paper_reading', id);
    };

    const infoFetchHandler = async() => {
        try {
            const res = await paperInfo($paper_url.value);
            $title.value = res;
        } catch (error: any) {
            alert('何らかの理由で取得に失敗しました');
            console.log(error);
        }
    };
</script>

{#if $isAuth}
{#if comment}
<div class="container is-max-desktop">
    <form on:submit={submitHandler}>
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
            <p class="label">論文/文献名</p>
            <div class="control">
                <input type="text" class="input" placeholder="例：名無しの権瓶，2020．「日本における量子力学の移入」『科学史』第17号，1-10頁．" bind:value={$title.value} required>
            </div>
            {#if $myForm.hasError('title.required')}
            <p class="help is-danger">表題を入力してください</p>           
            {/if}
        </div>
        <p class="label">URL(DOI)</p>
        <div class="field has-addons">
            <div class="control is-expanded">
                <input type="text" class="input" placeholder="DOIのフルURLを入力してください" bind:value={$paper_url.value} required>
            </div>
            <div class="control">
                <button class="button is-info" on:click|preventDefault={infoFetchHandler}>論文情報出力</button>
            </div>
        </div>
        {#if $myForm.hasError('url.required')}
        <p class="help is-danger">URLを入力してください</p>           
        {/if}
        {#if $myForm.hasError('url.url')}
        <p class="help is-danger">正しいURLの形式で入力してください</p>           
        {/if}
        <div class="field">
            <p class="label">本文</p>
            <div class="control">
                <textarea class="textarea" placeholder="コメント" bind:value={$body.value} rows="10" required></textarea>
            </div>
            <p class="help">{bodyLength}文字</p>
            {#if $myForm.hasError('body.required')}
            <p class="help is-danger">本文を入力してください</p>           
            {/if}
            {#if $myForm.hasError('body.max')}
            <p class="help is-danger">1000文字以内で入力してください</p>           
            {/if}
        </div>
        <div class="field">
            <input type="submit" class="button is-link" value="投稿" disabled={!$myForm.valid}>
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