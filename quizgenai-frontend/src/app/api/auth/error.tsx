import { useSearchParams } from "next/navigation";

const AuthErrorPage = () => {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  return (
    <div>
      <h1>Authentication Error</h1>
      <p style={{ color: "red" }}>
        {error || "An unknown authentication error occurred."}
      </p>
    </div>
  );
};

export default AuthErrorPage;
