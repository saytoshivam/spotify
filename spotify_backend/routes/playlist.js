const express = require("express");
const router = express.Router();
const passport = require("passport");
const Playlist = require("../model/Playlist");
const User = require("../models/user");
const Song = require("../model/Song");

router.post("/create", async (req, res) => {
    const currentUser = req.user;
    const { name, thumbnail, songs } = req.body;
    if (!name || !thumbnail || !track) {
        return res
            .status(301)
            .json({ err: "insufficient details to create playlist." });
    }

    const playListData = {
        name,
        thumbnail,
        songs,
        owner: currentUser._id,
        collaborators: [],
    }
    const playlist = await playlist.create(playlistData);
    return res.status(200).json(playlist);

});
router.get("/get/playlist/:playlistId", async (req, res) => {
    const playlistId = req.params.playlistId;
    const playlist = await playlist.findOne({ _id: playlistId });

    if (!playlist) {
        return res.status(301).json({ err: "invalid playlistId" });
    }
    return res.status(200).json(playlist);
});

router.get("/get/artist/:artistId", async (req, res) => {
    const artistId = req.params.artistId;

    const artist = await UserActivation.findOne({ _id: artistId });
    if (!artist) {
        return res.status(304).json({ err: "Invalid ArtistId" });
    }

    const playlists = await Playlist.find({ owner: artistId });
    return res.status(200).json({ data: playlists });
});

router.post("/add/song", async (req, res) => {
    const currentUser = req.user;
    const { playlistId, songId } = req.body();
    const playlist = await Playlist.findOne({ _id: playlistId });
    if (!playlist) {
        return res.status(304).json({ err: "Playlist doesnot exist" });
    }

    if (playlist.owner != currentUser._id && !playlist.collaborators.includes(currentUser._id)) {
        return res.status(400).json({ err: "Not allowed" });
    }

    const song = await Song.findOne({ _id: songId });

    if (!song) {
        return res.status(304).json({ err: "song does not exist" });
    }
    playlist.songs.push(songId);
    await playlist.save();
    return res.status(200).json(playlist);

});
module.exports = router;

//passport.authenticate("jwt",{session : false})