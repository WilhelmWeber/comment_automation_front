<script lang="ts">
    import { getAuth } from "$lib/onMountAPI";
    let username: string = "";
    let password: string = "";

    const submitHandler = async() => {
        getAuth(username, password);
    };
</script>

<div class="container is-max-desktop">
    <form>
        <div class="field">
            <p class="label">ユーザー名</p>
            <div class="control">
                <input type="text" class="input" bind:value={username}>
            </div>
        </div>
        <div class="field">
            <p class="label">パスワード</p>
            <div class="control">
                <input type="password" class="input" bind:value={password}>
            </div>
        </div>
        <div class="field">
            <button class="button is-link" on:click|preventDefault={submitHandler}>ログイン</button>
        </div>
    </form>
</div>