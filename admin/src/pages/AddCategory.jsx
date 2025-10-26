// import React, { useState } from "react";
// import axios from "axios";
// import { FiSave } from "react-icons/fi";
// import { BiCategoryAlt } from "react-icons/bi";
// import { RiImageAddFill } from "react-icons/ri";
// import toast from "react-hot-toast";

// const AddCategory = () => {
//   const [categories, setCategories] = useState([{ id: Date.now(), name: ""}]);
//   const [subCategories, setSubCategories] = useState({});
//   const [subCategory2Options, setSubCategory2Options] = useState({});
//   const [image, setImage] = useState(false)
//   const [loading, setLoading] = useState(false);

//   // Add new category
//   // const addCategory = () => {
//   //   setCategories([...categories, { id: Date.now(), name: "", image: null }]);
//   // };

//   // Update category name
//   const handleCategoryChange = (index, value) => {
//     const updated = [...categories];
//     updated[index].name = value;
//     setCategories(updated);
//   };

//   // Add subcategory
//   const addSubCategory = (categoryName) => {
//     setSubCategories({
//       ...subCategories,
//       [categoryName]: [...(subCategories[categoryName] || []), ""],
//     });
//   };

//   // Update subcategory
//   const handleSubCategoryChange = (categoryName, index, value) => {
//     const updated = [...(subCategories[categoryName] || [])];
//     updated[index] = value;
//     setSubCategories({ ...subCategories, [categoryName]: updated });
//   };

//   // Add subcategory2 option
//   const addSubCategory2Option = (subCategoryName) => {
//     setSubCategory2Options({
//       ...subCategory2Options,
//       [subCategoryName]: [...(subCategory2Options[subCategoryName] || []), ""],
//     });
//   };

//   // Update subcategory2 option
//   const handleSubCategory2Change = (subCategoryName, index, value) => {
//     const updated = [...(subCategory2Options[subCategoryName] || [])];
//     updated[index] = value;
//     setSubCategory2Options({
//       ...subCategory2Options,
//       [subCategoryName]: updated,
//     });
//   };

//   // Submit data
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true)
//     const formData = new FormData();
//     formData.append('image', image)
//     categories.forEach((cat, idx) => {
//       formData.append(`categories[${idx}][name]`, cat.name);
//     });

//     Object.keys(subCategories).forEach((catName) => {
//       subCategories[catName].forEach((sub, i) => {
//         formData.append(`subCategories[${catName}][${i}]`, sub);
//       });
//     });

//     Object.keys(subCategory2Options).forEach((subName) => {
//       subCategory2Options[subName].forEach((sub2, i) => {
//         formData.append(`subCategory2Options[${subName}][${i}]`, sub2);
//       });
//     });

//     try {
//       const res = await axios.post("http://localhost:8000/admin/save", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       toast.success("Category data saved successfully!");
//       setLoading(false)
//     } catch (error) {
//       console.error(error);
//       alert("Error saving data");
//     }
//   };

//   return (
//     <div className="w-full p-4 h-[90vh] overflow-scroll">
//       <div className="p-8 w-full bg-white rounded-xl shadow-md">
//         <span className="text-2xl font-bold mb-6 text-[#7B542F] flex items-center gap-4">
//           <BiCategoryAlt />
//           <h2>Category Manager</h2>
//         </span>

//         {categories.map((cat, catIndex) => (
//           <div key={cat.id} className="mb-6 border-b pb-4">
//             <div className="flex items-center gap-3 mb-2 max-sm:flex-col">
//               <input
//                 type="text"
//                 placeholder="Category Name"
//                 value={cat.name}
//                 onChange={(e) => handleCategoryChange(catIndex, e.target.value)}
//                 className="border rounded px-3 py-2 w-full"
//               />
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={(e)=>setImage(e.target.files[0])}
//                 className="border px-3 py-2 rounded max-sm:w-full"
//               />
//               {/* <button
//                 type="button"
//                 onClick={addCategory}
//                 className="bg-green-600 text-white px-3 py-2 rounded w-60"
//               >
//                 + Category
//               </button> */}
//             </div>

//             {/* Subcategories */}
//             {cat.name && (
//               <div className="ml-6 mb-3">
//                 <h3 className="font-semibold mb-2 text-gray-700">Subcategories for "{cat.name}"</h3>

//                 {(subCategories[cat.name] || []).map((sub, subIndex) => (
//                   <div key={subIndex} className="flex items-center gap-2 mb-2">
//                     <input
//                       type="text"
//                       placeholder="Subcategory"
//                       value={sub}
//                       onChange={(e) => handleSubCategoryChange(cat.name, subIndex, e.target.value)}
//                       className="border rounded px-3 py-2 w-full"
//                     />
//                     <button
//                       type="button"
//                       onClick={() => addSubCategory2Option(sub)}
//                       className="bg-indigo-500 text-white px-3 py-2 rounded w-60"
//                     >
//                       + Sub2
//                     </button>
//                   </div>
//                 ))}

