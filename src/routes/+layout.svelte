<script>
    import { page } from "$app/stores";
</script>

<main id="mystery-dungeon-quiz" class={$page.route.id}>
    <slot />
</main>

<style>
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
