import {body} from "express-validator";

export const commentRules = [
    body("content").notEmpty().escape().isLength({min: 4, max: 200}),
]