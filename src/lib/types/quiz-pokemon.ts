export type PokemonMDQuiz = PokemonMDQuestion[];

export type PokemonMDQuestion = {
    id: number,
    question: string,
    answers: PokemonMDAnswer[],
}

export type PokemonMDAnswer = {
    id: number,
    answer: string,
    scores: number[]
};