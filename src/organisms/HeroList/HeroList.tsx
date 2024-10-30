import { memo, type FC } from "react";
import { useGetAllHeroesQuery } from "../../api/heroApi";
import HeroCard from "../HeroCard/HeroCard";

import styles from "./HeroList.module.css";
import { useSearchParams } from "react-router-dom";
import Pagination from "../ Pagination/Pagination";

interface HeroListProps {
  deleteHeroMode: boolean;
}

const HeroList: FC<HeroListProps> = memo(({ deleteHeroMode }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const pageParam = searchParams.get("page");
  const page = parseInt(pageParam || "1", 10);
  const currentPage = isNaN(page) || page < 1 ? 1 : page;

  const { data, isLoading } = useGetAllHeroesQuery(currentPage);
  console.log(data);

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: newPage.toString() });
  };

  return (
    <div>
      <div className={styles.list}>
        {isLoading
          ? "loading"
          : data?.heroes?.length
          ? data?.heroes.map(({ id, images, nickname, slug }) => (
              <HeroCard
                deleteHeroMode={deleteHeroMode}
                key={id}
                images={images}
                slug={slug}
                nickname={nickname}
              />
            ))
          : "Found nothing"}
      </div>

      {data?.count && data?.count > 5 && (
        <Pagination
          currentPage={currentPage}
          totalHeroes={data?.count}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
});

export default HeroList;
