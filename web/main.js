const React = require("react")
const ReactDOM = require("react-dom")
const { play } = require("rps")

ReactDOM.render(
    <p onClick={play}>Hello World!</p>,
    document.getElementById("content")
)