import React, { useEffect } from "react";
import { Button, Card, Form, Input } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import {
  getLocalStorageItem,
  PRODUCTS,
  setLocalStorageItem,
} from "../utils/localStorageManager";

const ProjectDetail = () => {
  const favoriteProjects = ["Product A", "Product B"];
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = (values) => {
    const products = getLocalStorageItem(PRODUCTS);

    if (!products) return;

    const index = products.findIndex((product) => product.id == values.id);

    if (index === undefined || index == -1) return;

    const product = products[index];

    const updatedProduct = {
      ...product,
      title: values.title,
      price: values.price,
      rating: {
        ...product.rating,
        rate: values.rating,
      },
      category: values.category,
    };

    products[index] = updatedProduct;

    setLocalStorageItem(PRODUCTS, products);
    navigate("/");
  };

  const getProduct = (id) => {
    const products = getLocalStorageItem(PRODUCTS);
    if (!products) return;

    const product = products.find((product) => product.id == id);
    if (product) {
      form.setFieldsValue({
        id: product.id,
        title: product.title,
        price: product.price,
        rating: product.rating.rate,
        category: product.category,
      });
    } else {
      form.resetFields();
    }
  };

  useEffect(() => {
    if (id) {
      getProduct(id);
    }
  }, [id, form]);

  return (
    <div className="flex">
      <div className="fixed border-r-[3px] border-gray-200 top-0 bottom-0 left-0 h-svh w-[250px]">
        <div className="p-4 pt-16 h-full">
          <h2 className="text-xl font-semibold mb-4">Favorite Projects</h2>
          <ul className="flex flex-col pl-10 gap-2 list-disc">
            {favoriteProjects.map((project) => (
              <li key={project} className="text-black text-lg cursor-pointer">
                {project}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="ml-auto w-[calc(100%-250px)]">
        <div className="p-10 pt-16">
          <Card title="Project Detail Page" className="shadow">
            <Form form={form} layout="vertical" onFinish={onFinish}>
              <Form.Item label="Product ID" name="id" className="mb-4">
                <Input disabled />
              </Form.Item>

              <Form.Item
                label="Product Name"
                name="title"
                className="mb-4"
                rules={[
                  {
                    required: true,
                    message: "Please input the product name!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Price"
                name="price"
                className="mb-4"
                rules={[
                  {
                    required: true,
                    message: "Please input the price!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Rating"
                name="rating"
                className="mb-4"
                rules={[
                  {
                    required: true,
                    message: "Please input the rating!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Product Category"
                name="category"
                className="mb-4"
                rules={[
                  {
                    required: true,
                    message: "Please input the category!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="bg-blue-600"
                >
                  Update
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
