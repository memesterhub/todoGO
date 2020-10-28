import React, {useState} from "react"
import {Button, Card, Modal} from "react-bootstrap"
import { FaEdit, FaTrash } from "react-icons/fa"
import Cookie from "js-cookie"
import $ from "jquery"

const TodoItem = (props) => {
    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    const handleEdit = (e) => {
        e.preventDefault()
        const todos = JSON.parse(Cookie.get("todos") || "[]")
        const oldTodo = $(`#updateTodo-${props.id}`).serializeArray()[0]
        let todoDate = new Date()
        let zone = todoDate.getHours() < 12 ? "am" : "pm"
        todoDate = `${todoDate.toDateString()} ${todoDate.toTimeString()}`.split(" ")

        if (oldTodo.value.trim().length !== 0) {
            todos.forEach(todo => {
                if (todo.id === props.id.slice(5)) {
                    todo.body = oldTodo.value
                    todo.date = `updated at ${todoDate[0]} ${todoDate[1]} ${todoDate[2]} ${todoDate[3]} ${todoDate[4]}${zone}`
                }
            })

            Cookie.set("todos", todos, {sameSite: "strict", expires: 365})
            props.onEdit()

            handleClose()
        }
    }

    return (
        <div id={props.id}>
            <Card className="mb-2">
                <Card.Body>
                    <p style={{textDecoration: props.checked ? "line-through" : "none"}}>
                        <span id={`${props.id}-editable`}>
                            {props.todo}
                            <input type="checkbox" checked={props.checked} onChange={props.onChange} className="ml-2" />
                        </span>
                    </p>
                </Card.Body>
                <Card.Footer>
                    <a href={`#${props.id}`} type="button" onClick={handleShow}><FaEdit className="mr-4" color="green" /></a>
                    <a href={`#${props.id}`} type="button" onClick={props.onDelete}><FaTrash color="red" /></a>
                    <small className="text-muted ml-2">{props.date}</small>
                </Card.Footer>
            </Card>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit todo (id {props.id.slice(5)})</Modal.Title>
                    </Modal.Header>
                    <form id={`updateTodo-${props.id}`} method="POST">
                        <Modal.Body>
                            <label className="form-label">update todo</label>
                            <input required type="text" className="form-control" defaultValue={props.todo} placeholder="Update Todo" name="todo" />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button type="submit" variant="success" onClick={handleEdit}>
                                Save
                            </Button>
                        </Modal.Footer>
                    </form>
                </Modal>
        </div>
    )
}

export default TodoItem