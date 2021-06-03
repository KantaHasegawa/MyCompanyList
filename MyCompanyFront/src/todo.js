import { useState, useEffect } from "react";
import { Button, Row, Col, Card, InputGroup, FormControl } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

const AddTodo = (props) => {
  return (
    <>
      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text>企業名</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          type="text"
          onChange={props.onChangeCompanyName}
          value={props.name}
        />
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text>備考</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          as="textarea"
          rows={3}
          value={props.info}
          onChange={props.onChangeCompanyInfo}
        />
      </InputGroup>
      <Row className="justify-content-center">
        <Button variant="outline-primary" size="lg" onClick={props.onAdd}>
          追加
        </Button>
      </Row>
      <br />
    </>
  );
};

const TodoElement = (props) => {
  return (
    <Col>
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Header>{props.name}</Card.Header>
          <Card.Subtitle className="mb-2 text-muted">
          </Card.Subtitle>
          <Card.Text>{props.info}</Card.Text>
          <Button onClick={props.onDelete} variant="outline-danger">
            削除
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

const Todo = () => {
  const {
    user,
    isAuthenticated,
    isLoading,
    loginWithRedirect,
    getAccessTokenSilently,
  } = useAuth0();
  const [companyName, SetCompanyName] = useState("");
  const [companyInfo, SetCompanyInfo] = useState("");
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    getTodoListRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const getTodoListRequest = async () => {
    let newAccessToken = await getAccessTokenSilently({
      audience: process.env.REACT_APP_PROD_API_IDENTIFIRE_URL,
    }).catch((error) => console.log(error));

      isAuthenticated && axios({
      method: "get",
      url: `${process.env.REACT_APP_PROD_API_URL}/todos`,
      headers: { authorization: `Bearer ${newAccessToken}` },
      params: {
        user_id: user.sub
      }
    })
      .then((response) => {
        setTodoList(response.data.data);
      })
      .catch((error) => console.log(error));
  };

  const postTodoListRequest = async () => {
    const newAccessToken = await getAccessTokenSilently({
      audience: process.env.REACT_APP_PROD_API_IDENTIFIRE_URL,
    });
    console.log(newAccessToken)
    const user_id = user.sub;
    axios({
      method: "post",
      url: `${process.env.REACT_APP_PROD_API_URL}/todos`,
      headers: { authorization: `Bearer ${newAccessToken}` },
      data: {
        user_id: user_id,
        name: companyName,
        info: companyInfo
      }
    })
      .then(() => getTodoListRequest())
      .catch((error) => {
        alert("登録に失敗しました")
        console.log(error.response)
  })
  }

  const deleteTodoListRequest = async (id) => {
    let newAccessToken = await getAccessTokenSilently({
      audience: process.env.REACT_APP_PROD_API_IDENTIFIRE_URL,
    });
    axios({
      method: "delete",
      url: `${process.env.REACT_APP_PROD_API_URL}/todos/${id}`,
      headers: { authorization: `Bearer ${newAccessToken}` },
    })
      .then(() => getTodoListRequest())
      .catch((error) => {
        alert("削除に失敗しました");
        console.log(error.response);
      });
  };



  const handleChangeCompanyName = (e) => {
    const newcompanyName = e.target.value;
    SetCompanyName(newcompanyName);
  };

  const handleChangeCompanyInfo = (e) => {
    const newCompanyInfo = e.target.value;
    SetCompanyInfo(newCompanyInfo);
  };

  const handleAdd = () => {
    postTodoListRequest();
    SetCompanyName("");
    SetCompanyInfo("");
  };

  const handleDelete = (todoItem) => {
    deleteTodoListRequest(todoItem.id)
  };

  if (isLoading) {
    return <div>Loading ...</div>;
  } else if (!isAuthenticated) {
    loginWithRedirect()
  }

  return isAuthenticated && (
    <div>
      <Row className="justify-content-center">
        <h1 className="page-title">企業リスト</h1>
        <p>{} </p>
      </Row>
      <AddTodo
        onChangeCompanyName={handleChangeCompanyName}
        onChangeCompanyInfo={handleChangeCompanyInfo}
        name={companyName}
        info={companyInfo}
        onAdd={handleAdd}
      ></AddTodo>
      <Row>
          {todoList.map((todo) => (
            <TodoElement
              key={todo.id}
              name={todo.name}
              info={todo.info}
              onDelete={() => handleDelete(todo)}
            ></TodoElement>
          ))}
      </Row>
    </div>
  );
};

export default Todo;
