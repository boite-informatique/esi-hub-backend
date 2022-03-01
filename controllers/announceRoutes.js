const asyncHandler = require('express-async-handler')
const User = require('../models/userModel');
const Announcement = require('../models/announceModel');

const getAnnouncement = asyncHandler(async (req, res) => {
    
})

const createAnnouncement = asyncHandler(async (req,res) => {
    const {userId, text, tags} = req.body;

    // create and save announcement
    const announcementObj = await Announcement.create({
        user : userId,
        text,
        tags
    })

    res.json(announcementObj);
})

const updateAnnouncement = asyncHandler(async (req, res) => {
    const {user, text, tags} = req.body;
    const announcementID = req.params.id;

    // search for the announcement

    const announcement = Announcement.findOne({_id : user._id});
    
    if (!announcement) {
        throw new Error(`Announcement doesn't exist`);
    }

    //search if announcement matches the user

    if (announcement._id === user._id || !user.roles.includes('admin')) {
        throw new Error(`Unauthorized, you can't change this announcement`);
    }

    // updating the announcement

    announcement.text = text ? text : announcement.text;
    announcement.tags = tags ? tags : announcement.tags;

    await announcement.save();

    res.json(announcement);
})

const deleteAnnouncement = asyncHandler(async (req, res) => {
    const {user, text, tags} = req.body;
    const announcementID = req.params.id;

    // search for the announcement

    const announcement = Announcement.findOne({_id : user._id});
    
    if (!announcement) {
        throw new Error(`Announcement doesn't exist`);
    }

    //search if announcement matches the user

    if (announcement._id === user._id || !user.roles.includes('admin')) {
        throw new Error(`Unauthorized, you can't change this announcement`);
    }

    // deleting the announcement

    await announcement.remove();

    res.json({"status" : "success"});

})
module.exports = {
    createAnnouncement,
    updateAnnouncement,
    deleteAnnouncement
}