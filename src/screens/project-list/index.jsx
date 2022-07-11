import React, { useState, useEffect } from "react";
import * as qs from 'qs';
import { cleanObject } from 'utils';
import SearchPanel from "./search-panel";
import List from './list';

const apiUrl = process.env.REACT_APP_API_URL;
console.log('apiUrl', apiUrl);
const ProjectListScreen = () => {
  const [ param, setParam ] = useState({
    name: '',
    personId: ''
  });
  const [ users, setUsers ] = useState([]);
  const [ list, setList ] = useState([]);

  useEffect(() => {
    fetch(`${apiUrl}/users`).then(async res => {
      if (res?.ok) {
        const data = await res.json();
        console.log('data', data);
        setUsers(data);
      }
    })
  }, [])

  useEffect(() => {
    fetch(`${apiUrl}/projects`).then(async res => {
      if (res?.ok) {
        setList(await res.json());
      }
    })
  }, [])

  useEffect(() => {
    console.log('33', cleanObject(param));
    fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(param))}`).then(async res => {
      if (res?.ok) {
        setList(await res.json());
      }
    })
  }, [param]);

  return (
    <div>
      <SearchPanel param={param} setParam={setParam} users={users} />
      <List users={users} list={list} />
    </div>
  )
}

export default ProjectListScreen;