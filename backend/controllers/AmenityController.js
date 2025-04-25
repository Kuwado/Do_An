import { getAmenitiesService } from '../services/amenity/getAmenitiesService.js';

export const getAmenities = async (req, res) => {
    try {
        const result = await getAmenitiesService();
        return res.status(200).json(result);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};
