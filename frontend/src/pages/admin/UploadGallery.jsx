import { useState } from "react";
import { uploadGalleryImage } from "../../api/galleryApi";
import { toast } from "sonner";

const UploadGallery = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return toast.warning("Please select an image.");

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);
      await uploadGalleryImage(formData);
      toast.success("Image uploaded successfully!");
      setFile(null);
      setPreview(null);
    } catch {
      toast.error("Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Upload Gallery Image
      </h1>

      <form onSubmit={handleUpload} className="space-y-6">
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="max-h-64 mx-auto rounded-lg mb-4"
            />
          ) : (
            <p className="text-gray-400">Click below to select an image</p>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-4"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-primary text-white px-8 py-3 rounded-lg font-medium hover:bg-primary-dark transition disabled:opacity-50 w-full"
        >
          {loading ? "Uploading..." : "Upload Image"}
        </button>
      </form>
    </div>
  );
};

export default UploadGallery;
