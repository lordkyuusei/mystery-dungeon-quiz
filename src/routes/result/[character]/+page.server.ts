import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
    const post = params.character;

    if (post) {
        return { post };
    }

    throw error(404, 'Not found');
};