const Category = require('../models/Category')
const Position = require('../models/Position')
const errorHandler = require('../utils/errorHandler')
const deleteFile = require('../utils/deleteFile')

module.exports.getAll = async (req, res) => {
    try {
        const categories = await Category.find({
            user: req.user.id
        })
        res.status(200).json(categories)
    } catch (e) {
        errorHandler( res, e)
    }
    
}

module.exports.getById = async (req, res) => {
     try {
        const category = await Category.findById(req.params.id)
        res.status(200).json(category)
    } catch (e) {
        errorHandler( res, e)
    }
}

module.exports.remove = async (req, res) => {
    try {
        const result = await Category.findByIdAndRemove({_id: req.params.id})
        await Position.remove({category: req.params.id})
        if (result.imageSrc) {
            await deleteFile(result.imageSrc)
        }
        res.status(200).json({
           message: 'Категория и все ее позиции удалены'
        })
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.create = async (req, res) => {
    console.log(req.user)
    
    const category = new Category({
        name: req.body.name,
        user: req.user.id,
        imageSrc: req.file ? req.file.path : ''
    })
    
    try {
        await category.save()
        res.status(201).json(category)
    } catch (e) {
        errorHandler( res, e)
    }
}

module.exports.update = async (req, res) => {
    const updated = {
        name: req.body.name
    }

    if(req.file) {
        updated.imageSrc = req.file.path
    }
    try {
        const category = await Category.findOneAndUpdate(
            {_id: req.params.id},
            {$set: updated},
            {new: true}
        )
        res.status(200).json(category)
    } catch (e) {
        errorHandler( res, e)
    }
}

