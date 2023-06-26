const Watch = require('../models/Watch.js')

exports.create = async (brand,model,image,battery,mechanism,
    price,quantity,owner) => {
const watch = await Watch.create({brand,model,image,battery,mechanism,
    price,quantity,owner});
    return watch;
}