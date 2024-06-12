"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import useGlobalSettings from "@/hooks/useGlobalSettings";
import Select from "@/components/Select";
import useBusinesses from "@/hooks/useBusinesses";
import { API_URL } from "@/utils/consts";

import styles from "./styles.module.scss";

export default function NegociosPage() {
  const { businesses } = useBusinesses();
  const [order, setOrder] = useState<"p" | "n">("p");
  const { setMainStyles } = useGlobalSettings((s) => s);

  useEffect(() => {
    setMainStyles({
      paddingTop: "25px",
    });

    return () => setMainStyles({});
  }, []);

  return (
    <div className={styles.negocios}>
      <head>
        <title>Foodius | Negocios</title>
      </head>
      <Select
        sx={{ width: 150 }}
        value={order}
        onChange={(e) => setOrder(e.target.value as any)}
        items={[
          { text: "Precio", value: "p" },
          { text: "Nombre", value: "n" },
        ]}
      />
      <h2 className={styles.title}>Hecho especialmente para ti</h2>
      <div className={styles.container}>
        {businesses.map((n, i) => (
          <Link
            key={i}
            className={styles["business-card"]}
            href={`negocios/${n.slug}`}
          >
            <Image
              className={styles["business-image"]}
              src={`${API_URL}/static/banners/${n.banner}`}
              alt={n.name}
              width={960}
              height={540}
              style={{
                width: "100%",
                height: "auto",
              }}
            />
            <span className={styles["business-title"]}>{n.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
