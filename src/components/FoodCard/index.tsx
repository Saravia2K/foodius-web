import Image from "next/image";
import ColoredButton from "../ColoredButton";

import style from "./styles.module.scss";

export default function FoodCard(props: TProps) {
  const { name, imgSrc, description, onOrderBtnClick } = props;
  return (
    <div className={style["food-card"]}>
      <div className={style["food-info"]}>
        <h3 className={style["food-name"]}>{name}</h3>
        <p className={style["food-description"]}>{description}</p>
        <ColoredButton
          color="pink"
          onClick={onOrderBtnClick}
          className={style["order-btn"]}
        >
          Ordenar
        </ColoredButton>
      </div>
      <div className={style["food-img-container"]}>
        <Image
          className={style["food-img"]}
          width={200}
          height={200}
          src={imgSrc}
          alt={`${name}-card`}
        />
      </div>
    </div>
  );
}

type TProps = {
  name: string;
  imgSrc: string;
  description: string;
  onOrderBtnClick?: () => any;
};
