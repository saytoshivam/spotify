const express = require("express");
const router = express.Router();
const passport = require("passport");
const Playlist = require("../model/Playlist");
const user = require("../models/user");

router.post("/create", async (req,res) =>{
    const currentUser = req.user;
    const {name, thumbnail, songs} = req.body;
    if(!name || !thumbnail || !track){
        return res
        .status(301)
        .json({err:"insufficient details to create playlist."});
    }

    const playListData = {
        name,
        thumbnail,
        songs,
        owner : currentUser._id,
        collaborators :[],
    }
    const playlist = await playlist.create(playlistData);
    return res.status(200).json(playlist);

});
router.get("/get/:playlistId",async (req,res) => {
        const playlistId = req.params.playlistId;
        const playlist = await playlist.findOne({_id:playlistId});

        if(!playlist)
        {
            return res.status(301).json({err:"invalid playlistId"});
        }
        return res.status(200).json(playlist);
});
module.exports = router;

//passport.authenticate("jwt",{session : false})