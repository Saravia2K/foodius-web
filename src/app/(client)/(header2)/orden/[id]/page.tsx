
import React from 'react';


import Image from "next/image";
import pasta from "@/assets/pasta.jpg"

export default function detalle_orden() {
    return (
        <div>
            <div style={{ backgroundColor: '#FFEFEA' }}>

                <div className="container-fluid">
                    <div className="row d-flex">
                        <div className="col-sm-8 py-5 px-5">
                            <div className="card rounded-5 border-0">
                                <div className="card-body">
                                    <h4 className="card-title border-bottom py-3">Detalle del usuario</h4>

                                    <form>
                                        <div className="mb-3 py-4">
                                            <label htmlFor="fullName" className="form-label fw-bold">Nombre completo</label>
                                            <input type="text" className="form-control rounded-5" id="fullName" placeholder="Ingresa tu nombre completo" />
                                        </div>
                                        <div className="row">
                                            <div className="col">
                                                <div className="mb-3">
                                                    <label htmlFor="email" className="form-label fw-bold">Correo electrónico</label>
                                                    <input type="email" className="form-control rounded-5" id="email" placeholder="nombre@ejemplo.com" />
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="mb-3">
                                                    <label htmlFor="phone" className="form-label fw-bold">Teléfono</label>
                                                    <input type="tel" className="form-control rounded-5" id="phone" placeholder="Ingresa tu número de teléfono" />
                                                </div>
                                            </div>
                                        </div>

                                    </form>

                                    <h4 className="card-title border-bottom py-4">Detalle de la orden</h4>

                                    <div className="row">
                                        <div className="col">
                                            <h6 className="card-title fw-bold py-3">Metodo: </h6>
                                        </div>
                                        <div className="col">
                                            <h6 className="card-title fw-bold py-3">Pick-up</h6>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col">
                                            <h6 className="card-title fw-bold py-3">Sub total: </h6>
                                        </div>
                                        <div className="col">
                                            <h6 className="card-title py-3">$$</h6>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col">
                                            <h6 className="card-title fw-bold py-3">Cobro por servicio: </h6>
                                        </div>
                                        <div className="col">
                                            <h6 className="card-title py-3">$$</h6>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col">
                                            <h6 className="card-title fw-bold py-3">total: </h6>
                                        </div>
                                        <div className="col">
                                            <h6 className="card-title py-3">$$</h6>
                                        </div>
                                    </div>

                                    <h4 className="card-title border-bottom py-4">Metodo de pago</h4>

                                    <button type="button" className="btn btn-warning btn-lg py-2 m-2">
                                        <span className="me-2" style={{ backgroundColor: "white", width: "20px", height: "20px", display: "inline-block", borderRadius: "4px" }}></span>
                                        Pago contra-entrega
                                    </button>



                                </div>
                            </div>
                        </div>
                        <div className="col-sm-4 py-5">
                            <div className="card rounded-5 border-0">
                                <div className="card-body">
                                    <h4 className="card-title border-bottom py-4">Resumen</h4>
                                    <div className="card mb-3" style={{ maxWidth: '540px' }}>
                                        <div className="row g-0 align-items-center">
                                            <div className="col-md-4 rounded-3">
                                                <Image src={pasta} alt="Delicious pasta" className="img-fluid rounded p-3" style={{ maxWidth: '100%' }} />
                                            </div>



                                            <div className="col-md-8">
                                                <div className="card-body">
                                                    <h5 className="card-title">Food name</h5>
                                                    <div className="row">
                                                        <div className="col">
                                                            <h6 className="card-title py-2">cantidad: </h6>
                                                        </div>
                                                        <div className="col">
                                                            <h6 className="card-title fw-bold py-2">##</h6>
                                                        </div>
                                                    </div>
                                                    <h6 className="text-danger fw-bold">$$</h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>




                                <div className="row container">
                                    
                                    <div className="col text-end">
                                        <h6 className=" py-3 fw-bold">Total: aqui tiene que ir una variable de precio $$</h6>
                                    </div>
                                </div>



                                <button type="button" className="btn btn-danger btn-lg py-2 m-2">
                                    <span className="me-2" style={{ backgroundColor: "white", width: "20px", height: "20px", display: "inline-block", borderRadius: "4px" }}></span>
                                    Pago contra-entrega
                                </button>

                            </div>



                        </div>
                    </div>
                </div>




            </div>
        </div>
    );
}
