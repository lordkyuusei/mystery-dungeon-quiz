import meta from "./meta.json";
import questions from "./questions.json";

const answerToken = "<span class=\"answer_text\">";
const spanEndToken = "</span>";
const answerIdToken = "name=\"SelectedAnswers[]\" type=\"radio\" value=\"";
const answerIdEndToken = "\" />"
const questionToken = "<div class=\"question_text\">";
const divEndToken = "</div>";

const result = Object.entries(meta).map(([number, entity]) => {
    const { QuestionHtml, QuestionId, QuestionType } = entity;
    const html = QuestionHtml.split('\n').filter(x => x.includes(questionToken) || x.includes(answerToken) || x.includes(answerIdToken));
    if (html.length === 0) return {};

    const [questionRaw, answersRaw] = [html[0], html.slice(1)];
    const answersTextRaw = answersRaw.filter(x => x.includes(answerToken));
    const answersIdRaw = answersRaw.filter(x => x.includes(answerIdToken));

    const question = questionRaw.replace(questionToken, '').replace(divEndToken, '') ?? '?';
    const answers = answersTextRaw.reduce((acc, textRaw, i) => {
        const idRaw = answersIdRaw[i];

        if (!idRaw) return acc;
        const [input, id, name, type, value, end] = idRaw.split(' ');
        return [
            ...acc,
            {
                id: value.replace("value=\"", '').replace("\"", ''),
                answer: textRaw.replace(answerToken, '').replace(spanEndToken, ''),
                scores: [],
            }
        ]
    }, [] as { id: string, answer: string, scores: number[] }[]);
    return {
        id: +number,
        question,
        answers
    };
});

const resultWithValues = questions.map(question => {
    const resultIndex = result.findIndex(x => x.id === question.QuestionNumber)
    if (resultIndex === -1) return;

    result[resultIndex].answers = result[resultIndex].answers?.map(answer => {
        answer.scores = question.PersonalityAnswers?.find(x => x.PossibleAnswerId === +answer.id)?.PersonalityTypeIds ?? [];
        return answer;
    })

    return result[resultIndex];
})

console.log(JSON.stringify(resultWithValues));

