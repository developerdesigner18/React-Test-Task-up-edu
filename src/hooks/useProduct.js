import { useEffect, useState } from "react";
import axios from "axios";
import {
  getLocalStorageItem,
  PRODUCTS,
  setLocalStorageItem,
} from "../utils/localStorageManager";

const useProduct = () => {
  const [products, setProducts] = useState(
    getLocalStorageItem(PRODUCTS) || null
  );
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get("https://fakestoreapi.com/products?limit=5");
      setProducts(res.data);
      setLocalStorageItem(PRODUCTS, res.data);
    } catch (error) {
      console.log(error);
      setProducts([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!products) {
      fetchProducts();
    } else {
      setLoading(false);
    }
  }, [products]);

  return { products, loading };
};

export default useProduct;
