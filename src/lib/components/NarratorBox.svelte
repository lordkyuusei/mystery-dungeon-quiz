<script lang="ts">
    import typewriter from "$lib/transitions/typewriter";

    export let text: string | null = null;
</script>

<div class="narrator-box">
    {#if text}
        {#key text}
            <p in:typewriter>
                {text}
            </p>
        {/key}
    {:else}
        <slot />
    {/if}
</div>

<style>
    .narrator-box {
        height: 100%;
        border-inline: 1rem solid var(--box-border-question);
        border-block: 0.5rem solid var(--box-border-question);
        border-radius: 1rem;

        padding: 1rem 1.5rem;
        background-color: var(--box-background);
    }
    p {
        margin: 0;
        font-size: 3rem;
        line-height: 1;
        height: 100%;
        width: 100%;
    }
</style>
