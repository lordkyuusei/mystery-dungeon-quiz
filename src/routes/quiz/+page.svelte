<script lang="ts">
    import { goto } from "$app/navigation";
    import NarratorBox from "$lib/components/NarratorBox.svelte";
    import Waves from "$lib/components/Waves.svelte";
    import quiz from "$lib/constants/quiz-pokemon.json";
    import typewriter from "$lib/transitions/typewriter";
    import type {
        PokemonMDAnswer,
        PokemonMDQuestion,
    } from "$lib/types/quiz-pokemon";
    import { onMount } from "svelte";
    import { fade } from "svelte/transition";

    let question: PokemonMDQuestion;
    let answers: PokemonMDAnswer[];
    let answered: number[] = [];

    const answerQuestion = (
        event: MouseEvent & { currentTarget: EventTarget & HTMLLIElement },
    ) => {
        if (answered.length === 16) {
            goto("/result/me");
        } else {
            let random: number;
            /* Special cases*/
            if (answered.length === 15) {
                random = 64;
            } else if (answered[answered.length - 1] === 56) {
                random = 57;
            } else {
                random = Math.floor(Math.random() * quiz.length - 1);
                while (answered.some((answered) => answered === random)) {
                    random = Math.floor(Math.random() * quiz.length - 1);
                }
            }
            question = quiz.find((q) => q.id === random) ?? quiz[0];
            answers = quiz[random].answers;
            answered = [...answered, random];
        }
    };

    onMount(() => {
        answerQuestion(null);
    });
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
<section id="mystery-dungeon-quiz-area" in:fade>
    {#if question}
        <div class="quiz-answers">
            <NarratorBox>
                <ul>
                    {#each answers as answer}
                        <li on:click={answerQuestion}>{answer.answer}</li>
                    {/each}
                </ul>
            </NarratorBox>
        </div>
        <div class="quiz-question">
            <NarratorBox text={question.question}></NarratorBox>
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

    #mystery-dungeon-quiz-area {
        position: relative;
        z-index: 1;
        height: 100%;
        width: 100%;

        display: grid;
        align-content: end;
        grid-template:
            ". ." 50%
            ". anwsers" min-content
            "question question" 25% / auto min-content;
        row-gap: 1rem;

        & .quiz-answers {
            grid-area: anwsers;

            & ul {
                margin: 0 !important;
                padding: 0 2rem !important;
                list-style-type: none;
                width: 100%;
                display: grid;
                grid-auto-flow: row;
                height: 100%;
                gap: 0.5rem;

                & li {
                    display: flex;
                    align-items: center;
                    position: relative;
                    font-size: 3rem;
                    width: 100%;
                    text-wrap: nowrap;
                    cursor: pointer;

                    &:hover::before {
                        content: "";
                        position: absolute;
                        left: -2rem;
                        top: calc(50% - 0.75rem);
                        border: 0;
                        border-left: 0.75rem solid white;
                        border-right: 0.75rem solid transparent;
                        border-top: 0.75rem solid transparent;
                        border-bottom: 0.75rem solid transparent;
                    }
                }
            }
        }

        & .quiz-question {
            grid-area: question;
        }
    }
</style>
