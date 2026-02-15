import express from 'express';
import methodNotAllowed from '../middlewares/methodNotAllowed.js';
import { upload, storage } from '../middlewares/multer.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.render('home');
});

router.post('/upload', upload.single('profileImage'), (req, res) => {
    console.log(req.body);
    console.log(req.file);
    res.send('File uploaded successfully');
});

const cpUpload = upload.fields([{ name: 'profileImage', maxCount: 1 }, { name: 'coverImage', maxCount: 1 }]);
router.post('/upload-multiple', cpUpload, (req, res) => {
        console.log(req.body);
        console.log(req.files);
        res.send('Multiple files uploaded successfully');
    }
);

router.use(methodNotAllowed());

export default router;