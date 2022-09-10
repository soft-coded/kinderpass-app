import "./homepage.css";
import { useAppSelector } from "../../store";

export default function HomePage() {
  const isAuthed = useAppSelector((state) => state.auth.isAuthenticated);

  return (
    <div className="homepage container">
      {isAuthed ? (
        <></>
      ) : (
        <h2 className="unauthed centered">
          Log in or sign up to manage employee data
        </h2>
      )}
    </div>
  );
}
