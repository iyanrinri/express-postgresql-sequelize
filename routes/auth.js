var express = require('express');
var router = express.Router();
const authController = require('../controllers/authController');

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login and get a JWT token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: JWT token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', authController.login);

/**
 * @swagger
 * /auth/profile:
 *   get:
 *     summary: Get protected profile
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Protected profile data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   type: object
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.get('/profile', authController.verifyToken, authController.profile);

module.exports = router;
