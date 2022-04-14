export class Question {
    id: number;
    question_id: string;
    diagram_id: number;
    question: string;
    question_type: boolean;
    expected: boolean;
    unit: string;
    interval_min: string;
    interval_max: string;
    leaf_solution: string;
    image_link: string;
    video_link: string;
    image_link_suggestion: string;
    video_link_suggestion: string;
}