import React, { useState } from 'react';

export type SessionContextType = {
  provider: any;
  setProvider: (provider: any) => void;
  userType: string;
  setUserType: (userType: string) => void;
  account: string;
  setAccount: (account: string) => void;
};

export const SessionContext = React.createContext<SessionContextType>({
  provider: undefined,
  setProvider: () => '',
  userType: '',
  setUserType: () => '',
  account: '',
  setAccount: () => '',
});

function useSessionContext() {
  const context = React.useContext(SessionContext);
  if (!context) {
    throw new Error(
      `useSessionContext must be used within a SessionContextProvider`
    );
  }
  return context;
}

function SessionContextProvider(props: React.PropsWithChildren<{}>) {
  const [provider, setProvider] = useState(undefined);
  const [userType, setUserType] = useState('');
  const [account, setAccount] = useState('');

  const sessionValue = {
    provider,
    setProvider,
    userType,
    setUserType,
    account,
    setAccount,
  };

  return <SessionContext.Provider value={sessionValue} {...props} />;
}

export { SessionContextProvider, useSessionContext };
