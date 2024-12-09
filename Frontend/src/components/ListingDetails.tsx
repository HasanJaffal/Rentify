import { ImageDto } from "../interfaces/ImageDto";
import { ListingDto } from "../interfaces/ListingDto";
import { Box, Card, CardMedia, Typography } from "@mui/material";

interface Props {
    listingDto: ListingDto;
    images: ImageDto[];
}

export default function ListingDetails({ listingDto, images }: Props) {
    return (
        <Box sx={{ padding: 2 }}>
            {/* Display images in a grid layout */}
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(auto-fill, minmax(200px, 1fr))",
                    gap: 2,
                }}
            >
                {images.map((image) => (
                    <Card key={image.id} sx={{ maxWidth: 345 }}>
                        <CardMedia
                            component="img"
                            alt="Listing Image"
                            height="200"
                            image={image.path}
                        />
                    </Card>
                ))}
            </Box>

            <Typography variant="h4" sx={{ marginTop: 2 }}>
                Listing Details
            </Typography>

            {/* Display listing details */}
            <Box sx={{ marginTop: 2 }}>
                <Typography variant="h6" gutterBottom>
                    Title: {listingDto.title}
                </Typography>
                <Typography variant="body1" sx={{ marginTop: 1 }}>
                    Description: {listingDto.description}
                </Typography>
                <Typography variant="body1" sx={{ marginTop: 1 }}>
                    Price: ${listingDto.price}
                </Typography>
                <Typography variant="body1" sx={{ marginTop: 1 }}>
                    Bedrooms: {listingDto.bedroomsNumber}
                </Typography>
                <Typography variant="body1" sx={{ marginTop: 1 }}>
                    Location: {listingDto.location}
                </Typography>
                <Typography variant="body1" sx={{ marginTop: 1 }}>
                    Creation Date:{" "}
                    {new Date(listingDto.creationDate).toLocaleDateString()}
                </Typography>
                <Typography variant="body1" sx={{ marginTop: 1 }}>
                    Poster: {listingDto.posterName}
                </Typography>
                <Typography variant="body1" sx={{ marginTop: 1 }}>
                    Property Type: {listingDto.propertyTypeName}
                </Typography>
            </Box>
        </Box>
    );
}
