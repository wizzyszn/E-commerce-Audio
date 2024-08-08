const Product = require("../models/product");
const { rawListeners } = require("../models/user");

//create a product
module.exports.createProduct = async(req,res) =>{
    const {name, description, price, imageURL, category, brand, stockQuantity,createdBy,ratings,weight,dimensions,color,size} = req.body;
    if(!name||!description||!imageURL||!category||!price||!stockQuantity||!createdBy||!brand){
        return res.status(400).json({message : "Provide all required details"});
    }
    const sku = `${category.substring(0, 4).toUpperCase()}-${brand.substring(0, 3).toUpperCase()}-${Date.now()}`;
try{
    const response = await Product.create({
        name,
        description,
        price,
        imageURL,
        category,
        brand,
        stockQuantity,
        sku,
        createdBy,
        ratings,
        weight,
        dimensions,
        color,
        size
    });
    res.status(201).json(response);
}catch(err){
    res.status(500).json({message : err.message})
}
}
//fetch all products
module.exports.getProducts = async(req,res) =>{
    try{
    const response =await Product.find().select("name price _id imageURL category sku ratings stockQuantity")
    if(response.length < 1) return res.status(400).json({message : "No products to be listed at this time please check back later"});
    res.status(200).json(response);
    }catch(err){
        res.status(500).json(err.message)
    }
}

//get a particular product
module.exports.getProduct = async(req,res) =>{
    const {id} = req.params;
    try{
        const response = await Product.findById(id);
        if(!response) return res.status(400).json({message : "product not found"});
        const data = await response.populate('createdBy')
        res.status(200).json(data)
    }catch(err){
        res.status(200).json({message : err.message});
        console.log(err.message)
    }
}