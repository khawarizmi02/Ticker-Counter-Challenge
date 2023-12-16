import { createContext, useContext, useState } from "react";

interface AuthContextType {
  queueNum: number;
  status: string;
  updateQueue: (newQueueNum: number) => void;
  updateStatus: (newStatus: any) => void;
}

const AuthContext = createContext<AuthContextType>({
  queueNum: 0,
  status: "",
  updateQueue: () => {},
  updateStatus: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [queueNum, setQueueNum] = useState(0);
  const [status, setStatus] = useState("");

  const updateQueue = (newQueueNum: number) => {
    setQueueNum(newQueueNum);
  };

  const updateStatus = (newStatus: any) => {
    setStatus(newStatus);
  };

  return (
    <AuthContext.Provider
      value={{ queueNum, status, updateQueue, updateStatus }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
