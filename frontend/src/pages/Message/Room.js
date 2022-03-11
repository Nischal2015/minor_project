import React, { useState } from "react";
import Button from "../../components/UI/Button/Button";

import { Container } from "@material-ui/core";
import { Navigate, useNavigate } from "react-router-dom";
import Input from "../../components/UI/Input/Input";

const Room = () => {
  const [title, setTitle] = useState("");
  const [response, setResponse] = useState(null);
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("access")
  );

  const onChangeHandler = (e) => {
    setTitle(e.target.value);
  };

  const navigate = useNavigate();

  const createRoom = async (e) => {
    e.preventDefault();
    console.log("local access token - ", accessToken);

    setTitle("");
    console.log(e.target.name.value);

    let response = await fetch("api/create-room/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${String(accessToken)}`,
      },
    });

    let data = await response.json();

    console.log("response from backend -- ", data);
    setResponse(data);
    navigate("/inbox", { state: { id: data.id } }, { replace: true });
  };

  return (
    <>
      <Container>
        <div>Room</div>
        <form onSubmit={createRoom}>
          <Input
            onChange={onChangeHandler}
            placeholder="type message here"
            variant="outlined"
            fullWidth
            name="name"
            value={title}
          />
          <Button type="submit">Create Room</Button>
        </form>
      </Container>
    </>
  );
};

export default Room;
