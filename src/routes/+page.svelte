<script lang="ts">
    import { goto } from "$app/navigation";
    import NarratorBox from "$lib/components/NarratorBox.svelte";
    import typewriter from "$lib/transitions/typewriter";

    const prompter = [
        "Welcome!",
        "This is the portal that leads to the world of Pokemon Rejuvenation.",
        "Beyond this gateway, many new adventures and fresh experiences await your arrival!",
        "Before you depart for adventure, you must answer some questions.",
        "Be truthful when you answer them!",
        "Now, are you ready?",
        "Then... let the questions begin!",
    ];

    let prompterIndex = 0;

    const increasePrompterIndex = () => {
        if (prompterIndex < prompter.length - 1) {
            prompterIndex += 1;
        } else {
            goto("/quiz");
        }
    };
</script>

<section id="quiz-intro">
    <NarratorBox
        nostyle
        text={prompter[prompterIndex]}
        on:narratorBoxClick={increasePrompterIndex}
    ></NarratorBox>
</section>

<style>
    #quiz-intro {
        height: 100%;
        width: 100%;
        display: grid;
        grid-template: 100% / 100%;
        place-items: center;

        & p {
            position: relative;
            text-align: center;
            font-size: 2rem;
            height: 20svh;
            width: 50%;
            cursor: pointer;

            &::after {
                content: "";
                position: absolute;
                bottom: -1rem;
                left: calc(50% - 1rem);
                border: 0;
                border-top: 1rem solid var(--text-color);
                border-left: 1rem solid transparent;
                border-right: 1rem solid transparent;
                border-bottom: 1rem solid transparent;
                animation: twinkle 0.4s ease-in-out infinite alternate;
            }
        }
    }
</style>