//                 <button
//                   type="button"
//                   onClick={() => addSubCategory(cat.name)}
//                   className="bg-blue-500 text-white px-3 py-2 rounded"
//                 >
//                   + Add Subcategory
//                 </button>
//               </div>
//             )}
//           </div>
//         ))}

//         {/* Subcategory Level 2 */}
//         {Object.keys(subCategory2Options).length > 0 && (
//           <div className="mt-6">
//             <h3 className="font-bold text-lg text-gray-800 mb-3">🪄 Subcategory Level 2 Options</h3>
//             {Object.entries(subCategory2Options).map(([subName, options]) => (
//               <div key={subName} className="mb-4 border rounded-lg p-3 bg-gray-50">
//                 <h4 className="font-semibold mb-2">{subName}</h4>
//                 {options.map((opt, optIndex) => (
//                   <input
//                     key={optIndex}
//                     type="text"
//                     placeholder="Subcategory2 Option"
//                     value={opt}
//                     onChange={(e) => handleSubCategory2Change(subName, optIndex, e.target.value)}
//                     className="border rounded px-3 py-2 w-full mb-2"
//                   />
//                 ))}
//                 <button
//                   type="button"
//                   onClick={() => addSubCategory2Option(subName)}
//                   className="bg-blue-600 text-white px-3 py-2 rounded"
//                 >
//                   + Add Option
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}

//         <button
//           onClick={handleSubmit}
//           className={`mt-6 bg-[#7B542F] hover:bg-[#886544] text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-4 ${loading ? "cursor-no-drop" : "cursor-pointer"}`}
//         >
//           <FiSave className="text-[20px]" />
//           <p>
//             {loading ?
//               "Please wait..." :
//               "Save All"
//             }
            
//           </p>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AddCategory;


import React, { useContext, useState } from "react";
import axios from "axios";
import { FiSave } from "react-icons/fi";
import { BiCategoryAlt } from "react-icons/bi";
import toast from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";
import { AdminContext } from "../contexts/AdminContext";

