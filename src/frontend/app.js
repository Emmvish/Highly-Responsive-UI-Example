// This is the PARENT component of all the components defined in the "components" directory.

// Axios is required for sending GET/POST requests to the server and obtaining responses from the server.
import axios from 'axios'

// Getting the React object is necessary to be able to use React.Component.
import React from 'react'

// Obtaining ReactDOM object is required for rendering the parent component with all of its children components inside a pre-defined div of "main.html" file.
import ReactDOM from 'react-dom'

// Following import makes the CSS styling compatible with all different browsers.
import 'normalize.css/normalize.css'

// Importing all the child components from the "components" directory
import Component1 from './components/Component1'
import Component2 from './components/Component2'
import Component3 from './components/Component3'

// Importing the stylesheet used for applying styling to each of the above mentioned components and their parent component.
import './styles/styles.css'

// Creating a stateful class-based component...
class App extends React.Component {

    // Storing the total number of documents in MongoDB database and number of times that ADD and UPDATE APIs have been called - as variables in the state object.
    state = {
        count: 0,
        updateCount: 0,
        addCount: 0,
        c1w: 560,
        c1h: 300,
        c2w: 560,
        c2h: 300,
        c3h: 300
    }

    // This lifecycle hook is triggered as soon as Component is rendered onto the screen for the first time.
    componentDidMount(){
        // Get the state stored as a string from Local Storage.
        const initVals = localStorage.getItem("state");
        // Parse the state obtained in previous step to JSON format.
        const jsonInit = JSON.parse(initVals);
        // Send request to COUNT API to obtain total number of documents inside MongoDB database.
        axios.get("http://localhost:3000/count").then((res)=>{
            // Set values of state variables equal to the ones obtained from state stored in local storage and this axios request.
            this.setState(()=>({
                // "res.data" contains total number of documents inside MongoDB database.
                count: res.data.count,
                // If cached value obtained as JSON (jsonInit) in second step is equal to null then set default values of updateCount and addCount to 0, otherwise set them equal to their respective values contained inside jsonInit object.
                updateCount: jsonInit ? jsonInit.updateCount : 0,
                addCount: jsonInit ? jsonInit.addCount : 0
            }))
        });
    }

    // This lifecycle hook is triggered after a component is re-rendered due to a change in its state's variable values.
    componentDidUpdate(){
        // Convert current state of component to STRING from JSON format.
        const strState = JSON.stringify(this.state)
        // Store / Cache this string in Local Storage with "state" as key.
        localStorage.setItem("state", strState);
    }

    // Handler for when ADD API is called by a Component1 child component.
    handleIncrementAddCount(){
        // Make a GET request to COUNT API to obtain total number of documents in MongoDB database. 
        axios.get("http://localhost:3000/count").then((res)=>{
            // After promise resolves with a response from server, use setState() method to update values of state variables and re-render this component.
            this.setState((prevState)=>({
                // Total number of documents is mentioned inside of "res.data" object returned as response from server
                count: res.data.count,
                // New value of addCount is equal to its previous value (stored in the previous state of this component) plus 1.
                addCount: prevState.addCount + 1
            }))
        });
    }

    // Handler for when ADD API is called by a Component1 child component.
    handleIncrementUpdateCount(){
        // Using setState() method to update values of state variables and re-render this component.
        this.setState((prevState)=>({
            // New value of addCount is equal to its previous value (stored in the previous state of this component) plus 1.
            updateCount: prevState.updateCount + 1
        }));
    }

    x(a,b){
        this.setState((prevState)=>({
            c1w: prevState.c1w + a,
            c2w: 1120 - prevState.c1w - a,
            c1h: prevState.c1h + b,
            c3h: prevState.c2h > prevState.c1h + b ? 600 - prevState.c2h : 600 - prevState.c1h - b
        }));
        // this.setState((prevState)=>({
        //     c3h: prevState.c2h > prevState.c1h ? 600 - prevState.c2h : 600 - prevState.c1h
        // }))
        // console.log("C1: " + this.state.c1h + " C3: " + this.state.c3h)
    }

    y(a,b){
        this.setState((prevState)=>({
            c2w: prevState.c2w + a,
            c1w: 1120 - prevState.c2w - a,
            c2h: prevState.c2h + b,
            c3h: prevState.c1h > prevState.c2h + b ? 600 - prevState.c1h : 600 - prevState.c2h - b
        }));
        // this.setState((prevState)=>({
        //     c3h: prevState.c1h > prevState.c2h ? 600 - prevState.c1h : 600 - prevState.c2h
        // }))
        // console.log("C2: " + this.state.c2h + " C3: " + this.state.c3h)
    }

    z(b) {
        this.setState((prevState)=>({
            c3h: prevState.c3h + b,
            c1h: 600 - prevState.c3h - b,
            c2h: 600 - prevState.c3h - b
        }))
        console.log(this.state.c1h + " " + this.state.c2h + " " + this.state.c3h)
    }

    // JSX contents of this function will be rendered by the component.
    render(){
        // Returning the JSX content to be rendered.
        return (
            // Wrapping all components inside a single parent div which is made responsive using the "container" CSS class.
            <div className="container2">
            <div className="container">
                {/* Rendering Component1 onto the left side of first half of screen and passing ADD API call Counting handler function as a prop to it, note that the handler is bound to the top level inside this class instance */}
                <Component1 incrementCount={this.handleIncrementAddCount.bind(this)} x={this.x.bind(this)} a={this.state.c1w} b={this.state.c1h}/>
                {/* Rendering Component2 onto the right side of first half of screen and passing UPDATE API call counting handler function as a prop to it, note that the handler is bound to the top level inside this class instance */}
                <Component2 incrementCount={this.handleIncrementUpdateCount.bind(this)} a={this.state.c2w} b={this.state.b} y={this.y.bind(this)} b={this.state.c2h}/>
                {/* Clearing the "floats" using the "clr" CSS class specified with following div tag. */}
                <div className="clr"></div>
                {/* Rendering Component3 on the whole width of container div in second half, and passing state variables - count, addCount and updateCount as props to it */}
                <Component3 count={this.state.count} addCount={this.state.addCount} updateCount={this.state.updateCount} h={this.state.c3h} z={this.z.bind(this)}/>
            </div>
            </div>
        )
    }
}

// Rendering this Parent component from Virtual DOM to REAL DOM through reconcilation method called "render" provided by ReactDOM object. This component will be rendered inside of a div with id "app" in the "main.html" file of public directory.
ReactDOM.render(<App/>, document.getElementById("app"))