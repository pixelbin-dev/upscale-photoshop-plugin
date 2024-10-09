import React, { useEffect, useState } from 'react';
import { entrypoints } from 'uxp';

import { Login } from '../components/Login';
import { Home } from '../components/Home';
import { storage } from '../utils';
import { ResetToken } from '../components/ResetToken';

export const App = ({ panel }) => {
  const [token, setToken] = useState(storage.getItem('token'));
  const [isResetTokenOn, setIsResetTokenOn] = useState(undefined);
  const [filters, setFilters] = useState(storage.getItem('filters'));
  const [appOrgDetails, setAppOrgDetails] = useState(
    storage.getItem('appOrgDetails')
  );

  const isUserLoggedIn = Boolean(token);

  useEffect(() => {
    entrypoints.getPanel(panel.id).menuItems.getItem('logout').enabled =
      isUserLoggedIn;
  }, [isUserLoggedIn, panel]);

  useEffect(() => {
    setIsResetTokenOn(storage.getItem('isResetTokenOn'));
  }, []);

  const _setToken = (token) => {
    storage.setItem('token', token);
    setToken(token);
  };

  const _setFilters = (filters) => {
    storage.setItem('filters', filters);
    setFilters(filters);
  };

  const _setAppOrgDetails = (appOrgDetails) => {
    storage.setItem('appOrgDetails', appOrgDetails);
    setAppOrgDetails(appOrgDetails);
  };

  if (isUserLoggedIn && isResetTokenOn) {
    return (
      <ResetToken setToken={_setToken} setAppOrgDetails={_setAppOrgDetails} />
    );
  }
  if (isUserLoggedIn) {
    return (
      <Home
        appOrgDetails={appOrgDetails}
        token={token}
        filters={filters}
        setFilters={_setFilters}
      />
    );
  }

  return <Login setToken={_setToken} setAppOrgDetails={_setAppOrgDetails} />;
};
