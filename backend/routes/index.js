import express from "express";

import {
    getAllRequestsToSpeak,
    getAllActiveNewRequestsToSpeak,
    createRequestToSpeak,
    getRequestToSpeakById,
    getResponsesById,
    updateRequestToSpeak,
    cancelRequestToSpeak,
    activateNextRequest
} from "../controllers/requesttospeak.js"

const router = express.Router();

router.get('/', getAllRequestsToSpeak);
router.get('/activenew/', getAllActiveNewRequestsToSpeak);
router.get('/:id', getRequestToSpeakById);
router.get('/responses/:id', getResponsesById);
router.post('/', createRequestToSpeak);
router.post('/next', activateNextRequest);
router.patch('/:id', updateRequestToSpeak);
router.patch('/cancel/:id', cancelRequestToSpeak);


export default router;