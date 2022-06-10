import { Button, Checkbox, Form, Input } from "antd";
import React from "react";

const App = () => {
  return (
    <Form
      name="basic"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: "Enter Username",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Enter Password",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
      >
        <Button type="primary" >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default App;
