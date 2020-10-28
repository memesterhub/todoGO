import React from "react"
import $ from "jquery"
import Cookie from "js-cookie"
import { Button, Form } from "react-bootstrap"

import TodoItem from "./TodoItem"

export default class Todo extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            todos: JSON.parse(Cookie.get("todos") || "[]"),
            showError: false
        }
    }

    handleChange(id) {

        let todos = this.state.todos

        todos.forEach(todo => {
            if (todo.id === id) {
                todo.checked = !todo.checked
            }
        })

        Cookie.set("todos", todos, {sameSite: "strict", expires: 365})
        
        this.setState({todos})
    }

    handleDelete(id) {

        let todos = this.state.todos

        todos.forEach(todo => {
            if (todo.id === id) {
                todos.splice(todos.indexOf(todo), 1)
            }
        })

        Cookie.set("todos", todos, {sameSite: "strict", expires: 365})

        this.setState({todos})
    }

    handleEdit() {

        let todos = JSON.parse(Cookie.get("todos") || "[]")

        this.setState({todos})
    }

    addTodo(e) {
        e.preventDefault()
        let todos = this.state.todos.slice()
        let todo = $("#add").serializeArray()[0]
        if (todo.value.trim().length !== 0) {
            Cookie.set("latest-todoID", parseInt(Cookie.get("latest-todoID") || -1) + 1, {sameSite: "strict", expires: 365})
            let todoID = Cookie.get("latest-todoID")
            let todoDate = new Date()
            let zone = todoDate.getHours() < 12 ? "am" : "pm"
            todoDate = `${todoDate.toDateString()} ${todoDate.toTimeString()}`.split(" ")

            todos.push({
                id: todoID,
                body: todo.value,
                date: `created at ${todoDate[0]} ${todoDate[1]} ${todoDate[2]} ${todoDate[3]} ${todoDate[4]}${zone}`,
                checked: false
            })

            Cookie.set("todos", todos, {sameSite: "strict", expires: 365})

            this.setState({todos})
            let q = $("#new-todo")
            q.val("")
            q.focus()
        }
    }

    render() {
        return (
            <>
                {this.state.todos.map((todo) => {
                    return <TodoItem
                            id={`todo-${todo.id}`}
                            todo={todo.body} date={todo.date}
                            checked={todo.checked}
                            onDelete={() => this.handleDelete(todo.id)}
                            onEdit={() => this.handleEdit()}
                            onChange={() => this.handleChange(todo.id)}
                            key={`todo-${todo.id}`} />
                })}
                <Form id="add">
                    <Form.Group>
                        <div className="d-flex">
                                <input type="text" id="new-todo" placeholder="new todo" className="mr-2 form-control" required name="todo" />
                                <Button type="submit" onClick={(e) => this.addTodo(e)} variant="success">Add</Button>
                        </div>
                    </Form.Group>
                </Form>
            </>
        )
    }
}
