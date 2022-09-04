import RequestToSpeak from "../models/requesttospeakModel.js";

export const getAllRequestsToSpeak = async ( req, res ) => {
    try {
        const requeststospeak = await RequestToSpeak.findAll({
            where: {
                state: "active"
            }
        });
        res.json(requeststospeak);
    } catch (error) {
        res.json({ 
            message: error.message
        });
    }
}

export const getAllActiveNewRequestsToSpeak = async ( req, res ) => {
    try {
        const requeststospeak = await RequestToSpeak.findAll({
            where: {
                state: ["new", "active", "responding"],
                request: "new"
            }
        });
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

export const getResponsesById = async ( req, res ) => {
    console.log(req.params.id);
    try{
        const responses = await RequestToSpeak.findAll({
            where: {
                request: req.params.id,
                state: ["new", "active"]
            }
        });
        res.json(responses);
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

export const cancelRequestToSpeak = async (req, res) => {
    try {
        const canceledRequest = await RequestToSpeak.findAll({
            where: {
                id: req.params.id
            }
        });

        if(canceledRequest[0].request == "new") {
            const responses = await RequestToSpeak.findAll({
                where: {
                    request: req.params.id
                }
            });

            if(responses.length > 0) {
                responses.forEach(async response => {
                    console.log(response.id);
                    await RequestToSpeak.update({ state: "canceled"}, {
                        where: {
                            id: response.id
                        }
                    });
                });
                await RequestToSpeak.update({ state: "canceled"}, {
                    where: {
                        id: req.params.id
                    }
                });
            } else {
                await RequestToSpeak.update({ state: "canceled"}, {
                    where: {
                        id: req.params.id
                    }
                });
            }
        } else {
            await RequestToSpeak.update({ state: "canceled"}, {
                where: {
                    id: req.params.id
                }
            });
        }
        
        res.json({
            "message": "Request updated"
        })
    } catch (error) {
        res.json({
            message: error.message
        });
    }
}

export const activateNextRequest = async (req, res) => {
    try {
        const activerequest = await RequestToSpeak.findAll({
            where: {
                state: "active",
            }
        });

        if(activerequest.length == 0) {
            await activateFirstNewRequest();
        } else if(activerequest.length == 1) {
            if(activerequest[0].request == "new") {
                const responses = await RequestToSpeak.findAll({
                    where: {
                        request: activerequest[0].id,
                        state: "new"
                    }
                });
                if(responses.length > 0) {
                    await RequestToSpeak.update({ state: "responding"}, {
                        where: {
                            id: activerequest[0].id
                        }
                    });
                    activateFirstNewResponse(activerequest[0].id)
                } else {
                    await RequestToSpeak.update({ state: "done"}, {
                        where: {
                            id: activerequest[0].id
                        }
                    });
                    await activateFirstNewRequest();
                }
            } else {
                const responses = await RequestToSpeak.findAll({
                    where: {
                        request: activerequest[0].request,
                        state: "new"
                    }
                });

                await RequestToSpeak.update({ state: "done"}, {
                    where: {
                        id: activerequest[0].id
                    }
                });
                if(responses.length == 0) {
                    await RequestToSpeak.update({ state: "done"}, {
                        where: {
                            id: activerequest[0].request
                        }
                    });
                    await activateFirstNewRequest();
                } else {
                    await activateFirstNewResponse(activerequest[0].request);
                }
            }
        }




        res.json(requeststospeak);
    } catch (error) {
        res.json({ 
            message: error.message
        });
    }
}

const activateFirstNewRequest = async () => {
    const newrequests = await RequestToSpeak.findAll({
        where: {
            state: "new",
        }
    });
    if(newrequests.length > 0) {
        await RequestToSpeak.update({ state: "active"}, {
            where: {
                id: newrequests[0].id
            }
        });
    } else {
        console.log("Error: No new requests found");
    }
}

const activateFirstNewResponse = async (reqid) => {
    const newrequests = await RequestToSpeak.findAll({
        where: {
            request: reqid,
            state: "new"
        }
    });
    if(newrequests.length > 0) {
        await RequestToSpeak.update({ state: "active"}, {
            where: {
                id: newrequests[0].id
            }
        });
    } else {
        console.log("Error: No new requests found");
    }
}