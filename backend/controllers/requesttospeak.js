import RequestToSpeak from "../models/requesttospeakModel.js";

export const getAllRequestsToSpeak = async ( req, res ) => {
    try {
        const requeststospeak = await RequestToSpeak.findAll();
        res.json(requeststospeak);
    } catch (error) {
        res.json({ 
            message: error.message
        });
    }
}

export const getRequestToSpeakById = async ( req, res ) => {
    try{
        const requesttospeak = await RequestToSpeak.findAll({
            where: {
                id: req.params.id
            }
        });
        res.json(requesttospeak[0]);
    } catch(error) {
        res.json({
            message: error.message
        });
    }
}

export const createRequestToSpeak = async (req, res) => {
    try {
        await RequestToSpeak.create(req.body);
        res.json({
            "message": "Request created"
        });
    } catch (error) {
        res.json({
            message: error.message
        });
    }
}

export const updateRequestToSpeak = async (req, res) => {
    try {
        await RequestToSpeak.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "Request updated"
        })
    } catch (error) {
        res.json({
            message: error.message
        });
    }
}