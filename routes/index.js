var express = require('express');
var router = express.Router();
var multer  = require('multer');

var User = require('../model/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'E-resolute Exam' });
});



var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null,'uploads/')
  },
  filename: function (req, file, cb) {
   var fname =  Date.now() + '-' + file.originalname  ;  
   let  ext = file.originalname.split('.').pop() ;
   if (ext == 'png' || ext == 'jpeg' || ext == 'jpg') 
   {   
    cb( null, fname );
   }else{
     console.log('wrong extension');     
   } 

 }

})

var upload = multer({ storage: storage });




router.post('/users',upload.any(), function(req, res) {
   
    var element = '';
    for (let index = 0; index < req.files.length; index++) {
      var element =     req.files[index].filename +' , '+ element  ;
      // console.log(element);        
    }
 
   User.create({
     artist:req.body.name,
     filename: element
   }).then(function(data){
 
     res.send(data);
 
   });

 });
     


// view  All data
 router.get('/views',(req,res)=>{
  User.findAll().then((data)=>{
    res.send(data);
  })
})

// view one 
router.get('/view/:id',(req,res)=>{
  User.findOne({
    where:{
      id:req.params.id
    }
  }).then((data)=>{
    res.send(data);
  })
})



// update data
// i have used json raw data using postman to test this route
router.put('/update',(req,res)=>{
  // console.log(req.params.id);


  console.log(req.body.id);
  
  console.log(req.body.name);
  
 User.update({
   artist : req.body.name 
  } ,
  {
     where:{
       id:req.body.id
     }
  }).then((data)=>{
   
  console.log(data);
  res.send('Data updated');
  
 })

})




// data delete based on id
router.delete('/delete/:id', (req,res)=>{
  User.destroy({
    where:{
      id:req.params.id
    }
  }).then((data)=>{
   console.log(data);
   res.send('   Row of id number  '+ req.params.id +' deleted successfully');
  })
})

module.exports = router;
