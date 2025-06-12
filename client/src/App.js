import { Fragment, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import "./tailwind-output.css";

//Components
import PrivateRoute from "./components/core/routing/PrivateRoute";
import Navbar from "./components/core/Navbar";
import Landing from "./components/custom/Landing";
import Login from "./components/core/Login";
import Register from "./components/core/Register";
import Playground from "./components/core/Playground";
import ServiceList from "./components/custom/Service/ServiceList";
import ServiceDetail from "./components/custom/Service/ServiceDetail";
import ServiceReq from "./components/custom/Service/ServiceReq";
import ServiceTicket from "./components/custom/Service/ServiceTicket";
import Profile from "./components/custom/profile/Profile";
import ChatScreen from "./components/custom/Chat/ChatScreen";
import Marketplace from "./components/custom/Marketplace/Marketplace";
import OffMarketList from "./components/custom/OffMarket/List";
import { loadUser } from "./actions/auth";
import { receiveSMS } from "./actions/profile";
import { connect } from "react-redux";
import io from "socket.io-client";
import settings from "./settings.json";
import Alert from "./components/core/Alert";
import Dash from "./components/custom/Dash";
import TestVerticalTable from "./components/custom/TestVerticalTable";
import PropertyRecords from "./components/custom/PropertyRecords/PropertyRecords";
import OwnerRecords from "./components/custom/PropertyRecords/OwnerRecords";
import ShowcaseRecords from "./components/custom/Marketplace/showcase/showcase";

const App = ({ loadUser, receiveMessage, receiveSMS, activeChat }) => {
  const [isNavbarShown, setIsNavbarShown] = useState(false);

  if (Notification.permission === "default") {
    Notification.requestPermission();
  }
  registerServiceWorker();

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const socket = io.connect(
    process.env.REACT_APP_SOCKET_BACKEND
      ? process.env.REACT_APP_SOCKET_BACKEND
      : ""
  );
  socket.on("sms", (chat) => {
    if (chat._id === activeChat.chat._id) {
      receiveSMS(chat);
    }

    //receiveMessage({chat_id, message, uuid})
    //showNotification(`New message from ${chat_id}`, message)
  });

  const routeSettings = settings.routes;
  return (
    <Router>
      <Fragment>
        <Navbar  setIsNavbarShown={setIsNavbarShown}/>
        <Routes>
          <Route path="/" element={<Landing />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/serviceReq" element={<ServiceReq />} />
          <Route path="/serviceTicket" element={<ServiceTicket />} />
          <Route path="/playground" element={<Playground />} />
          <Route path="/vertical-table" element={<TestVerticalTable />} />

          {/* Private Routes */}
          <Route
            path="/services"
            element={
              <PrivateRoute>
                <ServiceList />
              </PrivateRoute>
            }
          />
          <Route
            path="/services/:id"
            element={
              <PrivateRoute>
                <ServiceDetail />
              </PrivateRoute>
            }
          />
          <Route
            path="/services/:id/:screen"
            element={
              <PrivateRoute>
                <ServiceDetail />
              </PrivateRoute>
            }
          />
          <Route
            path="/chat"
            element={
              <PrivateRoute>
                <ChatScreen />
              </PrivateRoute>
            }
          />
          <Route
            path="/dash"
            element={
              <PrivateRoute>
                <Dash />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile/rentPros"
            element={
              <PrivateRoute>
                <Profile settings={routeSettings.profile.rentPros} />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile/agentPros"
            element={
              <PrivateRoute>
                <Profile settings={routeSettings.profile.agentPros} />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile/buyerPros"
            element={
              <PrivateRoute>
                <Profile settings={routeSettings.profile.buyerPros} />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile/sellerPros"
            element={
              <PrivateRoute>
                <Profile settings={routeSettings.profile.sellerPros} />
              </PrivateRoute>
            }
          />
          <Route
            path="/marketplace"
            element={
              <PrivateRoute>
                <Marketplace
                  apiKey={routeSettings.marketplace.streetViewApiKey}
                  isNavbarShown={isNavbarShown}
                />
              </PrivateRoute>
            }
          />
          <Route
            path="/offmarket"
            element={
              <PrivateRoute>
                <OffMarketList
                  apiKey={routeSettings.marketplace.streetViewApiKey}
                />
              </PrivateRoute>
            }
          />
          <Route
            path="/propertyRecords"
            element={
              <PrivateRoute>
                <PropertyRecords />
              </PrivateRoute>
            }
          />
          <Route
            path="/ownerRecords"
            element={
              <PrivateRoute>
                <OwnerRecords />
              </PrivateRoute>
            }
          />
          <Route
            path="/showcase"
            element={
              <PrivateRoute>
                <ShowcaseRecords />
              </PrivateRoute>
            }
          />
        </Routes>

        <Alert />
      </Fragment>
    </Router>
  );
};

const registerServiceWorker = async () => {
  const swRegistration = await navigator.serviceWorker.register(
    "/service-worker.js"
  );
  window.serviceWorker = swRegistration;
  return swRegistration;
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  activeChat: state.profile.activeChat,
});

// const mapDispatchToProps = dispatch => {
//   return {
//     loadUser: loadUser().bind(this,dispatch),
//     receiveMessage:({chat_id, message, uuid}) => dispatch({type: RECEIVE_MESSAGE, payload: {chat_id, message, uuid}})
//   }
// }

export default connect(mapStateToProps, { loadUser, receiveSMS })(App);
