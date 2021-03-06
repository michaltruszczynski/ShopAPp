const express = require('express');
const router = express.Router();
const { Product } = require("../models/Product");
const multer = require('multer');

const { auth } = require("../middleware/auth");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log(file)
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.jpg' || ext !== '.png' || ext !== '.jpeg') {
            return cb(res.status(400).end('only jpg, jpeg, png are allowed'), false);
        }
        cb(null, true)
    }
});

const upload = multer({ storage: storage }).single("file")

//=================================
//             Product
//=================================

router.post('/uploadImage', auth, (req, res, next) => {
    upload(req, res, err => {
        console.log(req.file);
        console.log(err)
        if (err) {
            return res.json({ success: false, err })
        }
        return res.json({ success: true, image: res.req.file.path.replace('\\', '/'), fileName: res.req.file.filename })
    })
})

router.post('/uploadProduct', auth, (req, res, next) => {
    const product = new Product(req.body);

    product.save((err) => {
        if (err) return res.status(400).json({ success: false, err });
        return res.status(200).json({ success: true });
    });

});

router.post('/getProducts', auth, (req, res, next) => {


    let order = req.body.order ? req.body.order : 'desc';
    let sortBy = req.body.sortBy ? req.body.sortBy : '_id';
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);


        Product.find()
            .populate('writer')
            .sort([[sortBy, order]])
            .skip(skip)
            .limit(limit)
            .then(products => {
                res.status(200).json({ success: true, products, postSize: products.length })
            })
            .catch(err => {
                res.status(400).json({ success: false, err })
            })
})


module.exports = router;
