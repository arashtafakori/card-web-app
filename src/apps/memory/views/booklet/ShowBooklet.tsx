import { FaAngleLeft } from "react-icons/fa";
import { Card, Row, Col, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { BOOKLETS_PATH } from '../../../../route/paths';
// import { useSelector, useDispatch } from "react-redux";
// import { useEffect } from 'react';
// import { getBooklet } from '../../redux/booklet/api';
import { httpState, httpRequestStatus } from  '../../../../utils/httpRequest';
import { Booklet } from '../../models/booklet';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getBooklet } from "../../redux/booklet/api";

const ShowBooklet = () => {
  const navigate = useNavigate();

  const { bookletId } = useParams();

  // const location = useLocation();
  // const booklet = location.state?.booklet as Booklet;

  let dispatch = useDispatch<any>();
  useEffect(() => {
    dispatch(getBooklet(bookletId));
  }, [dispatch]);
  const httpState = useSelector((state: any) => state.booklet as httpState<Booklet>)
  const booklet = httpState.data as Booklet;

  return (
    <Row className="row justify-content-center">
      <Col xs={12} md={6} style={{ paddingLeft: '20px', paddingRight: '20px' }}>
        <Card>
          <Card.Header  >
            <div className="d-flex flex-between-center ">
              <Button
                variant="link"
                className="p-0 text-800 me-3"
                onClick={() => navigate(`${BOOKLETS_PATH}`)}
              >
                <FaAngleLeft />
              </Button>

              {/* <RevealDropdownTrigger>
              <RevealDropdown>
                <Dropdown.Item>Edit</Dropdown.Item>
                <Dropdown.Item className="text-danger">Remove</Dropdown.Item>
              </RevealDropdown>
            </RevealDropdownTrigger> */}
            </div>
          </Card.Header>
          <Card.Body className="p-0 pb-4 scrollbar">
            <div className="email-detail-content px-4">
              <div className="text-1000 fs-9 w-100 w-md-75 mb-8">
                {
                httpState.status == httpRequestStatus.Fullfilled &&
                <p>
                  {booklet.title}
                </p>
              }

                {/* <p>
                  {booklet.title}
                </p> */}
              </div>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default ShowBooklet;
