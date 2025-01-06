import React, { useEffect } from "react";
import { Button, Card, Form, Input } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import {
  getLocalStorageItem,
  PRODUCTS,
  setLocalStorageItem,
} from "../utils/localStorageManager";

const ProjectDetail = () => {
  const favoriteProjects = ["Project A", "Project B"];
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = (values) => {
    const products = getLocalStorageItem(PRODUCTS);

    if (!products) return;

    const index = products.findIndex((product) => product.id == values.id);
    console.log({ index });
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
    <div className="p-6 max-w-6xl mx-auto">
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-3">
          <Card>
            <div className="pt-6">
              <h2 className="text-lg font-semibold mb-4">Favorite Projects</h2>
              <ul className="space-y-2">
                {favoriteProjects.map((project) => (
                  <li
                    key={project}
                    className="text-blue-600 hover:text-blue-800 cursor-pointer"
                  >
                    • {project}
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </div>

        <div className="col-span-9">
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
