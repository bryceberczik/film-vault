import "./header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  return (
    <div>
      <header>
        <div className="header-left">
          <h1 className="brand">Film Vault</h1>
          <h2 className="options">Movies & TV</h2>
          <h2 className="options">Books</h2>
        </div>
        <div className="header-right">
        <h2 className="options">Devlogs</h2>
        <FontAwesomeIcon className="search" icon={faMagnifyingGlass} />
          <h2 className="options">Log in</h2>
        </div>
      </header>
    </div>
  );
};

export default Header;
