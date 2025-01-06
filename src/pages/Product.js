import React, { useEffect, useState } from "react";
import { Button, Card, Table } from "antd";
import useProduct from "../hooks/useProduct";
import { Link } from "react-router-dom";

const columns = [
  {
    title: "Product ID",
    dataIndex: "id",
    key: "id",
    sorter: (a, b) => a.id.localeCompare(b.id),
  },
  {
    title: "Product Name",
    dataIndex: "title",
    key: "title",
    sorter: (a, b) => a.title.localeCompare(b.title),
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: "Rating",
    dataIndex: "rating.rate",
    key: "rating",
    sorter: (a, b) => a.rating.rate - b.rating.rate,
    render: (_, record) => <span>{record.rating.rate}</span>,
  },
  {
    title: "Product Category",
    dataIndex: "category",
    key: "category",
  },
  {
    title: "Actions",
    key: "actions",
    render: (_, record) => (
      <Link to={`/product/${record.id}`} state={{ product: record }}>
        <Button type="primary">Edit</Button>
      </Link>
    ),
    align: "right",
  },
];

const Product = () => {
  const { products, loading } = useProduct();
  const [filteredProducts, setFilteredProducts] = useState(null);
  const [favoriteCategories, setFavoriteCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const onClickHandler = (category) => {
    if (selectedCategory == category) {
      setSelectedCategory("");
    } else {
      setSelectedCategory(category);
    }
  };

  const filterProducts = (category) => {
    if (!products) return;
    setFilteredProducts(() => {
      if (!category) return products;
      return products.filter((product) => product.category == category);
    });
  };

  useEffect(() => {
    if (!products) return;
    setFilteredProducts(products);
    const set = new Set();

    products.forEach((product) => {
      set.add(product.category);
    });

    setFavoriteCategories([...set]);
  }, [products]);

  useEffect(() => {
    filterProducts(selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-3">
          <Card>
            <div className="pt-6">
              <h2 className="text-lg font-semibold mb-4">
                Favorite Categories
              </h2>
              <ul className="space-y-2">
                {favoriteCategories.map((category) => (
                  <li
                    key={category}
                    className={`text-blue-600 hover:text-blue-800 cursor-pointer ${
                      selectedCategory == category
                        ? "underline"
                        : "no-underline"
                    }`}
                    onClick={() => onClickHandler(category)}
                  >
                    • {category}
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </div>

        <div className="col-span-9">
          <Table
            columns={columns}
            dataSource={filteredProducts}
            rowKey="id"
            pagination={false}
            className="bg-white rounded-lg shadow"
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default Product;
