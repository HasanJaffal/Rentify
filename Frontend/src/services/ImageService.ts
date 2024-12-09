import axios from 'axios';
import { CreateImageDto } from '../interfaces/CreateImageDto';
import { ImageDto } from '../interfaces/ImageDto';

// Base URL for the API
const API_BASE_URL = 'https://localhost:7059/api/Image'; // Replace with your actual API base URL

class ImageService {
    // Upload an image
    async uploadImage(createImageDto: CreateImageDto): Promise<ImageDto> {
        const formData = new FormData();
        formData.append('image', createImageDto.image); // Append the image file
        formData.append('listingId', createImageDto.listingId.toString()); // Append the listing ID

        try {
            const response = await axios.post<ImageDto>(`${API_BASE_URL}/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Axios should set this, but make sure
                },
            });
            return response.data;
        } catch (error) {
            console.error("Error uploading image:", error);
            throw new Error('Failed to upload image');
        }
    }

    // Get an image by ID
    async getImageById(id: number): Promise<ImageDto> {
        const response = await axios.get<ImageDto>(`${API_BASE_URL}/${id}`);
        return response.data;
    }

    // Get images by listing ID
    async getImagesByListingId(listingId: number): Promise<ImageDto[]> {
        const response = await axios.get<ImageDto[]>(`${API_BASE_URL}/listing/${listingId}`);
        return response.data;
    }

    // Delete an image by ID
    async deleteImageById(id: number): Promise<void> {
        await axios.delete(`${API_BASE_URL}/${id}`);
    }
}

export default ImageService;
