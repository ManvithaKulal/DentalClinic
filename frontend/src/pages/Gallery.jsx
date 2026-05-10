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
    <div className="page-container">
      <div className="mb-10 text-center">
        <h1 className="section-title">Gallery</h1>
        <p className="section-subtitle mx-auto">
          A glimpse of our clinic spaces, care moments, and healthy smiles.
        </p>
      </div>

      {loading ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div
              key={idx}
              className="h-64 animate-pulse rounded-2xl bg-slate-200/70"
            />
          ))}
        </div>
      ) : images.length === 0 ? (
        <div className="card-surface py-12 text-center">
          <p className="text-lg font-semibold text-slate-700">No images yet</p>
          <p className="mt-1 text-sm text-slate-500">
            Gallery updates will appear here soon.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((img, idx) => (
            <article
              key={img._id}
              className="card-surface fade-up group overflow-hidden p-2"
              style={{ animationDelay: `${idx * 80}ms` }}
            >
              <img
                src={getImageSrc(img._id)}
                alt="Dental clinic gallery"
                className="h-64 w-full rounded-xl object-cover transition duration-500 group-hover:scale-[1.03]"
                loading="lazy"
              />
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default Gallery;
