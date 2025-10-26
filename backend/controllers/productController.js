import sql from "../config/db.js";
import cloudinary from "../config/cloudinary.js";

export const toggleWishlist = async (req, res) => {
  try {
    const userId = req.userId;
    const { productId } = req.body;

    if (!productId) return res.status(400).json({ success: false, message: "Product ID required" });

    // Check if product is already in wishlist
    const existing = await sql`
      SELECT * FROM wishlist WHERE user_id = ${userId} AND product_id = ${productId};
    `;

    if (existing.length > 0) {
      await sql`
        DELETE FROM wishlist WHERE user_id = ${userId} AND product_id = ${productId};
      `;
      return res.json({ success: true, message: "Removed from wishlist", action: "removed" });
    } else {
      await sql`
        INSERT INTO wishlist (user_id, product_id)
        VALUES (${userId}, ${productId})
        ON CONFLICT (user_id, product_id) DO NOTHING;
      `;
      return res.json({ success: true, message: "Added to wishlist", action: "added" });
    }
  } catch (err) {
    console.error("Wishlist toggle error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get all wishlist items
export const getWishlist = async (req, res) => {
  try {
    const userId = req.userId;

    const result = await sql`
      SELECT p.* FROM products p
      JOIN wishlist w ON p.id = w.product_id
      WHERE w.user_id = ${userId}
      ORDER BY w.created_at DESC;
    `;

    res.json({ success: true, wishlist: result });
  } catch (err) {
    console.error("Get wishlist error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// Check if product is in wishlist
export const checkWishlist = async (req, res) => {
  try {
    const userId = req.userId;
    const { productId } = req.params;

    const result = await sql`
      SELECT * FROM wishlist WHERE user_id = ${userId} AND product_id = ${productId};
    `;

    res.json({ success: true, inWishlist: result.length > 0 });
  } catch (err) {
    console.error("Check wishlist error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};

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

export const editProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      discountPrice,
      originalPrice,
      metalType,
      categoryId,
      category,
      sub_category,
      sub_category2,
      offer,
      rating,
      color,
      tags,
      existingImages = "[]"
    } = req.body;

    const colorArr = typeof color === "string" ? JSON.parse(color) : color || [];
    const tagsArr = typeof tags === "string" ? JSON.parse(tags) : tags || [];
    const existing = typeof existingImages === "string" ? JSON.parse(existingImages) : existingImages;

    // Upload new files
    const uploadedImages = [];
    for (const file of req.files) {
      const result = await uploadToCloudinary(file.buffer);
      uploadedImages.push(result.secure_url);
    }

    // Merge
    const images = [...existing, ...uploadedImages];

    const result = await sql`
      UPDATE products
      SET
        name = ${name},
        description = ${description},
        discount_price = ${discountPrice},
        original_price = ${originalPrice},
        metal_type = ${metalType},
        category_id = ${categoryId},
        category = ${category},
        sub_category = ${sub_category},
        sub_category2 = ${sub_category2},
        offer = ${offer},
        rating = ${rating},
        color = ${JSON.stringify(colorArr)},
        tags = ${JSON.stringify(tagsArr)},
        images = ${JSON.stringify(images)}
      WHERE id = ${req.params.id}
      RETURNING *;
    `;

    res.json({ success: true, message: "Product updated", product: result[0] });
  } catch (err) {
    console.error("Edit Product Error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};


export const deleteProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await sql`
      DELETE FROM products
      WHERE id = ${id}
      RETURNING *;
    `;

    if (!result || result.length === 0) {
      return res.status(404).json({ success: false, message: "product not found" });
    }

    res.status(200).json({ success: true, message: "Product deleted", data: result[0] });
  } catch (err) {
    console.error("Delete product error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};