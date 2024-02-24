import { Form, Row, Col, Button, InputGroup } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { deleteBooklet } from '../../redux/booklet/api';
import { Booklet } from '../../models/booklet';


interface BookletProps {
  booklet: Booklet;
  onHide: () => void;
}

const DeleteBooklet = ({ booklet, onHide }: BookletProps) => {
  let dispatch = useDispatch<any>();

  const handleCreateBooklet = () => {
    dispatch(deleteBooklet(booklet.id))
      .unwrap()
      .then((data: any) => {
        onHide();
      })
      .catch((err: any) => {
        // alert(JSON.stringify(err, null, 2));
      });
  };

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
              <Button variant="outline-secondary" onClick={onHide} size="sm" className="px-5 px-sm-5">
                Cancel
              </Button>
              <Button variant="outline-danger" onClick={handleCreateBooklet} size="sm" className="px-5 px-sm-5">
                Delete
              </Button>
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default DeleteBooklet;

