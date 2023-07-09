const util = require("../config/util");
const ProductSchema = require("../models/Product");
const ImageSchema = require("../models/Image");
const fs = require("fs");

const STATUS_CODE_OK = 200;
const STATUS_CODE_NO_CONTENT = 204;
const STATUS_CODE_DELETE_ACCEPTED = 202;
const STATUS_CODE_ERROR = 400;
const STATUS_CODE_INTERNAL_SERVER_ERROR = 500;

exports.create = async (req, res) => {
    const {type, title, price, category, stock, desc, image1, image2, image3, image4 } = req.body;

    if (util.isEmpty(type) || util.isEmpty(price) || util.isEmpty(title) || util.isEmpty(category) || util.isEmpty(stock) ||
        util.isEmpty(image1) || util.isEmpty(image2) || util.isEmpty(image3) || util.isEmpty(image4)) {
        return res.status(STATUS_CODE_ERROR).send({ message: "Dados insuficientes." });
    }
    const newProduct = new ProductSchema({
        type: type,
        title: title,
        category: category,
        price: price,
        stock: stock,
        desc: desc,
        image1: image1,
        image2: image2,
        image3: image3,
        image4: image4
    });

    try {
        await newProduct.save();

        res.status(STATUS_CODE_OK).json({
            message: "Product salvo com sucesso!",
            product: newProduct
        });
    } catch (error) {
        res.status(STATUS_CODE_INTERNAL_SERVER_ERROR).json({
            message: "Erro ao salvar o produto.",
            error: error
        });
    }
};

exports.remove = async (req, res) => {
    try {
        const product = await ProductSchema.findById(req.params.id);

        if (!product)
            return res.status(STATUS_CODE_NO_CONTENT).send({ message: "Product não encontrado." });

        // product.images.forEach(async (imageId) => {
        //     const image = await ImageSchema.findById(imageId);
        //     try {
        //         fs.unlinkSync(image.src);
        //         image.deleteOne();
        //     } catch (e) {
        //         console.log(e);
        //     }
        // });

        await product.deleteOne();
        res.status(STATUS_CODE_DELETE_ACCEPTED).send({ message: "Product removido com sucesso." });
    } catch (error) {
        res.status(STATUS_CODE_INTERNAL_SERVER_ERROR).send({
            message: "Erro ao remover o product.",
            error: error
        });
    }
};

exports.update = async (req, res) => {
    const {type, title, price, category, stock, desc, image1, image2, image3, image4 } = req.body;

    if (util.isEmpty(type) || util.isEmpty(price) || util.isEmpty(title) || util.isEmpty(category) || util.isEmpty(stock) ||
        util.isEmpty(image1) || util.isEmpty(image2) || util.isEmpty(image3) || util.isEmpty(image4)) {
        return res.status(STATUS_CODE_ERROR).send({ message: "Dados insuficientes." });
    }

    const productToUpdate = {};
    if (!util.isEmpty(type)) productToUpdate.type = type;
    if (!util.isEmpty(title)) productToUpdate.title = title;
    if (!util.isEmpty(category)) productToUpdate.category = category;
    if (!util.isEmpty(price)) productToUpdate.price = price;
    if (!util.isEmpty(stock)) productToUpdate.stock = stock;
    if (!util.isEmpty(desc)) productToUpdate.desc = desc;
    if (!util.isEmpty(image1)) productToUpdate.image1 = image1;
    if (!util.isEmpty(image2)) productToUpdate.image2 = image2;
    if (!util.isEmpty(image3)) productToUpdate.image3 = image3;
    if (!util.isEmpty(image4)) productToUpdate.image4 = image4;

    try {
        await ProductSchema.findByIdAndUpdate(req.params.id, {
            $set: productToUpdate
        });
        res.status(STATUS_CODE_OK).send({ message: "Produto atualizado com sucesso." });
    } catch (error) {
        res.status(STATUS_CODE_ERROR).send({
            message: "Erro ao atualizar o produto.",
            error: error,
            data: productToUpdate
        });
    }
};

exports.findAll = async (req, res) => {
    try {
        const data = await ProductSchema.find();
        res.status(STATUS_CODE_OK).send(data);
    } catch (error) {
        res.status(STATUS_CODE_ERROR).send({
            message: "Erro ao buscar os itens.",
            error: error
        });
    }
};

