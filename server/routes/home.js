import express from 'express';

const router = express.Router();

router.get('/', (req, res) => res.send('With Banka the Figures look great.'));

export default router;
