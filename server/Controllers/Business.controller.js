const BusinessSchema = require('../Models/BusinessInfor.model')
const fs = require('fs')
const createError = require('http-errors')
module.exports = {
    post: async (req, res, next) => {
        try {
            const { link, title} = req.body;
            // console.log(req.file);
            const img = req.file.path
            console.log(img);
            const newInfo = new BusinessSchema({    
                link: link,
                title: title,
                image: img
            })

            const savedInfo = await newInfo.save()

            return res.status(200).json({
                savedInfo
            })
        } catch (error) {
            console.log(error);
        }
    },

    getAllBussiness: async(req, res, next) => {
        try {
            const result = await BusinessSchema.find()
            if(!result){
                createError.NotFound()
            }
            res.status(200).json({
                result
            })
        } catch (error) {
            
        }
    }

}