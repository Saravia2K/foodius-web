import Image from "next/image";
import pasta from "@/assets/pasta.jpg"
import carrito from "@/assets/images/carrito.png"

import ColoredButton from "@/components/ColoredButton";
import Counter from "@/components/Counter";



export default function carrito_compra() {
    return (


        <div className="card rounded-5 border-0" style={{ backgroundColor: '#FFEFEA' }}>


            <ColoredButton color="pink">X</ColoredButton>
            <div className="col d-flex">
                <h4 className="card-title border-bottom py-4 fw-bold">Tu carrito</h4>
                <Image
                    src={carrito}
                    alt="Delicious pasta"
                    className="rounded p-3"
                    style={{ fontSize: '1rem', width: '6%', height: 'auto' }}
                />
            </div>
            <div className="card-body">



                <div className="card mb-3" style={{ maxWidth: '540px' }}>
                    <div className="row g-0 align-items-center">
                        <div className="col-md-4 rounded-3">
                            <Image
                                src={pasta}
                                alt="Delicious pasta"
                                className="img-fluid rounded p-3"
                                style={{ maxWidth: '100%', maxHeight: '150%', height: 'auto' }}
                            />
                        </div>




                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title">Food name</h5>
                                <div className="row">
                                    <div className="col d-flex">
                                        <h6 className="card-title py-2 px-2">Cantidad: </h6>
                                        
                                        <Counter></Counter>

                                        <ColoredButton color="yellow" className="px-3">🗑️</ColoredButton>
                                    </div>
                                </div>
                                <h6 className="fw-bold" style={{ color: '#F20574' }}>$$</h6>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>


            <ColoredButton color="pink" fullWidth>Ordena aqui!</ColoredButton>




        </div>



    );



}