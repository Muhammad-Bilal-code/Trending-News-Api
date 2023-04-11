// import logo from './logo.svg';
import './App.css';
import { useState,useEffect } from 'react';
import axios from "axios"
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import moment from 'moment/moment';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
// import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';


function App() {

  const [searchState,setSeacrhState] = useState("")
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
        // console.log(response)
        setData(response.data.value);
      }).catch(function (error) {
        console.error(error);
      });
      
      
    }
    trending();
    
    
  },[])
console.log(data)

const handlesearchTrending = (e) => {
  e.preventDefault();
  console.log("test",searchState)
  const options = { //api call
    method: 'GET',
    url: 'https://bing-news-search1.p.rapidapi.com/news/search',
    params: {q: searchState, freshness: 'Day', textFormat: 'Raw', safeSearch: 'Off'},
    headers: {
      'X-BingApis-SDK': 'true',
      'X-RapidAPI-Key': '927458ade3msh6163248bdffe610p1b88d0jsnecf53af81a5f',
      'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
    }
  };
  
  
  axios.request(options).then(function (response) {
    // console.log(response.data.value)
    // console.log(response)
    setData(response.data.value);
  }).catch(function (error) {
    console.error(error);
  });
  
  
}
// searchTrending();


  return (

<>

      <div className="serch-bar">
      <Navbar bg="light" expand="lg">
      <Container container-fluid className='my-container-navbar'>  

          <Form className="d-flex" onClick={handlesearchTrending}>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={(e)=>{setSeacrhState(e.target.value)}}
            />
            <Button variant="outline-success" type='submit'>Search</Button>
          </Form>
      </Container>
    </Navbar>
      </div>

<div className="cards-main">

      {(data.length<1)?"Please Search Correct Keyword":data.map((elm)=>{
        return (
          <Card style={{ width: '18rem' }} key={elm.url}>
      <Card.Img variant="top" src={(elm?.image?.thumbnail?.contentUrl)?elm?.image?.thumbnail?.contentUrl:`No Thumbnail`} alt='No Thumbnail to Show' />
      <Card.Body>
        <Card.Title>{elm.name}</Card.Title>
        <Card.Text>
        {elm.description}
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item><strong>Date Posted : </strong>{moment(elm.datePublished).format('MMMM Do YYYY, h:mm:ss a')}</ListGroup.Item>
        <ListGroup.Item>{moment(elm.datePublished).startOf('hour').fromNow()}</ListGroup.Item>
        <ListGroup.Item><strong>Provider : </strong>{elm.provider[0].name}</ListGroup.Item>
      </ListGroup>
      <Card.Body>
        <Card.Link target = "_blank" href={elm.url}>See Details</Card.Link>
        {/* <Card.Link href="#">Another Link</Card.Link> */}
      </Card.Body>
    </Card>
        )
      })}


      
      
    </div>
</>


    
  );
}

export default App;