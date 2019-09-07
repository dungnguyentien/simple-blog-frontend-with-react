import express from 'express';

// initial router
const router = express.Router();

// @TODO api routes

// frontend routes
router.get('*', async (req, res) => {
	return res.status(res.statusCode || 200).send(req.ssrContent);
});

//
export default router;
