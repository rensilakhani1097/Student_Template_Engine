const router = require("express").Router();
const multer = require("multer");
const path = require("path")
const Student = require("../models/studentmodel");
const body_parser = require("body-parser");
router.use(body_parser.json())
router.use(body_parser.urlencoded({
    extended: true
}));

var Storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads/");
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, file.filename + "_" + Date.now() + path.extname(file.originalname));
    }
})

var upload = multer({
    storage: Storage
});

router.get("/", (req, res) => {

    Student.find((err, books) => {
        if (!err) {
            res.render("index", { books: books });
        }
        else {
            console.log('Failed to retrieve the Course List: ' + err);
        }
    });

})
router.get("/add", (req, res) => {
    res.render("add");
})
router.post("/add", upload.single('file'), async (req, res) => {
    try {
        var num1 = parseInt(req.body.m1);
        var num2 = parseInt(req.body.m2);
        var num3 = parseInt(req.body.m3);
        const total = num1 + num2 + num3;
        const per = total / 3;
        var student1 = new Student({
            name: req.body.name,
            email: req.body.email,
            course: req.body.course,
            phone: req.body.phone,
            image: req.file.filename,
            m1: req.body.m1,
            m2: req.body.m2,
            m3: req.body.m3,
            total: total,
            per: per
        })
        const submitstud = await student1.save();
        res.status(200).redirect("/");
    }
    catch (e) {
        res.status(401).send(e);
    }

})
router.get("/delete/:id", (req, res) => {
    Student.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect("/");
        } else {
            console.log("An Error Occured During Delete");
        }
    })
})
router.get("/show/:id", (req, res) => {
    if (req.cookies['AuthToken']) {
        Student.findOne({ _id: req.params.id }).then((result) => {
            res.render("Marksheet", { stud: result });
        }).catch((err) => {
            console.log(err)
        });
    }else{
        res.render("index",{msg:"Login Required"})
    }

    // console.log(data);
})
router.get("/update/:id", (req, res) => {
    Student.findOne({ _id: req.params.id }).then((result) => {
        res.render("update", { stud: result });
    }).catch((err) => {
        console.log(err)
    });
})
router.post("/update", async (req, res) => {
    try {
        // console.log(req.body._id);
        const submitstud = await Student.updateOne({ _id: req.body._id }, req.body, { new: true })
        res.status(200).redirect("/");
    }
    catch (e) {
        res.status(401).send(e);
    }
})

module.exports = router;