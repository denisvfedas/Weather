import React, {Component} from 'react';
import {compose, withProps} from 'recompose';
import {withScriptjs, withGoogleMap, GoogleMap, Marker} from 'react-google-maps';

const MyMap = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDktZ_F3lgfR3eMRPI_P7oWDCJCeqOqx-A&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `300px`, width: `94%`, margin: `20px 0` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap)((props) =>
      <GoogleMap defaultZoom={9} defaultCenter={ props.location }>
        {props.isMarketShown && <Marker position={props.location}/>}
      </GoogleMap>
  );

  class Map extends Component {
    constructor() {
      super();
      this.state = {
        location: {}
      }
    }

    componentDidMount = () => {
      this.setState({
        location: this.props.location
      })
      console.log("Map Did Mont", this.props.location);
    }

    componentWillUpdate = (nextProps) => {
      if(this.state.location !== nextProps.location) {
        this.setState({
          location: nextProps.location
        });
        console.log("Map Will Update with", nextProps.location);
      }
    }

    // componentDidUpdate = () => {
    //   if(this.state.location !== this.props.location){
    //     this.setState({
    //       location: this.props.location
    //     });
    //   }
    //   console.log("Map Did Update", "this.props", this.props.location, "this.state", this.state.location);
    // }

    render() {
      if(!this.state.location) {
        return(
          <div>
            Loading Map...
          </div>
        );
      } else {
        return(
          <MyMap isMarketShown location={this.state.location}/>
        );
      }
    }
  }
export default Map;
