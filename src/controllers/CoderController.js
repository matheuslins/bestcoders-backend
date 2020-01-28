const axios = require('axios');
const Coder = require('../models/Coder')
const parseStringAsArray = require('../utils/parseStringAsArray');
const { findConnections, sendMessage } = require('../websocket')


module.exports = {
async index(request, response){
    const coders = await Coder.find();
    return response.json({
        data: coders
    });
},

async store (request, response) {

    const { github_username, techs, longitude, latitude } = request.body;

    let coder = await Coder.findOne({ github_username });

    if (!coder) {
        const response_gt = await axios.get(
            `https://api.github.com/users/${github_username}`
        )

        const { name = login, avatar_url, bio } = response_gt.data;

        const techsArray = parseStringAsArray(techs);

        const location = {
            type: 'Point',
            coordinates: [longitude, latitude],
        };

        coder = await Coder.create({
            github_username,
            name,
            avatar_url,
            bio,
            techs: techsArray,
            location,
        });

        const sendSocketMessageTo = findConnections(
            { latitude, longitude },
            techsArray,
        )

        sendMessage(sendSocketMessageTo, 'new-coder', coder)
    
        }

        return response.json({
            message: 'Sucesso!',
            data: coder
        });
    }
}