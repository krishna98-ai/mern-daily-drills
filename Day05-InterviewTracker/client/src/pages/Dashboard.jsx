import {useAuth} from "../context/AuthContext"
const Dashboard = () => {
  const { user, isLoggedIn } = useAuth();

  console.log(user);
  console.log(isLoggedIn);

  return <h1>Dashboard</h1>;
}

export default Dashboard