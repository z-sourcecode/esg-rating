import React, { useState } from 'react'
import get_counties from './counties'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import {get_muni_data} from '../Common/api-data'

const DataPage = () => {
    const [selecteStateOption, setSelectedStateOption] = useState("AL");
    const [selecteCountyOption, setSelectedCountyOption] = useState("01001");
    const [esgResults, setEsgResults] = useState([]);
    
    const selectState = (e) =>{
        setSelectedStateOption(e.target.value)
    }

    const selectCounty = (e) =>{
        setSelectedCountyOption(e.target.value)
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

    const ClearResults = () => {
        setEsgResults([])
    }

    const FetchESGData = ()=> {
        console.log(selecteCountyOption)
        let geoId = selecteCountyOption

        let request = {
            "county": geoId
        }

        get_muni_data(request).then((result) => {
            let data = result.message
            let processed_array = []
            if (data instanceof Array)
                {
                    for (var i=0;i<data.length;i++) {
                        let item = data[i]
                        if (typeof(item) == 'string')
                            processed_array.push(item)
                        else 
                        {
                            processed_array.push("County: " + item["County"])
                            processed_array.push("County Code: " + item["County Code"])
                            processed_array.push("GeoID: " + item["GeoID"])
                            processed_array.push("Percentage: " + item["Percentage"])
                            processed_array.push("Indicator: " + item["Indicator"])
                        }
                        processed_array.push("***********************************")
                    }
                }
            setEsgResults(processed_array)
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
            <h1> Select a State/County to display ESG Data </h1>;
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
                        <Button type="submit" onClick={FetchESGData}>Submit</Button>
                        <Button variant="danger" id="clearResults" onClick={ClearResults} style={{marginRight:'10px'}}> Clear</Button>    
                    </div>
                </fieldset> 
            </Col>
        </Row>
        <Row>
            <Col>
            <Card>
                <Card.Header>ESG Data</Card.Header>
                <ListGroup variant="flush">      
                {esgResults.map(data => (
                                <ListGroup.Item>{data}</ListGroup.Item>
                    ))}
                </ListGroup>

                </Card>
            </Col>                 
        </Row>
        <Row>
            
        </Row>
        </Container>
    )
}

export default DataPage;
