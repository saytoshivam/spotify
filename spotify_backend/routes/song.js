const express = require("express");
const router = express.Router();
const passport = require("passport");
const Song = require("../model/Song");
const User = require("../model/User");

router.post("/create", async (req,res) =>{
    const {name, thumbnail, track} = req.body;
    if(!name || !thumbnail || !track){
        return res
        .status(301)
        .json({err:"insufficient details to create song."});
    }
    const artist = req.user._id;
    const songDetails = {name, thumbnail, track, artist};
    const createSong = await Song.create(songDetails);
    return res.status(200).json(createSong);

});
router.get("/get/mysongs",async (req,res) => {
        const currentuser = req.user;
        const songs = await Song.find({artist : req.user._id});
        return res.status(200).json({data : songs});
});
router.get("/get/artist",async (req,res) =>{
        const {artistId} = req.body;
        const artist = await User.find({_id : artistId});
        if(!artist){
            return res.status(301).json({err : "artist does not exist"});
        }
        const songs = await Song.find({artist : artistId});
        return res.status(200).json({data : songs});
    });

    router.get("/get/songname",async (req,res) =>{
        const {songname} = req.body;
        const songs = await User.find({ name:songname });
        if(!songs){
            return res.status(301).json({err : "song does not exist"});
        }
        return res.status(200).json({data : songs});
    });

module.exports = router;

//passport.authenticate("jwt",{session : false})