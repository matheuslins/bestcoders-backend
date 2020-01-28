const Coder = require('../models/Coder');
const parseStringAsArray = require('../utils/parseStringAsArray');


module.exports = {
    async index(request, response){
        const {latitude, longitude, techs} = request.query;

        const techsArray = parseStringAsArray(techs);

        const coder = await Coder.find({
            techs: {
                $in: techsArray,
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: 10000
                }
            }
        }) 
        return response.json({
            data: coder
        })
    }
}