/*




<div>
    <div class="question_text">Choose a location.</div>
    <div class="question_guidance">Answers, please choose 1</div>
</div>

    <div id="image_question_answers" class="possible_answers_wrapper">

                    <div class="image_option">
                        <label for="PossibleAnswer__0_"><span class="option_label"></span></label>
                        <div class="image">
                            <div class="checkbox">
                                <input type="radio" name="SelectedAnswers[]" value="190071315" id="PossibleAnswer__0_" />
                                <span class="label__text">
                                    <span class="label__check">
                                        <i class="fa fa-check icon"></i>
                                    </span>
                                </span>
                            </div>
                            <img src="https://img2.uquiz.com/content/images/possible_answer_media_images/1067667_1701976578_f847765f-b4d2-4a2f-bc0b-f7bb32733088.jpg" />
                        </div>
                        <div class="text"></div>
                    </div>
                    <div class="image_option">
                        <label for="PossibleAnswer__1_"><span class="option_label"></span></label>
                        <div class="image">
                            <div class="checkbox">
                                <input type="radio" name="SelectedAnswers[]" value="190071313" id="PossibleAnswer__1_" />
                                <span class="label__text">
                                    <span class="label__check">
                                        <i class="fa fa-check icon"></i>
                                    </span>
                                </span>
                            </div>
                            <img src="https://img2.uquiz.com/content/images/possible_answer_media_images/1067667_1701976171_ec74ba6c-bd13-4438-aa98-3d3e5139bd11.jpg" />
                        </div>
                        <div class="text"></div>
                    </div>
                    <div class="image_option">
                        <label for="PossibleAnswer__2_"><span class="option_label"></span></label>
                        <div class="image">
                            <div class="checkbox">
                                <input type="radio" name="SelectedAnswers[]" value="190071316" id="PossibleAnswer__2_" />
                                <span class="label__text">
                                    <span class="label__check">
                                        <i class="fa fa-check icon"></i>
                                    </span>
                                </span>
                            </div>
                            <img src="https://img2.uquiz.com/content/images/possible_answer_media_images/1067667_1701976764_011f6864-fb1e-4650-8f37-d89096553b09.jpg" />
                        </div>
                        <div class="text"></div>
                    </div>
                    <div class="image_option">
                        <label for="PossibleAnswer__3_"><span class="option_label"></span></label>
                        <div class="image">
                            <div class="checkbox">
                                <input type="radio" name="SelectedAnswers[]" value="190071314" id="PossibleAnswer__3_" />
                                <span class="label__text">
                                    <span class="label__check">
                                        <i class="fa fa-check icon"></i>
                                    </span>
                                </span>
                            </div>
                            <img src="https://img2.uquiz.com/content/images/possible_answer_media_images/1067667_1701976508_35b2d439-c88c-499a-afd9-fbd72d6a0430.jpg" />
                        </div>
                        <div class="text"></div>
                    </div>
                    <div class="image_option">
                        <label for="PossibleAnswer__4_"><span class="option_label"></span></label>
                        <div class="image">
                            <div class="checkbox">
                                <input type="radio" name="SelectedAnswers[]" value="190071309" id="PossibleAnswer__4_" />
                                <span class="label__text">
                                    <span class="label__check">
                                        <i class="fa fa-check icon"></i>
                                    </span>
                                </span>
                            </div>
                            <img src="https://img2.uquiz.com/content/images/possible_answer_media_images/1067667_1701975739_f2902f75-2277-46ee-a6d8-39159c8129bd.jpg" />
                        </div>
                        <div class="text"></div>
                    </div>
                    <div class="image_option">
                        <label for="PossibleAnswer__5_"><span class="option_label"></span></label>
                        <div class="image">
                            <div class="checkbox">
                                <input type="radio" name="SelectedAnswers[]" value="190071308" id="PossibleAnswer__5_" />
                                <span class="label__text">
                                    <span class="label__check">
                                        <i class="fa fa-check icon"></i>
                                    </span>
                                </span>
                            </div>
                            <img src="https://img2.uquiz.com/content/images/possible_answer_media_images/1067667_1701975759_2d837682-5c68-4016-aafd-9cb9e84a0544.jpg" />
                        </div>
                        <div class="text"></div>
                    </div>
                    <div class="image_option">
                        <label for="PossibleAnswer__6_"><span class="option_label"></span></label>
                        <div class="image">
                            <div class="checkbox">
                                <input type="radio" name="SelectedAnswers[]" value="190071310" id="PossibleAnswer__6_" />
                                <span class="label__text">
                                    <span class="label__check">
                                        <i class="fa fa-check icon"></i>
                                    </span>
                                </span>
                            </div>
                            <img src="https://img2.uquiz.com/content/images/possible_answer_media_images/1067667_1701975843_1bf97b17-74f8-442d-b940-0610a91ae69a.jpg" />
                        </div>
                        <div class="text"></div>
                    </div>
                    <div class="image_option">
                        <label for="PossibleAnswer__7_"><span class="option_label"></span></label>
                        <div class="image">
                            <div class="checkbox">
                                <input type="radio" name="SelectedAnswers[]" value="190071312" id="PossibleAnswer__7_" />
                                <span class="label__text">
                                    <span class="label__check">
                                        <i class="fa fa-check icon"></i>
                                    </span>
                                </span>
                            </div>
                            <img src="https://img2.uquiz.com/content/images/possible_answer_media_images/1067667_1701976126_e02656fd-82c8-460d-93fa-65ea8c9e3462.jpg" />
                        </div>
                        <div class="text"></div>
                    </div>
                    <div class="image_option">
                        <label for="PossibleAnswer__8_"><span class="option_label"></span></label>
                        <div class="image">
                            <div class="checkbox">
                                <input type="radio" name="SelectedAnswers[]" value="190071311" id="PossibleAnswer__8_" />
                                <span class="label__text">
                                    <span class="label__check">
                                        <i class="fa fa-check icon"></i>
                                    </span>
                                </span>
                            </div>
                            <img src="https://img2.uquiz.com/content/images/possible_answer_media_images/1067667_1701975941_50a5934e-0c7a-4fe8-824c-24bfe3b44805.jpg" />
                        </div>
                        <div class="text"></div>
                    </div>

    </div>

<input type="hidden" name="QuestionId" value="35329211" />
<input data-val="true" data-val-required="The RandomiseAnswers field is required." id="RandomiseAnswers" name="RandomiseAnswers" type="hidden" value="True" />
*/