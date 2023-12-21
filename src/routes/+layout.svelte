<script lang="ts">
    import { page } from "$app/stores";
    import { onMount } from "svelte";

    let audio: HTMLAudioElement;
    let isAudioPlaying: boolean = false;

    const toggleQuizMusic = (
        event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement },
    ) => {
        if (isAudioPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        isAudioPlaying = !isAudioPlaying;
    };

    onMount(() => {
        audio = new Audio("/quiz-music.ogg");
        audio.preload = "auto";
        audio.loop = true;
    });
</script>

<main id="mystery-dungeon-quiz" class={$page.route.id}>
    <button on:click={toggleQuizMusic}>{isAudioPlaying ? "🔇" : "🔊"}</button>
    <slot />
</main>

<style>
    button {
        position: absolute;
        top: 1rem;
        right: 0.5rem;
        border: 4px solid var(--box-border-question);
        border-radius: 1rem;
        padding: 0.5rem;
        background-color: var(--box-background);
        z-index: 2;
        cursor: pointer;
    }

    #mystery-dungeon-quiz {
        height: 100svh;
        width: 100svw;

        background: black;
        color: var(--text-color);
        padding: 0.5rem;

        &.\/quiz {
            background-color: white;
        }
    }
</style>
