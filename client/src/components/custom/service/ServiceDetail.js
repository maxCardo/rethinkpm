import React from "react";
import { useParams } from "react-router-dom"; // ✅ useParams instead of this.props.match
import { connect } from "react-redux";
import ActionBar from "./ActionBar";
import DetailsBar from "./DetailsBar";
import ChildTasks from "./ChildTasks";
import BottomNavigation from "./BottomNavigation";
import TicketScreen from "./detailsScreens/TicketScreen";
import HistoryScreen from "./detailsScreens/HistoryScreen";
import CommunicationScreen from "./detailsScreens/CommunicationScreen";
import BillingScreen from "./detailsScreens/BillingScreen";
import VendorScreen from "./detailsScreens/VendorScreen";

const ServiceDetail = ({ services }) => {
  const { id } = useParams(); // ✅ React Router v6 way
  const serviceId = id;
  let service = services[serviceId];

  if (service.childs) {
    const childServices = service.childs.map((childId) => services[childId]);
    service = { ...service, childs: childServices };
  } else {
    service.childs = [];
  }

  const agentContact = {
    phone: "12345678",
    email: "lagartoverde97@gmail.com",
  };

  const screens = [
    {
      route: "ticket",
      display: "Ticket",
      component: <TicketScreen service={service} />,
    },
    {
      route: "history",
      display: "History",
      component: <HistoryScreen />,
    },
    {
      route: "communication",
      display: "Communication",
      component: <CommunicationScreen />,
    },
    {
      route: "billing",
      display: "Billing",
      component: <BillingScreen />,
    },
    {
      route: "vendor",
      display: "Vendor",
      component: <VendorScreen />,
    },
  ];

  return (
    <div className="service-detail__service-container">
      <div className="service-detail__action-bar">
        <ActionBar
          name="Oscar Rodriguez"
          title="MyCompany's CEO"
          contact={agentContact}
        />
      </div>
      <div className="service-detail__detail-bar">
        <DetailsBar service={service} />
      </div>
      <div className="service-detail__main-container">
        <div className="service-detail__child-tasks-container">
          <ChildTasks tasks={service.childs} parentId={service.parent} />
        </div>
        <div className="service-detail__data-container">
          <BottomNavigation screens={screens} />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  services: state.services.services,
});

export default connect(mapStateToProps)(ServiceDetail);
