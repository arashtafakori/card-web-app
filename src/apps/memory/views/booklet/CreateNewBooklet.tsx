import { Form, Row, Col, Button, InputGroup } from 'react-bootstrap';
import * as formik from 'formik';
import * as yup from 'yup';
import { FormikHelpers } from 'formik';
import { useDispatch } from 'react-redux';
import { createNewBooklet } from '../../redux/booklet/api';
import { notifyError } from '../../redux/booklet/reducers/notificationReducer';

interface FormValues {
  title: string;
}

const CreateNewBooklet: React.FC<{ onHide: () => void }> = ({ onHide }) => {
  const initialFormValues: FormValues = {
    title: ''
  };

  const { Formik } = formik;

  const title_maxLength = 50;

  const schema = yup.object().shape({
    title: yup.string()
      .min(3, 'Too Short!')
      .max(title_maxLength, 'Too Long!')
      .required('Required')
  });

  let dispatch = useDispatch<any>();

  const handleCreateBooklet = (values: FormValues, approveSubmitting: Function) => {
    dispatch(createNewBooklet(values))
      .unwrap()
      .then((data: any) => {
        approveSubmitting();
        onHide();
      })
      .catch((error: any) => {
        dispatch(notifyError(error));
      });
  };

  return (
    <Row className="row justify-content-center">
      <Col>
        <Formik
          validationSchema={schema}
          onSubmit={(
            values: FormValues,
            { setSubmitting }: FormikHelpers<FormValues>
          ) => {
            handleCreateBooklet(values,
              () => {
                setSubmitting(false);
              }
            );
          }}
          initialValues={initialFormValues}
        >
          {({ handleSubmit, handleChange, values, touched, errors }) => (
            <Form noValidate onSubmit={handleSubmit} >
              <Row className="mb-3">
                <Col>
                  <Form.Group as={Col} controlId="validationFormik01">
                    <Form.Label>Title</Form.Label>
                    <InputGroup hasValidation>
                      <Form.Control
                        type="text"
                        name="title"
                        placeholder=""
                        value={values.title}
                        onChange={handleChange}
                        isInvalid={!!errors.title}
                        isValid={touched.title && !errors.title}
                        maxLength={title_maxLength}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.title}
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col xs={12} className="gy-6">
                  <div className="d-flex justify-content-end gap-3">
                    <Button variant="outline-secondary" onClick={onHide} size="sm" className="px-5 px-sm-5">
                      Cancel
                    </Button>
                    <Button type="submit" variant="outline-primary" size="sm" className="px-5 px-sm-5">
                      Create
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

export default CreateNewBooklet;

