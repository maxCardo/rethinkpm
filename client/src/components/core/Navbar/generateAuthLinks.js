import React from 'react';
import {Link} from 'react-router-dom';
import AgentsIcon from './NavbarIcons/AgentsIcon';
import BuyersIcon from './NavbarIcons/BuyersIcon';
import RentersIcon from './NavbarIcons/RentersIcon';
import ServicesIcon from './NavbarIcons/ServicesIcon';
import CommunicationIcon from './NavbarIcons/CommunicationIcon';

const links = {
  'AGENTS': (
    <Link to='/profile/agentPros'>
      <AgentsIcon />
      <span>Agents</span>
    </Link>
  ),
  'BUYERS' : (
    <Link to='/profile/buyerPros'>
      <BuyersIcon />
      <span>Buyers</span>
    </Link>
  ),
  'RENTERS' : (
    <Link to='/profile/rentPros'>
      <RentersIcon />
      <span>Renters</span>
    </Link>
  ),
  'SERVICES' : (
    <Link to='/services'>
      <ServicesIcon />
      <span>Services</span>
    </Link>
  ),
  'COMMUNICATION': (
    <Link to='/chat'>
      <CommunicationIcon />
      <span>Communications</span>
    </Link>
  ),
  'MARKETPLACE': (
    <Link to='/marketplace'>
      <CommunicationIcon />
      <span>Marketplace</span>
    </Link>
  )
}

const generateAuthLinks = (navigationRoutes) => {
  return navigationRoutes.map(route => (
    links[route.code]
  ))
}

export default generateAuthLinks