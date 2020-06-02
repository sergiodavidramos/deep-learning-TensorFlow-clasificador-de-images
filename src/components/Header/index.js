import React, { useState } from "react";
import "./index.css";

import { Reconocimiento } from "../Reconocimieto";
import { CameraWeb } from "../CameraWeb";
import Skeleton from "react-loading-skeleton";

// http-server -c1 --cors -p 6000  : comando para correr el servidor del modelo

export const Header = () => {
  const [ur, setUr] = useState(true);
  const ig = new Image();
  const setUrl = () => {
    setUr(!ur);
  };
  return (
    <>
      <header className="home">
        <nav className="nav-wrap">
          <ul className="nav">
            <li className="current scrolldown">
              <a onClick={() => setUrl()}>Reconocimiento de Imagenes</a>
            </li>
            <li>
              <a onClick={() => setUrl()}>Camara</a>
            </li>
          </ul>
        </nav>
        {ur === true ? <Reconocimiento /> : <CameraWeb />}
      </header>
    </>
  );
};
