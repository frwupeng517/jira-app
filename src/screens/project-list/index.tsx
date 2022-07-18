import React, { useState, useEffect } from "react";
import SearchPanel from "./search-panel";
import List from "./list";
import { cleanObject, useMount, useDebounce } from "utils";
import { useHttp } from "utils/http";
import styled from "@emotion/styled";
import { Typography } from "antd";

const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const [users, setUsers] = useState([]);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const debouncedParam = useDebounce(param, 200);
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
    setLoading(true);
    http("projects", { data: cleanObject(debouncedParam) })
      .then(setList)
      .catch((error) => {
        setList([]);
        setError(error);
      })
      .finally(() => setLoading(false));
    // fetch(
    //   `${apiUrl}/projects?${qs.stringify(cleanObject(debouncedParam))}`
    // ).then(async (res) => {
    //   if (res?.ok) {
    //     setList(await res.json());
    //   }
    // });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedParam]);

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel param={param} setParam={setParam} users={users} />
      {error && (
        <Typography.Text type="danger">{error.message}</Typography.Text>
      )}
      <List users={users} dataSource={list} loading={loading} />
    </Container>
  );
};

export default ProjectListScreen;

const Container = styled.div`
  padding: 3.2rem;
`;
