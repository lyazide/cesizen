import { SimpleGrid, Image } from "@chakra-ui/react";

interface PhotoGalleryProps {
  photos: string[];
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ photos }) => {
  return (
    <SimpleGrid columns={[1, 2, 3]} gap="40px" p={4}>
      {photos.map((photo, index) => (
        <Image
          src={photo}
          alt={`Photo ${index + 1}`}
          key={index}
          borderRadius="md"
        />
      ))}
    </SimpleGrid>
  );
};

export default PhotoGallery;
