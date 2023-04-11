// import logo from './logo.svg';
import './App.css';
import { useState,useEffect } from 'react';
import axios from "axios"
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';


function App() {


  const [data, setData] = useState([])
  useEffect(()=>{
    const trending = () => {
      const options = {
        method: 'GET',
        url: 'https://bing-news-search1.p.rapidapi.com/news',
        params: {safeSearch: 'Off', textFormat: 'Raw'},
        headers: {
          'X-BingApis-SDK': 'true',
          'X-RapidAPI-Key': '927458ade3msh6163248bdffe610p1b88d0jsnecf53af81a5f',
          'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
        }
      };
      
      axios.request(options).then(function (response) {
        // console.log(response.data.value)
        setData(response.data.value);
      }).catch(function (error) {
        console.error(error);
      });
      
      
    }
    trending();
    
    
  },[])
console.log(data)


  return (
    <div className="App">
      <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>Cras justo odio</ListGroup.Item>
        <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
        <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
      </ListGroup>
      <Card.Body>
        <Card.Link href="#">Card Link</Card.Link>
        <Card.Link href="#">Another Link</Card.Link>
      </Card.Body>
    </Card>
      
    </div>
  );
}

export default App;
