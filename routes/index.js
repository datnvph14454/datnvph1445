var express = require('express');
var router = express.Router();

var db = 'mongodb+srv://nvdatqaz:Nvdat25092002@cluster0.6pgjw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const mongoose = require('mongoose');
const {Schema} = mongoose;
mongoose.connect(db).catch(error => {
    if (error) {
        console.log("co loi xay ra" + error.message)
    }
});
;


const Student = new Schema({
    email: String,
    firstName: String,
    lastName: String,
    password: String
})

const SV = mongoose.model('Student', Student)

/* GET home page. */
router.get('/', async function (req, res, next) {
    console.log("vao trang chu")

    // lay danh sach
    var sinhviens = await SV.find({});

    res.render('index', {data: sinhviens});
});

router.get('/xoa', async function (req, res, next) {
    console.log("vao trang chu")

    await SV.deleteOne({_id: req.query.id})

    // quay ve trang chu
    res.redirect('/');
});

router.get('/chitiet', async function (req, res, next) {
    console.log("vao trang chu")

    var sinhVien =  await SV.find({_id: req.query.id})

    // quay ve trang chu
    res.render('chitiet',{data : (sinhVien[0])})
});

router.get('/sua', async function (req, res, next) {
    console.log("vao trang chu")

    var id = req.query.id;


    res.render('sua', {id: id});
});

router.get('/car', function (req, res, next) {
    console.log("vao trang o to")
    var data = 'Xin chao kiem tra thu'

    var mang = [3, 4, 5, 4, 3, 3, 5, 6, 7, 56, 5]

    var sinhVien = {name: 'Huy Nguyen', tuoi: 33}

    res.render('car', {title: 'Express', duLieu: data, mangSo: mang, student: sinhVien});
});


router.post('/insertUser', function (req, res) {
    console.log("insertUser")
    //     <input name="email" placeholder="Nhap email cua ban">
    var email = req.body.email;
    //     <input name="firstName" placeholder="Nhap First Name cua ban">
    var firstName = req.body.firstName;
    //     <input name="lastName" placeholder="Nhap LastName cua ban">
    var lastName = req.body.lastName;
    //     <input name="password" placeholder="Nhap password cua ban">
    var password = req.body.password;

    console.log(email + " - " + firstName + " - " + lastName + "  -  " + password)
    var data = email + " - " + firstName + " - " + lastName + "  -  " + password

    // viet cau lenh them
    // b1 : định nghĩa khung của model - Sinh Vien ( id, name, email, ...) - Schema

    // b2 : mở kết nối đến collection - bảng
    // b3 : gọi câu lệnh insert với dữ liệu của mình


    const sinhVienMoi = new SV({
        email: email,
        firstName: firstName,
        lastName: lastName,
        password: password
    })

    sinhVienMoi.save(function (error) {

        if (error) {
            res.render('index', {message: "Them KO thanh cong  " + error.message})
        } else {
            res.render('index', {message: " "
                 })
        }
    })

})

router.post('/updateSinhVien', async function (req, res) {

    var id = req.body.id;

    //     <input name="email" placeholder="Nhap email cua ban">
    var email = req.body.email;
    //     <input name="firstName" placeholder="Nhap First Name cua ban">
    var firstName = req.body.firstName;
    //     <input name="lastName" placeholder="Nhap LastName cua ban">
    var lastName = req.body.lastName;
    //     <input name="password" placeholder="Nhap password cua ban">
    var password = req.body.password;


    var sinhVienMoi = {
        email: email,
        firstName: firstName,
        lastName: lastName,
        password: password
    }
    try {
        await SV.findOneAndUpdate({_id: id}, sinhVienMoi, function (error) {
            res.redirect('/');
        })
        res.redirect('/');
    }catch (e) {
        console.log(e);
    }






})

module.exports = router;
