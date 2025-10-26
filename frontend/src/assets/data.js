
import p1 from '../assets/products/p1.jpeg'
import p2 from '../assets/products/p2.jpeg'
import p3 from '../assets/products/p3.jpeg'
import p4 from '../assets/products/p4.jpeg'
import p5 from '../assets/products/p5.jpeg'
import p6 from '../assets/products/p6.jpeg'
import p7 from '../assets/products/p7.jpeg'
import p8 from '../assets/products/p8.jpeg'

import c1 from '../assets/category/c1.png'
import c2 from '../assets/category/c2.png'
import c3 from '../assets/category/c3.png'
import c4 from '../assets/category/c4.png'
import c5 from '../assets/category/c5.png'
import c6 from '../assets/category/c6.png'


export const jewelleryData = [
  {
    id: 1,
    name: "The Gilded Echo Hoops",
    description: "Elegant 24k gold plated hoops with a timeless rounded design.",
    metalType: "Gold",
    categoryId: 101,
    category: "Earrings",
    sub_category: "Hoops",
    sub_category2: "Classic Hoops",
    discountPrice: 235.0,
    originalPrice: 295.0,
    offer: "20%",
    images: [p1, p2, p3, p4],
    rating: 4.8,
    color: "Gold",
    tags: ["New", "Trending", "Under ₹5000"]
  },
  {
    id: 2,
    name: "The Whispering Tide Earrings",
    description: "Wave-inspired gold earrings reflecting coastal charm.",
    metalType: "Gold",
    categoryId: 101,
    category: "Earrings",
    sub_category: "Drop Earrings",
    sub_category2: "Wave Design",
    discountPrice: 195.0,
    originalPrice: 245.0,
    offer: "20%",
    images: [p2, p2, p2, p2],
    rating: 4.6,
    color: "Rose Gold",
    tags: ["Best Seller", "Under ₹5000"]
  },
  {
    id: 3,
    name: "The Fragment of Dawn Pendant",
    description: "Intricate gold texture pendant inspired by morning light reflections.",
    metalType: "Gold",
    categoryId: 102,
    category: "Necklace",
    sub_category: "Pendant",
    sub_category2: "Textured Pendant",
    discountPrice: 430.0,
    originalPrice: 510.0,
    offer: "15%",
    images: [p3, p3, p3, p3],
    rating: 4.9,
    color: "Gold",
    tags: ["Trending", "Under ₹5000"]
  },
  {
    id: 4,
    name: "The Lunar Current Earrings",
    description: "A celestial pair combining moonlit tones and pure gold finish.",
    metalType: "Gold",
    categoryId: 101,
    category: "Earrings",
    sub_category: "Studs",
    sub_category2: "Celestial Theme",
    discountPrice: 225.0,
    originalPrice: 280.0,
    offer: "20%",
    images: [p4, p4, p4, p4],
    rating: 4.7,
    color: "Gold",
    tags: ["Limited Edition", "Under ₹5000"]
  },
  {
    id: 5,
    name: "The Erosion Hoops",
    description: "Organic texture earrings representing time and transformation.",
    metalType: "Gold",
    categoryId: 101,
    category: "Earrings",
    sub_category: "Hoops",
    sub_category2: "Textured Hoops",
    discountPrice: 480.0,
    originalPrice: 560.0,
    offer: "14%",
    images: [p5, p5, p5, p5],
    rating: 4.9,
    color: "Yellow Gold",
    tags: ["New", "Yellow Gold", "Under ₹5000"]
  },
  {
    id: 6,
    name: "The Fossil Whisper Bracelet",
    description: "Nature-inspired bracelet crafted with layered gold tones.",
    metalType: "Gold",
    categoryId: 103,
    category: "Bracelet",
    sub_category: "Cuff",
    sub_category2: "Nature Inspired",
    discountPrice: 235.0,
    originalPrice: 295.0,
    offer: "20%",
    images: [p6, p6, p6, p6],
    rating: 4.8,
    color: "Gold",
    tags: ["Trending", "Under ₹5000"]
  },
  {
    id: 7,
    name: "The Golden Sentiment Ring",
    description: "A refined statement piece perfect for timeless elegance.",
    metalType: "Gold",
    categoryId: 104,
    category: "Rings",
    sub_category: "Statement Ring",
    sub_category2: "Minimal",
    discountPrice: 225.0,
    originalPrice: 290.0,
    offer: "22%",
    images: [p7, p7, p7, p7],
    rating: 4.5,
    color: "Gold",
    tags: ["Best Seller", "Under ₹5000"]
  },
  {
    id: 8,
    name: "The Diamond Crest Necklace",
    description: "A delicate diamond-studded gold chain designed for grace.",
    metalType: "Diamond",
    categoryId: 102,
    category: "Necklace",
    sub_category: "Chain",
    sub_category2: "Diamond-Studded",
    discountPrice: 760.0,
    originalPrice: 910.0,
    offer: "16%",
    images: [p8, p8, p8, p8],
    rating: 4.9,
    color: "White Gold",
    tags: ["Limited Edition", "Trending", "Under ₹10000"]
  },
];




export const categoryData = [
  {
    id: 1,
    name: "Necklaces",
    img: c1,
  },
  {
    id: 2,
    name: "Earrings",
    img: c2,
  },
  {
    id: 3,
    name: "Bracelets",
    img: c3,
  },
  {
    id: 4,
    name: "Rings",
    img: c4,
  },
  {
    id: 5,
    name: "Anklets",
    img: c5,
  },
  {
    id: 6,
    name: "Brooches",
    img: c6,
  }
]
