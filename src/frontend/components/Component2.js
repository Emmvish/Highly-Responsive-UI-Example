// This Component is used for UPDATING an existing name inside the MongoDB Database.


// Getting the React object is necessary to be able to use React.Component 
import React from 'react'

// Axios is required for sending GET/POST requests to the server and obtaining responses from the server.
import axios from 'axios'

// Resizable component allows our entire component to be resizable from all sides.
import { Resizable } from "re-resizable";

// Creating a stateful class-based component...
export default class Component2 extends React.Component{

    // State variables will help us to define and store the size of the resizable component. They also store the values of old and new names as specified by the user in their respective input fields.
    state = {
        oldName: "",
        newName: "",
        // width: 500,
        // height: 300
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
        backgroundColor: "aqua",
    }

    // componentDidUpdate(prevProps, prevState, snapshot){
    //     // this.state.width = 1200 - prevState.width - prevProps.a
    //     // this.setState(()=>({
    //     //     width: 1200 - prevState.width - prevProps.a
    //     // }))
    //     let t = 1200 - this.state.width - this.props.a;
    //     console.log("C2: " + t);
    // }

    // JSX contents of this function will be rendered by the component.
    render(){
        // Returning the JSX content to be rendered.
        return (
        // Wrapping the actual content inside of Resizable component tags so that actual component is resizable on all the sides.
        <Resizable
            // Setting style prop to the previously defined style object
            style={this.style}   
            // Using the state's variables to specify size of resizable component
            size={{ width: this.props.a, height: this.props.b }}
            // When user releases the Resize Handle on any component, then following prop is executed
            onResizeStop={(e, direction, ref, d) => {
                // Setting up the state variables with new values, equal to the sum of previous value of the state variable and distance moved by the Resize Handle in specific direction.
                // this.setState({
                //     width: this.state.width + d.width,
                //     height: this.state.height + d.height,
                // });
                this.props.y(d.width, d.height);
            }}
            // One cannot reduce the overall size of this component beyond the limits specified below:
            minHeight= "150px"
            maxHeight = "300px"
            minWidth = "25%"
            maxWidth = "830px"
        >
            {/* Creating the "Name Updation" form with an onSubmit handler. */}
            <form onSubmit={(e)=>{
                // Prevent page from getting refreshed when form is submitted.
                e.preventDefault();
                // Execute following block of code if none of the input fields are empty at time of submission
                if(this.state.oldName !== '' && this.state.newName !== ''){
                // Send POST request to UPDATE API with old and new values of name to be updated and name of collection in which this name is present.
                axios.post("http://localhost:3000/update",{
                    collection: "Names",
                    oldName: this.state.oldName,
                    newName: this.state.newName
                }).then(()=>{
                    // Clearing the values of "name" related variables in state so that input fields are cleared too.
                    this.setState(()=>({
                        oldName: '',
                        newName: ''
                    }))
                    // Informing the parent component that a document was updated.
                    this.props.incrementCount();
                })            
                }   
            }}>
                {/* Defining input field for entering CURRENT value of "Name" field in collection - with onChange and value props */}
                <input type="text" onChange={(e) => {
                    // Making the synthetic event persist so that its data can be used further in function
                    e.persist();
                    // Setting the value of old name in state and re-rendering the component using setState().
                    this.setState(()=>({
                    oldName: e.target.value
                }))
                }} 
                // Text displayed by input field is same as the text stored inside oldName variable of state object.
                value={this.state.oldName} className="input-display spacing" placeholder="Old Name"></input>
                {/* Defining input field for entering NEW value of "Name" field in collection - with onChange and value props */}
                <input type="text" onChange={(e) => {
                    // Making the synthetic event persist so that its data can be used further in function
                    e.persist();
                    // Setting the value of new name in state and re-rendering the component using setState().
                    this.setState(()=>({
                    newName: e.target.value
                }))
                }} 
                // Text displayed by input field is same as the text stored inside newName variable of state object.
                value={this.state.newName} className="input-display spacing" placeholder="New Name"></input>
                {/* Customized button to submit the form */}
                <button className="button-display spacing">Update</button>
            </form>
        </Resizable>
        )
    }
}

