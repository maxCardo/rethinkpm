import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { loadUser, logout } from "../../actions/auth";
import { getCookie } from "../../util/cookies";
import AgentsIcon from "./NavbarIcons/AgentsIcon";
import BuyersIcon from "./NavbarIcons/BuyersIcon";
import MarketplaceIcon from "./NavbarIcons/MarketplaceIcon";

const Navbar = ({ auth: { isAuthenticated, loginInProgress }, logout }) => {
  useEffect(() => {
    loadUser();
  }, []);

  const handleLogout = () => {
    logout();
  };

  const authLinks = (
    <ul>
      <li>
        <Link to="/profile/agentPros">
          <AgentsIcon />
          <span>Agents</span>
        </Link>
      </li>
      <li>
        <Link to="/profile/buyerPros">
          <BuyersIcon />
          <span>Buyers</span>
        </Link>
      </li>
      <li>
        <Link to="/profile/sellerPros">
          <BuyersIcon />
          <span>Seller</span>
        </Link>
      </li>
      <li>
        <Link to="/marketplace">
          <MarketplaceIcon />
          <span>Marketplace</span>
        </Link>
      </li>
      <li>
        <Link to="/offmarket">
          <MarketplaceIcon />
          <span>OffMarket</span>
        </Link>
      </li>
      <li>
        <Link to="/propertyRecords">
          <MarketplaceIcon />
          <span>Properties</span>
        </Link>
      </li>
      <li>
        <Link to="/ownerRecords">
          <MarketplaceIcon />
          <span>Owners</span>
        </Link>
      </li>
      <li>
        <Link to="/showcase">
          <MarketplaceIcon />
          <span>Showcase</span>
        </Link>
      </li>
      <li>
        <a onClick={handleLogout} href="/">
          <i className="fas fa-sign-out-alt logOutIcon"></i>
          <span>Logout</span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );

  const links =
    isAuthenticated || (loginInProgress && getCookie("sid"))
      ? authLinks
      : guestLinks;

  return (
    <nav className="navbar navbar-fixed bg-dark">
      <h2>
        <Link to="/">
          <i className="fas fa-code"></i> ReThink PM
        </Link>
      </h2>
      {links}
    </nav>
  );
};

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout, loadUser })(Navbar);
