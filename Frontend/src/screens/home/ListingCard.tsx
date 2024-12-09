import { Box, Button, Chip, Typography, Snackbar } from "@mui/material";
import CottageRoundedIcon from "@mui/icons-material/Cottage";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import BedRoundedIcon from "@mui/icons-material/BedRounded";
import AttachMoneyRoundedIcon from "@mui/icons-material/AttachMoneyRounded";
import MessageRoundedIcon from "@mui/icons-material/MessageRounded";
import CallMissedOutgoingRoundedIcon from "@mui/icons-material/CallMissedOutgoingRounded";
import { ListingDto } from "../../interfaces/ListingDto";
import { ImageDto } from "../../interfaces/ImageDto";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface Props {
    listingDto: ListingDto;
    images: ImageDto[];
}

export default function ListingCard({ listingDto, images }: Props) {
    const navigate = useNavigate();
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleExpandClick = () => {
        navigate(`/listing-details/${listingDto.id}`);
    };

    const handleInquireClick = () => {
        // Show the snackbar when the inquire button is clicked
        setOpenSnackbar(true);
    };

    const handleCloseSnackbar = () => {
        // Close the snackbar after a delay
        setOpenSnackbar(false);
    };

    return (
        <Box
            style={{
                width: "300px",
                height: "450px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                backgroundColor: "#fff",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Box
                style={{
                    height: "200px",
                    backgroundImage: `url(${
                        images.length > 0 ? images[0].path : ""
                    })`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            ></Box>

            <Typography
                variant="h5"
                textAlign="center"
                sx={{
                    maxHeight: "1.8em",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    padding: "0.5em",
                    fontWeight: "bold",
                    color: "primary.main",
                }}
            >
                {listingDto.title}
            </Typography>

            <Box
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "4px",
                    paddingInline: "16px",
                    paddingBottom: "16px",
                }}
            >
                <Chip
                    label={listingDto.location}
                    variant="outlined"
                    sx={{
                        width: "fit-content",
                        fontSize: "1em",
                        color: "black",
                        padding: "8px",
                    }}
                    icon={
                        <LocationOnRoundedIcon
                            style={{ fontSize: "1.33em", color: "dodgerblue" }}
                        />
                    }
                />
                <Chip
                    label={listingDto.propertyTypeName}
                    variant="outlined"
                    sx={{
                        width: "fit-content",
                        fontSize: "1em",
                        color: "black",
                        padding: "0.5em",
                    }}
                    icon={
                        <CottageRoundedIcon
                            style={{ fontSize: "1.33em", color: "limegreen" }}
                        />
                    }
                />
                <Chip
                    label={listingDto.bedroomsNumber.toString()}
                    variant="outlined"
                    sx={{
                        width: "fit-content",
                        fontSize: "1em",
                        color: "black",
                        padding: "0.5em",
                    }}
                    icon={
                        <BedRoundedIcon
                            style={{ fontSize: "1.33em", color: "brown" }}
                        />
                    }
                />
                <Chip
                    label={listingDto.price.toString()}
                    variant="outlined"
                    sx={{
                        width: "fit-content",
                        fontSize: "1em",
                        color: "black",
                        padding: "0.5em",
                    }}
                    icon={
                        <AttachMoneyRoundedIcon
                            style={{ fontSize: "1.33em", color: "green" }}
                        />
                    }
                />
            </Box>

            <Box
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "0 1em",
                    position: "relative",
                    bottom: 0,
                }}
            >
                <Button
                    variant="outlined"
                    color="primary"
                    endIcon={<CallMissedOutgoingRoundedIcon />}
                    onClick={handleExpandClick}
                >
                    Expand
                </Button>
                <Button
                    variant="outlined"
                    color="primary"
                    endIcon={<MessageRoundedIcon />}
                    onClick={handleInquireClick}
                >
                    Inquire
                </Button>
            </Box>

            {/* Snackbar for inquiry */}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                message="Inquiry message sent to the poster"
            />
        </Box>
    );
}
