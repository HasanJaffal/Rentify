import "../../styles.css";
import ListingCard from "./ListingCard";
import { ListingDto } from "../../interfaces/ListingDto";
import { useEffect, useState } from "react";
import { ListingService } from "../../services/ListingService";
import { ImageDto } from "../../interfaces/ImageDto";
import ImageService from "../../services/ImageService";
import {
    Box,
    Button,
    ButtonGroup,
    Divider,
    FormControl,
    InputLabel,
    MenuItem,
    Modal,
    Select,
    SelectChangeEvent,
    TextField,
} from "@mui/material";
import { PropertyTypeService } from "../../services/PropertyTypeService";
import { PropertyTypeDto } from "../../interfaces/PropertyTypeDto";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import FilterAltRoundedIcon from "@mui/icons-material/FilterAltRounded";

function Home() {
    const [listings, setListings] = useState<ListingDto[]>([]);
    const [images, setImages] = useState<ImageDto[]>([]);
    const [types, setTypes] = useState<PropertyTypeDto[]>([]);
    const [selectedType, setSelectedType] = useState<string>("");

    // Modal open/close state
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleTypeChange = (event: SelectChangeEvent<string>) => {
        setSelectedType(event.target.value);
    };

    const [minPrice, setMinPrice] = useState<number | null>(null);
    const [maxPrice, setMaxPrice] = useState<number | null>(null);
    const [bedroomsNumber, setBedroomsNumber] = useState<number | null>(null);
    const [location, setLocation] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>("");

    useEffect(() => {
        const fetchData = async () => {
            const service = new PropertyTypeService();
            try {
                const fetchedTypes = await service.getAllPropertyTypes();
                setTypes(fetchedTypes);

                if (fetchedTypes.length > 0) {
                    setSelectedType(fetchedTypes[0].id.toString());
                }
            } catch (error) {
                console.error("Error fetching property types:", error);
            }
        };

        fetchData();
    }, []);

    const handleSubmitFilters = () => {
        console.log({
            typeId: selectedType,
            minPrice,
            maxPrice,
            bedroomsNumber,
        });
        handleClose(); // close the modal
    };

    const handleSearch = async () => {
        console.log("Searching for listings with query:", searchQuery);
        console.log("Search parameters:", {
            searchQuery,
            minPrice,
            maxPrice,
            bedroomsNumber,
            location,
            selectedType,
        });

        const service = new ListingService();
        try {
            const searchResults = await service.getAllListings(
                searchQuery,
                minPrice,
                maxPrice,
                bedroomsNumber,
                location,
                selectedType.length > 0 ? parseFloat(selectedType) : null,
                1, // pageNumber (default is 1)
                100 // pageSize (default is 100)
            );
            console.log("Search results:", searchResults); // Log the search results
            setListings(searchResults);
        } catch (error) {
            console.error(
                "An error occurred while searching for listings.",
                error
            );
        }
    };

    const getAllListings = async () => {
        const service = new ListingService();
        try {
            const fetchedListings = await service.getAllListings();
            setListings(fetchedListings);
        } catch (error) {
            console.error(
                "An error occurred while fetching the listings.",
                error
            );
        }
    };

    const getAllImages = async (listingIds: number[]) => {
        const service = new ImageService();
        try {
            const imagePromises = listingIds.map((id) =>
                service.getImagesByListingId(id)
            );
            const fetchedImages = (await Promise.all(imagePromises)).flat();
            setImages(fetchedImages);
        } catch (error) {
            console.error(
                "An error occurred while fetching the images.",
                error
            );
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            await getAllListings(); // Fetch listings initially
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (listings.length > 0) {
            getAllImages(listings.map((listing) => listing.id));
        }
    }, [listings]);

    return (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: 2,
                        gap: 0.5,
                    }}
                >
                    <TextField
                        fullWidth
                        sx={{}}
                        size="small"
                        label="Search by Title"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <ButtonGroup variant="outlined" size="large">
                        <Button
                            endIcon={<SearchRoundedIcon />}
                            onClick={handleSearch} // Trigger search on click
                        >
                            Search
                        </Button>
                        <Button
                            endIcon={<FilterAltRoundedIcon />}
                            onClick={handleOpen} // Open modal on click
                        >
                            Advanced
                        </Button>
                    </ButtonGroup>
                    <Modal open={open} onClose={handleClose}>
                        <Box
                            sx={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                width: 400,
                                bgcolor: "background.paper",
                                border: "2px solid",
                                borderColor: "primary.main",
                                boxShadow: 24,
                                p: 4,
                            }}
                        >
                            <Box
                                component="form"
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 2,
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="Location"
                                    type="string"
                                    value={location || ""}
                                    onChange={(e) =>
                                        setLocation(
                                            e.target.value
                                                ? e.target.value
                                                : null
                                        )
                                    }
                                />
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="Min Price"
                                    type="number"
                                    value={minPrice || ""}
                                    onChange={(e) =>
                                        setMinPrice(
                                            e.target.value
                                                ? parseFloat(e.target.value)
                                                : null
                                        )
                                    }
                                />
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="Max Price"
                                    type="number"
                                    value={maxPrice || ""}
                                    onChange={(e) =>
                                        setMaxPrice(
                                            e.target.value
                                                ? parseFloat(e.target.value)
                                                : null
                                        )
                                    }
                                />
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="Bedrooms Number"
                                    type="number"
                                    value={bedroomsNumber || ""}
                                    onChange={(e) =>
                                        setBedroomsNumber(
                                            e.target.value
                                                ? parseInt(e.target.value, 10)
                                                : null
                                        )
                                    }
                                />
                                <FormControl
                                    sx={{
                                        flex: "1 1 calc(50% - 16px)",
                                        width: "100%",
                                    }}
                                    size="small"
                                >
                                    <InputLabel id="property-type-label">
                                        Property Type
                                    </InputLabel>
                                    <Select
                                        labelId="property-type-label"
                                        value={selectedType || ""} // Default to an empty string if selectedType is null or undefined
                                        onChange={handleTypeChange}
                                        name="typeId"
                                        label="Property Type"
                                    >
                                        <MenuItem value="">
                                            <em>Any</em>{" "}
                                            {/* This will be the placeholder option with "Any" */}
                                        </MenuItem>
                                        {types.map((type) => (
                                            <MenuItem
                                                key={type.id}
                                                value={type.id.toString()}
                                            >
                                                {type.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <ButtonGroup variant="outlined" size="large">
                                    <Button onClick={handleClose}>
                                        Cancel
                                    </Button>
                                    <Button onClick={handleSubmitFilters}>
                                        Save
                                    </Button>
                                </ButtonGroup>
                            </Box>
                        </Box>
                    </Modal>
                </Box>
                <Divider />
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "16px",
                    justifyContent: "center",
                    padding: "16px",
                }}
            >
                {listings.length === 0 ? (
                    <p>No listings found</p> // Display message when no listings are found
                ) : (
                    listings.map((listing) => (
                        <ListingCard
                            key={listing.id}
                            listingDto={listing}
                            images={images.filter(
                                (image) => image.listingId === listing.id
                            )}
                        />
                    ))
                )}
            </Box>
        </Box>
    );
}

export default Home;
