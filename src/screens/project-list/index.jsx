import React, { useState, useEffect } from "react";
import * as qs from 'qs';
import SearchPanel from "./search-panel";
import List from './list';
import { cleanObject, useMount, useDebounce } from 'utils';

const apiUrl = process.env.REACT_APP_API_URL;
console.log('apiUrl', apiUrl);
const ProjectListScreen = () => {
  const [ param, setParam ] = useState({
    name: '',
    personId: ''
  });
  const [ users, setUsers ] = useState([]);
  const [ list, setList ] = useState([]);
  const debouncedParam = useDebounce(param, 2000);

  useMount(() => {
    fetch(`${apiUrl}/users`).then(async res => {
      if (res?.ok) {
        const data = await res.json();
        console.log('data', data);
        setUsers(data);
      }
    })
  })

  useMount(() => {
    fetch(`${apiUrl}/projects`).then(async res => {
      if (res?.ok) {
        setList(await res.json());
      }
    })
  })

  useEffect(() => {
    console.log('33', cleanObject(param));
    fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(debouncedParam))}`).then(async res => {
      if (res?.ok) {
        setList(await res.json());
      }
    })
  }, [debouncedParam]);

  return (
    <div>
      <SearchPanel param={param} setParam={setParam} users={users} />
      <List users={users} list={list} />
    </div>
  )
}

export default ProjectListScreen;