<script lang="ts">
    import { fade } from "svelte/transition";
    import type { PageData } from "../$types";
    import Waves from "$lib/components/Waves.svelte";
    import NarratorBox from "$lib/components/NarratorBox.svelte";
    import { onMount } from "svelte";

    export let data: PageData;

    let prompter: string[] = [];
    let prompterIndex = 0;

    let resultPrompt: string[] = [];
    let resultPrompterIndex = 0;

    let analysysStringSpeed: number = 1;
    let analysisString: string =
        "Relax. Calm yourself... And now press your fingertip or hold click on the Bow.";
    let analysisTimeout: number;

    let isAnalyzing: boolean = false;
    let isAnalysisDone: boolean = false;

    onMount(() => {
        const { description, adjective, character } = data;

        prompter = [
            "And now your aura will be analyzed.",
            "Your aura is the energy that you radiate!",
        ];

        resultPrompt = [
            "Your aura has been analyzed. You can remove your mouse or finger.",
            "It looks like...",
            ...description.split(". ").map((x) => x + "."),
            `Someone as ${adjective} as you must be...`,
            character + "!",
        ];
    });

    const startCounter = (e: CustomEvent<any>): void => {
        isAnalyzing = true;
        analysysStringSpeed = 1;
        analysisString =
            "That's right... Keep doing it... Let it flow through... Your aura is being analyzed...";
        analysisTimeout = setTimeout(() => {
            isAnalysisDone = true;
        }, 10000);
    };

    const stopCounter = (e: CustomEvent<any>): void => {
        isAnalyzing = false;
        analysysStringSpeed = 7;
        if (!isAnalysisDone) {
            analysisString =
                "You let go too early. Please press your fingertip or hold click on the Bow.";
            clearTimeout(analysisTimeout);
        }
    };
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

<section id="mystery-dungeon-quiz-result" in:fade>
    {#if prompterIndex !== prompter.length}
        <div class="quiz-narrator">
            <NarratorBox
                text={prompter[prompterIndex]}
                on:narratorBoxClick={() => (prompterIndex += 1)}
            ></NarratorBox>
        </div>
    {:else if prompterIndex === prompter.length && prompter.length !== 0 && isAnalysisDone === false}
        <div class="quiz-aura" transition:fade>
            <button
                style="cursor: pointer"
                on:mousedown={startCounter}
                on:mouseup={stopCounter}
                class:aura={isAnalyzing}
            >
                <img src="/bow.png" />
            </button>
        </div>

        <div class="quiz-narrator">
            <NarratorBox
                speed={analysysStringSpeed}
                text={analysisString}
                on:narratorBoxHold={startCounter}
                on:narratorBoxHoldOff={stopCounter}
            ></NarratorBox>
        </div>
    {/if}

    {#if isAnalysisDone === true && resultPrompterIndex < resultPrompt.length}
        <div class="quiz-narrator">
            <NarratorBox
                text={resultPrompt[resultPrompterIndex]}
                on:narratorBoxClick={() => (resultPrompterIndex += 1)}
            ></NarratorBox>
        </div>
    {/if}

    {#if resultPrompterIndex >= 2}
        <div class="quiz-aura" in:fade>
            <img
                src={data.img}
                class:special={resultPrompterIndex < resultPrompt.length - 1}
                alt={data.character}
            />
        </div>
    {/if}
</section>

<style>
    .background {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        z-index: 0;
        padding: 0 0 1px;
    }

    #mystery-dungeon-quiz-result {
        position: relative;
        z-index: 1;
        height: 100%;
        width: 100%;

        display: grid;
        align-content: end;
        grid-template:
            "." 5%
            "aura" 70%
            "narrator" 25% / 100%;
        row-gap: 1rem;

        & .quiz-aura {
            grid-area: aura;
            aspect-ratio: 1;
            margin: auto;
            border-radius: 1rem;
            z-index: 1;
            display: grid;
            place-items: center;

            & button {
                background: none;
                border: none;

                &.aura {
                    animation: aura 0.5s cubic-bezier(0.075, 0.82, 0.165, 1)
                        infinite alternate;
                }
            }

            & img {
                &.special {
                    filter: brightness(0);
                }
            }
        }

        & .quiz-narrator {
            grid-area: narrator;
            z-index: 2;
        }
    }
</style>
