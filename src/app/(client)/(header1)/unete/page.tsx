import Input from "@/components/Input";
import ColoredButton from "@/components/ColoredButton";
import Image from "next/image";
import graficas from "../../../../assets/images/grffoodius.png";

export default function UnetePage() {
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="p-3">
              <center>
                <h1 style={{ fontSize: "100px", marginTop: "120px" }}>
                  <strong>Se parte de</strong>
                </h1>
              </center>
              <center>
                <h1 style={{ color: "#F20574", fontSize: "120px" }}>
                  <strong>#Foodius</strong>
                </h1>
              </center>
            </div>
          </div>
          <div className="col-md-6">
            <div className="p-3">
              <div className="card rounded-5 border-0  p-3">
                <div className="card-body">
                  <h6 className="card-title border-bottom py-4">
                    Asociate a foodius para impulsar el crecimiento y llevar tus{" "}
                    <strong style={{ color: "#F20574" }}>
                      Antojitos a un nuevo nivel.
                    </strong>
                  </h6>
                </div>

                <Input
                  title="Nombre del negocio"
                  placeholder="ingrese el nombre"
                  type="text"
                  style={{ margin: "10px", padding: "10px" }}
                />

                <Input
                  title="Ubicacion del negocio"
                  placeholder="Departamento / ciudad"
                  type="text"
                  style={{ margin: "10px", padding: "10px" }}
                ></Input>
                <Input
                  title="Correo electronico"
                  placeholder="example@gmail.com"
                  type="email"
                  style={{ margin: "10px", padding: "10px" }}
                ></Input>
                <Input
                  title="Telefono comercial"
                  placeholder="xxxx-xxxx"
                  type="tel"
                  style={{ margin: "10px", padding: "10px" }}
                ></Input>
                <Input
                  title="Logo"
                  placeholder="ingrese la imagen"
                  type="image"
                  style={{ margin: "10px", padding: "10px" }}
                ></Input>
                <Input
                  title="Banner"
                  placeholder="ingrese la imagen"
                  type="image"
                  style={{ margin: "10px", padding: "10px" }}
                ></Input>

                <ColoredButton
                  color="pink"
                  style={{ margin: "20px", padding: "10px" }}
                >
                  Registrar negocio
                </ColoredButton>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid bg-white py-5">
        <center>
          <h1 style={{ fontSize: "80px", marginTop: "60px" }}>
            <strong>Unete a </strong>{" "}
            <strong style={{ color: "#F20574" }}>#Foodius </strong>{" "}
            <strong> y despierta el hambre de nuevos clientes</strong>
          </h1>
        </center>

        <div className="row">
          <div className="col-md-6 mt-5 py-5">
            <center>
              <h1
                style={{ fontSize: "35px", marginTop: "40px", margin: "40px" }}
              >
                <strong>Brilla en el </strong>{" "}
                <strong style={{ color: "#F20574" }}>Menu Digital </strong>{" "}
                <strong> : Aumenta tu Visibilidad con foodius</strong>
              </h1>
            </center>
            <center>
              <p style={{ margin: "40px" }}>
                Al unirte a foodius, tu restaurante o negocio ganara visibilidad
                y alcanzara a una amplia audiencia de clientes potenciales que
                buscan opciones gastronomicas locales.
              </p>
            </center>
          </div>

          <div className="col-md-6 py-5">
            <center>
              <Image
                src={graficas}
                alt="grafica"
                style={{ width: "400px", height: "400px" }}
              />
            </center>
          </div>
        </div>
      </div>
    </div>
  );
}
