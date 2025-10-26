
import cloudinary from "../config/cloudinary.js";
import sql from "../config/db.js";
import { Order } from "../models/Order.js";

const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: "image" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    stream.end(fileBuffer);
  });
};

export const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      originalPrice,
      discountPrice,
      offer,
      metalType,
      categoryId,
      category,
      sub_category,
      sub_category2,
      rating,
      color,
      tags,
    } = req.body;

    // Upload all images to Cloudinary sequentially
    const files = req.files || [];
    const images = [];

    for (const file of files) {
      const result = await uploadToCloudinary(file.buffer);
      images.push(result.secure_url);
    }

    const query = `
      INSERT INTO products
      (name, description, original_price, discount_price, offer, metal_type, category_id, category, sub_category, sub_category2, rating, color, tags, images)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
      RETURNING *;
    `;

    const values = [
      name,
      description,
      parseFloat(originalPrice),
      parseFloat(discountPrice),
      offer,
      metalType,
      parseInt(categoryId),
      category,
      sub_category,
      sub_category2,
      parseFloat(rating),
      color ? JSON.stringify(JSON.parse(color)) : "[]",
      tags ? JSON.stringify(JSON.parse(tags)) : "[]",
      JSON.stringify(images),
    ];

    const result = await sql.query(query, values);

    // Only one response is sent
    return res.json({ success: true, product: result[0] });
  } catch (err) {
    console.error("Controller error:", err);
    if (!res.headersSent) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }
};

export const getProducts = async (req, res) => {
  try {
    const result = await sql`SELECT * FROM products ORDER BY id DESC`;
    const count = await sql`SELECT COUNT(*) FROM products`;

    res.json({ success: true, products: result, totalProducts: Number(count[0].count) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
};


export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) return res.status(400).json({ success: false, message: "Product ID required" });

    const result = await sql`
      SELECT * FROM products WHERE id = ${parseInt(id)};
    `;

    if (result.length === 0) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.json({ success: true, product: result[0] });
  } catch (err) {
    console.error("Get product by ID error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};


// ------ category setup -------------

export const saveCategoryData = async (req, res) => {
  try {
    const { categories, subCategories, subCategory2Options } = req.body;

    // Parse safely in case frontend sent JSON strings
    const categoriesArr =
      typeof categories === "string" ? JSON.parse(categories) : (categories || []);
    const subCategoriesObj =
      typeof subCategories === "string" ? JSON.parse(subCategories) : (subCategories || {});
    const subCategory2Obj =
      typeof subCategory2Options === "string"
        ? JSON.parse(subCategory2Options)
        : (subCategory2Options || {});

    // Upload main image
    let mainImageUrl = null;
    if (req.file) {
      const imageUpload = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "image",
      });
      mainImageUrl = imageUpload.secure_url;
    }

    // Convert to JSON for storage
    const categoriesJson = JSON.stringify(categoriesArr);
    const subCategoriesJson = JSON.stringify(subCategoriesObj);
    const subCategory2Json = JSON.stringify(subCategory2Obj);

    // Insert into Neon (PostgreSQL)
    const result = await sql`
      INSERT INTO category_data (categories, subcategories, subcategory2options, image_url)
      VALUES (${categoriesJson}::jsonb, ${subCategoriesJson}::jsonb, ${subCategory2Json}::jsonb, ${mainImageUrl})
      RETURNING *;
    `;

    res.status(201).json({
      success: true,
      message: "Category data saved successfully!",
      data: result[0],
    });
  } catch (err) {
    console.error("Save category error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};


export const getCategoryData = async (req, res) => {
  try {
    const result = await sql`SELECT * FROM category_data;`;
    res.status(200).json({
      success: true,
      count: result.length,
      data: result,
    });
  } catch (err) {
    console.error("Get category error:", err);
    res.status(500).json({ success: false, message: "Database error" });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await sql`SELECT * FROM category_data WHERE id = ${id};`;

    if (result.length === 0) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }

    res.status(200).json({ success: true, data: result[0] });
  } catch (err) {
    console.error("Get category by ID error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const { categories, subCategories, subCategory2Options } = req.body;

    // Parse safely in case frontend sent JSON strings
    const categoriesArr =
      typeof categories === "string" ? JSON.parse(categories) : (categories || []);
    const subCategoriesObj =
      typeof subCategories === "string" ? JSON.parse(subCategories) : (subCategories || {});
    const subCategory2Obj =
      typeof subCategory2Options === "string"
        ? JSON.parse(subCategory2Options)
        : (subCategory2Options || {});

    // Upload new image if provided
    let imageUrl = null;
    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "image",
      });
      imageUrl = uploadResult.secure_url;
    }

    // Convert to JSON string for PostgreSQL
    const categoriesJson = JSON.stringify(categoriesArr);
    const subCategoriesJson = JSON.stringify(subCategoriesObj);
    const subCategory2Json = JSON.stringify(subCategory2Obj);

    // Update DB
    const result = await sql`
      UPDATE category_data
      SET categories = ${categoriesJson}::jsonb,
          subcategories = ${subCategoriesJson}::jsonb,
          subcategory2options = ${subCategory2Json}::jsonb,
          image_url = COALESCE(${imageUrl}, image_url)
      WHERE id = ${id}
      RETURNING *;
    `;

    if (!result || result.length === 0) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }

    res.status(200).json({ success: true, message: "Category updated", data: result[0] });
  } catch (err) {
    console.error("Update category error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await sql`
      DELETE FROM category_data
      WHERE id = ${id}
      RETURNING *;
    `;

    if (!result || result.length === 0) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }

    res.status(200).json({ success: true, message: "Category deleted", data: result[0] });
  } catch (err) {
    console.error("Delete category error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};


export const addOrder = async(req, res)=>{
  try {
    const {name, product, quantity} = req.body;
    if(!name || !product || !quantity){
      res.json({success: false, message:"Missing details"})
    }
    const id = Math.floor(100 + Math.random() * 900);
    const order = new Order({
      order_id: id,
      name,
      product,
      quantity
    })
    await order.save();
    res.json({success:true, message:"Order added"})
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
}

export const getOrder = async(req, res)=>{
  try {
    const orders = await Order.find();
    const totalOrders = await Order.countDocuments();
    res.json({success: true, orders: orders, totalOrders})
  } catch (error) {
    res.json({success: false, message: error})
  }
}


export const deleteOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findByIdAndDelete(id);

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.status(200).json({ success: true, message: "Order deleted successfully", data: order });
  } catch (error) {
    console.error("Delete order error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

