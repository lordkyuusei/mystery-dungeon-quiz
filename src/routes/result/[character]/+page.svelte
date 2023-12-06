<script lang="ts">
    import { fade } from "svelte/transition";
    import type { PageData } from "../$types";
    import Waves from "$lib/components/Waves.svelte";

    export let data: PageData;
</script>

<div class="background" in:fade>
    <Waves />
    <Waves layer={1} />
    <Waves layer={2} />
    <div class="background" style="transform: rotate(180deg)" in:fade>
        <Waves />
        <Waves layer={1} />
        <Waves layer={2} />
    </div>
</div>
<section id="mystery-dungeon-quiz-result" in:fade></section>

<style>
</style>
