import express from "express";

import {
    getAllRequestsToSpeak,
    createRequestToSpeak,
    getRequestToSpeakById,
    updateRequestToSpeak
} from "../controllers/requesttospeak.js"

const router = express.Router();

router.get('/', getAllRequestsToSpeak);
router.get('/:id', getRequestToSpeakById);
router.post('/', createRequestToSpeak);
router.patch('/:id', updateRequestToSpeak);

export default router;