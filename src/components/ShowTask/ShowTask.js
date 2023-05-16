// importing corresponding css
import "./ShowTask.css";

// importing bootstrap components
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";

// importing react icons
import { FaEdit, FaTrashAlt } from "react-icons/fa";

// Creating a Functional component for creating all task
function ShowTask(props) {
  return (
    <>
      <div className="taskBox scroll">
        {/* mapping over all the post and rendering all the data */}
        {props.todo.map((post) => {
          return (
            <div key={post.id}>
              <CardGroup>
                <div className="task">
                  <Card border="success" style={{ width: "18rem" }}>
                    <Card.Header>
                      <FaEdit
                        className="updateBtn"
                        style={{
                          position: "relative",
                          left: "170px",
                          color: "blue"
                        }}
                        size={24}
                        onClick={() => {
                          props.updateHandler(post, true);
                        }}
                        name="create-outline"
                      />
                      <FaTrashAlt
                        style={{
                          position: "relative",
                          left: "180px",
                          color: "red"
                        }}
                        className="deleteBtn"
                        size={24}
                        onClick={() => {
                          props.delete(post.id);
                        }}
                        name="trash-outline"
                      />
                      <ion-icon
                        className="checkBtn"
                        style={{
                          position: "relative",
                          right: "50px",
                          fontSize: "25px"
                        }}
                        onClick={() => {
                          props.completed(post);
                        }}
                        name={
                          post.completed
                            ? "checkmark-done-circle"
                            : "checkmark-done-circle-outline"
                        }
                      ></ion-icon>
                    </Card.Header>
                    <Card.Body>
                      <Card.Title>{post.title}</Card.Title>
                      <Card.Text></Card.Text>
                    </Card.Body>
                    <Card.Footer></Card.Footer>
                  </Card>
                </div>
              </CardGroup>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default ShowTask;
