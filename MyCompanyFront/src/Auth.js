import { React } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "react-bootstrap";

export const LoginOrLogout = () => {
  const { isAuthenticated, isLoading, loginWithRedirect, logout } = useAuth0();
    if (isLoading) {
      return <div>Loading ...</div>;
    }

  if (isAuthenticated) {
    return (
      <Button
        variant="link"
        size="lg"
        onClick={() => logout({ returnTo: window.location.origin })}
      >
        ログアウト
      </Button>
    );
  } else {
    return (
        <Button variant="link" size="lg" onClick={() => loginWithRedirect()}>
          ログイン
        </Button>
    );
  }
}

export const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  console.log(user)

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
      </div>
    )
  );
};
