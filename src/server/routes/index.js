import express from 'express';

import renderServerSideContent from '../template';

const router = express.Router();
router.get('/', async (req, res) => {
	const content = renderServerSideContent();
	return res.status(200).send(content);
});
export default router;
