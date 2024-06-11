"use client";

import { Container } from "react-bootstrap";
import styles from "./styles.module.scss";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Carousel from "react-bootstrap/Carousel";
import { useState } from "react";
import Image from "next/image";

import img1 from "@/assets/images/tacos2.jpg";
import img2 from "@/assets/images/burrito.jpg";
import img3 from "@/assets/images/tortas.jpg";

export default function AdminPage() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex);
  };
  return (
    <div>
      <Container>
        <Row>
          <Col>
            <Carousel activeIndex={index} onSelect={handleSelect}>
              <Carousel.Item>
                <Image
                  src={img1}
                  alt="grafica"
                  style={{
                    width: "350px",
                    height: "250px",
                    display: "block",
                    margin: "0 auto",
                    borderRadius: "20px",
                  }}
                />
              </Carousel.Item>
              <Carousel.Item>
                <Image
                  src={img2}
                  alt="grafica"
                  style={{
                    width: "350px",
                    height: "250px",
                    display: "block",
                    margin: "0 auto",
                    borderRadius: "20px",
                  }}
                />
              </Carousel.Item>
              <Carousel.Item>
                <Image
                  src={img3}
                  alt="grafica"
                  style={{
                    width: "350px",
                    height: "250px",
                    display: "block",
                    margin: "0 auto",
                    borderRadius: "20px",
                  }}
                />
              </Carousel.Item>
            </Carousel>
          </Col>
          <Col>
            <div className="Contenido">
              <h2 style={{ color: "#F20574" }}>
                <strong>Rico Rico taco</strong>
              </h2>

              <p className={styles.descrip}>
                Te presentamos Rico Rico Taco, donde buscamos hacer honor a
                nuestro nombre, con sabores, olores, ingredientes que bscaran
                saciar tu paladar, solo ordena y vive la experiencia.
              </p>
            </div>
            <div className={styles.barraB}>
              <div className="contBarra"></div>
              <Row>
                <Col>
                  <div className={styles.contBarra}>
                    <b>#FoodiusLovers</b>
                    <p>Satisfechos</p>
                  </div>
                </Col>
                <Col>
                  <div className={styles.numb}>
                    <h1>
                      <strong>500</strong>
                    </h1>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
        <div className={styles.mid}>
          <h1>
            <strong>
              <center>
                Tus productos en{" "}
                <span style={{ color: "#F20574" }}>#Foodius</span>
              </center>
            </strong>
          </h1>
        </div>
      </Container>
    </div>
  );
}
