import React from "react";

import { Form, Col } from "react-bootstrap";

const TextField = ({
  field,
  data,
  onChange,
  type = "text",
  col = 12,
  withLabel = true,
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
          onChange={(e) => onChange(e)}
        />
      </Form.Group>
    </Col>
  );
};

export default TextField;
