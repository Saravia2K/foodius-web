"use client";

import { Container } from "react-bootstrap";
import styles from "./styles.module.scss";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Carousel from "react-bootstrap/Carousel";
import { useEffect, useState } from "react";
import Image from "next/image";
import useBusinessDashboard from "@/hooks/useBusinessDashboard";
import useSession from "@/hooks/useSession";
import useBusinessFood from "@/hooks/useBussinessFood";
import { Grid } from "@mui/material";
import FoodCard from "@/components/FoodCard";
import { TFood } from "@/hooks/useBusiness";
import { API_URL } from "@/utils/consts";

export default function AdminPage() {
  const [index, setIndex] = useState(0);
  const { businessLogged } = useSession();
  const { business } = useBusinessDashboard(businessLogged?.id ?? 0);
  const { food } = useBusinessFood(businessLogged?.id ?? 0);
  const [products, setProducts] = useState<TFood[]>([]);

  useEffect(() => {
    if (food == undefined) return;

    let _products: TFood[] = [];
    for (const f of Object.values(food))
      _products = [..._products, ...f.dishes];

    setProducts(_products);
  }, [food]);

  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex);
  };

  return (
    <div>
      <Container>
        <Row>
          <Col>
            <Carousel activeIndex={index} onSelect={handleSelect}>
              {products.map((p, i) => (
                <Carousel.Item key={i}>
                  <Image
                    src={`${API_URL}/${p.img_url}`}
                    width={450}
                    height={350}
                    alt="grafica"
                    style={{
                      display: "block",
                      margin: "auto",
                      borderRadius: "20px",
                    }}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          </Col>
          <Col>
            <div className="Contenido">
              <h2
                style={{
                  color: "#F20574",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                {business?.name}
              </h2>

              {business && (
                <div
                  className={styles.map}
                  dangerouslySetInnerHTML={{ __html: business.location }}
                ></div>
              )}
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
                      <strong>{business?.satisfied}</strong>
                    </h1>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
        <Row className={styles.mid}>
          <h1>
            <strong>
              <center>
                Tus productos en{" "}
                <span style={{ color: "#F20574" }}>#Foodius</span>
              </center>
            </strong>
          </h1>
        </Row>
        <Grid container spacing={10}>
          {products.map((p, i) => (
            <Grid key={i} item xs={6}>
              <FoodCard
                name={p.name}
                description={p.description}
                imgSrc={`${API_URL}/${p.img_url}`}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}
