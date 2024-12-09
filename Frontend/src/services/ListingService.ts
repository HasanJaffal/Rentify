import axios from "axios";
import { ListingDto } from "../interfaces/ListingDto";
import { CreateListingDto } from "../interfaces/CreateListingDto";

const API_BASE_URL = "https://localhost:7059/api/listing";

export class ListingService {
    // Fetch all listings with filters and pagination
    async getAllListings(
        title: string | null = null,
        minPrice: number | null = null,
        maxPrice: number | null = null,
        bedroomsNumber: number | null = null,
        location: string | null = null,
        typeId: number | null = null,
        pageNumber: number = 1,
        pageSize: number = 100
    ): Promise<ListingDto[]> {
        const params: object = {
            title,
            minPrice,
            maxPrice,
            bedroomsNumber,
            location,
            typeId,
            pageNumber,
            pageSize,
        };
        const response = await axios.get<ListingDto[]>(API_BASE_URL, {
            params,
        });
        return response.data;
    }

    // Fetch a single listing by its ID
    async getListingById(id: number): Promise<ListingDto | null> {
        try {
            const response = await axios.get<ListingDto>(
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

    // Create a new listing
    async createListing(
        createListingDto: CreateListingDto
    ): Promise<ListingDto> {
        const response = await axios.post<ListingDto>(
            API_BASE_URL,
            createListingDto
        );
        return response.data;
    }

    // Update an existing listing
    async updateListing(
        id: number,
        createListingDto: CreateListingDto
    ): Promise<boolean> {
        try {
            await axios.put(`${API_BASE_URL}/${id}`, createListingDto);
            return true;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 404) {
                return false;
            }
            throw error;
        }
    }

    // Delete a listing
    async deleteListing(id: number): Promise<boolean> {
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

export default new ListingService();
