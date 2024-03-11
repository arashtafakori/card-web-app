import { Row, Col, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCardPermanently } from '../../redux/card/api';
import { notifyError } from '../../redux/general/reducers/notificationReducer';
import { httpRequestStatus } from '../../../../utils/httpRequest';
import { Card } from '../../models/card';

interface CardProps {
  card: Card;
  onHide: () => void;
}

const DeleteCardPermanently = ({ card, onHide }: CardProps) => {
  let dispatch = useDispatch<any>();

  const handleDeletingPermanently = () => {
    dispatch(deleteCardPermanently(card.id))
      .unwrap()
      .then((data: any) => {
        onHide();
      })
      .catch((error: any) => {
        dispatch(notifyError(error));
      });
  };

  const httpState = useSelector((state: any) => state.cardsList);
  const isLoading = httpState.status === httpRequestStatus.Pending
    && httpState.typePrefix === deleteCardPermanently.typePrefix;

  return (
    <Row className="row justify-content-center">
      <Col>
        <Row className="mb-4">
          Delete card forever?
        </Row>
        <Row className="mb-3">
          <Col xs={12} className="gy-6">
            <div className="d-flex justify-content-end gap-3">
              <Button variant="outline-secondary"
                disabled={isLoading}
                onClick={onHide} size="sm" className="px-5 px-sm-5">
                Cancel
              </Button>
              <Button variant="outline-primary"
                disabled={isLoading}
                onClick={handleDeletingPermanently} size="sm" className="px-5 px-sm-5">
                {
                  isLoading &&
                  <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                }
                Delete
              </Button>
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default DeleteCardPermanently;

