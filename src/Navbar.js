import React from "react"
import { Navbar } from "react-bootstrap"

export default class AppNavbar extends React.Component {
    render() {
        return (
            <Navbar bg="light" expand="lg" className="mb-2">
                <Navbar.Brand href="/">todoGO</Navbar.Brand>
            </Navbar>
        )
    }
}
