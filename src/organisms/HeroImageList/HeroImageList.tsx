import { type FC } from "react";

import styles from "./HeroImageList.module.css";
import clsx from "clsx";

import DeleteIcon from "../../assets/images/delete.svg?react";
import {
  useAddImagesMutation,
  useDeleteImageMutation,
} from "../../api/heroApi";

interface HeroImageListProps {
  images: string[];
  changeMode: boolean;
  slug: string;
}

const HeroImageList: FC<HeroImageListProps> = ({
  images,
  slug,
  changeMode,
}) => {
  const [deleteImage] = useDeleteImageMutation();
  const [addImages] = useAddImagesMutation();

  const deleteHeroHandler = (imageName: string) => {
    deleteImage({ slug, imageName });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const images = e.target.files;
    const formData = new FormData();

    if (images && images.length) {
      Array.from(images).forEach((file) => {
        formData.append("images", file);
      });
    }

    await addImages({ slug, images: formData });
  };

  return (
    <div className={styles.list}>
      {images.map((url) => (
        <div
          key={url}
          className={clsx(styles.wrapper, changeMode && styles.shake)}
        >
          {changeMode && (
            <button
              style={{ position: "absolute", right: 0 }}
              className={styles["close-btn"]}
              onClick={() => deleteHeroHandler(url)}
            >
              <DeleteIcon />
            </button>
          )}
          <img
            className={styles.image}
            src={import.meta.env.VITE_BASE_IMAGE_URL + url}
            alt={url}
          />
        </div>
      ))}
      {changeMode && (
        <div>
          <input
            onChange={handleFileChange}
            type="file"
            id="fileInput"
            multiple
            style={{ display: "none" }}
          />
          <label htmlFor="fileInput" className={styles["custom-file-upload"]}>
            +
          </label>
        </div>
      )}
    </div>
  );
};

export default HeroImageList;
