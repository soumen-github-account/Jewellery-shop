import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { FiSave } from "react-icons/fi";
import { BiCategoryAlt } from "react-icons/bi";
import { AdminContext } from "../contexts/AdminContext";
import toast from "react-hot-toast";

const EditCategory = () => {
    const {backendUrl} = useContext(AdminContext)
  const { id } = useParams();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([{ id: Date.now(), name: "" }]);
  const [subCategories, setSubCategories] = useState({});
  const [subCategory2Options, setSubCategory2Options] = useState({});
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch existing category data
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await axios.get(backendUrl + `/admin/get/${id}`);
        const cat = res.data.data; // adjust if backend sends differently

        setCategories(cat.categories || [{ id: Date.now(), name: "" }]);
        setSubCategories(cat.subcategories || {});
        setSubCategory2Options(cat.subcategory2options || {});
        setImage(cat.image_url || null);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching category:", err);
        setLoading(false);
      }
    };
    fetchCategory();
  }, [id]);

  // Update category name
  const handleCategoryChange = (index, value) => {
    const updated = [...categories];
    updated[index].name = value;
    setCategories(updated);
  };

  // Add Subcategory
  const addSubCategory = (categoryName) => {
    setSubCategories({
      ...subCategories,
      [categoryName]: [...(subCategories[categoryName] || []), ""],
    });
  };

  // Update subcategory
  const handleSubCategoryChange = (categoryName, index, value) => {
    const updated = [...(subCategories[categoryName] || [])];
    updated[index] = value;
    setSubCategories({ ...subCategories, [categoryName]: updated });
  };

  // Add Subcategory 2
  const addSubCategory2Option = (subCategoryName) => {
    setSubCategory2Options({
      ...subCategory2Options,
      [subCategoryName]: [...(subCategory2Options[subCategoryName] || []), ""],
    });
  };

  // Update Subcategory 2
  const handleSubCategory2Change = (subCategoryName, index, value) => {
    const updated = [...(subCategory2Options[subCategoryName] || [])];
    updated[index] = value;
    setSubCategory2Options({
      ...subCategory2Options,
      [subCategoryName]: updated,
    });
  };

  // Submit edited data
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (image instanceof File) {
      formData.append("image", image);
    }
    formData.append("categories", JSON.stringify(categories));
    formData.append("subCategories", JSON.stringify(subCategories));
    formData.append("subCategory2Options", JSON.stringify(subCategory2Options));

    try {
      const res = await axios.put(
        backendUrl + `/admin/update-category/${id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if (res.data.success) {
        toast.success("Category updated successfully!");
        navigate("/all-category");
      }
    } catch (error) {
      console.error(error);
      alert("Error updating category");
    }
  };

  if (loading) {
    return <div className="text-center mt-10">Loading category data...</div>;
  }

  return (
    <div className="w-full p-4 h-[90vh] overflow-scroll">
      <div className="p-8 w-full bg-white rounded-xl shadow-md">
        <span className="text-2xl font-bold mb-6 text-[#7B542F] flex items-center gap-4">
          <BiCategoryAlt />
          <h2>Edit Category</h2>
        </span>

        {categories.map((cat, catIndex) => (
          <div key={cat.id} className="mb-6 border-b pb-4">
            <div className="flex items-center gap-3 mb-2">
              <input
                type="text"
                placeholder="Category Name"
                value={cat.name}
                onChange={(e) => handleCategoryChange(catIndex, e.target.value)}
                className="border rounded px-3 py-2 w-full"
              />
              <div className="flex flex-col gap-2">
                {image && !(image instanceof File) && (
                  <img
                    src={image}
                    alt="Preview"
                    className="w-24 h-24 object-cover rounded border"
                  />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                  className="border px-3 py-2 rounded"
                />
              </div>
            </div>

            {/* Subcategories */}
            {cat.name && (
              <div className="ml-6 mb-3">
                <h3 className="font-semibold mb-2 text-gray-700">
                  Subcategories for "{cat.name}"
                </h3>

                {(subCategories[cat.name] || []).map((sub, subIndex) => (
                  <div key={subIndex} className="flex items-center gap-2 mb-2">
                    <input
                      type="text"
                      placeholder="Subcategory"
                      value={sub}
                      onChange={(e) =>
                        handleSubCategoryChange(cat.name, subIndex, e.target.value)
                      }
                      className="border rounded px-3 py-2 w-full"
                    />
                    <button
                      type="button"
                      onClick={() => addSubCategory2Option(sub)}
                      className="bg-indigo-500 text-white px-3 py-2 rounded w-60"
                    >
                      + Sub2
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => addSubCategory(cat.name)}
                  className="bg-blue-500 text-white px-3 py-2 rounded"
                >
                  + Add Subcategory
                </button>
              </div>
            )}
          </div>
        ))}

        {/* Subcategory Level 2 */}
        {Object.keys(subCategory2Options).length > 0 && (
          <div className="mt-6">
            <h3 className="font-bold text-lg text-gray-800 mb-3">
              🪄 Subcategory Level 2 Options
            </h3>
            {Object.entries(subCategory2Options).map(([subName, options]) => (
              <div key={subName} className="mb-4 border rounded-lg p-3 bg-gray-50">
                <h4 className="font-semibold mb-2">{subName}</h4>
                {options.map((opt, optIndex) => (
                  <input
                    key={optIndex}
                    type="text"
                    placeholder="Subcategory2 Option"
                    value={opt}
                    onChange={(e) =>
                      handleSubCategory2Change(subName, optIndex, e.target.value)
                    }
                    className="border rounded px-3 py-2 w-full mb-2"
                  />
                ))}
                <button
                  type="button"
                  onClick={() => addSubCategory2Option(subName)}
                  className="bg-blue-600 text-white px-3 py-2 rounded"
                >
                  + Add Option
                </button>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={handleSubmit}
          className="mt-6 bg-[#7B542F] hover:bg-[#886544] text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-4"
        >
          <FiSave className="text-[20px]" />
          <p>Save Changes</p>
        </button>
      </div>
    </div>
  );
};

export default EditCategory;
