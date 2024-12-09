import axios from "axios";
import { PropertyTypeDto } from "../interfaces/PropertyTypeDto";
import { CreatePropertyTypeDto } from "../interfaces/CreatePropertyTypeDto";


const API_BASE_URL = "https://localhost:7059/api/propertytype";

export class PropertyTypeService {
    // Get a single property type by its ID
    async getPropertyTypeById(id: number): Promise<PropertyTypeDto | null> {
        try {
            const response = await axios.get<PropertyTypeDto>(
                `${API_BASE_URL}/${id}`
            );
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 404) {
                return null;
            }
            throw error;
        }
    }

    // Get all property types
    async getAllPropertyTypes(): Promise<PropertyTypeDto[]> {
        const response = await axios.get<PropertyTypeDto[]>(`${API_BASE_URL}`);
        return response.data;
    }

    // Create a new property type
    async createPropertyType(
        createDto: CreatePropertyTypeDto
    ): Promise<PropertyTypeDto> {
        const response = await axios.post<PropertyTypeDto>(
            `${API_BASE_URL}`,
            createDto
        );
        return response.data;
    }

    // Update an existing property type
    async updatePropertyType(
        id: number,
        createDto: CreatePropertyTypeDto
    ): Promise<boolean> {
        try {
            await axios.put(`${API_BASE_URL}/${id}`, createDto);
            return true;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 404) {
                return false;
            }
            throw error;
        }
    }

    // Delete a property type
    async deletePropertyType(id: number): Promise<boolean> {
        try {
            await axios.delete(`${API_BASE_URL}/${id}`);
            return true;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 404) {
                return false;
            }
            throw error;
        }
    }
}

export default new PropertyTypeService();
