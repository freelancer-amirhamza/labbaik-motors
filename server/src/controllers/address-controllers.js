const Address = require("../models/address-model");
const UserModal = require("../models/user-model");


const addAddress = async (req, res) => {
    try {
        const userId = req.userId;
        const { addressLine, city, state, pinCode, phone, country } = req.body;
        const newAddress = new Address({ addressLine, city, state, pinCode, phone, country, userId });
        const saveAddress = await newAddress.save();

        const addUserAddressId = await UserModal.findByIdAndUpdate(userId, {
            $push: {
                address_details: saveAddress._id
            }
        })

        return res.status(200).json({
            success: true,
            error: false,
            message: "The Address Created Successfully!",
            data: saveAddress,
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: error.message || "Internal server error!",
        })
    }
}
const getAddress = async (req, res) => {
    try {
        const userId = req.userId;
        const address = await Address.find({ userId: userId }).sort({ createdAt: -1 });
        return res.status(200).json({
            success: true,
            error: false,
            message: "Address found successfully!",
            data: address,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: error.message || "Internal server error!",
        })
    }
}
const updateAddress = async (req, res) => {
    try {
        const userId = req.userId;
        const { _id, addressLine, city, state, country, phone, pinCode } = req.body;
        const updateAddress = await Address.updateOne({ _id: _id, userId: userId },
            {
                addressLine,
                city,
                state,
                country,
                phone, pinCode
            }
        )
        return res.status(200).json({
            success: true,
            error: false,
            message : "The Address updated successfully!",
            data: updateAddress
        })
    } catch (error) {
        return res.status(500).json({
            success: true,
            error: true,
            message: error.message || "Internal server error!"
        })
    }
}
const deleteAddress = async (req,res)=>{
    try {
        const {_id} = req.body;
    const userId = req.userId;
    if(!_id){
        return res.status(400).json({
            success: false,
            error: true,
            message: "Provide the address id!",
        })
    }
    const deleteAddress = await Address.deleteOne({_id:_id, userId:userId})
    return res.status(200).json({
        success: true,
        error: false,
        message: "The Address deleted successfully!",
        data: deleteAddress,
    })
    } catch (error) {
        return res.status(500).json({ 
            success: false,
            error: true,  
            message: error.message || "Internal server error!"
        })
    }
}


module.exports = { addAddress, getAddress, updateAddress, deleteAddress }