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
    navigate(`/wireframe/search?q=${search}`);
    setSearch("");
  };
  const handleUpcoming = (e) => {
    e.preventDefault();
    navigate(`/wireframe/upcoming`);
  };
  const handlePopular = (e) => {
    e.preventDefault();
    navigate(`/wireframe/popular`);
  };
  return (
    <nav id="navbar">
      <h2>
        <Link to="/wireframe">
          <BiCameraMovie />
          Wireframe
        </Link>
      </h2>
      <form className="menu">
        <button onClick={handleUpcoming}>Upcoming</button>
        <span></span>
        <button onClick={handlePopular}>Popular</button>
      </form>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search a movie"
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
