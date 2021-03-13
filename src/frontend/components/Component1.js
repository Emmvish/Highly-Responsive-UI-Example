// This component is used for ADDING a new name to the MongoDB Database.


// Getting the React object is necessary to be able to use React.Component 
import React from 'react'

// Axios is required for sending GET/POST requests to the server and obtaining responses from the server.
import axios from 'axios'

// Resizable component allows our entire component to be resizable from all sides.
import { Resizable } from "re-resizable";

// Creating a stateful class-based component...
export default class Component1 extends React.Component{

    // State variables will help us to define and store the size of the resizable component
    // state = {
    //     width: 500,
    //     height: 300
    // }

    // Handler method of the "Name Addition" form
    handleAddEntry(e){
        // Make the Synthetic Event Persist
        e.persist();
        // Prevent page from getting refreshed when form is submitted
        e.preventDefault();
        // If value contained in the targeted input field is not empty, then execute the following block.
        if(e.target.elements.entry.value !== ''){
            // Send a POST request to the ADD API. 
            axios.post("http://localhost:3000/add",{
                // Collection in which this name has to be inserted can be chosen right here.
                collection: "Names",
                // Specifying "name" field as equal to value specified in the input field
                name: e.target.elements.entry.value
            }).then(()=>{
                // Clearing the current value displayed by the input field
                e.target.elements.entry.value = "";
                // Calling incrementCount method in props, to indicate to parent that New Document has been created.
                this.props.incrementCount();
            })            
        }
    }
    
    // Style specification object for the Resizable component
    style = {
        textAlign: "center",
        float: "left",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        border: "3px solid black",
        padding: "10px",
        margin: "10px",
        backgroundColor: "burlywood",
    }

    // JSX contents of this function will be rendered by the component.
    render(){
        // Returning the JSX content to be rendered.
        return (
            
            // Wrapping the actual content inside of Resizable component tags so that actual component is resizable on all the sides
            <Resizable
                // Setting style prop to the previously defined style object
                style={this.style}   
                // Using the state's variables to specify size of resizable component
                size={{ width: this.props.a, height: this.props.b }}
                // When user releases the Resize Handle on any component, then following prop is executed
                onResizeStop={(e, direction, ref, d) => {
                    // Setting up the state variables with new values, equal to the sum of previous value of the state variable and distance moved by the Resize Handle in specific direction.
                    // this.setState({
                    //   width: this.state.width + d.width,
                    //   height: this.state.height + d.height,
                    // });
                    this.props.x(d.width, d.height);
                }}
                // One cannot reduce the overall size of this component beyond the limits specified below:
                minHeight= "100px"
                maxHeight = "300px"
                minWidth = "25%"
                maxWidth = "830px"
            >
            {/* Creating the "Name Addition" form and assigning it an onSubmit handler which is same as the handler function defined outside of render() - which is why this assignment has to be bound with top level class instance. */}
            <form onSubmit={this.handleAddEntry.bind(this)}>
                {/* Custom formatted input with a placeholder */}
                <input type="text" name="entry" className="input-display spacing" placeholder="Enter Name"></input>
                {/* Customized button to submit the form */}
                <button className="button-display spacing">Add</button>
            </form>
            </Resizable>
        )
    }
}