<script lang="ts">
    import typewriter from "$lib/transitions/typewriter";
    import { createEventDispatcher } from "svelte";

    export let nostyle: boolean = false;
    export let speed: number = 5;
    export let text: string | null = null;

    const dispatcher = createEventDispatcher();

    const propagateClick = (
        event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement },
    ) => {
        dispatcher("narratorBoxClick");
    };
</script>

<div class="narrator-box" class:nostyle>
    <button on:click={propagateClick}>
        {#if text}
            {#key text}
                <p in:typewriter={{ speed }}>
                    {text}
                </p>
            {/key}
        {:else}
            <slot />
        {/if}
    </button>
</div>

<style>
    :global(.visible) {
        opacity: 1;
    }

    :global(.invisible) {
        opacity: 0;
    }

    .narrator-box {
        height: 100%;

        &.nostyle {
            width: 100%;

            & button {
                all: unset;
                width: 100%;
                height: 100%;
                display: grid;
                place-items: center;
            }
        }

        &:not(.nostyle) {
            border-inline: 1rem solid var(--box-border-question);
            border-block: 0.5rem solid var(--box-border-question);
            background-color: var(--box-background);

            & button {
                all: unset;
                width: 100%;
                height: 100%;
                display: grid;
                place-items: center;
            }
        }

        padding: 1rem 1.5rem;
        border-radius: 1rem;
        cursor: pointer;
    }

    p {
        margin: 0;
        font-size: 3rem;
        line-height: 1;
        height: 100%;
        width: 100%;
    }
</style>
