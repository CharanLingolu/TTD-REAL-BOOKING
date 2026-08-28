import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./App.css";
import App from "./App.tsx";
import TtdBookingPracticePage from "./TtdBookingPracticePage.tsx";

type Page = "checkbox" | "booking";

function getPageFromHash(): Page {
  return window.location.hash === "#booking-details"
    ? "booking"
    : "checkbox";
}

function Root() {
  const [page, setPage] = useState<Page>(
    getPageFromHash()
  );

  useEffect(() => {
    const handleHashChange = () => {
      setPage(getPageFromHash());
      window.scrollTo(0, 0);
    };

    window.addEventListener(
      "hashchange",
      handleHashChange
    );

    return () => {
      window.removeEventListener(
        "hashchange",
        handleHashChange
      );
    };
  }, []);

  if (page === "booking") {
    return <TtdBookingPracticePage />;
  }

  return <App />;
}

createRoot(
  document.getElementById("root")!
).render(
  <StrictMode>
    <Root />
  </StrictMode>
);
