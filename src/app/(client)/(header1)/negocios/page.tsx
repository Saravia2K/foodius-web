"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import useGlobalSettings from "@/hooks/useGlobalSettings";
import useBusiness from "@/hooks/useBusiness";
import Select from "@/components/Select";

import styles from "./styles.module.scss";

export default function NegociosPage() {
  const { business } = useBusiness();
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
        {business.map((n, i) => (
          <Link
            key={i}
            className={styles["business-card"]}
            href={`negocios/${n.slug}`}
          >
            <Image
              className={styles["business-image"]}
              src={n.image}
              alt={n.title}
              width={1280}
              height={720}
              style={{
                width: "100%",
                height: "auto",
              }}
            />
            <span className={styles["business-title"]}>{n.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
