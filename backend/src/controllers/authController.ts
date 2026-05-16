import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import User from '../models/User';
import Account from '../models/Account';
import { generateToken } from '../middleware/auth';

export const registerValidation = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please enter a valid email address'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
  body('firstName')
    .trim()
    .isLength({ min: 1 })
    .withMessage('First name is required'),
  body('lastName')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Last name is required'),
  body('phoneNumber')
    .isMobilePhone('any')
    .withMessage('Please enter a valid phone number'),
  body('dateOfBirth')
    .isISO8601()
    .withMessage('Please enter a valid date of birth'),
  body('address.street')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Street address is required'),
  body('address.city')
    .trim()
    .isLength({ min: 1 })
    .withMessage('City is required'),
  body('address.state')
    .trim()
    .isLength({ min: 1 })
    .withMessage('State is required'),
  body('address.zipCode')
    .trim()
    .isLength({ min: 1 })
    .withMessage('ZIP code is required')
];

export const loginValidation = [
  body('email').isEmail().normalizeEmail(),
  body('password').exists()
];

export const register = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map(err => {
        if ('msg' in err) {
          return err.msg;
        }
        return 'Validation error';
      });
      return res.status(400).json({ errors: errorMessages });
    }

    const { email, password, firstName, lastName, phoneNumber, dateOfBirth, address } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: `An account with email "${email}" already exists. Please use a different email or login instead.` });
    }

    const user = new User({
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      dateOfBirth,
      address
    });

    await user.save();

    const checkingAccount = new Account({
      userId: user._id,
      accountType: 'checking',
      balance: 100000
    });

    const savingsAccount = new Account({
      userId: user._id,
      accountType: 'savings',
      balance: 0,
      interestRate: 0.02
    });

    await Promise.all([checkingAccount.save(), savingsAccount.save()]);

    const token = generateToken(user._id.toString());

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      }
    });
  } catch (error: any) {
    console.error('Registration error:', error);
    let errorMessage = 'Internal server error';
    
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      errorMessage = `An account with this ${field} already exists. Please use a different ${field}.`;
    }
    
    res.status(500).json({ error: errorMessage });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = generateToken(user._id.toString());

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    
    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        dateOfBirth: user.dateOfBirth,
        address: user.address,
        isEmailVerified: user.isEmailVerified,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateProfileValidation = [
  body('firstName').optional().trim().isLength({ min: 1 }),
  body('lastName').optional().trim().isLength({ min: 1 }),
  body('phoneNumber').optional().isMobilePhone('any'),
  body('address.street').optional().trim().isLength({ min: 1 }),
  body('address.city').optional().trim().isLength({ min: 1 }),
  body('address.state').optional().trim().isLength({ min: 1 }),
  body('address.zipCode').optional().trim().isLength({ min: 1 })
];

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const userId = (req as any).userId;
    const { firstName, lastName, phoneNumber, address } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (address) {
      user.address = { ...user.address, ...address };
    }

    await user.save();

    res.json({
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        dateOfBirth: user.dateOfBirth,
        address: user.address
      }
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const changePasswordValidation = [
  body('currentPassword').exists().withMessage('Current password is required'),
  body('newPassword').isLength({ min: 8 }).withMessage('New password must be at least 8 characters')
];

export const changePassword = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const userId = (req as any).userId;
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isPasswordValid = await user.comparePassword(currentPassword);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Current password is incorrect' });
    }

    user.password = newPassword;
    await user.save();

    res.json({
      message: 'Password changed successfully'
    });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};