import React,{Fragment} from "react";
import { Route, Routes } from "react-router-dom";
import { Forum, Knowledge, Login, Music, Person, Game, Home } from "src/pages";
import './routes.scss'
export function PageRouter(): JSX.Element {
  return (
    <Fragment >
      <Routes>
        <Route path="/forum" element={<Forum />}></Route>
        <Route path="/knowledge" element={<Knowledge />}></Route>
        <Route path="/login/:type" element={<Login />}></Route>
        <Route path="/music" element={<Music />}></Route>
        <Route path="/person" element={<Person />}></Route>
        <Route path="/game" element={<Game />}></Route>
        <Route path="*" element={<Home/>}></Route>
      </Routes>
    </Fragment>
  );
}

