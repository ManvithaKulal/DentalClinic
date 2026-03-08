import { useEffect, useState } from "react";
import { getGalleryImages } from "../api/galleryApi";

const API_URL = import.meta.env.VITE_API_URL;

const getImageSrc = (id) => `${API_URL}/gallery/${id}/image`;

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await getGalleryImages();
        setImages(res.data);
      } catch {
        setImages([]);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">
        Gallery
      </h1>
      <p className="text-gray-500 text-center mb-12">
        A glimpse into our clinic and the smiles we create.
      </p>

      {loading ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : images.length === 0 ? (
        <p className="text-center text-gray-400">No images yet.</p>
      ) : (
        <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
          {images.map((img) => (
            <div key={img._id} className="break-inside-avoid">
              <img
                src={getImageSrc(img._id)}
                alt="Gallery"
                className="w-full rounded-xl shadow-sm hover:shadow-md transition"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Gallery;
