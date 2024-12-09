import {
    Box,
    Button,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
    Typography,
    FormControl,
    Snackbar,
    Alert,
    IconButton,
} from "@mui/material";
import { UserDto } from "../interfaces/UserDto";
import { useEffect, useState } from "react";
import { CreateListingDto } from "../interfaces/CreateListingDto";
import { PropertyTypeService } from "../services/PropertyTypeService";
import { PropertyTypeDto } from "../interfaces/PropertyTypeDto";
import { ListingService } from "../services/ListingService";
import ImageService from "../services/ImageService";
import { useNavigate } from "react-router-dom";
import { Close } from "@mui/icons-material";

function NewPost() {
    const [types, setTypes] = useState<PropertyTypeDto[]>([]);
    const [selectedType, setSelectedType] = useState<string>("");
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const service = new PropertyTypeService();
                const fetchedTypes = await service.getAllPropertyTypes();
                setTypes(fetchedTypes);

                if (fetchedTypes.length > 0) {
                    setSelectedType(fetchedTypes[0].id.toString());
                }
            } catch (error) {
                console.error("Error fetching property types:", error);
                setError("Failed to fetch property types.");
            }
        };

        fetchData();
    }, []);

    const getPosterId = (): number => {
        const profile = localStorage.getItem("rProfile");
        if (profile) {
            const user: UserDto = JSON.parse(profile);
            return user.id;
        }
        return 0;
    };

    const handleTypeChange = (event: SelectChangeEvent<string>) => {
        setSelectedType(event.target.value);
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const newFiles = Array.from(event.target.files);
            setImageFiles((prevFiles) => [...prevFiles, ...newFiles]);
        }
    };

    const handleDeleteImage = (index: number) => {
        setImageFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const listingService = new ListingService();
        const imageService = new ImageService();
        const formData = new FormData(event.currentTarget);

        const listing: CreateListingDto = {
            title: formData.get("title")?.toString() || "",
            price: parseInt(formData.get("price")?.toString() || "0"),
            bedroomsNumber: parseInt(
                formData.get("bedroomsNumber")?.toString() || "0"
            ),
            typeId: parseInt(selectedType || "0"),
            location: formData.get("location")?.toString() || "",
            description: formData.get("description")?.toString() || "",
            posterId: getPosterId(),
        };

        try {
            // Step 1: Create the listing
            const createdListing = await listingService.createListing(listing);

            // Step 2: Upload each selected image
            for (const imageFile of imageFiles) {
                try {
                    await imageService.uploadImage({
                        image: imageFile,
                        listingId: createdListing.id,
                    });
                } catch (error) {
                    console.error("Error uploading image:", error);
                    setError("Failed to upload images.");
                }
            }

            setIsSuccess(true);

            // Navigate to home after showing success message
            setTimeout(() => navigate("/"), 3000); // Wait 3 seconds before redirecting
        } catch (error) {
            console.error("Error creating listing:", error);
            setError("Failed to create the listing.");
        }
    };

    const handleClose = () => {
        setIsSuccess(false);
    };

    return (
        <Box component="form" sx={{ margin: "32px" }} onSubmit={handleSubmit}>
            <Typography
                variant="h4"
                align="center"
                mb={4}
                sx={{ fontWeight: "bold", color: "primary.main" }}
            >
                Add a Listing
            </Typography>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    gap: "16px",
                    justifyContent: "space-between",
                }}
            >
                <TextField
                    sx={{ flex: "1 1 calc(50% - 16px)", minWidth: "100px" }}
                    required
                    label="Title"
                    type="text"
                    placeholder="Title"
                    name="title"
                />
                <TextField
                    sx={{ flex: "1 1 calc(50% - 16px)", minWidth: "100px" }}
                    required
                    label="Price"
                    type="number"
                    placeholder="Price"
                    name="price"
                />
                <TextField
                    sx={{ flex: "1 1 calc(50% - 16px)", minWidth: "100px" }}
                    required
                    label="Number of Bedrooms"
                    type="number"
                    placeholder="Number of Bedrooms"
                    name="bedroomsNumber"
                />
                <FormControl
                    sx={{ flex: "1 1 calc(50% - 16px)", minWidth: "100px" }}
                >
                    <InputLabel id="property-type-label">
                        Property Type
                    </InputLabel>
                    <Select
                        labelId="property-type-label"
                        value={selectedType}
                        onChange={handleTypeChange}
                        name="typeId"
                        label="Property Type"
                    >
                        {types.map((type) => (
                            <MenuItem key={type.id} value={type.id.toString()}>
                                {type.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    sx={{ flex: "1 1 calc(50% - 16px)", minWidth: "100px" }}
                    required
                    label="Location"
                    type="text"
                    placeholder="Location"
                    name="location"
                />
                <TextField
                    sx={{ flex: "1 1 100%", minWidth: "100px" }}
                    required
                    label="Description"
                    type="text"
                    placeholder="Description"
                    name="description"
                    multiline
                    rows={4}
                />
                <Box sx={{ flex: "1 1 100%", minWidth: "100px" }}>
                    <InputLabel>Upload Images</InputLabel>
                    <Button
                        variant="outlined"
                        component="label"
                        sx={{ width: "100%", mt: 1 }}
                    >
                        Choose Files
                        <input
                            type="file"
                            hidden
                            multiple
                            onChange={handleImageChange}
                        />
                    </Button>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            flexWrap: "wrap",
                            justifyContent: "center",
                            marginTop: 2,
                            columnGap: 2,
                        }}
                    >
                        {imageFiles.map((file, index) => (
                            <Box
                                key={index}
                                sx={{
                                    position: "relative",
                                    width: "100px",
                                    height: "100px",
                                    marginBottom: "16px",
                                }}
                            >
                                <img
                                    src={URL.createObjectURL(file)}
                                    alt={`preview-${index}`}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                    }}
                                />
                                <IconButton
                                    sx={{
                                        position: "absolute",
                                        top: "4px",
                                        right: "4px",
                                        backgroundColor: "white",
                                        color: "red",
                                        borderRadius: "50%",
                                        padding: "4px",
                                    }}
                                    onClick={() => handleDeleteImage(index)}
                                >
                                    <Close />
                                </IconButton>
                            </Box>
                        ))}
                    </Box>
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        flex: "1 1 100%",
                        maxWidth: "400px",
                        margin: "0 auto",
                    }}
                >
                    <Button
                        variant="contained"
                        size="large"
                        color="error"
                        onClick={() => navigate("/")}
                    >
                        Cancel
                    </Button>
                    <Button variant="contained" type="submit" size="large">
                        Submit
                    </Button>
                </Box>
            </Box>

            {isSuccess && (
                <Snackbar
                    open={isSuccess}
                    autoHideDuration={3000}
                    onClose={handleClose}
                >
                    <Alert severity="success" onClose={handleClose}>
                        Listing created successfully! Redirecting to Home...
                    </Alert>
                </Snackbar>
            )}

            {error && (
                <Snackbar
                    open={!!error}
                    autoHideDuration={6000}
                    onClose={() => setError(null)}
                >
                    <Alert severity="error">{error}</Alert>
                </Snackbar>
            )}
        </Box>
    );
}

export default NewPost;
