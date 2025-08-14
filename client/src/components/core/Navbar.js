import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { loadUser, logout } from "../../actions/auth";
import { getCookie } from "../../util/cookies";

import {
  FaUserTie,
  FaUserPlus,
  FaUserCheck,
  FaStore,
  FaBuilding,
  FaUsers,
  FaStar,
  FaSignOutAlt,
  FaChevronDown,
  FaChevronUp,
  FaClipboardList,
} from "react-icons/fa";

import gsap from "gsap";

const Navbar = ({
  auth: { isAuthenticated, loginInProgress },
  logout,
  setIsNavbarShown,
}) => {
  const [showNav, setShowNav] = useState(false);
  const navRef = useRef(null);
  const arrowRef = useRef(null);

  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    // for UI purposes use in different components
    setIsNavbarShown(showNav);

    if (!navRef.current || !arrowRef.current) return;
    if (showNav) {
      gsap.to(navRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.2,
        display: "block",
        ease: "power1.out",
      });

      gsap.to(arrowRef.current, {
        y: 68,
        duration: 0.3,
        ease: "power1.out",
      });
    } else {
      gsap.to(navRef.current, {
        y: -20,
        opacity: 0,
        duration: 0.2,
        ease: "power1.in",
        onComplete: () => {
          if (navRef.current) navRef.current.style.display = "none";
        },
      });

      gsap.to(arrowRef.current, {
        y: 4,
        duration: 0.3,
        ease: "power1.in",
      });
    }
  }, [showNav]);

  const handleLogout = () => {
    logout();
  };

  const iconStyle =
    "text-darkBlue w-6 h-6 transition-transform duration-200 group-hover:scale-110";
  const linkStyle =
    "flex flex-col text-darkBlue items-center gap-1 group text-sm ";

  const authLinks = (
    <ul className="flex mt-2 flex-wrap justify-center gap-6 text-darkBlue">
      <li>
        <Link to="/profile/agentPros" className={linkStyle}>
          <FaUserTie className={iconStyle} />
          <span className="text-darkBlue">Agents</span>
        </Link>
      </li>
      <li>
        <Link to="/profile/buyerPros" className={linkStyle}>
          <FaUserPlus className={iconStyle} />
          <span className="text-darkBlue">Buyers</span>
        </Link>
      </li>
      <li>
        <Link to="/profile/sellerPros" className={linkStyle}>
          <FaUserCheck className={iconStyle} />
          <span className="text-darkBlue">Seller</span>
        </Link>
      </li>
      <li>
        <Link to="/marketplace" className={linkStyle}>
          <FaStore className={iconStyle} />
          <span className="text-darkBlue">Marketplace</span>
        </Link>
      </li>
      <li>
        <Link to="/offmarket" className={linkStyle}>
          <FaStore className={iconStyle} />
          <span className="text-darkBlue">OffMarket</span>
        </Link>
      </li>
      <li>
        <Link to="/propertyRecords" className={linkStyle}>
          <FaBuilding className={iconStyle} />
          <span className="text-darkBlue">Properties</span>
        </Link>
      </li>
      <li>
        <Link to="/crm/leaselead" className={linkStyle}>
          <FaClipboardList className={iconStyle} />
          <span className="text-darkBlue">Lease Leads</span>
        </Link>
      </li>
      <li>
        <Link to="/ownerRecords" className={linkStyle}>
          <FaUsers className={iconStyle} />
          <span className="text-darkBlue">Owners</span>
        </Link>
      </li>
      <li>
        <Link to="/showcase" className={linkStyle}>
          <FaStar className={iconStyle} />
          <span className="text-darkBlue">Showcase</span>
        </Link>
      </li>
      <li>
        <a
          onClick={handleLogout}
          href="/"
          className={`${linkStyle} text-red-400 hover:text-red-500`}
        >
          <FaSignOutAlt className={iconStyle} />
          <span className="text-darkBlue">Logout</span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul className="p-4 text-darkBlue">
      <li>
        <Link to="/login" className="text-blue-500 hover:text-blue-400">
          Login
        </Link>
      </li>
    </ul>
  );

  const links =
    isAuthenticated || (loginInProgress && getCookie("sid"))
      ? authLinks
      : guestLinks;

  return (
    <>
      <div
        onClick={() => setShowNav(!showNav)}
        ref={arrowRef}
        className="absolute  left-1/2 -translate-x-1/2 z-50  p-1 rounded-2xl border  text-darkBlue shadow-lg"
      >
        {showNav ? <FaChevronUp size={20} /> : <FaChevronDown size={20} />}
      </div>

      {/* Nav Content */}
      <nav ref={navRef} style={{ display: "none" }} className=" text-white ">
        {links}
      </nav>
    </>
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
