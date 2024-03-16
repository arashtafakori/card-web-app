import { Form, Row, Col, Button, InputGroup } from 'react-bootstrap';
import * as formik from 'formik';
import * as yup from 'yup';
import { FormikHelpers } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { addCard } from '../../redux/card/api';
import { notifyError } from '../../redux/general/reducers/notificationReducer';
import { httpRequestStatus } from '../../../../utils/httpRequest';;

interface FormValues {
  bookletId: string | undefined;
  indexId: string | undefined| null;
  expression: string;
  expressionLanguage: string;
  translation: string | null;
  translationLanguage: string | null;
  description: string | null;
}

interface CardProps {
  bookletId: string | undefined;
  indexId: string | undefined| null;
  onHide: () => void;
}

const AddCard= ({ bookletId, indexId, onHide }: CardProps) => {
  const initialFormValues: FormValues = {
    bookletId: bookletId,
    indexId: indexId,
    expression: '',
    expressionLanguage: 'de',
    translation: '',
    translationLanguage: 'en',
    description: ''
  };

  const { Formik } = formik;
  const expression_maxLength = 1024;
  const translation_maxLength = 1024;
  const description_maxLength = 1024;

  const schema = yup.object().shape({
    expression: yup.string()
      .min(1, 'Too Short!')
      .max(expression_maxLength, 'Too Long!')
      .required('Required'),
       translation: yup.string()
      .min(1, 'Too Short!')
      .max(translation_maxLength, 'Too Long!'),
      description: yup.string()
      .max(translation_maxLength, 'Too Long!')
  });

  let dispatch = useDispatch<any>();

  const handleAdding = (values: FormValues, approveSubmitting: Function) => {
    dispatch(addCard(values))
      .unwrap()
      .then((data: any) => {
        approveSubmitting();
        onHide();
      })
      .catch((error: any) => {
        dispatch(notifyError(error));
      });
  };

  const httpState = useSelector((state: any) => state.cardsList);
  const isLoading = httpState.status === httpRequestStatus.Pending 
  && httpState.typePrefix === addCard.typePrefix ;

  return (
    <Row className="row justify-content-center">
      <Col>
        <Formik
          validationSchema={schema}
          onSubmit={(
            values: FormValues,
            { setSubmitting }: FormikHelpers<FormValues>
          ) => {
            handleAdding(values,
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
                    <Form.Label>Expression</Form.Label>
                    <InputGroup hasValidation>
                      <Form.Control
                        type="text"
                        name="expression"
                        placeholder=""
                        value={values.expression}
                        onChange={handleChange}
                        isInvalid={!!errors.expression}
                        isValid={touched.expression && !errors.expression}
                        maxLength={expression_maxLength}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.expression}
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col>
                  <Form.Group as={Col} controlId="validationFormik01">
                    <Form.Label>Translation</Form.Label>
                    <InputGroup hasValidation>
                      <Form.Control
                        type="text"
                        name="translation"
                        placeholder=""
                        value={values.translation!}
                        onChange={handleChange}
                        isInvalid={!!errors.translation}
                        isValid={touched.translation && !errors.translation}
                        maxLength={translation_maxLength}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.translation}
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col>
                  <Form.Group as={Col} controlId="validationFormik01">
                    <Form.Label>Description</Form.Label>
                    <InputGroup hasValidation>
                      <Form.Control
                        type="text"
                        name="description"
                        placeholder=""
                        value={values.description!}
                        onChange={handleChange}
                        isInvalid={!!errors.description}
                        isValid={touched.description && !errors.description}
                        maxLength={description_maxLength}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.description}
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

export default AddCard;

