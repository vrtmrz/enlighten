<script lang="ts">
    const sx = {
        j1: "",
        e1: "",
        j2: "",
        e2: "",
    };
    let requesting = false;
    async function translate(source, lang) {
        try {
            if (requesting) {
                return "Wait for previous request has been finished";
            }
            requesting = true;
            const url = `api/translate/-,${lang}`;
            console.dir(url);
            const w = await (
                await fetch(url, {
                    body: source,
                    method: "post",
                })
            ).text();
            return w;
        } catch (ex) {
            return ex.toString();
        } finally {
            requesting = false;
        }
    }
    async function processKey(e: KeyboardEvent, phase: number) {
        if (e.key == "Enter") {
            if (e.altKey) {
                await process(phase, true);
            } else if (e.ctrlKey) {
                await process(phase, false);
            }
        }
    }
    async function process(phase: number, back: boolean, step = 1) {
        const phases = ["e2", "j1", "e1", "j2", "e2", "j1"];
        let from = phases[phase];
        let to = back ? phases[phase - 1] : phases[phase + 1];
        const targetLang = to.startsWith("e") ? "en-GB" : "ja";
        sx[to] = "...translating...";
        sx[to] = await translate(`${sx[from]} `, targetLang);
        if (--step > 0) {
            await process(phase + 1, back, step);
        }
    }
</script>

<main>
    <div class="pane">
        <div class="row">
            <label for="">Japanese</label>
            <div class="ex">
                <textarea name="" id="" cols="30" rows="10" bind:value={sx.j1} on:keydown={(e) => processKey(e, 1)} />
                <button on:click={() => process(1, false, 2)}> → </button>
            </div>
        </div>

        <div class="row buttons">
            <button on:click={() => process(2, true)}>↑</button><button on:click={() => process(1, false)}>↓</button>
        </div>
        <div class="row">
            <label for="">English</label>
            <div class="ex">
                <textarea name="" id="" cols="30" rows="10" bind:value={sx.e1} on:keydown={(e) => processKey(e, 2)} />
                <button on:click={() => process(2, false, 2)}> → </button>
            </div>
        </div>
        <div class="row buttons">
            <button on:click={() => process(3, true)}>↑</button><button on:click={() => process(2, false)}>↓</button>
        </div>
    </div>
    <div class="pane">
        <div class="row">
            <label for="">Japanese</label>
            <textarea name="" id="" cols="30" rows="10" bind:value={sx.j2} on:keydown={(e) => processKey(e, 3)} />
        </div>
        <div class="row buttons">
            <button on:click={() => process(4, true)}>↑</button><button on:click={() => process(3, false)}>↓</button>
        </div>
        <div class="row">
            <label for="">English</label>
            <textarea name="" id="" cols="30" rows="10" bind:value={sx.e2} on:keydown={(e) => processKey(e, 4)} />
        </div>
        <div class="row buttons">
            <button on:click={() => process(5, true)}>↑</button><button on:click={() => process(4, false)}>↓</button>
        </div>
    </div>
</main>

<style>
    main {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        box-sizing: border-box;
        justify-content: center;
    }
    .pane {
        display: flex;
        flex-direction: column;
    }
    .row {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        max-width: min(90vw, 500px);
        width: min(90vw, 500px);
    }
    .row.buttons {
        flex-direction: row;
    }
    .ex {
        display: flex;
        flex-direction: row;
    }
    .ex textarea {
        flex-grow: 1;
    }
    .row > * {
        flex-grow: 1;
    }
    textarea {
        font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
        font-size: 100%;
        padding: 0.5em;
    }
</style>
