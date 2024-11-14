import { useState } from "react";
import { Col, Container, Form, ListGroup, Row } from "react-bootstrap";

export function BodyAdmin({ myProfile }) {
  const [fatture, setFatture] = useState([]);
  const [vediFatture, setVediFatture] = useState(false);

  function handleFatture(params) {
    viewAllFatture();
    setVediFatture(!vediFatture);
  }

  async function viewAllFatture() {
    let token = localStorage.getItem("myToken");
    try {
      const response = await fetch("http://localhost:3001/fatture", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const { content } = await response.json();
      setFatture(content);
    } catch {
      console.log("Errore nella lettura fatture");
    }
  }

  return (
    <Container fluid>
      <Row>
        <Col
          lg={2}
          className=" p-3 bg-body-secondary border border-top border-2"
        >
          <ListGroup>
            <ListGroup.Item action variant="secondary" onClick={handleFatture}>
              Fatture
            </ListGroup.Item>
            <ListGroup.Item action variant="secondary">
              Clienti
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col lg={10}>
          {vediFatture && (
            <Container className=" mt-3">
              <Row className=" g-1 bg-info p-1 rounded-2">
                <h3 className=" text-center">Tutte le fatture </h3>
                {fatture.map((fattura) => {
                  return (
                    <>
                      <Col lg={4}>
                        <ListGroup>
                          <ListGroup.Item variant="success">
                            Numero fattura: {fattura.numeroFattura}
                          </ListGroup.Item>
                          <ListGroup.Item variant="">
                            Importo: {fattura.importo}€
                          </ListGroup.Item>
                          <ListGroup.Item variant="">
                            Stato: {fattura.stato}
                          </ListGroup.Item>
                          <ListGroup.Item variant="">
                            Del cliente: {fattura.cliente.nomeCliente}
                          </ListGroup.Item>
                        </ListGroup>
                      </Col>
                    </>
                  );
                })}
              </Row>
              <Row className=" g-3 mt-2">
                <Col lg={6} className=" bg-body-tertiary p-2">
                  <h3> Crea Fattura </h3>
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Label>Numero fattura</Form.Label>
                      <Form.Control type="text" />
                    </Form.Group>
                    <Form.Group className="mb-3" >
                      <Form.Label>Importo</Form.Label>
                      <Form.Control type="text" />
                    </Form.Group>
                    <Form.Select className=" mb-3">
                      <option>Selezione lo stato della fattura</option>
                      <option value="PAGATA">PAGATA</option>
                      <option value="NON_PAGATA">NON PAGATA</option>
                      <option value="IN_SOSPESO">IN SOSPESO</option>
                    </Form.Select>

                    <Form.Control type="text" />
                    <Form.Group className="mb-3" >
                      <Form.Label>Parita Iva</Form.Label>
                      <Form.Control type="text" />
                    </Form.Group>


                  </Form>
                </Col>
                <Col lg={6}></Col>
              </Row>
            </Container>
          )}
        </Col>
      </Row>
    </Container>
  );
}
