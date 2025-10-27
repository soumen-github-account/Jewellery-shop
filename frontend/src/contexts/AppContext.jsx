import { createContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [wishlist, setWishlist] = useState([]);
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [width, setWidth] = useState(window.innerWidth);
  const [jewelleryData, setJewelleryData] = useState([]);
  const [toggleLoading, setToggleLoading] = useState(false)
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const navigate = useNavigate()
  // Track window width
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Check localStorage (manual login) OR backend session (Google login)
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      // If manual login exists, use it directly
      setUser(JSON.parse(storedUser));
      setLoadingUser(false);
    } else {
      // Otherwise check Google session from backend
      axios
        .get(`${backendUrl}/auth/user`, { withCredentials: true })
        .then((res) => {
          if (res.data.success) setUser(res.data.user);
          else setUser(null);
        })
        .catch(() => setUser(null))
        .finally(() => setLoadingUser(false));
    }
  }, [backendUrl]);

  // Wishlist toggle
  // const toggleWishlist = async(item) => {
  //   try {
  //     const productId = item.id
  //   if (!user) {
  //     toast.error("Please login to add items to wishlist!");
  //     return;
  //   }

  //   // setWishlist((prev) => {
  //   //   const exists = prev.some((item) => item.id === product.id);
  //   //   return exists
  //   //     ? prev.filter((item) => item.id !== product.id)
  //   //     : [...prev, product];
  //   // });

  //   const {data} = await axios.post(
  //     `${backendUrl}/products/toggle`,
  //     { productId },
  //     { withCredentials: true }
  //   );

  //   if(data.success) {
  //     toast.success(data.message)
  //   } else{
  //     console.log(data.message)
  //   }
 
  //   } catch (error) {
  //     console.log(error)
  //   }
  // };

  const toggleWishlist = async (item) => {
    setToggleLoading(true);
    try {
      if (!user) {
        toast.error("Please login to add items to wishlist!");
        navigate('/login')
        setToggleLoading(false)
        return;
      }

      const { data } = await axios.post(
        `${backendUrl}/products/toggle`,
        { productId: item.id },
        { withCredentials: true }
      );

      if (data.success) {
        // Update local wishlist based on backend response
        setWishlist((prevWishlist) => {
          if (data.action === "added") return [...prevWishlist, item];
          else return prevWishlist.filter((i) => i.id !== item.id);
        });
        toast.success(data.message);
        setToggleLoading(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
    
  };


  const isInWishlist = (id) => {
    if (!user) return false;
    return wishlist.some((item) => item.id === id);
  };

  const getJewelleryData = async () => {
    try {
      const {data} = await axios.get(backendUrl + "/products/get-product", {withCredentials: true})
      if(data.success){
        setJewelleryData(data.products)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getWishListProduct = async()=>{
    setWishlistLoading(true)
    try {
      const { data } = await axios.get(`${backendUrl}/products/get`, { withCredentials: true });
      setWishlist(data.wishlist);
      console.log(data.wishlist)
      setWishlistLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    getJewelleryData()
    if (user) getWishListProduct();
  },[user])

  const value = {
    backendUrl,
    width,
    wishlist,
    toggleWishlist,
    isInWishlist,
    user,
    setUser,
    loadingUser,
    jewelleryData,
    toggleLoading,
    wishlistLoading
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
