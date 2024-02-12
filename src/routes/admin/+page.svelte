<script lang="ts">
    import { onMount } from "svelte";
    import { adminGETHandler, adminPOSTHandler } from "$lib/onMountAPI";
    import { isAuth, adminComments, comment_types, type AdminData, type CommentType } from "$lib/stores";
    import CommentModal from "$lib/CommentModal.svelte";
    import { typeToJapanese } from "$lib/utility";
    import Redirect from "$lib/Redirect.svelte";

    //モーダル管理用
    let comments_in_modal: AdminData = $adminComments[0];
    let show: boolean = false;
    let selected: CommentType = 'paper_reading';

    onMount(() => {
        debugger;
        adminGETHandler();
    });

    const modalHandler = (comment: AdminData) => {
        comments_in_modal = comment;
        show = true;
    };

    const closeHandler = () => {
        show = false;
    }
</script>

{#if $isAuth}
<div class="container is-max-desktop">
    <div class="content">
        <h2>管理画面</h2>
    </div>
    <table class="table">
        <thead>
            <tr>
                <th>日付</th>
                <th>論文/文献講読</th>
                <th>書評紹介</th>
                <th>研究発表</th>
                <th>閲覧</th>
                <th>投稿</th>
            </tr>
        </thead>
        <tbody>
            {#each $adminComments as comment}
            <tr>
                <th>{comment.date}</th>
                <th>{comment.paper_reading? '済' : '未'}</th>
                <th>{comment.book_review? '済' : '未'}</th>
                <th>{comment.research_presentation? '済' : '未'}</th>
                <th>
                    <button class="button" on:click={() => modalHandler(comment)}>閲覧</button>
                </th>
                <th>
                    <button class="button is-primary" on:click|preventDefault={() => adminPOSTHandler(comment)}>投稿</button>
                </th>
            </tr>
            {/each}
        </tbody>
    </table>
</div>
{#if show}
<div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-card">
        <header class="modal-card-head">
            <button class="modal-close is-large" aria-label="close" on:click={closeHandler}></button>
            <div class="select">
                <select bind:value={selected}>
                    <option selected value={comment_types.PR}>{typeToJapanese(comment_types.PR)}</option>
                    <option value={comment_types.BR}>{typeToJapanese(comment_types.BR)}</option>
                    <option value={comment_types.RP}>{typeToJapanese(comment_types.RP)}</option>
                </select>
            </div>
        </header>
        <section class="modal-card-body">
            <CommentModal comment={comments_in_modal} selected={selected}/>
        </section>
    </div>
</div>
{/if}
<Redirect />
{/if}