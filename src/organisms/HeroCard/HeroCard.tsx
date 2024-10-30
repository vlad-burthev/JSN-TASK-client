import { type FC } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";

import styles from "./HeroCard.module.css";

import { useDeleteHeroMutation } from "../../api/heroApi";

import DeleteIcon from "../../assets/images/delete.svg?react";

interface HeroCardProps {
  images: string[];
  nickname: string;
  deleteHeroMode: boolean;
  slug: string;
}

const HeroCard: FC<HeroCardProps> = ({
  images,
  nickname,
  deleteHeroMode,
  slug,
}) => {
  const [deleteHero] = useDeleteHeroMutation();

  const deleteHeroHandler = () => {
    deleteHero(slug);
  };

  return (
    <div
      className={clsx(styles[`${deleteHeroMode && "shake"}`], styles.wrapper)}
    >
      {deleteHeroMode && (
        <button
          style={{ position: "absolute", right: 0 }}
          className={styles["close-btn"]}
          onClick={deleteHeroHandler}
        >
          <DeleteIcon />
        </button>
      )}
      <Link
        to={`/hero/${slug}`}
        className={clsx(styles.card, styles[`${deleteHeroMode && "shake"}`])}
      >
        <img
          className={styles.image}
          src={import.meta.env.VITE_BASE_IMAGE_URL + images[0]}
          alt={`${nickname} image`}
        />
        <h2>{nickname}</h2>
      </Link>
    </div>
  );
};

export default HeroCard;
