import { Form, Row, Col, Button, InputGroup } from 'react-bootstrap';
import * as formik from 'formik';
import * as yup from 'yup';
import { FormikHelpers } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { editIndexName } from '../../redux/index/api';
import { httpRequestStatus } from '../../../../utils/httpRequest';
import { Index } from '../../models/index';
import { notifyError } from '../../redux/general/reducers/notificationReducer';

interface FormValues {
  id: string;
  name: string;
}

interface IndexProps {
  index: Index;
  onHide: () => void;
}

const EditIndexName = ({ index, onHide }: IndexProps) => {
  let dispatch = useDispatch<any>();

  const { Formik } = formik;
  const initialFormValues: FormValues = {
    id: index.id,
    name: index.name
  };
  const title_maxLength = 50;
  const schema = yup.object().shape({
    name: yup.string()
      .min(3, 'Too Short!')
      .max(title_maxLength, 'Too Long!')
      .required('Required')
  });
  const handleEditing = (values: FormValues, approveSubmitting: Function) => {
    dispatch(editIndexName(values))
      .unwrap()
      .then((data: any) => {
        approveSubmitting();
        onHide();
      })
      .catch((error: any) => {
        dispatch(notifyError(error));
      });
  };
  //------------
  const httpState = useSelector((state: any) => state.indicesList);
    const isLoading = httpState.status === httpRequestStatus.Pending
     && httpState.typePrefix === editIndexName.typePrefix ;

  return (
    <Row className="row justify-content-center">
      <Col>
        <Formik
          validationSchema={schema}
          onSubmit={(
            values: FormValues,
            { setSubmitting }: FormikHelpers<FormValues>
          ) => {
            handleEditing(values,
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
                        name="name"
                        placeholder=""
                        value={values.name}
                        onChange={handleChange}
                        isInvalid={!!errors.name}
                        isValid={touched.name && !errors.name}
                        maxLength={title_maxLength}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.name}
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col xs={12} className="gy-6">
                  <div className="d-flex justify-content-end gap-3">
                    <Button variant="outline-secondary" 
                    disabled={isLoading}
                    onClick={onHide} size="sm" className="px-5 px-sm-5">
                      Cancel
                    </Button>
                    <Button type="submit" 
                    disabled={isLoading}
                    variant="outline-primary" size="sm" className="px-5 px-sm-5">
                    {
                        isLoading &&
                        <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                      }
                      Edit
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

export default EditIndexName;

