const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');

exports.createValidator = [
  body('name', 'Name is required and must be 3-255 characters').trim().isLength({ min: 3, max: 255 }),
  body('description', 'Description is required and must be 3-255 characters').trim().isLength({ min: 3, max: 255 }),

  (req, res, next) => {
    if (req.params.selected === 'Item') {
      body('price', 'Price must be a positive number').isFloat({ gt: 0, lt: 999999999 })(req, res, next);
      body('stock', 'Stock must be a non-negative integer').isInt({ gt: -1, lt: 999999999 })(req, res, next);
      body('category', 'Category is required').trim().isLength({ min: 1, max: 255 })(req, res, next);
    } else {
      next();
    }
  },
  
  body('*').escape(), // PREVENT XSS ATTACKS

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json(errors);
    } else {
      next();
    }
  }),
];
