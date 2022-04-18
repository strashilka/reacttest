var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './Comment/Comment.js';
import './Comment/Comment.css';
import { Avatar } from './Comment/Comment';
var num = 77;
var block = React.createElement("div", { className: "dsf" },
    "This is test block with number ",
    num);
var rElement = React.createElement("h2", { className: 'test',
}, "Hello, Mary!");
function fElement(props) {
    return React.createElement("h1", { className: props.class },
        "It is a function ",
        props.name);
}
var cElement = /** @class */ (function (_super) {
    __extends(cElement, _super);
    function cElement() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    cElement.prototype.render = function () {
        return React.createElement("h2", null,
            "Test element ",
            this.props.name);
    };
    return cElement;
}(React.Component));
function FormattedDate(props) {
    return React.createElement("h2", null,
        "\u0421\u0435\u0439\u0447\u0430\u0441: ",
        props.date.toLocaleTimeString());
}
var Clock = /** @class */ (function (_super) {
    __extends(Clock, _super);
    function Clock(props) {
        var _this = this;
        console.log("start constructor");
        _this = _super.call(this, props) || this;
        _this.state = { date: new Date(),
            interval: props.interval,
        };
        console.log("finish constructor");
        return _this;
    }
    // после того как компонент отрендарился
    Clock.prototype.componentDidMount = function () {
        var _this = this;
        console.log("DM1");
        this.timerID = setInterval(function () { return _this.tick(); }, this.state.interval);
        console.log("DM2");
    };
    Clock.prototype.componentWillUnmount = function () {
        console.log("WM1");
        clearInterval(this.timerID);
        console.log("WM2");
    };
    Clock.prototype.tick = function () {
        console.log("TICK 1");
        this.setState({ date: new Date() });
        console.log("TICK 2");
    };
    Clock.prototype.render = function () {
        if (this.state.interval < 11000) {
            return null;
        }
        console.log("RENDER");
        return React.createElement("div", null,
            React.createElement("h1", null, "\u041F\u0440\u0438\u0432\u0435\u0442, \u043C\u0438\u0440!"),
            React.createElement(FormattedDate, { date: this.state.date }));
    };
    return Clock;
}(React.Component));
var Toggle = /** @class */ (function (_super) {
    __extends(Toggle, _super);
    function Toggle(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { isToggleOn: true };
        _this.handleClick = _this.handleClick.bind(_this);
        return _this;
    }
    Toggle.prototype.handleClick = function () {
        console.log(this);
        this.setState(function (prevState) { return ({
            isToggleOn: !prevState.isToggleOn
        }); });
    };
    Toggle.prototype.render = function () {
        return (React.createElement("button", { onClick: this.handleClick }, this.state.isToggleOn ? "On" : "Off"));
    };
    return Toggle;
}(React.Component));
function App() {
    return React.createElement("div", null,
        React.createElement(Toggle, null),
        React.createElement(Clock, { interval: 10000 }),
        React.createElement(Clock, { interval: 20000 }),
        React.createElement(Clock, { interval: 50000 }));
}
var ava = Avatar({
    user: {
        name: "Dima",
        avatarUrl: "https://png.pngtree.com/png-vector/20191103/ourlarge/pngtree-handsome-young-guy-avatar-cartoon-style-png-image_1947775.jpg"
    },
    class: "photo"
});
function printKey(index) {
    console.log(index);
}
var numbers = [1, 2, 3, 5, 6];
var affectedNumbers = numbers.map(function (item, index) {
    return React.createElement("li", { key: index, onClick: printKey }, item * 10);
});
console.log(affectedNumbers);
var NameForm = /** @class */ (function (_super) {
    __extends(NameForm, _super);
    function NameForm(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            value: ""
        };
        _this.handleChange = _this.handleChange.bind(_this);
        _this.handleSubmit = _this.handleSubmit.bind(_this);
        return _this;
    }
    NameForm.prototype.handleChange = function (event) {
        this.setState({
            value: event.target.value
        });
    };
    NameForm.prototype.handleSubmit = function (event) {
        alert("Sent value " + this.state.value);
        event.preventDefault();
    };
    NameForm.prototype.render = function () {
        return (React.createElement("form", { onSubmit: this.handleSubmit },
            React.createElement("label", null,
                "Name: ",
                React.createElement("input", { type: "text", value: this.state.value, onChange: this.handleChange })),
            React.createElement("input", { type: "submit", value: "Send" })));
    };
    return NameForm;
}(React.Component));
//Temperature =)
function BoilingVerdict(props) {
    if (props.celcius >= 100) {
        return React.createElement("p", null, "\u0412\u043E\u0434\u0430 \u0437\u0430\u043A\u0438\u043F\u0438\u0442");
    }
    else {
        return React.createElement("p", null, "\u0412\u043E\u0434\u0430 \u043D\u0435 \u0437\u0430\u043A\u0438\u043F\u0438\u0442");
    }
}
var scaleNames = {
    c: "Celsium",
    f: "Farinheit"
};
var TemperatureInput = /** @class */ (function (_super) {
    __extends(TemperatureInput, _super);
    function TemperatureInput(props) {
        var _this = _super.call(this, props) || this;
        // this.state = {
        //     temperature: ""
        // };
        _this.handleChange = _this.handleChange.bind(_this);
        return _this;
    }
    TemperatureInput.prototype.render = function () {
        var temperature = this.props.temperature;
        var scale = this.props.scale;
        return (React.createElement("div", null,
            React.createElement("legend", null,
                "Set temperature in degrees of ",
                scale[scale],
                " "),
            React.createElement("input", { type: "text", value: temperature, onChange: this.handleChange })));
    };
    TemperatureInput.prototype.handleChange = function (event) {
        this.props.onTemperatureChange(event.target.value);
        // this.setState({
        //     temperature: event.target.value
        // })
    };
    return TemperatureInput;
}(React.Component));
function toCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
}
function toFahrenheit(celsius) {
    return (celsius * 9 / 5) + 32;
}
function tryConvert(temperature, convert) {
    var input = parseFloat(temperature);
    if (Number.isNaN(input)) {
        return '';
    }
    var output = convert(input);
    var rounded = Math.round(output * 1000) / 1000;
    return rounded.toString();
}
var Calculator = /** @class */ (function (_super) {
    __extends(Calculator, _super);
    function Calculator(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            temperature: "",
            scale: 'c'
        };
        _this.handleCelsiusChange = _this.handleCelsiusChange.bind(_this);
        _this.handleFarinheitChange = _this.handleFarinheitChange.bind(_this);
        return _this;
    }
    Calculator.prototype.handleCelsiusChange = function (temperature) {
        this.setState({
            temperature: temperature,
            scale: "c"
        });
    };
    Calculator.prototype.handleFarinheitChange = function (temperature) {
        this.setState({
            temperature: temperature,
            scale: "f"
        });
    };
    Calculator.prototype.render = function () {
        var scale = this.state.scale;
        var temperature = this.state.temperature;
        var celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
        var fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;
        return (React.createElement("fieldset", null,
            React.createElement(TemperatureInput, { scale: "f", temperature: fahrenheit, onTemperatureChange: this.handleFarinheitChange }),
            React.createElement(TemperatureInput, { scale: "c", temperature: celsius, onTemperatureChange: this.handleCelsiusChange })));
    };
    return Calculator;
}(React.Component));
ReactDOM.render(React.createElement(Calculator, null), document.getElementById('root'));
