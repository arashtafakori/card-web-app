import { Col, Dropdown, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { BOOKLETS_PATH } from '../../../../paths';
import { Booklet } from '../../models/booklet';
import { CiMenuKebab } from "react-icons/ci";

interface BookletProps {
    booklet: Booklet;
    index: number;
}

const BookletItem = ({booklet, index}: BookletProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`${BOOKLETS_PATH}/${booklet.id}`, { state: { booklet } });
  };

  return (
    <div className="border-bottom">
      <Row className="gx-2">
        <Col className="col-auto">
          <p onClick={handleClick}>
            {booklet.title}
          </p>
        </Col>
        <Col className="col-auto ms-auto">
          <div className="hover-actions end-0">
            <Dropdown>
              <Dropdown.Toggle
                variant=" -secondary"
                className="btn-icon"
              >
              <CiMenuKebab />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#!">View</Dropdown.Item>
                <Dropdown.Item href="#!">Edit</Dropdown.Item>
                <Dropdown.Item href="#!" className="text-danger">
                  Remove
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default BookletItem;
