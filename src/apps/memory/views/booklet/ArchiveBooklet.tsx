import { Row, Col, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { archiveBooklet } from '../../redux/booklet/api';
import { httpRequestStatus } from '../../../../utils/httpRequest';
import { Booklet } from '../../models/booklet';
import { notifyError } from '../../redux/general/reducers/notificationReducer';

interface BookletProps {
  booklet: Booklet;
  onHide: () => void;
}

const ArchiveBooklet = ({ booklet, onHide }: BookletProps) => {
  let dispatch = useDispatch<any>();

  const handleCreateBooklet = () => {
    dispatch(archiveBooklet(booklet.id))
      .unwrap()
      .then((data: any) => {
        onHide();
      })
      .catch((error: any) => {
        dispatch(notifyError(error));
      });
  };

  const httpState = useSelector((state: any) => state.bookletsList);
  const isLoading = httpState.status === httpRequestStatus.Pending
    && httpState.typePrefix === archiveBooklet.typePrefix;

  return (
    <Row className="row justify-content-center">
      <Col>
        <Row>
          <Col>
            <div className="email-detail-content px-4">
              <div className="text-1000 fs-9 w-100 w-md-75 mb-8">
                <span style={{ fontSize: '12px' }}> Title: <span style={{ fontSize: '15px' }}> {booklet.title}  </span> </span>
              </div>
            </div>
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
              <Button variant="outline-secondary"
                disabled={isLoading}
                onClick={handleCreateBooklet} size="sm" className="px-5 px-sm-5">
                {
                  isLoading &&
                  <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                }
                Archive
              </Button>
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default ArchiveBooklet;

