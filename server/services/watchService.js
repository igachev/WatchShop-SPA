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

exports.deleteOne = async (watchId) => {
   const watch = await Watch.findByIdAndDelete(watchId)
   return watch
}

exports.searchByBrand = async (brand) => {
    let watches = Watch.find({})

    if(brand) {
        const regex = new RegExp(brand,'i')
        watches = watches.where('brand',regex)
    }

    return watches
}

