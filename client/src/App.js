import logo from './logo.svg';
import React, {useState} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import ResultList from './components/resultlist.component';

import textSearch from './lib/textSearch';

function App() {
  const [searchResultList, setSearchResultList] = useState([]);
  const [searchBoxText, setSearchBoxText] = useState("");

  const handleSearchInput = (event) => {
    setSearchBoxText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSearchResultList(await textSearch(searchBoxText));
  }

  return (
    <div className="App">
      <Container>
        <Row>
          <Col>
            <h1>Pokemon Price Matcher</h1>
          </Col>
        </Row>
        <Row>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Pokemon Search</Form.Label>
              <Form.Control type="text" placeholder="Pikachu" value={searchBoxText} onChange={handleSearchInput}/>
            </Form.Group>
            <Button variant="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </Form>
        </Row>
      </Container>
      <ResultList list={searchResultList}></ResultList>
    </div>
  );
}

export default App;