// exports.findAllToCard = async (req, res) => {
//     try {
//         const data = await ProductSchema.find();
//         const cardItens = [];
//         for (let i = 0; i < data.length; i++) {
//             let product = data[i];
//             if (product.images.length <= 0) {
//                 product.mainImage = null;
//                 cardItens.push({ image: null, product: product });
//             } else {
//                 const mainImage = await ImageSchema.findById(product.images[0]._id);
//                 if (mainImage !== null) {
//                     cardItens.push({ image: mainImage.src, product: product });
//                 } else {
//                     cardItens.push({ image: null, product: product });
//                 }
//             }
//         }
//         res.status(STATUS_CODE_OK).send({ message: "Itens buscados com sucesso", cardItens: cardItens });
//     } catch (error) {
//         console.log(error);
//         res.status(STATUS_CODE_ERROR).send({
//             message: "Erro ao buscar os itens.",
//             error: error
//         });
//     }
// };

exports.getProductById = async (req, res) => {
    try {

        const data = await ProductSchema.findById(req.params.id);
        res.status(STATUS_CODE_OK).send({ message: "Product buscado com sucesso!", product: data });
    } catch (error) {
        res.status(STATUS_CODE_ERROR).send({
            message: "Erro ao buscar os itens.",
            error: error
        });
    }
};

exports.clearProducts = async (req, res) => {
    try {
        const data = await ProductSchema.find();
        data.forEach(async (product) => await product.deleteOne());
        res.status(STATUS_CODE_OK).send({ message: "Todos os itens foram apagados." });
    } catch (error) {
        res.status(STATUS_CODE_ERROR).send({
            message: "Erro ao buscar os itens.",
            error: error
        });
    }
};

exports.updateImage = async (req, res) => {
    const { idProduct, idImages } = req.body;
    let product = await ProductSchema.findById(idProduct);

    if (product === null)
        res.status(STATUS_CODE_ERROR).send({ message: "Não foi possível achar o product!" });

    try {
        let newImages = [];
        for (let i = 0; i < idImages.length; i++) {
            const newImage = await ImageSchema.findById(idImages[i]);
            if (newImage === null) {
                return res.status(STATUS_CODE_ERROR).send({ message: `Não foi possível achar a nova imagem no index ${i}` });
            }
            newImages.push(newImage._id);
        }
        await ProductSchema.findByIdAndUpdate(idProduct, {
            images: product.images.concat(newImages)
        })

        res.status(STATUS_CODE_OK).send({ message: "Imagens linkadas com o usuário com sucesso!", images: newImages });
    } catch (e) {
        res.status(STATUS_CODE_ERROR).send({ message: "Não foi possível achar a nova imagem" });
    }
};

const asyncFilter = async (arr, predicate) => {
    const results = await Promise.all(arr.map(predicate));

    return arr.filter((_v, index) => results[index]);
}

// exports.deleteImage = async (req, res) => {
//     const { idProduct, idImage } = req.body;
//     let product = await ProductSchema.findById(idProduct);

//     if (product === null)
//         return res.status(STATUS_CODE_ERROR).send({ message: "Não foi possível achar o product!" });

//     try {
//         const imageToDelete = await ImageSchema.findById(idImage);
//         if (imageToDelete === null) {
//             return res.status(STATUS_CODE_ERROR).send({ message: `Não foi possível achar a imagem` });
//         }

//         try {
//             fs.unlinkSync(imageToDelete.src);
//         } catch (e) {
//             console.log(e);
//         }
//         imageToDelete.deleteOne();

//         let newImages = await asyncFilter(product.images, (image) => String(image) !== String(imageToDelete._id));

//         await product.updateOne({ images: newImages });

//         res.status(STATUS_CODE_OK).send({ message: "Imagem deletada com sucesso!", image: idImage });
//     } catch (e) {
//         res.status(STATUS_CODE_ERROR).send({ message: "Não foi possível achar a imagem" });
//     }
// };

exports.buyProducts = async (req, res) => {
    const { itensToBuy } = req.body;
    if (util.isEmpty(itensToBuy) || Object.keys(itensToBuy).length <= 0)
        return res.status(STATUS_CODE_ERROR).send({ message: "Dados insuficientes." });

    let message = "";

    for (let idProduct of Object.keys(itensToBuy)) {
        const amount = Number(itensToBuy[idProduct]);
        const product = await ProductSchema.findById(idProduct);
        if (product === null || amount === null) {
            res.status(STATUS_CODE_ERROR).send({ message: "Não foi possível comprar o product de id: " + idProduct + " com a qtd: " + amount });
            return;
        }

        if (Number(product.stock) < amount) {
            res.status(STATUS_CODE_ERROR).send({ message: "Não foi possível comprar o product de id: " + idProduct + " com a qtd: " + amount + " com o stoque de " + product.stock });
            return;
        }

        const newStock = Number(product.stock) - amount;
        const newSold = Number(product.sold) + amount;

        await product.updateOne({
            stock: newStock,
            sold: newSold
        });
        message += "O product " + product.name + " foi comprado com sucesso";
    }


    res.status(STATUS_CODE_OK).send({ message: message });
};