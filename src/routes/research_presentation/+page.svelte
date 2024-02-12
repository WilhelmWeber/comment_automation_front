<script lang="ts">
    import { form, field } from 'svelte-forms';
    import { max, required } from 'svelte-forms/validators';
    import { dateToString } from "$lib/utility";
    import { isAuth, type RP } from "$lib/stores";
    import Redirect from "$lib/Redirect.svelte";
    import { CREATEHandler } from "$lib/onMountAPI";

    const date = field('date', dateToString(new Date()), [required()]);
    const title = field('title', '', [required()]);
    const body = field('body', '', [required(), max(1000)]);
    const myForm = form(date, title, body);

    const submitHandler = async() => {
        const data: RP = {
            title: $title.value,
            date: $date.value,
            body: $body.value,
            type: 'research_presentation',
        }
        console.log(data);
        await CREATEHandler(data, 'research_presentation');
    };
</script>

{#if $isAuth}
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
            <p class="label">研究発表名</p>
            <div class="control">
                <input type="text" class="input" placeholder="例：19世紀電気力学の形成について" bind:value={$title.value} required>
            </div>
            {#if $myForm.hasError('title.required')}
            <p class="help is-danger">表題を入力してください</p>           
            {/if}
        </div>
        <div class="field">
            <p class="label">本文</p>
            <div class="control">
                <textarea class="textarea" placeholder="コメント" bind:value={$body.value} rows="10" required></textarea>
            </div>
            {#if $myForm.hasError('body.required')}
            <p class="help is-danger">本文を入力してください</p>           
            {/if}
            {#if $myForm.hasError('body.max')}
            <p class="help is-danger">1000文字以内で入力してください</p>           
            {/if}
        </div>
        <div class="field">
            <input class="button is-link" type="submit" value="投稿" disabled={!$myForm.valid}>
        </div>
    </form>
</div>
{:else}
<Redirect />
{/if}