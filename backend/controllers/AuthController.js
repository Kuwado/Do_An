import {
    loginUserService,
    loginStaffService,
} from '../services/AuthService.js';

export const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const result = await loginUserService(username, password);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

export const loginStaff = async (req, res) => {
    const { username, password } = req.body;

    try {
        const result = await loginStaffService(username, password);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};
