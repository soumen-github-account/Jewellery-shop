import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { AdminContext } from "../contexts/AdminContext";
import toast from "react-hot-toast";

const EditProduct = () => {
  const {backendUrl} = useContext(AdminContext)
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState(null);

  // Image states
  const [existingImages, setExistingImages] = useState([]); // already uploaded URLs
  const [imageFiles, setImageFiles] = useState([]); // new files to upload
  const [previewImages, setPreviewImages] = useState([]); // preview for UI

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState({});
  const [subCategory2Options, setSubCategory2Options] = useState({});

  const offers = ["No Offer", "10%", "20%", "30%"];
  const colorOptions = ["Gold", "Silver", "Rose Gold", "Platinum"];
  const tagOptions = ["New", "Trending", "Under ₹5000", "Best Seller", "Limited Edition"];

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(backendUrl + `/products/get-product/${id}`);
        const product = res.data.product;

        setForm({
          id: product.id,
          name: product.name || "",
          description: product.description || "",
          originalPrice: product.original_price || 0,
          discountPrice: product.discount_price || 0,
          metalType: product.metal_type || "",
          categoryId: product.category_id || 0,
          category: product.category || "",
          sub_category: product.sub_category || "",
          sub_category2: product.sub_category2 || "",
          offer: product.offer || "No Offer",
          rating: product.rating || 0,
          color: typeof product.color === "string" ? JSON.parse(product.color) : product.color || [],
          tags: typeof product.tags === "string" ? JSON.parse(product.tags) : product.tags || [],
        });

        setExistingImages(product.images || []);
        setPreviewImages(product.images || []);
        setImageFiles(Array(product.images?.length || 0).fill(null));
      } catch (err) {
        console.error("Failed to fetch product:", err);
      }
    };
    fetchProduct();
  }, [id]);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(backendUrl + "/admin/get");
        if (res.data.success) {
          const allData = res.data.data || [];
          const mergedCategories = allData.flatMap((item) => item.categories || []);
          const mergedSubCategories = allData.reduce((acc, item) => {
            Object.entries(item.subcategories || {}).forEach(([k, v]) => {
              if (!acc[k]) acc[k] = [];
              acc[k].push(...v);
            });
            return acc;
          }, {});
          const mergedSubCategory2Options = allData.reduce((acc, item) => {
            Object.entries(item.subcategory2options || {}).forEach(([k, v]) => {
              if (!acc[k]) acc[k] = [];
              acc[k].push(...v);
            });
            return acc;
          }, {});
          setCategories(mergedCategories);
          setSubCategories(mergedSubCategories);
          setSubCategory2Options(mergedSubCategory2Options);
        }
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };
    fetchCategories();
  }, []);

  if (!form) return <p className="text-center mt-10">Loading...</p>;

  // Input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    let updated = { ...form, [name]: value };

    // Auto-calculate discount price
    if ((name === "originalPrice" || name === "offer") && updated.originalPrice) {
      let discount = parseFloat(updated.originalPrice);
      if (updated.offer && updated.offer !== "No Offer") {
        const percent = parseFloat(updated.offer.replace("%", ""));
        discount = updated.originalPrice - (updated.originalPrice * percent) / 100;
      }
      updated.discountPrice = discount.toFixed(2);
    }

    setForm(updated);
  };

  // Image change
  const handleFileChange = (e, index) => {
    const file = e.target.files[0];
    const files = [...imageFiles];
    files[index] = file;
    setImageFiles(files);

    const previews = [...previewImages];
    previews[index] = URL.createObjectURL(file);
    setPreviewImages(previews);
  };

  // Delete image
  const handleDeleteImage = (index) => {
    const existing = [...existingImages];
    if (existing[index]) existing.splice(index, 1);
    setExistingImages(existing);

    const previews = [...previewImages];
    previews.splice(index, 1);
    setPreviewImages(previews);

    const files = [...imageFiles];
    files.splice(index, 1);
    setImageFiles(files);
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();

      Object.keys(form).forEach((key) => {
        if (Array.isArray(form[key])) {
          data.append(key, JSON.stringify(form[key]));
        } else {
          data.append(key, form[key]);
        }
      });

      data.append("existingImages", JSON.stringify(existingImages));

      imageFiles.forEach((file) => {
        if (file) data.append("images", file);
      });

      await axios.put(backendUrl + `/products/edit-product/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      toast.success("Product updated successfully!");
      navigate("/all-product");
    } catch (err) {
      console.error("Failed to update product:", err);
      alert("Error updating product");
    }
  };

  return (
    <div className="p-6 overflow-scroll h-[90vh]">
      <h1 className="text-xl font-semibold text-[#7B542F] mb-4">Edit Product</h1>
      <form
        className="bg-white p-5 rounded-lg shadow-md border border-gray-200 space-y-4"
        onSubmit={handleSubmit}
      >
        {/* Images */}
        <div className="grid grid-cols-5 gap-2">
          {previewImages.map((img, i) => (
            <div key={i} className="relative">
              <img src={img} alt={`Preview ${i}`} className="h-20 w-full object-cover rounded-md mb-1" />
              <button
                type="button"
                onClick={() => handleDeleteImage(i)}
                className="absolute top-0 right-0 bg-red-500 text-white px-1 rounded-full"
              >
                X
              </button>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, i)}
                className="border p-2 w-full rounded-md mt-1"
              />
            </div>
          ))}
          {/* Add new image slots if less than 5 */}
          {previewImages.length < 5 &&
            Array.from({ length: 5 - previewImages.length }).map((_, i) => (
              <input
                key={i + previewImages.length}
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, previewImages.length + i)}
                className="border p-2 w-full rounded-md"
              />
            ))}
        </div>

        {/* Other fields */}
        <input type="text" name="name" placeholder="Product Name" value={form.name} onChange={handleChange} className="border p-2 w-full rounded-md" />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} className="border p-2 w-full rounded-md" />
        <input type="number" name="originalPrice" placeholder="Original Price" value={form.originalPrice} onChange={handleChange} className="border p-2 w-full rounded-md" />
        <select name="offer" value={form.offer} onChange={handleChange} className="border p-2 w-full rounded-md">
          {offers.map((offer) => <option key={offer}>{offer}</option>)}
        </select>
        <input type="number" name="discountPrice" value={form.discountPrice} readOnly className="border p-2 w-full rounded-md bg-gray-100" />
        <input type="text" name="metalType" placeholder="Metal Type" value={form.metalType} onChange={handleChange} className="border p-2 w-full rounded-md" />

        {/* Categories */}
        <select name="category" value={form.category} onChange={(e) => {
          const selected = e.target.value;
          const categoryObj = categories.find((c) => c.name === selected);
          setForm({ ...form, category: selected, categoryId: categoryObj?.id || 0, sub_category: "", sub_category2: "" });
        }} className="border p-2 w-full rounded-md">
          <option value="">Select Category</option>
          {categories.map((cat) => <option key={cat.id} value={cat.name}>{cat.name}</option>)}
        </select>
        <select name="sub_category" value={form.sub_category} onChange={(e) => setForm({ ...form, sub_category: e.target.value, sub_category2: "" })} className="border p-2 w-full rounded-md">
          <option value="">Select Sub Category</option>
          {form.category && subCategories[form.category]?.map((sub) => <option key={sub}>{sub}</option>)}
        </select>
        <select name="sub_category2" value={form.sub_category2} onChange={(e) => setForm({ ...form, sub_category2: e.target.value })} className="border p-2 w-full rounded-md">
          <option value="">Select Sub Category 2</option>
          {form.sub_category && subCategory2Options[form.sub_category]?.map((sub) => <option key={sub}>{sub}</option>)}
        </select>

        <input type="number" name="rating" placeholder="Rating" min="0" max="5" step="0.1" value={form.rating} onChange={handleChange} className="border p-2 w-full rounded-md" />

        {/* Colors */}
        <div className="border p-2 rounded-md flex flex-wrap gap-3">
          {colorOptions.map((color) => (
            <label key={color} className="flex items-center gap-1">
              <input
                type="checkbox"
                checked={form.color?.includes(color)}
                onChange={(e) => {
                  const updatedColors = e.target.checked ? [...form.color, color] : form.color.filter((c) => c !== color);
                  setForm({ ...form, color: updatedColors });
                }}
              />
              {color}
            </label>
          ))}
        </div>

        {/* Tags */}
        <div className="border p-2 rounded-md flex flex-wrap gap-3">
          {tagOptions.map((tag) => (
            <label key={tag} className="flex items-center gap-1">
              <input
                type="checkbox"
                checked={form.tags?.includes(tag)}
                onChange={(e) => {
                  const updatedTags = e.target.checked ? [...form.tags, tag] : form.tags.filter((t) => t !== tag);
                  setForm({ ...form, tags: updatedTags });
                }}
              />
              {tag}
            </label>
          ))}
        </div>

        <button type="submit" className="bg-[#7B542F] text-white px-5 py-2 rounded-md hover:bg-[#6b4523]">
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
