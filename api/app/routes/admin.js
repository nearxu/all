import express from 'express'
import Admin from '../controller/admin'

const router = express.Router()

router.post('/login',Admin.login)
router.post('/register',Admin.register)
router.get('/singout', Admin.singout);
router.get('/all', Admin.getAllAdmin);
export default router;