import { useDropzone } from "react-dropzone";
import styles from "./styles.module.scss";
import { CSSProperties, useState } from "react";
import { Box } from "@mui/material";
import Image from "next/image";

export default function Dropzone({ onDrop }: TProps) {
  const [pic, setPic] = useState<File & { preview: string }>();

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    accept: {
      "image/*": [],
    },
    onDrop: (af) => {
      if (af.length >= 1) {
        setPic(Object.assign(af[0], { preview: URL.createObjectURL(af[0]) }));
        onDrop(af[0]);
      }
    },
  });

  return (
    <Box>
      <Box {...getRootProps({ className: styles.dropzone })}>
        <input {...getInputProps()} />
        <p>Arrastra y suelta aquí la foto de la comida</p>
        <em>1 imagen permitida</em>
      </Box>
      {pic && (
        <div className={styles.thumbContainer}>
          <div style={thumb} key={pic.name}>
            <div style={thumbInner}>
              <Image
                alt=""
                width={300}
                height={300}
                src={pic.preview}
                style={img}
                onLoad={() => {
                  URL.revokeObjectURL(pic.preview);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </Box>
  );
}

type TProps = {
  onDrop: (file: File) => void;
};

const thumb: CSSProperties = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};
