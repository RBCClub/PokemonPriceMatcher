import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';


function ResultList(props) {

    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <h3>Result List</h3>
                    </Col>
                </Row>
                <Row md={3}>
                    {
                        props.list.map((item, i) => (
                            <Col>
                                <Card>
                                    <Card.Img variant="top" src={item.images.small}/>
                                    <Card.Body>
                                        <Card.Title>{item.name}</Card.Title>
                                    </Card.Body>
                                    <ListGroup className="list-group-flush">
                                        <ListGroup.Item>HP: {item.hp}</ListGroup.Item>
                                    </ListGroup>
                                    <Card.Body>
                                        <Card.Link href="#">See Prices</Card.Link>
                                        <Card.Link href="#">Detailed View</Card.Link>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    }
                </Row>
            </Container>
        </>
    );
}

export default ResultList;