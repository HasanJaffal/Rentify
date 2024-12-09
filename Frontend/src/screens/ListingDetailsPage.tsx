import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ListingDto } from "../interfaces/ListingDto";
import { ImageDto } from "../interfaces/ImageDto";
import ListingDetails from "../components/ListingDetails";
import { ListingService } from "../services/ListingService";
import ImageService from "../services/ImageService";

const ListingDetailsPage = () => {
    const { id } = useParams<{ id: string }>();
    const [listingDto, setListingDto] = useState<ListingDto | null>(null);
    const [images, setImages] = useState<ImageDto[]>([]);

    useEffect(() => {
        const listingService = new ListingService();
        const imageService = new ImageService();
        if (id) {
            // Fetch the listing and images data based on the `id`
            const fetchListing = async () => {
                try {
                    const listingData = await listingService.getListingById(
                        parseInt(id)
                    );
                    setListingDto(listingData);
                } catch (error) {
                    console.error("Error fetching listing:", error);
                }
            };

            const fetchImages = async () => {
                try {
                    const imagesData = await imageService.getImagesByListingId(
                        parseInt(id)
                    );
                    setImages(imagesData);
                } catch (error) {
                    console.error("Error fetching images:", error);
                }
            };

            fetchListing();
            fetchImages();
        }
    }, [id]);

    // Loading state while fetching data
    if (!listingDto || images.length === 0) {
        return <div>Loading...</div>;
    }

    return <ListingDetails listingDto={listingDto} images={images} />;
};

export default ListingDetailsPage;
