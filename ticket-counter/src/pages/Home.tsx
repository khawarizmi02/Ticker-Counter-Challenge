import { Link, Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center pt-6">
      <h1 className="font-bold text-10">
        Welcome to the Ticket Counter Manager
      </h1>
      <div className="flex justify-center items-center py-3 my-3">
        <Link to="/manager" className="p-3 m-3 bg-yellow-500">
          Manager
        </Link>
        <Link to="/customer" className="p-3 m-3 bg-blue-200">
          Customer
        </Link>
      </div>
      <Outlet />
    </div>
  );
};

export default Home;
