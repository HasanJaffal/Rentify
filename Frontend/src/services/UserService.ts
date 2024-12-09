import axios from "axios";
import { UserDto } from "../interfaces/UserDto";
import { CreateUserDto } from "../interfaces/CreateUserDto";
import { CheckLoginDto } from "../interfaces/CheckLoginDto";

const API_BASE_URL = "https://localhost:7059/api/User";

export class UserService {
    // Get a single user by ID
    async getUserById(id: number): Promise<UserDto | null> {
        try {
            const response = await axios.get<UserDto>(`${API_BASE_URL}/${id}`);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 404) {
                return null;
            }
            throw error;
        }
    }

    // Get a single user by email
    async getUserByEmail(email: string): Promise<UserDto | null> {
        try {
            const response = await axios.get<UserDto>(
                `${API_BASE_URL}/email/${email}`
            );
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 404) {
                return null;
            }
            throw error;
        }
    }

    // Get users by name
    async getUsersByName(name: string): Promise<UserDto[]> {
        const response = await axios.get<UserDto[]>(
            `${API_BASE_URL}/name/${name}`
        );
        return response.data;
    }

    // Create a new user
    async createUser(userDto: CreateUserDto): Promise<UserDto> {
        const response = await axios.post<UserDto>(`${API_BASE_URL}`, userDto);
        return response.data;
    }

    // Update an existing user
    async updateUser(id: number, userDto: CreateUserDto): Promise<boolean> {
        try {
            await axios.put(`${API_BASE_URL}/${id}`, userDto);
            return true;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 404) {
                return false;
            }
            throw error;
        }
    }

    // Delete a user by ID
    async deleteUser(id: number): Promise<boolean> {
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

    async login(checkLoginDto: CheckLoginDto): Promise<UserDto | null> {
        try {
            const response = await axios.post<UserDto | null>(
                `${API_BASE_URL}/login`,
                {
                    email: checkLoginDto.email,
                    password: checkLoginDto.password,
                }
            );
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                // Handle unauthorized error
                if (error.response?.status === 401) {
                    return null;
                }
                // Log any other Axios-specific errors
                console.error(
                    "Axios error:",
                    error.response?.data || error.message
                );
            } else {
                // Log non-Axios errors
                console.error("Unexpected error:", error);
            }
            throw error; // Rethrow error to be handled upstream
        }
    }
}

export default new UserService();
