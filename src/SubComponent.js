import React, { Component } from 'react';

export default class SubComponent extends Component {

constructor(props) {
  super(props);
  this.state = {
  	selectedCity: '',
  	selectedDistance: '',
  	localVehicles : []
  }
  this.onSelectDestination = this.onSelectDestination.bind(this);
  this.onSelectVechicle = this.onSelectVechicle.bind(this);
}


onSelectDestination(e) {
	var event = (e.target || e.currentTarget);
	var selectedVal = event.options[event.selectedIndex].value.split("::");
	var vechiclesList = [];
	this.setState({ 
		selectedCity: selectedVal[0],
		selectedDistance: selectedVal[1],
	})
	for(var i=0; i<this.props.vehicles.length; i++) {
		if(parseInt(selectedVal[1]) <= this.props.vehicles[i].max_distance && this.props.vehicles[i].total_no > 0) {
			this.props.vehicles[i]["total_number"] = this.props.vehicles[i].total_no;
			vechiclesList.push(this.props.vehicles[i])
		}
	}
	this.setState({ 
		localVehicles: vechiclesList,
	})
	this.props.cityHandle({value: selectedVal[0]})
}

onSelectVechicle(e) {
	var event = (e.target || e.currentTarget);
	this.props.vechicleHandle({value: event.value})
}

render() {

    return (
      <div>
        <select onChange={this.onSelectDestination}>
          <option value="Select">Select</option>
          {
            this.props.cities.map((city, i) => {
                return (
                    <option key={city.name} value={city.name + "::" + city.distance}>
                    	{city.name}
                    </option>
                );
            })
          }
        </select>
        {
        	this.state.localVehicles.map((vechicle, i) => {
        		return (
                    <div key={vechicle.name}><input type="checkbox" value={vechicle.name} onChange={this.onSelectVechicle}/><label >{vechicle.name}({vechicle.total_number})</label></div>
                );
                // return (
                //     <div key={vechicle.name}><input type="checkbox" value={vechicle.name} onChange={this.onSelectVechicle}/><label >{vechicle.name}</label></div>
                // );
            }) 
        }
      </div>
    );
  }

};