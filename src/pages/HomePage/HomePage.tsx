import { useState } from "react";
import HeroList from "../../organisms/HeroList/HeroList";
import CreateHeroModal from "../../organisms/CreateHeroModal/CreateHeroModal";

import styles from "./HomePage.module.css";

const HomePage = () => {
  const [deleteHeroMode, setDeleteHeroMode] = useState(false);
  const [showCreateHeroModal, setShowCreateHeroModal] = useState(false);

  return (
    <div>
      <header className={styles.header}>
        <button onClick={() => setShowCreateHeroModal(true)}>Add Hero</button>
        <button onClick={() => setDeleteHeroMode((prev) => !prev)}>
          {deleteHeroMode ? "Cancel" : "Delete Hero"}
        </button>
      </header>
      <HeroList deleteHeroMode={deleteHeroMode} />

      {showCreateHeroModal && (
        <CreateHeroModal setShowCreateHeroModal={setShowCreateHeroModal} />
      )}
    </div>
  );
};

export default HomePage;
