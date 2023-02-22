<script lang="ts">
    import Router from "svelte-spa-router";
    import EngPad from "./lib/EngPad.svelte";
    import About from "./lib/About.svelte";

    const routes = {
        "/": EngPad,
        "/pad": EngPad,
        "/about": About,
        // '*': NotFound,
    };
</script>

<h1>Enlighten</h1>

<main>
    <Router {routes} />
</main>

<footer>
    2023 <a href="https://twitter.com/vorotamoroz">@vorotamoroz</a><br />
    <aside>Nothing is stored other than the fact that the server was accessed. All sources are published at <a href="https://github.com/vrtmrz/enlighten">GitHub</a>. This application may be deactivated without notice. Cheers!</aside>
</footer>

<style>
    h1 {
        margin-block-start: 0;
        margin-block-end: 0;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
    }
    main {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: auto;
    }
    aside {
        font-size: 75%;
    }
</style>
