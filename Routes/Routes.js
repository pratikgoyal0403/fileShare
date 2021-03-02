const router = require('express').Router();
const {v4} = require('uuid');
const path = require('path');
const File = require('../models/file');


router.get('/', (req, res)=> {
    res.render('./Home', {from: 'pratik'})
})
router.post('/file', (req, res)=> {
    if(!req.file) return res.send('some thing went wrong');
    const file = new File({
        filename: req.file.filename,
        filepath:   req.file.path,
        size: req.file.size,
        uuid: v4()
    })
    file.save().then(result => {
        const link = process.env.BASE_URL + '/'+result.uuid;
        res.json({share: link});
    }).catch(err => console.log(err));
})
router.get('/:id', (req, res)=> {
    const uid = req.params.id;
    File.findOne({uuid: uid}).then(result => {
        if(!result) return res.send('file not found');
        let size = result.size / 1024;
        res.render('./download', {filePath: result.filepath, filename: result.filename, size: size.toFixed(2)})
    })
})
router.get('/uploads/:filePath', (req, res)=> {
    const filepath = path.join(__dirname,'../uploads/',req.params.filePath);
    res.download(filepath);
})
module.exports = router;