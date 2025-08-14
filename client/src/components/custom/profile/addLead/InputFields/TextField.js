import React from "react";
import { Form, Col } from "react-bootstrap";

const TextField = ({
  field,
  value = "",
  onChange,
  type = "text",
  col = 12,
  withLabel = true,
  ...rest
}) => {
  return (
    <Col lg={col}>
      <Form.Group>
        {withLabel && (
          <Form.Label htmlFor={field.name}>{field.name}:</Form.Label>
        )}
        <Form.Control
          name={field.accessor}
          type={type}
          placeholder={"Enter " + field.name}
          value={value}
          onChange={onChange}
          {...rest}
        />
      </Form.Group>
    </Col>
  );
};

export default TextField;
