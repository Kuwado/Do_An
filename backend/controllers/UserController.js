import { getUserService } from '../services/user/getUserService.js';

export const getUserById = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await getUserService(id);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};
