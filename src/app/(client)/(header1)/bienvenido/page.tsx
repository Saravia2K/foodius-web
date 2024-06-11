"use client";
import Accordion from "react-bootstrap/Accordion";
import ColoredButton from "@/components/ColoredButton";

import Image from "next/image";
import mascotafoodius from "@/assets/images/mscfoodius.png";
import tipohumo from "@/assets/images/tipoconhumo.png";
import dostipos from "@/assets/images/dostipos.png";
import { useRouter } from "next-nprogress-bar";

export default function BienvenidoPage() {
  const router = useRouter();

  return (
    <div>
      <div className="container-fluid bg-white py-5">
        <div className="row">
          <div className="col-md-6 mt-5">
            <h1
              className="card-title py-4"
              style={{ fontSize: "80px", padding: "20px" }}
            >
              <strong>Bienvenido</strong>{" "}
              <strong style={{ color: "#F20574" }}>#FoodiusPartner.</strong>
            </h1>
          </div>
          <div className="col-md-6">
            <center>
              <Image
                src={mascotafoodius}
                alt="grafica"
                style={{ width: "500px", height: "300px" }}
              />
            </center>
          </div>
        </div>
        <center>
          <div style={{ marginTop: "60px", marginBottom: "60px" }}>
            <ColoredButton
              color="pink"
              onClick={() => router.push("/dashboard")}
            >
              Administra tu negocio
            </ColoredButton>
          </div>
        </center>
      </div>

      <div className="container-fluid mt-4">
        <div className="row">
          <div className="col-md-6 mt-5 py-5">
            <center>
              <Image
                src={tipohumo}
                alt="grafica"
                style={{
                  width: "500px",
                  height: "300px",
                  borderRadius: "10px",
                }}
              />
            </center>
          </div>
          <div className="col-md-6 mt-5 py-5">
            <center>
              <p style={{ margin: "40px", fontSize: "20px" }}>
                Crece con Foodies Amplía tu alcance al incluir tu negocio en la
                aplicación de Foodies. Aumenta las ventas conectándote con los
                clientes que buscan opciones de pickup. Cada asociación incluye
                nuestro sistema de pedidos en línea personalizable.
              </p>
            </center>
          </div>
        </div>
      </div>

      <div
        className="container-fluid mt-5"
        style={{ backgroundColor: "#F20574" }}
      >
        <div className="row">
          <div className="col-md-6 mt-5 py-5 ">
            <center>
              <h1 style={{ color: "white" }}>
                <strong>#FoodiusPartner</strong>
              </h1>
              <p style={{ margin: "40px", fontSize: "20px", color: "white" }}>
                &quot;Sin duda, Foodies ha superado nuestras expectativas al
                ayudarnos en cada situación que se presenta, y más allá de eso,
                nos han brindado gran apoyo en cuanto a marketing, branding y
                difusión de Favoritos.&quot;
                <br></br>
                <br></br>
                Foodius Partners.{" "}
              </p>
            </center>
          </div>
          <div className="col-md-6 mt-2 py-5">
            <center>
              <Image
                src={dostipos}
                alt="grafica"
                style={{
                  width: "500px",
                  height: "300px",
                  borderRadius: "10px",
                }}
              />
            </center>
          </div>
        </div>
      </div>

      <div className="container-fluid  bg-white py-5">
        <center>
          <h1 style={{ color: "black" }}>
            <strong>Preguntas frecuentes</strong>
          </h1>
        </center>

        <center>
          <div className="w-50 pt-4">
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  ¿Cobramos algún tipo de tarifa?
                </Accordion.Header>
                <Accordion.Body>
                  En efecto, en nuestra plataforma aplicamos una comisión por el
                  uso de nuestros servicios.{" "}
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>
                  ¿Dónde puedo ir si tengo más preguntas?
                </Accordion.Header>
                <Accordion.Body>
                  Si deseas ponerte en contacto con nosotros, puedes utilizar
                  nuestros medios de comunicación:
                  <br></br>
                  Correo electrónico: foodius@email.com
                  <br></br>
                  Teléfono: +503 xxxx-xxxx{" "}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </center>
      </div>
    </div>
  );
}
