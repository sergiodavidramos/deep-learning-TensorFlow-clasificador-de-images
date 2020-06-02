import React, { useState } from "react";
import * as tf from "@tensorflow/tfjs";
import Webcam from "react-webcam";
import "./index.css";

export const CameraWeb = () => {
  const videoElement = document.createElement("video");
  videoElement.width = 200;
  videoElement.height = 200;
  const [tipo, setTipo] = useState(-1);
  const capture = async (condicion) => {
    const model = await tf.loadLayersModel("http://localhost:9000/model.json");
    const webcam = await tf.data.webcam(videoElement);
    if (condicion) {
      //   while (condicion) {
      const img = (await webcam.capture()).reshape([1, 200, 200, 3]);
      const prediction = model.predict(img).dataSync();
      const RecognizedDigit = prediction.indexOf(Math.max(...prediction));
      //   webcam.stop();
      setTipo(RecognizedDigit);
    }
  };
  capture();
  const cargar = () => {
    switch (tipo) {
      case 0:
        return (
          <>
            <h1>Caporales</h1>
            <p>
              La vestimenta original de los varones consistía en: látigos,
              camisa holgada, faja o cinturón, pantalón de corte militar y botas
              , mientras que la mujer usaba una blusa de mangas anchas. pollera
              larga que en la actualidad se ha ido acortando hasta ser una
              minipollera, calzados y el característico sombrero tipo Borsalino
              o también conocido en Bolivia como sombrero de cholita. En la
              actualidad la vestimenta ha ido desarrollándose de forma
              vertiginosa incorporando diseños y colores que identifican a las
              diferentes fraternidades o conjuntos de Caporales.
            </p>
          </>
        );

      case 1:
        return (
          <>
            <h1>Diablada</h1>
            <p>
              La uniformidad de los trajes trajo consigo la innovación
              coreográfica, con la diagramación de pasos, movimientos y el
              diseño de figuras que no solo están preparadas para ser
              escenificadas en espacios abiertos, como ser avenidas, calles y
              plazas; sino también para el teatro o el coliseo. Al inicio de la
              comparsa están Lucifer y Satanás con varias China Supay o
              diablescas. Le siguen los pecados La Soberbia, La Avaricia, La
              Lujuria, La Ira, La Gula, La Envidia, y La Pereza y después una
              tropa de diablos. Todos ellos están dirigidos por Arcángel San
              Miguel, con blusa de seda blanca, falda corta, espada y escudo. La
              coreografía tiene tres versiones, tomadas del Carnaval de Oruro,
              cada una conformada por siete movimientos.
            </p>
          </>
        );
      case 2:
        return (
          <>
            <h1>Morenada</h1>
            <p>
              En todo caso hay que aclarar que no todos los personajes de la
              morenada bailan con una careta de negro, esta queda reservada para
              los caporales (capataces negros) y los morenos. La máscara de
              moreno más antigua que se conserva data del año 1875 y fue
              realizada por Pánfilo Flores. Esa máscara tiene un aspecto mucho
              más sutil y delicado que los ejemplares usados hoy en día, en los
              que se destacan los ojos extremadamente desorbitados y la lengua
              saliente, elementos que supuestamente representan el cansancio y
              el efecto producido por el soroche (enfermedad de la altura). El
              sonido de la matraca de los morenos se asocia generalmente con el
              chirrido producido por el roce de las cadenas que portaban los
              esclavos. Se relaciona los característicos pasos cansinos de los
              morenos con el pisado de uvas. – Para Urquizo Sossa la Morenada
              representa la sublevación de los negros contra el temible caporal,
              al cual mediante engaños emborrachan para luego hacerle pisar
              uvas, pero Vargas piensa que son los propios morenos, los que
              tienen que pisar las uvas.
            </p>
          </>
        );
      case 3:
        return (
          <>
            <h1>Salay</h1>
            <p>
              La danza de Salay se caracteriza por su alegría, zapateo ágil y
              coqueteo de pareja. El hombre busca ganar a la cholita con
              movimientos graciosos, mientras la mujer mece su pollera. En vez
              de usar un pañuelo, como en el huayño y cueca, en esta danza se
              usa el sombrero para seducir a la pareja. Los varones llevan
              sombrero, camisa de manga larga, un chaleco, pantalón con pinzas
              en la cintura, una faja (chumpi) y zapatos de cuero. Las mujeres
              llevan el sombrero, una camisa con los mismos detalles de la
              pollera, una faja de colores con aguayo, pollera (cinco
              centímetros arriba de la rodilla), un fuste pegado al cuerpo y
              zapatos de taco medio. Ambos trajes se adornan con cintas de
              colores conjuntos que adornan el traje y simbolizan el calendario
              de Santa Vera Cruz y Todos Santos.
            </p>
          </>
        );
      case 4:
        return (
          <>
            <h1>Tinkuy</h1>
            <p>
              El baile del Tinku es una danza folklórica que es una expresión
              artística del Tinku. Nace de la representación del ritual
              ceremonial del Tinku llevado a cabo en las comunidades del norte
              de Potosí y sur de Oruro. Actualmente se baila Tinku en diferentes
              acontecimientos y festividades en Bolivia, se baila en el Carnaval
              de Oruro, y en Perú en la Fiesta de la Candelaria de Puno2​, como
              danza representativa de estas regiones y últimamente en otros
              países donde hay inmigrantes bolivianos. La música del Tinku es
              parte del repertorio de varios grupos musicales como Los Kjarkas,
              Kala Marka, llajtaymanta y muchos más.
            </p>
          </>
        );
      default:
        return "";
    }
  };
  return (
    <div className="recContainer">
      <div className="box">
        <button
          onClick={() => capture(true)}
          type="file"
          name="file-1[]"
          id="file-1"
          className="inputfile inputfile-1"
          data-multiple-caption="{count} files selected"
          multiple
        />
        <label for="file-1">
          <span>Correr&hellip;</span>
        </label>

        <button
          onClick={() => capture(false)}
          type="file"
          name="file-1[]"
          id="file-1"
          className="inputfile inputfile-1"
          data-multiple-caption="{count} files selected"
          multiple
        />
        <label for="file-1">
          <span>Stop&hellip;</span>
        </label>
      </div>
      <section className="cargar">
        <Webcam audio={false} width={350} height={550} />
        <div className="descrip">{cargar()}</div>
      </section>
    </div>
  );
};
