import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './Comment/Comment.js';
import './Comment/Comment.css';
import {Avatar,UserInfo} from './Comment/Comment';

const num = 77;
const block = <div className="dsf">This is test block with number {num}</div>;

const rElement = React.createElement(
    "h2",
    {className: 'test',

    },
    "Hello, Mary!"
)

function fElement(props){
    return <h1 className={props.class}>It is a function {props.name}</h1>;
}

class cElement extends React.Component{
    render() {
        return <h2>Test element {this.props.name}</h2>;
    }
}

function FormattedDate(props)
{
    return <h2>Сейчас: {props.date.toLocaleTimeString()}</h2>
}


class Clock extends React.Component{
    constructor(props) {
        console.log("start constructor");
        super(props);
        this.state = {date: new Date(),
            interval: props.interval,
        };
        console.log("finish constructor");

    }

    // после того как компонент отрендарился
    componentDidMount() {
        console.log("DM1");
        this.timerID = setInterval(()=>this.tick(), this.state.interval);
        console.log("DM2");
    }

    componentWillUnmount() {
        console.log("WM1");
        clearInterval(this.timerID);
        console.log("WM2");
    }

    tick(){
        console.log("TICK 1");
        this.setState({date: new Date()});
        console.log("TICK 2");
    }


    render() {
        if (this.state.interval < 11000)
        {
            return null;
        }
        console.log("RENDER");
        return <div>
            <h1>Привет, мир!</h1>
            <FormattedDate date={this.state.date}/>
        </div>;
    }
}

class Toggle extends React.Component{
    constructor(props) {
        super(props);
        this.state = {isToggleOn: true};

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        console.log(this);
        this.setState(prevState => ({
                isToggleOn: !prevState.isToggleOn}
        ));
    }

    render() {
        return(
            <button onClick={this.handleClick}>
                {this.state.isToggleOn?"On":"Off"}
            </button>
        );
    }
}

function App()
{
    return <div>
        <Toggle/>
        <Clock interval={10000}/>
        <Clock interval={20000}/>
        <Clock interval={50000}/>
    </div>;
}

const ava = Avatar({
    user:{
        name:"Dima",
        avatarUrl: "https://png.pngtree.com/png-vector/20191103/ourlarge/pngtree-handsome-young-guy-avatar-cartoon-style-png-image_1947775.jpg"
    },
    class: "photo"
})

function printKey(index){
    console.log(index);
}

const numbers = [1, 2, 3, 5, 6];
const affectedNumbers = numbers.map((item, index) =>
    <li key={index} onClick={printKey}>{item * 10}</li>
);
console.log(affectedNumbers);

class NameForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            value: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange(event){
        this.setState({
            value: event.target.value
        })
    }

    handleSubmit(event){
        alert("Sent value " + this.state.value);
        event.preventDefault();
    }

    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                <label>
                    Name: <input type="text" value={this.state.value} onChange={this.handleChange}/>
                </label>
                <input type="submit" value="Send"/>
            </form>);
    }
}

//Temperature =)
function BoilingVerdict(props){
    if (props.celcius >= 100)
    {
        return <p>Вода закипит</p>
    }
    else
    {
        return <p>Вода не закипит</p>
    }
}

const scaleNames = {
    c : "Celsium",
    f : "Farinheit"
};

class TemperatureInput  extends React.Component{
    constructor(props) {
        super(props);

        // this.state = {
        //     temperature: ""
        // };

        this.handleChange = this.handleChange.bind(this);
    }
    render() {
        const temperature = this.props.temperature;
        const scale = this.props.scale;
        return(
            <div>
                <legend>Set temperature in degrees of {scale[scale]} </legend>
                <input type="text" value={temperature} onChange={this.handleChange} />
            </div>
        );
    }

    handleChange(event){
        this.props.onTemperatureChange(event.target.value);
        // this.setState({
        //     temperature: event.target.value
        // })
    }
}

function toCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
    return (celsius * 9 / 5) + 32;
}

function tryConvert(temperature, convert) {
    const input = parseFloat(temperature);
    if (Number.isNaN(input)) {
        return '';
    }
    const output = convert(input);
    const rounded = Math.round(output * 1000) / 1000;
    return rounded.toString();
}

class Calculator extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            temperature: "",
            scale: 'c'
        }

        this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
        this.handleFarinheitChange = this.handleFarinheitChange.bind(this);

    }
    handleCelsiusChange(temperature){
        this.setState({
            temperature: temperature,
            scale: "c"
        })

    }

    handleFarinheitChange(temperature){
        this.setState({
            temperature: temperature,
            scale: "f"
        })
    }

    render() {
        const scale = this.state.scale;
        const temperature = this.state.temperature;
        const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
        const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

        return(
            <fieldset>

                <TemperatureInput scale="f" temperature={fahrenheit} onTemperatureChange={this.handleFarinheitChange}/>
                <TemperatureInput scale="c" temperature={celsius} onTemperatureChange={this.handleCelsiusChange}/>

            </fieldset>
        );
    }
}



ReactDOM.render(
    <Calculator/>,
    document.getElementById('root')
);