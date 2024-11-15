import { useEffect, useState } from "react";
import { Button, Col, Container, Form, ListGroup, Row } from "react-bootstrap";

export function BodyAdmin({ myProfile }) {
  const [fatture, setFatture] = useState([]);
  const [vediFatture, setVediFatture] = useState(false);

  const [newFattura, setNewFattura] = useState({
    dataFattura: "",
    importo: 0,
    numeroFattura: "",
    stato: "",
    pIva: "",
  });


  const[checkIdCliente, setIdCliente] = useState('')
  const[allButton, setAllButton] = useState({
    idCliente: false,
    statoFattura: false,
    data: false,
    anno: false,
    min: false,
    max: false
  })

  const[filterFattura, setFilterFattura] = useState({
    idCliente: "",
    statoFattura: "",
    data: "",
    anno: "",
    min: "",
    max: ""
  })
  const [rispostaCreazioneFattura, setRispostaCreazioneFattura] =
    useState(false);


  function handleFatture() {
    viewAllFatture();
    setVediFatture(!vediFatture);
  }

  function handleButtonidCliente(idCliente){
    setAllButton({
      ...allButton,
      idCliente: idCliente
    })

    if(idCliente)
      filter()
  }

  function handleButtonStato(stato){
    setAllButton({
      ...allButton,
      statoFattura: stato
    })
    if(stato)
      filter()
  }
  function handleButtonData(data){
    setAllButton({
      ...allButton,
      data: data
    })
    if(data)
      filter()
  }

  function handleButtonAnno(anno){
    setAllButton({
      ...allButton,
      anno: anno
    })
    console.log(anno)
    if(anno){
      filter()
    }
    else if(!anno) {
      setFilterFattura({
        ...filterFattura,
        anno: ""
    })


    }
      
  }

  useEffect(()=> {filter()}, [allButton])

  function handleButtonMin(min){
    setAllButton({
      ...allButton,
      min: min
    })
    if(min)
      filter()
  }
  function handleButtonMax(max){
    setAllButton({
      ...allButton,
      max: max
    })
    if(max)
      filter()

  }



  async function filter() {
    let token = localStorage.getItem('myToken')
    try{
      const response = await fetch(`http://localhost:3001/fatture/filtro?clienteId=${filterFattura.idCliente}&stato=${filterFattura.statoFattura}&data=${filterFattura.data}&anno=${filterFattura.anno}&importoMin=${filterFattura.min}&importoMax=${filterFattura.max}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const content = await response.json()
      console.log(content)
      setFatture(content)
    } catch {
      console.log('Errore nel filtro')
    }
    
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

  async function creaFattura(e) {
    e.preventDefault();
    console.log(newFattura)
    let token = localStorage.getItem("myToken");
    try {
      const response = await fetch("http://localhost:3001/fatture", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newFattura),
      
      });
      setRispostaCreazioneFattura(true);
      viewAllFatture()

    } catch {
      console.log("Errore nella creazione della fattura");
    } finally {
        e.target.reset()
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
                <Row>
                  <Col>
                    <Form.Control type="text" onChange={(e) => setFilterFattura({...filterFattura, idCliente: e.target.value})}/>
                    <Button variant={allButton.idCliente === false ? "warning" : "success"} onClick={() => handleButtonidCliente(!allButton.idCliente)}>Filtra per id cliente</Button>
                  </Col>
                  <Col><Form.Select value={filterFattura.statoFattura} onChange={(e) => setFilterFattura({...filterFattura, statoFattura: e.target.value})}>
                      <option value=""></option>
                      <option value="PAGATA">PAGATA</option>
                      <option value="NON_PAGATA">NON PAGATA</option>
                      <option value="IN_SOSPESO">IN SOSPESO</option>
                    </Form.Select>
                    <Button variant={allButton.statoFattura === false ? "warning" : "success"} onClick={() => handleButtonStato(!allButton.statoFattura)}>Filtra per stato</Button>
                    </Col>
                  <Col><Form.Control type="date" value={filterFattura.data} onChange={(e) => setFilterFattura({...filterFattura, data: e.target.value})}/>
                    <Button variant={allButton.data === false ? "warning" : "success"} onClick={() => handleButtonData(!allButton.data)}>Filtra per data</Button></Col>
                  <Col><Form.Control type="text" value={filterFattura.anno} onChange={(e) => setFilterFattura({...filterFattura, anno: e.target.value})}/>
                    <Button variant={allButton.anno === false ? "warning" : "success"} onClick={() => handleButtonAnno(!allButton.anno)}>Filtra per anno</Button></Col>
                  <Col><Form.Control type="text" value={filterFattura.min} onChange={(e) => setFilterFattura({...filterFattura, min: e.target.value})}/>
                    <Button variant={allButton.min === false ? "warning" : "success"} onClick={() => handleButtonMin(!allButton.min)}>Importo minimo</Button></Col>
                  <Col><Form.Control type="text" value={filterFattura.max} onChange={(e) => setFilterFattura({...filterFattura, max: e.target.value})}/>
                    <Button variant={allButton.max === false ? "warning" : "success"} onClick={() => handleButtonMax(!allButton.max)}>Importo massimo</Button>
                    </Col>
               
                </Row>
                {fatture?.map((fattura) => {
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
                  <Form onSubmit={creaFattura}>
                    <Form.Group className="mb-3">
                      <Form.Label>Numero fattura</Form.Label>
                      <Form.Control
                        type="text"
                        onChange={(e) => {
                          setNewFattura({
                            ...newFattura,
                            numeroFattura: e.target.value,
                          });
                        }}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Importo</Form.Label>
                      <Form.Control
                        type="number"
                        onChange={(e) => {
                          setNewFattura({
                            ...newFattura,
                            importo: e.target.value,
                          });
                        }}
                      />
                    </Form.Group>
                    <Form.Label>Stato</Form.Label>
                    <Form.Select
                      className=" mb-3"
                      onChange={(e) => {
                        setNewFattura({
                          ...newFattura,
                          stato: e.target.value,
                        });
                      }}
                    >
                      <option value="PAGATA">PAGATA</option>
                      <option value="NON_PAGATA">NON PAGATA</option>
                      <option value="IN_SOSPESO">IN SOSPESO</option>
                    </Form.Select>

                    <Form.Control
                      type="date"
                      onChange={(e) => {
                        setNewFattura({
                          ...newFattura,
                          dataFattura: e.target.value,
                        });
                      }}
                    />
                    <Form.Group className="mb-3">
                      <Form.Label>Parita Iva</Form.Label>
                      <Form.Control
                        type="text"
                        onChange={(e) => {
                          setNewFattura({
                            ...newFattura,
                            pIva: e.target.value,
                          });
                        }}
                      />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                      Crea fattura
                    </Button>
                    {rispostaCreazioneFattura && <>Fattura salvata con successo!!</>}
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
