import Link from "next/link";
import TagsMenu from "../TagsMenu/TagsMenu";

import css from "@/components/Header/Header.module.css";
import AuthNavigation from "../AuthNavigation/AuthNavigation";

const Header = async () => {
  return (
    <header className={css.header}>
      <Link href="/" aria-label="Home" className={css.headerLink}>
        NoteHub
      </Link>
      <nav className={css.navigation} aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li className={css.navigationItem}>
            <Link href="/" className={css.navigationLink}>
              Home
            </Link>
          </li>
          <li className={css.navigationItem}>
            <TagsMenu />
          </li>
          <AuthNavigation />
        </ul>
      </nav>
    </header>
  );
};

export default Header;