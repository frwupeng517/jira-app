import React, { useState, useEffect } from "react";
import SearchPanel from "./search-panel";
import List from "./list";
import { cleanObject, useMount, useDebounce } from "utils";
import { useHttp } from "utils/http";
import styled from "@emotion/styled";

const apiUrl = process.env.REACT_APP_API_URL;
console.log("apiUrl", apiUrl);
const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const [users, setUsers] = useState([]);
  const [list, setList] = useState([]);
  const debouncedParam = useDebounce(param, 2000);
  const http = useHttp();

  useMount(() => {
    http("users").then(setUsers);
    // fetch(`${apiUrl}/users`).then(async (res) => {
    //   if (res?.ok) {
    //     const data = await res.json();
    //     console.log("data", data);
    //     setUsers(data);
    //   }
    // });
  });

  useEffect(() => {
    http("projects", { data: cleanObject(debouncedParam) }).then(setList);
    // fetch(
    //   `${apiUrl}/projects?${qs.stringify(cleanObject(debouncedParam))}`
    // ).then(async (res) => {
    //   if (res?.ok) {
    //     setList(await res.json());
    //   }
    // });
  }, [debouncedParam]);

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel param={param} setParam={setParam} users={users} />
      <List users={users} list={list} />
    </Container>
  );
};

export default ProjectListScreen;

const Container = styled.div`
  padding: 3.2rem;
`;
