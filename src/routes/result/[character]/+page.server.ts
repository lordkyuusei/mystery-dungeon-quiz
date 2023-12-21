import { error } from '@sveltejs/kit';
import characters from "$lib/constants/quiz-rejuv/characters.json";
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
    const post = params.character;

    if (post) {
        const character = characters.find(char => char.id === post) ?? {};
        return { ...character };
    }

    throw error(404, 'Not found');
};