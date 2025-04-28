import { getAdminService } from '../services/admin/getAdminService.js';

export const getAdminById = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await getAdminService(id);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};
