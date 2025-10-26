
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AdminContext } from "../contexts/AdminContext";
import toast from "react-hot-toast";

const AddProduct = () => {
  const {backendUrl} = useContext(AdminContext)
  const [form, setForm] = useState({
    name: "",
    description: "",
    discountPrice: 0,
    originalPrice: 0,
    metalType: "",
    categoryId: 0,
    category: "",
    sub_category: "",
    sub_category2: "",
    offer: "No Offer",
    images: [],
    rating: 0,
    color: [],
    tags: [],
  });

  const [imageFiles, setImageFiles] = useState([]);

  // State for dynamic categories
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState({});
  const [subCategory2Options, setSubCategory2Options] = useState({});

  const offers = ["No Offer", "10%", "20%", "30%"];
  const colorOptions = ["Gold", "Silver", "Rose Gold", "Platinum"];
  const tagOptions = ["New", "Trending", "Under ₹5000", "Best Seller", "Limited Edition"];

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedForm = { ...form, [name]: value };

    // Auto-calculate discount price
    if ((name === "originalPrice" || name === "offer") && updatedForm.originalPrice) {
      let discount = parseFloat(updatedForm.originalPrice);
      if (updatedForm.offer && updatedForm.offer !== "No Offer") {
        const percent = parseFloat(updatedForm.offer.replace("%", ""));
        discount = updatedForm.originalPrice - (updatedForm.originalPrice * percent) / 100;
      }
      updatedForm.discountPrice = parseFloat(discount.toFixed(2));
    }

    setForm(updatedForm);
  };

  // Handle image selection
  const handleFileChange = (e, index) => {
    const files = [...imageFiles];
    files[index] = e.target.files[0];
    setImageFiles(files);
  };

  // Submit product to backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      Object.keys(form).forEach((key) => {
        if (key === "color" || key === "tags") {
          data.append(key, JSON.stringify(form[key]));
        } else {
          data.append(key, form[key]);
        }
      });

      imageFiles.forEach((file) => {
        if (file) data.append("images", file);
      });

      const res = await axios.post(backendUrl + "/products/add-product", data, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      toast.success("Product added successfully!");

      // Reset form
      setForm({
        name: "",
        description: "",
        discountPrice: 0,
        originalPrice: 0,
        metalType: "",
        categoryId: 0,
        category: "",
        sub_category: "",
        sub_category2: "",
        offer: "No Offer",
        images: [],
        rating: 0,
        color: [],
        tags: [],
      });
      setImageFiles([]);
    } catch (err) {
      console.error(err);
      alert("Error adding product");
    }
  };

  // Fetch categories from backend
  useEffect(() => {
  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:8000/admin/get"); // ✅ no destructuring
      if (res.data.success) {
        console.log(res.data.data);

        // If your API returns multiple rows (as we fixed earlier):
        const allData = res.data.data || [];

        // Merge all categories
        const mergedCategories = allData.flatMap((item) => item.categories || []);

        // Merge subcategories
        const mergedSubCategories = allData.reduce((acc, item) => {
          Object.entries(item.subcategories || {}).forEach(([key, value]) => {
            if (!acc[key]) acc[key] = [];
            acc[key].push(...value);
          });
          return acc;
        }, {});

        // Merge subcategory2options
        const mergedSubCategory2Options = allData.reduce((acc, item) => {
          Object.entries(item.subcategory2options || {}).forEach(([key, value]) => {
            if (!acc[key]) acc[key] = [];
            acc[key].push(...value);
          });
          return acc;
      }, {});

      setCategories(mergedCategories);
      setSubCategories(mergedSubCategories);
      setSubCategory2Options(mergedSubCategory2Options);

      }
    } catch (err) {
      console.error("Failed to fetch categories", err);
    }
  };

  fetchCategories();
  }, []);


  return (
    <div className="p-6 overflow-scroll h-[90vh]">
      <h1 className="text-xl font-semibold text-[#7B542F] mb-4">Add Product</h1>
      <form className="bg-white p-5 rounded-lg shadow-md border border-gray-200 space-y-4" onSubmit={handleSubmit}>
        {/* Product Details */}
        <input type="text" name="name" placeholder="Product Name" value={form.name} onChange={handleChange} className="border p-2 w-full rounded-md" />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} className="border p-2 w-full rounded-md" />

        {/* Prices & Offer */}
        <input type="number" name="originalPrice" placeholder="Original Price" value={form.originalPrice} onChange={handleChange} className="border p-2 w-full rounded-md" />
        <select name="offer" value={form.offer} onChange={handleChange} className="border p-2 w-full rounded-md">
          {offers.map((offer) => <option key={offer} value={offer}>{offer}</option>)}
        </select>
        <input type="number" name="discountPrice" placeholder="Discount Price" value={form.discountPrice} readOnly className="border p-2 w-full rounded-md bg-gray-100" />

        {/* Metal & Color */}
        <input type="text" name="metalType" placeholder="Metal Type" value={form.metalType} onChange={handleChange} className="border p-2 w-full rounded-md" />

        {/* Category Dropdowns */}
        <select
          name="category"
          value={form.category}
          onChange={(e) => {
            const selectedCategory = e.target.value;
            const categoryObj = categories.find((cat) => cat.name === selectedCategory);
            setForm({
              ...form,
              category: selectedCategory,
              categoryId: categoryObj?.id || 0,
              sub_category: "",
              sub_category2: "",
            });
          }}
          className="border p-2 w-full rounded-md"
        >
          <option value="">Select Category</option>
          {categories.map((cat) => <option key={cat.id} value={cat.name}>{cat.name}</option>)}
        </select>

        <select
          name="sub_category"
          value={form.sub_category}
          onChange={(e) => setForm({ ...form, sub_category: e.target.value, sub_category2: "" })}
          className="border p-2 w-full rounded-md"
          disabled={!form.category}
        >
          <option value="">Select Sub Category</option>
          {form.category && subCategories[form.category]?.map((sub) => <option key={sub} value={sub}>{sub}</option>)}
        </select>

        <select
          name="sub_category2"
          value={form.sub_category2}
          onChange={(e) => setForm({ ...form, sub_category2: e.target.value })}
          className="border p-2 w-full rounded-md"
          disabled={!form.sub_category}
        >
          <option value="">Select Sub Category 2</option>
          {form.sub_category && subCategory2Options[form.sub_category]?.map((sub) => <option key={sub} value={sub}>{sub}</option>)}
        </select>

        {/* Rating & Tags */}
        <input type="number" name="rating" placeholder="Rating" value={form.rating} onChange={handleChange} className="border p-2 w-full rounded-md" min="0" max="5" step="0.1" />

        {/* Color Multi-select */}
        <div className="border p-2 rounded-md flex flex-wrap gap-2">
          {colorOptions.map((color) => (
            <label key={color} className="flex items-center gap-1">
              <input
                type="checkbox"
                value={color}
                checked={form.color.includes(color)}
                onChange={(e) => {
                  const checked = e.target.checked;
                  let newColors = [...form.color];
                  if (checked) newColors.push(color);
                  else newColors = newColors.filter((c) => c !== color);
                  setForm({ ...form, color: newColors });
                }}
              />
              {color}
            </label>
          ))}
        </div>

        {/* Tags Multi-select */}
        <div className="border p-2 rounded-md flex flex-wrap gap-2">
          {tagOptions.map((tag) => (
            <label key={tag} className="flex items-center gap-1">
              <input
                type="checkbox"
                value={tag}
                checked={form.tags.includes(tag)}
                onChange={(e) => {
                  const checked = e.target.checked;
                  let newTags = [...form.tags];
                  if (checked) newTags.push(tag);
                  else newTags = newTags.filter((t) => t !== tag);
                  setForm({ ...form, tags: newTags });
                }}
              />
              {tag}
            </label>
          ))}
        </div>

        {/* Image Uploads */}
        <div className="grid grid-cols-5 gap-2">
          {[0, 1, 2, 3, 4].map((i) => (
            <input key={i} type="file" accept="image/*" onChange={(e) => handleFileChange(e, i)} className="border p-2 w-full rounded-md" />
          ))}
        </div>

        <button className="bg-[#7B542F] text-white px-5 py-2 rounded-md hover:bg-[#6b4523]">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
