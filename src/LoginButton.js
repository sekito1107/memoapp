import { useAuth } from "./hooks/AuthHooks.js";

export default function LoginButton() {
  const { isLogin, login, logout } = useAuth();
  return (
    <>
      {isLogin ? (
        <button onClick={logout}>ログアウト</button>
      ) : (
        <button onClick={login}>ログイン</button>
      )}
    </>
  );
}
