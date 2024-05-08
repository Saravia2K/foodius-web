"use client";

import { useState } from "react";
import style from "./style.module.scss";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Image from "next/image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import tacos from "@/assets/images/tacos.png";

export default function mipagina() {
  return (
    <div>
      <div className={style.div1}>
        <Container>
          <Card style={{ width: "20rem" }}>
            <Card.Body>
              <h1>El Taquito </h1>
              <h5 className={style.precio}>Precio: $4.50</h5>

              <Card.Text className={style.info}>
                ¡Disfruta de la auténtica experiencia mexicana en cada bocado
                con nuestros deliciosos tacos! Sabrosas tortillas de maíz o
                harina rellenas
              </Card.Text>
              <div>
                <Image src={tacos} alt="los taquitos" width={200} />
              </div>
              <Row>
                <Col>Espacio para el contador</Col>
                <Col>
                  <Button className={style.carrito}>Agregar al carrito </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </div>
  );
}
