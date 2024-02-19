import { BOOKLETS_PATH } from '../../../../paths';
import { useState } from 'react';
import React from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import * as formik from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';



const DefineNew = () => {
  const navigate = useNavigate();

  const { Formik } = formik; 

  const title_maxLength = 10;
  const schema = yup.object().shape({
    title: yup.string()
      .min(3, 'Too Short!')
      .max(title_maxLength, 'Too Long!')
      .required('Required')
  });

  return (
    <Row className="row justify-content-center">
      <Col xs={12} md={6} style={{ paddingLeft: '20px', paddingRight: '20px' }}>
        <Formik
          validationSchema={schema}
          onSubmit={console.log}
          initialValues={{
            title: 'mi'
          }}
        >
          {({ handleSubmit, handleChange, values, touched, errors }) => (
            <Form noValidate onSubmit={handleSubmit} >
              <Row className="mb-3">
                <Col>
                  <Form.Group as={Col} controlId="validationFormik01">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      name="title"
                      placeholder="Booklet title"
                      value={values.title}
                      onChange={handleChange}
                      isValid={touched.title && !errors.title}
                      maxLength={title_maxLength}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.title}
                    </Form.Control.Feedback>
                    {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col xs={12} className="gy-6">
                  <div className="d-flex justify-content-end gap-3">
                    <Button variant="outline-secondary" size="sm" className="px-5"
                      onClick={() => navigate(`${BOOKLETS_PATH}`)}>
                      Cancel
                    </Button>
                    <Button type="submit" variant="outline-primary" size="sm" className="px-5 px-sm-5">
                      Define Booklet
                    </Button>
                  </div>
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
      </Col>
    </Row>
  );
};

export default DefineNew;

