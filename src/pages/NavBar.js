import { Outlet, Link, useNavigate, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import '../styles/navbar.css';

const NavBar = () => {

  const dispatch = useDispatch();

  const handleResetState = () => {
    dispatch({ type: 'BOOLEAN_FALSE', payload: false });
    dispatch({ type: 'UPDATE_EXIT', payload: true });
    dispatch({ type: 'UPDATE_SHOW_MATCH_SOUND_TO_WORD', payload: true });
    dispatch({ type: 'UPDATE_CATEGORY', payload: "" });
    dispatch({ type: 'UPDATE_RANDOM_INDEX', payload: 0 });
    dispatch({ type: 'UPDATE_FILTERED_VOCAB', payload: [] });
    dispatch({ type: 'UPDATE_SHUFFLED_FILTERED_VOCAB', payload: [] });
    dispatch({ type: 'UPDATE_INDEX_NOT_PICKED', payload: [] });
  };

  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container-fluid">
    <Link className="navbar-brand" to="/" onClick={handleResetState} >Cree Revitalization</Link>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
      <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink activeclassname="active" className="nav-link" to="/learn">
              Learn
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink activeclassname="active" className="nav-link" to="/sentences">
              Sentences
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink activeclassname="active" className="nav-link" to="/game">
            Game
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink activeclassname="active" className="nav-link" to="/category" onClick={handleResetState}>
              Category
            </NavLink>
          </li>
        </ul>
      </div>
      </div>
  </nav>
      <Outlet />
    </>
  )
};

export default NavBar;