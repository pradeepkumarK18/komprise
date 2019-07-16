import React, { Component } from 'react';
import SubComponent from './SubComponent';

export default class MainComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      destinations: [
        {
          "id": 1,
        },
        {
          "id": 2,
        },
        {
          "id": 3,
        },
        {
          "id": 4,
        },
      ],
      vehicles: [],
      cities: []
    };
    this.cityHandle = this.cityHandle.bind(this);
    this.vechicleHandle = this.vechicleHandle.bind(this);
  }

  vechicleHandle(obj) {
    var vehList = this.state.vehicles;
    for(var i=0; i<vehList.length; i++) {
      if(vehList[i].name === obj.value) {
          console.log(vehList[i]["total_no"]);
          vehList[i]["total_no"] = vehList[i]["total_no"] - 1;
      }
    }
    this.setState({ 
      vehicles: vehList,
    })
  }

  cityHandle(obj) {
    console.log(obj);
    // TODO: City selection and removal
  }

  componentDidMount() {
    fetch('https://demo2723522.mockable.io/vehicles')
      .then(response => response.json())
      .then(data => this.setState({ vehicles: data }));
    fetch('https://demo3651022.mockable.io/cities')
      .then(response => response.json())
      .then(data => this.setState({ cities: data }));
  }


  render() {
    const { destinations, vehicles, cities } = this.state;
    return (
      <div>
        {destinations.map(destination =>
          <div key={destination.id}>
            <h2>Destination {destination.id}</h2>
            <SubComponent vehicles={vehicles} cities={cities} vechicleHandle={this.vechicleHandle} cityHandle={this.cityHandle} />
          </div>
        )}
      </div>
    );
  }

}