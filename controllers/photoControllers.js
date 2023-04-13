const {
    Photo,
    User
} = require("../models")

class PhotoController{
    static async getPhotos(req, res){
        try {
            const photos = await Photo.findAll()
            
            res.status(200).json(photos)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async getPhotosById(req, res){
        try {
            const {id} = req.params

            const photosById = await Photo.findOne({
                where: {
                    id
                }, 
                include: {
                    model: User
                }
            })

            if (!photosById) {
                throw{
                    code : 404,
                    message : "Data not found !"
                }
            }

            res.status(200).json(photosById)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async createPhoto(req, res){
        try {
            const {
                title,
                caption,
                image_url
            } = req.body

            const result = await Photo.create({
                title,
                caption,
                image_url
            })

            res.status(201).json(result)
        } catch (error) {
            res.status(error)
        }
    }

    static async updatePhotoById(req, res){
        try {
            const { id } = req.params

            // console.log(id);

            const {
                title,
                caption,
                image_url
            } = req.body

            const result = await Photo.update({
                title,
                caption,
                image_url
            }, 
            { 
                where: {
                    id
                }, 
                returning : true
            })


            res.status(201).json(result)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async deletePhotoById(req, res){
        try {
            const { id } = req.params

            const result = await Photo.destroy({
                where : {
                    id
                }
            })

            if (!result) {
                throw{
                    code : 404,
                    message : "Data not found !"
                }
            }
            res.status(201).json(result)
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

module.exports = PhotoController