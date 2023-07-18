const Watch = require('../models/Watch.js')

exports.create = async (brand,model,image,battery,mechanism,
    price,strap,glass,waterResistance) => {
const watch = await Watch.create({brand,model,image,battery,mechanism,
    price,strap,glass,waterResistance});
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

exports.editOne = async (watchId,data) => {
const watch = await Watch.findByIdAndUpdate(watchId,data,{runValidators:true})
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

exports.getRating = async (watchId) => {
    const watch = await Watch.findById(watchId)
    const sumRating = watch.rating.reduce((a,c) => {
       return a + c.userRating;
    },0);
    const totalUsers = watch.rating.length;
    const averageRating = sumRating / totalUsers || 0
    return averageRating
}