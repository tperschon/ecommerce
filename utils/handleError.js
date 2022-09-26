module.exports = function handleError(req, res, err) {
    // if there's an error, log it on our side and send the status code to the client
    console.log(err);
    res.sendStatus(500);
};