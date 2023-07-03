const Watch = require('../models/Watch.js')

exports.create = async (brand,model,image,battery,mechanism,
    price,quantity) => {
const watch = await Watch.create({brand,model,image,battery,mechanism,
    price,quantity});
    return watch;
}

exports.getAll = async () => {
const watches = await Watch.find({})
return watches
}

exports.getOne = async (watchId) => {
    const watch = await Watch.findById(watchId)
    return watch
}