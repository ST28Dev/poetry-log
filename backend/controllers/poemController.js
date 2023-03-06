const mongoose = require("mongoose")

const PoemModel = require("../models/Poem")
const UserModel = require("../models/User")

const getPoems = async(req,res) =>{
    const {_id} = req.user
    const poems = await PoemModel.find({
        author: _id
    })

    res.status(200).json(poems)
}

const addPoem = async(req,res) =>{
    const {title,text} = req.body

    if(!text){
        res.status(400).json({message: "Missing poem text. Add some text!"})
    }
    else{
        const poem = await PoemModel.create({
            author: req.user._id,
            author_username: req.user.username,
            title: title ? title : "Untitled",
            text,
            visibility: "private"
        })

        return res.status(200).json(poem)
    }
}

const updatePoem = async (req,res)=>{
    const {id} = req.params

    const poem = await PoemModel.findOne({_id: id})

    if(!poem){
        return res.status(404).json({message: "Poem not found"})
    }

    if(poem.author.toString() !== req.user._id.toString()){
        return res.status(401).json({message: "User not authorized"})
    }


    const update = await PoemModel.findByIdAndUpdate(id,req.body, {new: true})

    res.status(200).json(update)
}

const deletePoem = async(req,res)=>{
    const {id} = req.params

    const poem = await PoemModel.findOne({_id: id})

    if(!poem){
        return res.status(404).json({message: "Poem not found"})
    }

    if(poem.author.toString() !== req.user._id.toString()){
        return res.status(401).json({message: "Not authorized"})
    }

    //if the user is authorized to perform op
    const removed = await PoemModel.findByIdAndDelete(id)

    res.status(200).json(removed)

}

const toggleVisibility = async(req,res)=>{
    const {_id} = req.body

    const poem = await PoemModel.findOne({_id})

    if(!poem){
        return res.status(404).json({message: "Poem not found"})
    }

    if(poem.author.toString() !== req.user._id.toString()){
        return res.status(401).json({message: "Not authorized"})
    }

    const updated = await PoemModel.findByIdAndUpdate(_id,{
        visibility: poem.visibility === "private" ? "public" : "private"
    },{
        new: true
    })

    res.status(200).json(updated)
}

const getPublicPoems = async(req,res)=>{
    const poems = await PoemModel.find({visibility: "public"})

    res.status(200).json(poems)
}

module.exports = {
    getPoems,addPoem,updatePoem,deletePoem,toggleVisibility,getPublicPoems
}