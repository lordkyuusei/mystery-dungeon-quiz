<script lang="ts">
    import Waves from "$lib/components/Waves.svelte";
    import typewriter from "$lib/transitions/typewriter";
    const prompter = [
        "What is your favorite type of cuisine?",
        "If you could visit any place in the world, where would you go?",
        "What's your go-to hobby when you have free time?",
        "Do you prefer reading books or watching movies?",
        "If you could have any superpower, what would it be and why?",
        "What's your favorite way to relax after a long day?",
        "If you could meet any fictional character, who would it be?",
        "What's your dream job or career path?",
        "If you were a time traveler, which era would you visit?",
        "What's the most adventurous thing you've ever done?",
        "Do you enjoy outdoor activities or prefer staying indoors?",
        "If you could learn any skill instantly, what would it be?",
        "What's your favorite type of music or favorite band?",
        "If you could have dinner with any historical figure, who would it be and why?",
        "Do you have any hidden talents or unusual hobbies?",
    ];

    const answers = [
        "Answer A.",
        "Answer B.",
        "Answer C.",
        "None of the above.",
    ];

    let prompterIndex = 0;
</script>

<div class="background">
    <Waves />
    <Waves layer={1} />
    <Waves layer={2} />
</div>
<div class="background" style="transform: rotate(180deg)">
    <Waves />
    <Waves layer={1} />
    <Waves layer={2} />
</div>
<section id="mystery-dungeon-quiz-area">
    <div class="quiz-answers">
        <ul>
            {#each answers as answer}
                <li on:click={() => (prompterIndex += 1)}>{answer}</li>
            {/each}
        </ul>
    </div>
    <div class="quiz-question">
        {#key prompterIndex}
            <p in:typewriter>
                {prompter[prompterIndex]}
            </p>
        {/key}
    </div>
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
        grid-template:
            ". ." 0.5fr
            ". anwsers" 0.3fr
            "question question" 0.2fr / auto min-content;
        row-gap: 0.5rem;

        & .quiz-answers {
            grid-area: anwsers;

            & ul {
                margin: 0;
                padding: 0;
                list-style-type: none;
                width: 100%;
                display: grid;
                grid-auto-flow: row;
                height: 100%;
                gap: 0.5rem;

                & li {
                    position: relative;
                    font-size: 3rem;
                    width: 100%;
                    text-wrap: nowrap;
                    cursor: pointer;

                    &:hover::before {
                        content: "";
                        position: absolute;
                        left: -1rem;
                        top: calc(50% - 1rem);
                        border: 0;
                        border-left: 0.5rem solid white;
                        border-right: 0.5rem solid transparent;
                        border-top: 0.5rem solid transparent;
                        border-bottom: 0.5rem solid transparent;
                    }
                }
            }
        }

        & .quiz-question {
            grid-area: question;

            & p {
                margin: 0;
                font-size: 3rem;
            }
        }

        & :is(.quiz-answers, .quiz-question) {
            border-inline: 1rem solid var(--box-border-question);
            border-block: 0.5rem solid var(--box-border-question);
            border-radius: 1rem;

            padding: 1rem 1.5rem;
            background-color: var(--box-background);
        }
    }
</style>
