import HeroImageList from "../../organisms/HeroImageList/HeroImageList";
import HeroData from "../../organisms/HeroData/HeroData";
import { useLazyGetOneHeroQuery } from "../../api/heroApi";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./HeroPage.module.css";

const HeroPage = () => {
  const { slug } = useParams();
  const [changeMode, setChangeMode] = useState(false);
  const [getHero, { data, isLoading }] = useLazyGetOneHeroQuery();

  useEffect(() => {
    if (slug) {
      getHero(slug);
    }
  }, [slug]);

  return (
    <div>
      <header className={styles.header}>
        <Link to="/">Go home</Link>
        <button onClick={() => setChangeMode((prev) => !prev)}>
          {changeMode ? "Cancel" : "Change"}
        </button>
      </header>

      {isLoading
        ? "loading"
        : data && (
            <>
              <HeroData
                setChangeMode={setChangeMode}
                changeMode={changeMode}
                data={data}
              />
              <HeroImageList
                slug={data?.slug}
                changeMode={changeMode}
                images={data?.images}
              />
            </>
          )}
    </div>
  );
};

export default HeroPage;
