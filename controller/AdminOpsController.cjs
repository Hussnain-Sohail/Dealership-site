const cloudinary = require('cloudinary').v2;
const path = require('path');
require('dotenv').config({ path: '../server/.env' });
const User = require('../model/UserSchema.cjs');
const Bike = require('../model/BikeSchema.cjs');
const bcrypt = require('bcryptjs');
const { json } = require('stream/consumers');
const z = require('zod');

const bikeData = z.object({
    companyName: z.string(),
    bikeName: z.string(),
    topSpeed: z.number(),
    horsePower: z.number(),
    engine: z.string(),
    unitsAvailable: z.number(),
    imagePath: z.string(),
})

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

async function AdminCheck(user) {
    try {
        return user.Role === 'admin';
    }
    catch (error) {
        console.error(error);
        return false;
    }
}
async function AddNewBike(req, res) {
    try {
        validData = bikeData.safeParse(req.body);

        if (!validData.success) {
            return res.status(400).json({ message: validData.error.issues[0].message });
        }

        const findUser = await User.findOne({ Name: req.user.Name });
        if (!findUser)
            return res.status(403).json({ message: 'User not found. Access denied' });
        else if (!(await AdminCheck(findUser)))
            return res.status(403).json({ message: 'Access denied only admin can add or remove a bike' });

        const checkDuplicateBike = await Bike.findOne({ Company: bikeData.data.companyName, Name: bikeData.data.bikeName });
        if (checkDuplicateBike)
            return res.status(401).json({ message: 'Bike already exists' });

        const uploaded = await cloudinary.uploader.upload(bikeData.data.imagePath);

        const NewBike = new Bike({
            Company: bikeData.data.companyName,
            Name: bikeData.data.bikeName,
            TopSpeed: bikeData.data.topSpeed,
            Price: bikeData.data.price,
            HorsePower: bikeData.data.horsePower,
            Engine: bikeData.data.engine,
            UnitsAvailable: bikeData.data.unitsAvailable,
            Image_Public_id: uploaded.public_id,
            Image_Secure_URL: uploaded.secure_url
        });

        await NewBike.save();

        return res.status(200).json({ message: 'Bike addedd successfully and bike image uploaded to cloud' });
    }
    catch (error) {
        console.error(error);
        await cloudinary.uploader.destroy(uploaded.public_id);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

async function RemoveBike(req, res) {
    try {
        const userName = req.body.Name;
        const { companyName, bikeName } = req.body;
        if (!companyName || !bikeName)
            return res.status(401).json({ message: 'All credentials are required for removing bike' });

        const findUser = await User.findOne({ Name: userName });

        if (!findUser) {
            return res.status(403).json({ message: "User not found access forbidden" });
        }
        else if (!AdminCheck(findUser)) {
            return res.status(403).json({ message: "User role is not admin access forbidden" });
        }

        const findBike = await Bike.findOne({ Company: companyName, Name: bikeName });
        if (!findBike) {
            return res.staus(401).json({ message: 'Bike not found' });
        }

        const Image_Public_id = findBike.Image_Public_id;

        await cloudinary.uploader.destroy(Image_Public_id);

        await Bike.findByIdAndDelete(findBike._id);

        return res.status(200).json({ message: 'Bike removed successfully' });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
module.exports = { AddNewBike, RemoveBike };            