// This Component displays the NUMBER OF TIMES that ADD and UPDATE APIs have been called and the TOTAL NUMBER OF DOCUMENTS inside MongoDB database's collection.

// Getting the React object is necessary to be able to use React.Component 
import React from 'react'

// Resizable component allows our entire component to be resizable from all sides.
import { Resizable } from "re-resizable"

// Creating a stateful class-based component...
export default class Component3 extends React.Component{

    // State variables will help us to define and store the size of the resizable component.
    state = {
        width: 1140
    }
    
    // Style specification object for the Resizable component
    style = {
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "10px",
        height: "300px",
        border: "3px solid black",
        backgroundColor: "lightseagreen",
        // float: "right"    
    }

    // JSX contents of this function will be rendered by the component.
    render(){
        // Returning the JSX content to be rendered.
        return (
            // Wrapping the actual content inside of Resizable component tags so that actual component is resizable on all the sides.
            <Resizable
                // Setting style prop to the previously defined style object
                style={this.style}   
                // Using the state's variables to specify size of resizable component
                size={{ width: this.state.width, height: this.props.h }}
                // When user releases the Resize Handle on any component, then following prop is executed
                onResizeStop={(e, direction, ref, d) => {
                    // Setting up the state variables with new values, equal to the sum of previous value of the state variable and distance moved by the Resize Handle in specific direction.
                    this.setState({
                        width: this.state.width + d.width
                    });
                    this.props.z(d.height);
                }}
                // One cannot reduce the overall size of this component beyond the limits specified below:
                minHeight= "100px"
                minWidth = "25%"
                maxWidth = "1140px"
                maxHeight = "450px"
                enable = {{top: true, bottom: true, left: false, right: false, topLeft: false, topRight: false, bottomLeft: false, bottomRight: false}}
            >
                {/* Displaying the TOTAL NUMBER OF DOCUMENTS received as a PROP from parent component */}
                <h3 className="block-display">Total Number of Documents: {this.props.count}</h3>
                {/* Displaying the TOTAL NUMBER OF TIMES ADD API has been called received as a PROP from parent component */}
                <h3 className="block-display">Add API has been called: {this.props.addCount} times.</h3>
                {/* Displaying the TOTAL NUMBER OF TIMES UPDATE API has been called received as a PROP from parent component */}
                <h3 className="block-display">Update API has been called: {this.props.updateCount} times.</h3>
            </Resizable>
        )
    }
}
