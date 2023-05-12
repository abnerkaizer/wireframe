import { Link, useNavigate } from "react-router-dom";
import { BiCameraMovie, BiSearchAlt2 } from "react-icons/bi";
import "./styles.css";
import { useState } from "react";
const Navbar = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) {
      return;
    }
    navigate(`/search?q=${search}`);
    setSearch("");
  };
  const handleUpcoming = (e) => {
    e.preventDefault();
    navigate(`/upcoming`);
  };
  const handlePopular = (e) => {
    e.preventDefault();
    navigate(`/popular`);
  };
  return (
    <nav id="navbar">
      <h2>
        <Link to="/">
          <BiCameraMovie />
          Wireframe
        </Link>
      </h2>
      <form className="menu">
        <button onClick={handleUpcoming}>Lançamentos</button>
        <span></span>
        <button onClick={handlePopular}>Destaques</button>
      </form>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Busque um filme"
          onChange={(event) => setSearch(event.target.value)}
          value={search}
        />
        <button type="submit">
          <BiSearchAlt2 />
        </button>
      </form>
    </nav>
  );
};

export default Navbar;
