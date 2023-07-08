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

exports.rate = async (userId,watchId,userRating) => {

    const watch = await Watch.findById(watchId)

    const alreadyRate = watch.rating.find((w) => w.userId == userId)

    if(alreadyRate) {
        throw new Error('User already rate')
    }

    const updatedRating = await Watch.findOneAndUpdate(
        { _id:watchId },
        { $push: { rating: { userId,userRating } } },
        { new: true }
      );
    
      if (!updatedRating) {
        throw new Error('Invalid watch');
      }
    
      return updatedRating;

}