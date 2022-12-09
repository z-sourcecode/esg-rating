import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image'
import ESGFormula from '../Styling/Images/esg_formula.png';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Button from 'react-bootstrap/Button';
import get_counties from './counties'
import ListGroup from 'react-bootstrap/ListGroup';
import {esg_rating, get_rating_by_security} from '../Common/api-data'

const HomePage = () => {

    const [selecteStateOption, setSelectedStateOption] = useState("AL");
    const [selecteCountyOption, setSelectedCountyOption] = useState("01001");
    const [selecteCountyTextOption, setSelectedCountyTextOption] = useState("Autauga");
    const [selectedCounties, setselectedCounties] = useState([]);
    const [esgResults, setEsgResults] = useState("");
    const [cusipValue, setCusipValue] = useState("");

    const selectState = (e) =>{
        setSelectedStateOption(e.target.value)
        
    }

    const selectCounty = (e) =>{
        setSelectedCountyOption(e.target.value)
        setSelectedCountyTextOption(e.target.options[e.target.selectedIndex].text)
    }

    const setCounties = () => {
        const states = get_counties(selecteStateOption);
        if (states.length>0)
        {
            let items = [];       
            for (let i = 0; i < states.length; i++) {      
                //let item = '<option value="' + states[i]["GeoID"] + '">' + states[i]["County"] + '</option>';
                let item = <option value={states[i]["GeoID"]}>{states[i]["County"]}</option>; 
                items.push(item);   
            }
        
            return items;
        }
    }
    const handleChange = (e) => {
        setCusipValue(e.target.value)
    }

    const AddCounty = () => {
        // let item = <ListGroup.Item value={selecteCountyOption}>{selecteCountyTextOption}</ListGroup.Item>;
        let item = {"key": selecteCountyOption, "text":selecteCountyOption + "-" + selecteCountyTextOption }
        // selecteCounties.push(item)
        
        setselectedCounties([
            ...selectedCounties,
            item
          ]);
        // let tempArray = selecteCounties
        // setselecteCounties(tempArray)
    }

    const ClearCounty = () => {
        setselectedCounties([])
        setEsgResults("")
    }

    const SubmitESGParams = ()=> {
        console.log(selectedCounties)
        let geoIds = []
        for (var i=0; i<selectedCounties.length; i++)
            geoIds.push(selectedCounties[i]["key"])

        let request = {
            "counties": geoIds
        }
        console.log(request)
        esg_rating(request).then((result) => {
            setEsgResults(result.message)
          }).catch((error) => {
            console.log("Error caught in update api")
            console.log(error)
            return false
          })
    }

    const SubmitCusip = () => {
        
        console.log(cusipValue)
        let request = {
            "cusip":cusipValue
        }

        console.log(request)
        get_rating_by_security(request).then((result) => {
            setEsgResults(result.message)
          }).catch((error) => {
            console.log("Error caught in update api")
            console.log(error)
            return false
          })
    }

    return (
    <Container className='mainBackground'>
        <Row className="justify-content-md-center">
        <Col md="auto">
           <Image src={ESGFormula} width="50%" className="rounded mx-auto d-block" style={{padding:'10px'}} />
        </Col>
        </Row>
        <Row>
            <Col sm>
                <fieldset>
                    <Form.Group className="mb-3">
                    <Form.Label htmlFor="stateSelect">Select State</Form.Label>
                    <Form.Select id="stateSelect" onChange={selectState} value={selecteStateOption} width="30%" >
                        <option value="AL">Alabama</option>
                        <option value="AK">Alaska</option>
                        <option value="AZ">Arizona</option>
                        <option value="AR">Arkansas</option>
                        <option value="CA">California</option>
                        <option value="CZ">Canal Zone</option>
                        <option value="CO">Colorado</option>
                        <option value="CT">Connecticut</option>
                        <option value="DE">Delaware</option>
                        <option value="DC">District of Columbia</option>
                        <option value="FL">Florida</option>
                        <option value="GA">Georgia</option>
                        <option value="GU">Guam</option>
                        <option value="HI">Hawaii</option>
                        <option value="ID">Idaho</option>
                        <option value="IL">Illinois</option>
                        <option value="IN">Indiana</option>
                        <option value="IA">Iowa</option>
                        <option value="KS">Kansas</option>
                        <option value="KY">Kentucky</option>
                        <option value="LA">Louisiana</option>
                        <option value="ME">Maine</option>
                        <option value="MD">Maryland</option>
                        <option value="MA">Massachusetts</option>
                        <option value="MI">Michigan</option>
                        <option value="MN">Minnesota</option>
                        <option value="MS">Mississippi</option>
                        <option value="MO">Missouri</option>
                        <option value="MT">Montana</option>
                        <option value="NE">Nebraska</option>
                        <option value="NV">Nevada</option>
                        <option value="NH">New Hampshire</option>
                        <option value="NJ">New Jersey</option>
                        <option value="NM">New Mexico</option>
                        <option value="NY">New York</option>
                        <option value="NC">North Carolina</option>
                        <option value="ND">North Dakota</option>
                        <option value="OH">Ohio</option>
                        <option value="OK">Oklahoma</option>
                        <option value="OR">Oregon</option>
                        <option value="PA">Pennsylvania</option>
                        <option value="PR">Puerto Rico</option>
                        <option value="RI">Rhode Island</option>
                        <option value="SC">South Carolina</option>
                        <option value="SD">South Dakota</option>
                        <option value="TN">Tennessee</option>
                        <option value="TX">Texas</option>
                        <option value="UT">Utah</option>
                        <option value="VT">Vermont</option>
                        <option value="VI">Virgin Islands</option>
                        <option value="VA">Virginia</option>
                        <option value="WA">Washington</option>
                        <option value="WV">West Virginia</option>
                        <option value="WI">Wisconsin</option>
                        <option value="WY">Wyoming</option>
                    </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                    <Form.Label htmlFor="countySelect">Select County</Form.Label>
                    <Form.Select id="countySelect" onChange={selectCounty} value={selecteCountyOption} width="30%"  >
                        {setCounties()}
                    </Form.Select>
                    </Form.Group>
                    <div>
                    <Card style={{ width: '18rem', marginBottom:"1rem" }}>
                        <ListGroup variant="flush">
        
                             {selectedCounties.map(data => (
                                <ListGroup.Item value={data.key}>{data.text}</ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Card>
                    </div>
                    <div>
                        <Button variant="success" id="addCounty" onClick={AddCounty} style={{marginRight:'10px'}}> Add</Button>
                        <Button variant="danger" id="clearCounty" onClick={ClearCounty} style={{marginRight:'10px'}}> Clear</Button>
                        <Button type="submit" onClick={SubmitESGParams}>Submit</Button>    
                    </div>
                </fieldset> 
            </Col>
            <Col sm>
                <fieldset>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="inputcusip">Type Cusip</Form.Label>
                    <Form.Control  type="text" id="inputcusip"  value={cusipValue} onChange={handleChange}  aria-describedby="passwordHelpBlock"/>
                </Form.Group>
                    <Button type="submit"  onClick={SubmitCusip}>Submit</Button>
                    <Button variant="danger" id="clearCounty" onClick={ClearCounty} style={{marginRight:'10px'}}> Clear</Button>
                </fieldset>
            </Col>
        </Row>
        <Row>
            <Col>
            <Card>
                <Card.Header>ESG Rating Results</Card.Header>
                <ListGroup variant="flush">      
                {esgResults.split("$$$").map(data => (
                                <ListGroup.Item>{data}</ListGroup.Item>
                    ))}
                </ListGroup>

                </Card>
            </Col>                 
        </Row>
        <Row>
            
        </Row>
        {/* <Row>
            <Col>
            <Card style={{ paddingLeft: '1rem', paddingTop: '1rem' }}>
            <Card.Title>ESG Rating by Parameters</Card.Title>
            <Card.Body>
                <Row>
                    <Col>
                     <DropdownButton id="dropdown-basic-button" title="Select Indicator">
                        {GetIndicators()}
                    </DropdownButton>
                    </Col>
                    <Col>
                    <Form.Control placeholder="Enter Value" />
                    </Col>
                    <Col>
                    <Button variant="primary">Add</Button>{' '}
                    </Col>
                   
                </Row>
                <Row>
                    <Col>
                    <Button variant="success">Get Rating</Button>
                    </Col>
                </Row>
            </Card.Body>
            </Card>
            </Col>
            <Col>
            <Card style={{ paddingLeft: '1rem', paddingTop: '1rem' }}>
            <Card.Title>ESG Rating by Cusip</Card.Title>
            <Card.Body>
                <Row>
                    <Col>
                    <Form.Control placeholder="Enter Cusip" />    
                    </Col>
                    <Col>
                    <Button variant="success">Get Rating</Button>
                    </Col>
                </Row>
                
            </Card.Body>
            </Card>
            </Col>
        </Row> */}
      </Container>
    )
}

export default HomePage;
