import { Container, Nav, Navbar } from "react-bootstrap";



export function HeaderAdmin({ myProfile }) {
  return (
    <>
      <Navbar expand="lg" className=" bg-body-secondary">
        <Container fluid>
          <Navbar.Brand href="#home">Azinda delle Energie</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto ">
              <Nav.Link >Benevunto {myProfile.nomeUtente} {myProfile.cognomeUtente}</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
