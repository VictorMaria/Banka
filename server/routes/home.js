import express from 'express';

const router = express.Router();

router.get('/', (req, res) => res.send('With Banka the views are better'));

export default router;
