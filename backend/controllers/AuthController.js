import { loginAdminFirstStepService } from '../services/authServices/loginAdminFirstStepService.js';
import { loginAdminService } from '../services/authServices/loginAdminService.js';
import { loginUserService } from '../services/authServices/loginUserService.js';

export const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const result = await loginUserService(username, password);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

export const loginAdminFirstStep = async (req, res) => {
    const { username } = req.body;

    try {
        const result = await loginAdminFirstStepService(username);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

export const loginAdmin = async (req, res) => {
    const { username, password } = req.body;

    try {
        const result = await loginAdminService(username, password);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};
