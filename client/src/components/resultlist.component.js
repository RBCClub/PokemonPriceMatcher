import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';


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
                                        <Card.Text>HP: {item.hp}</Card.Text>
                                        <Button variant="primary">See Prices</Button>
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