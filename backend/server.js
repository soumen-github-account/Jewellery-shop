
import express from "express";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import cookieParser from "cookie-parser";
import "dotenv/config";
import "./config/passport.js";
import { connectDb } from "./config/mongodb.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import adminRoutes from "./routes/adminRoutes.js"
import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cookieParser());

// CORS setup (frontend <-> backend communication)
// app.use(
//   cors({
//     origin: process.env.CLIENT_URL,
//     credentials: true,
//   })
// );
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://jewellery-shop-blush.vercel.app",
  "https://jewellery-shop-frontend-henna.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);


app.use(
  session({
    secret: process.env.SESSION_SECRET || "supersecretkey",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production", 
      sameSite: "None", 
      httpOnly: true,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

connectDb();

app.get("/", (req, res) => {
  res.send("API is working");
});

// ================= SITEMAP =================

app.get("/sitemap.xml", async (req, res) => {
  try {

    // Fetch products from NeonDB
    const result = await pool.query(`
      SELECT id, name
      FROM products
    `);

    const products = result.rows;

    // Static URLs
    const staticUrls = `
      <url>
        <loc>https://jewellery-shop-frontend-henna.vercel.app/</loc>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
      </url>

      <url>
        <loc>https://jewellery-shop-frontend-henna.vercel.app/all-product</loc>
        <changefreq>daily</changefreq>
        <priority>0.9</priority>
      </url>

      <url>
        <loc>https://jewellery-shop-frontend-henna.vercel.app/category/rings</loc>
        <changefreq>weekly</changefreq>
        <priority>0.9</priority>
      </url>

      <url>
        <loc>https://jewellery-shop-frontend-henna.vercel.app/category/necklaces</loc>
        <changefreq>weekly</changefreq>
        <priority>0.9</priority>
      </url>
    `;

    // Dynamic Product URLs
    const productUrls = products
      .map((product) => {

        const formattedName = product.name
          .toLowerCase()
          .trim()
          .replace(/\s+/g, "-")
          .replace(/[^\w-]+/g, "");

        return `
          <url>
            <loc>
              https://jewellery-shop-frontend-henna.vercel.app/product-view/${formattedName}/${product.id}
            </loc>
            <changefreq>weekly</changefreq>
            <priority>0.95</priority>
          </url>
        `;
      })
      .join("");

    // Final Sitemap XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>

    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

      ${staticUrls}

      ${productUrls}

    </urlset>`;

    res.header("Content-Type", "application/xml");
    res.send(sitemap);

  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/admin", adminRoutes)


app.listen(port, () => console.log(`Server running on port ${port}`));
