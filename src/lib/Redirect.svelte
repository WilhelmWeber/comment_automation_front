<script lang="ts">
    //ログインページリダイレクト用コンポーネント
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import { isAuth } from "./stores";

    onMount(() => {
        if($isAuth) return;
        goto('/login');
    })
</script>