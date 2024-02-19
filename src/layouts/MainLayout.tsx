import { useState } from 'react';
import { Offcanvas, Container, Nav, Navbar, Button, ButtonGroup } from 'react-bootstrap';
import { Outlet, useNavigate } from 'react-router-dom';
import { BOOKLETS_PATH, BOOKLETS_DEFINE_NEW_PATH } from '../paths';

function MainLayout() {
  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="App">
        <Navbar expand={false} className="bg-body-tertiary mb-3" >
          <Container fluid>
            <Navbar.Toggle onClick={() => handleShow()} />
            <Navbar.Brand href="#">AppMemory</Navbar.Brand>

            <Navbar.Offcanvas show={show}
              onHide={handleClose}
              id={`offcanvasNavbar-expand-${false}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${false}`}
              placement="start"
              style={{ width: '200px' }}
            >
              <Offcanvas.Header>
                {/* <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${false}`}>
              AppMemory
            </Offcanvas.Title> */}
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <ButtonGroup vertical>
                    <Button variant="light" onClick={() => {navigate(`${BOOKLETS_PATH}`); handleClose(); }}>Booklet</Button>
                  </ButtonGroup>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
        <Outlet />
      </div>
    </>
  );
}

export default MainLayout;
