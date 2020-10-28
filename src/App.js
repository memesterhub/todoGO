import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container } from "react-bootstrap"

import Navbar from "./Navbar"
import Todo from "./todo/Todo"

export default class App extends React.Component {
    render() {
        return (
            <>
                <Navbar />
                <Container>
                    <Todo />
                </Container>
            </>
        )
    }
}
