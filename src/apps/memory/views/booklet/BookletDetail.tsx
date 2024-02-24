import { Row, Col } from 'react-bootstrap';
import { Booklet } from '../../models/booklet';

const BookletDetail: React.FC<Booklet> = (booklet) => {
  return (
    <Row className="row justify-content-center">
      <Col>
        <div className="email-detail-content px-4">
          <div className="text-1000 fs-9 w-100 w-md-75 mb-8">
            <span style={{ fontSize: '12px' }}> Title: <span style={{ fontSize: '15px' }}> {booklet.title}  </span> </span>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default BookletDetail;
