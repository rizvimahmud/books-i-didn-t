import { getMe } from "@lib/api";
import React from "react";
import { useEffect } from "react";
import { UserDocumentWithoutPassword } from "types/Auth";

interface UserContextType {
  user?: UserDocumentWithoutPassword;
  setUser: (user?: UserDocumentWithoutPassword) => void;
}

const UserContext = React.createContext<UserContextType>(null!);

interface UserProviderProps {
  initialUser?: UserDocumentWithoutPassword;
  children: React.ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({
  initialUser,
  ...props
}) => {
  const [user, setUser] = React.useState(initialUser);
  const getUser = async () => {
    const user = await getMe();

    setUser(user.data);
  };

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [user]);

  const value = React.useMemo(() => ({ user, setUser }), [user]);

  return <UserContext.Provider value={value} {...props} />;
};

export default function useUser() {
  return React.useContext(UserContext);
}