const AddCategory = () => {
  const [categories, setCategories] = useState([{ id: Date.now(), name: "" }]);
  const [subCategories, setSubCategories] = useState({});
  const [subCategory2Options, setSubCategory2Options] = useState({});
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const {backendUrl} = useContext(AdminContext)

  // Add a new category
  const addCategory = () => {
    setCategories([...categories, { id: Date.now(), name: "" }]);
  };

  // Delete a category
  const deleteCategory = (index) => {
    const updatedCategories = [...categories];
    const removedCategory = updatedCategories.splice(index, 1)[0];
    setCategories(updatedCategories);

    // Remove associated subcategories
    const updatedSubCategories = { ...subCategories };
    delete updatedSubCategories[removedCategory.name];
    setSubCategories(updatedSubCategories);

    // Remove associated subcategory2 options
    const updatedSubCategory2Options = { ...subCategory2Options };
    Object.keys(updatedSubCategory2Options).forEach((key) => {
      if (key === removedCategory.name) delete updatedSubCategory2Options[key];
    });
    setSubCategory2Options(updatedSubCategory2Options);
  };

  // Update category name
  const handleCategoryChange = (index, value) => {
    const updated = [...categories];
    const oldName = updated[index].name;
    updated[index].name = value;
    setCategories(updated);

    // Rename keys in subCategories and subCategory2Options if name changes
    if (oldName && oldName !== value) {
      if (subCategories[oldName]) {
        const updatedSub = { ...subCategories };
        updatedSub[value] = updatedSub[oldName];
        delete updatedSub[oldName];
        setSubCategories(updatedSub);
      }
      if (subCategory2Options[oldName]) {
        const updatedSub2 = { ...subCategory2Options };
        updatedSub2[value] = updatedSub2[oldName];
        delete updatedSub2[oldName];
        setSubCategory2Options(updatedSub2);
      }
    }
  };

  // Add subcategory
  const addSubCategory = (categoryName) => {
    setSubCategories({
      ...subCategories,
      [categoryName]: [...(subCategories[categoryName] || []), ""],
    });
  };

  // Delete subcategory
  const deleteSubCategory = (categoryName, index) => {
    const updated = [...(subCategories[categoryName] || [])];
    const removedSub = updated.splice(index, 1)[0];
    setSubCategories({ ...subCategories, [categoryName]: updated });

    // Remove related subcategory2 options
    const updatedSubCategory2Options = { ...subCategory2Options };
    delete updatedSubCategory2Options[removedSub];
    setSubCategory2Options(updatedSubCategory2Options);
  };

  // Update subcategory
  const handleSubCategoryChange = (categoryName, index, value) => {
    const updated = [...(subCategories[categoryName] || [])];
    const oldValue = updated[index];
    updated[index] = value;
    setSubCategories({ ...subCategories, [categoryName]: updated });

    // Rename key in subCategory2Options if subcategory name changes
    if (subCategory2Options[oldValue]) {
      const updatedSub2 = { ...subCategory2Options };
      updatedSub2[value] = updatedSub2[oldValue];
      delete updatedSub2[oldValue];
      setSubCategory2Options(updatedSub2);
    }
  };

  // Add subcategory2 option
  const addSubCategory2Option = (subCategoryName) => {
    setSubCategory2Options({
      ...subCategory2Options,
      [subCategoryName]: [...(subCategory2Options[subCategoryName] || []), ""],
    });
  };

  // Delete subcategory2 option
  const deleteSubCategory2Option = (subName, index) => {
    const updated = [...(subCategory2Options[subName] || [])];
    updated.splice(index, 1);
    setSubCategory2Options({ ...subCategory2Options, [subName]: updated });
  };

  // Update subcategory2 option
  const handleSubCategory2Change = (subName, index, value) => {
    const updated = [...(subCategory2Options[subName] || [])];
    updated[index] = value;
    setSubCategory2Options({ ...subCategory2Options, [subName]: updated });
  };

  // Submit data
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    if (image) formData.append("image", image);

    categories.forEach((cat, idx) => {
      formData.append(`categories[${idx}][name]`, cat.name);
    });

    Object.keys(subCategories).forEach((catName) => {
      subCategories[catName].forEach((sub, i) => {
        formData.append(`subCategories[${catName}][${i}]`, sub);
      });
    });

    Object.keys(subCategory2Options).forEach((subName) => {
      subCategory2Options[subName].forEach((sub2, i) => {
        formData.append(`subCategory2Options[${subName}][${i}]`, sub2);
      });
    });

    try {
      await axios.post(backendUrl + "/admin/save", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Category data saved successfully!");
      setLoading(false);
    } catch (error) {
      console.error(error);
      alert("Error saving data");
      setLoading(false);
    }
  };

  return (
    <div className="w-full p-4 h-[90vh] overflow-scroll">
      <div className="p-8 w-full bg-white rounded-xl shadow-md">
        <span className="text-2xl font-bold mb-6 text-[#7B542F] flex items-center gap-4">
          <BiCategoryAlt />
          <h2>Category Manager</h2>
        </span>

        {/* Categories */}
        {categories.map((cat, catIndex) => (
          <div key={cat.id} className="mb-6 border-b pb-4">
            <div className="flex items-center gap-3 mb-2 max-sm:flex-col">
              <input
                type="text"
                placeholder="Category Name"
                value={cat.name}
                onChange={(e) => handleCategoryChange(catIndex, e.target.value)}
                className="border rounded px-3 py-2 w-full"
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                className="border px-3 py-2 rounded max-sm:w-full"
              />
              {/* <button
                type="button"
                onClick={() => deleteCategory(catIndex)}
                className="bg-red-500 text-white px-3 py-2 rounded"
              >
                Delete
              </button>
              <button
                type="button"
                onClick={addCategory}
                className="bg-green-600 text-white px-3 py-2 rounded"
              >
                + Category
              </button> */}
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
                      onClick={() => deleteSubCategory(cat.name, subIndex)}
                      className="bg-red-500 text-white px-3 py-2.5 rounded text-xl"
                    >
                      <RxCross2 />
                    </button>
                    <button
                      type="button"
                      onClick={() => addSubCategory2Option(sub)}
                      className="bg-indigo-500 text-white px-3 py-2 rounded min-w-40"
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
                  <div key={optIndex} className="flex items-center gap-2 mb-2">
                    <input
                      type="text"
                      placeholder="Subcategory2 Option"
                      value={opt}
                      onChange={(e) => handleSubCategory2Change(subName, optIndex, e.target.value)}
                      className="border rounded px-3 py-2 w-full"
                    />
                    <button
                      type="button"
                      onClick={() => deleteSubCategory2Option(subName, optIndex)}
                      className="bg-red-500 text-white px-3 py-2.5 rounded text-xl"
                    >
                      <RxCross2 />
                    </button>
                  </div>
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
          className={`mt-6 bg-[#7B542F] hover:bg-[#886544] text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-4 ${
            loading ? "cursor-no-drop" : "cursor-pointer"
          }`}
        >
          <FiSave className="text-[20px]" />
          <p>{loading ? "Please wait..." : "Save All"}</p>
        </button>
      </div>
    </div>
  );
};

export default AddCategory;
