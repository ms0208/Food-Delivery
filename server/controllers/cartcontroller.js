import userModel from "../models/usermodel.js";

// add items to user cart
const addToCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cardData = await userData.cardData;
        if (!cardData[req.body.itemId]) {
            cardData[req.body.itemId] = 1
        }
        else {
            cardData[req.body.itemId] += 1
        }
        await userModel.findByIdAndUpdate(req.body.userId, { cardData });
        res.json({ success: true, message: "Added to Cart" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error in Add to Cart" });
    }
}

// remove items from user cart
const removefromCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cardData = await userData.cardData;
        if (cardData[req.body.itemId] > 0) {
            cardData[req.body.itemId] -= 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cardData});
        res.json({ success: true, message: "remove Cart" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error in remove from Cart" });
    }
}

//fetch user cart data
const getCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        if (!userData) {
            console.log("User not found");
            return res.status(404).json({ success: false, message: "User not found" });
        }

        let cardData = userData.cardData;
        console.log("Card Data:", cardData); // Log cardData to verify

        if (!cardData) {
            return res.status(400).json({ success: false, message: "No cart data available" });
        }
        res.json({success:true,cardData})
    }catch(error) {
        console.log(error);
        res.json({ success: false, message: "Error in get a Cart" });
    }
}

export { addToCart, removefromCart, getCart };