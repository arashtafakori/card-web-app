import { Row, Col, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCardPermanently, emptyCardsTrash } from '../../redux/card/api';
import { notifyError } from '../../redux/general/reducers/notificationReducer';
import { httpRequestStatus } from '../../../../utils/httpRequest';

interface Props {
  bookletId: string | undefined;
  indexId: string | null | undefined;
  onHide: () => void;
}

const EmptyCardsTrash = ({bookletId, indexId, onHide }: Props) => {
  let dispatch = useDispatch<any>();

  const handleMakingEmptyTrash = () => {
    dispatch(emptyCardsTrash({
      bookletId: bookletId,
      indexId: indexId
    }))
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
          Empty trash? All cards in Trash will be permanently deleted.
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
                onClick={handleMakingEmptyTrash} size="sm" className="px-5 px-sm-5">
                {
                  isLoading &&
                  <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                }
                Empty Trash
              </Button>
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default EmptyCardsTrash;

