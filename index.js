const express = require('express')
const app = express()
const { getTracks, insertTrack,delTracks } = require('./database')
const multer=require('multer')
let storage=multer.diskStorage({
  destination:function(req,res,cb){
    cb(null,'.\\public\\')
  },
  filename:function(req,file,cb){
    cb(null,Date.now()+file.originalname)
  }
}
)
const upload=multer({storage:storage})

app.set('view engine', 'hbs')

app.use(express.static(__dirname + '/public'))

app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
  const { id } = req.query
  getTracks().then(tracks => { 
    const selectedTrack = tracks.find(t => t._id == id)
    res.render('index', { tracks ,selectedTrack})
  })  
})

app.get('/add', (req, res) => {
  res.render('add')
})

app.post('/add',upload.fields([{name:'image',maxCount:1},{name:'song',maxCount:1}]), (req, res) => {
  console.log('file::::::::::::::::::::::::::::::::::::::>',req.files['image'],req.files['song'][0])  
  const newTrack ={
    title:req.body.title,
    singer:req.body.singer,
    mp3:req.body.mp3,
    image:req.files['image'][0].filename,
    mp3:req.files['song'][0].filename,
  }
  console.log('body:::::::::::::::::::::::::::::::::::::>',req.body)
  
  
   console.log('sob',newTrack,typeof newTrack)
  insertTrack(newTrack).then(result => {
    console.log('result',result)
    res.redirect('/?id=' + result.ops[0]._id)
  })
})

app.get('/delete',(req,res)=>{
  delTracks().then(()=>{
    console.log('deleted')
    res.render('index')
  })
})

app.listen(8081, function () {
  console.log("Serving on 8081")
})
