import { useState, useEffect } from "react";

interface ChecklistItem {
  id: number;
  title: string;
  description: string;
  detail: string;
}

const ITEMS: ChecklistItem[] = [
  {
    id: 1,
    title: "Initialize Repository",
    description:
      "Establish the project base, file architecture, and versioning controls.",
    detail:
      "Repository settings, main branches, and security parameters have been configured.",
  },
  {
    id: 2,
    title: "Setup Database",
    description:
      "Deploy the relational databases, schema migrations, and cache servers.",
    detail:
      "Database connection pools initialized and schema migrations applied successfully.",
  },
  {
    id: 3,
    title: "Configure Security",
    description:
      "Install firewalls, encrypt keys, and establish access management.",
    detail:
      "Secret manager configured and SSL certificate verified for security protocols.",
  },
  {
    id: 4,
    title: "Deploy API Gateway",
    description:
      "Route services, manage API access, and configure rate limiters.",
    detail:
      "API Gateway routes configured with secure bearer token authorization.",
  },
  {
    id: 5,
    title: "Integrate CI/CD",
    description: "Configure automated actions, test suites, and build scripts.",
    detail:
      "Deployment pipeline greenlighted. Unit tests and lint checks verified.",
  },
  {
    id: 6,
    title: "Verify Global CDN",
    description: "Set up edge-caching zones and global load balancer nodes.",
    detail:
      "CDN caching rules compiled and asset distribution verified across active edge zones.",
  },
  {
    id: 7,
    title: "Provision Kubernetes Cluster",
    description:
      "Spin up container orchestration nodes and cluster networking modules.",
    detail:
      "Control plane active, worker nodes joined, and container network interface installed.",
  },
  {
    id: 8,
    title: "Setup Monitoring & Logging",
    description:
      "Deploy metrics collectors, log aggregators, and system dashboard monitors.",
    detail:
      "Telemetry exporters running, log streams routing to central storage, and alerts mapped.",
  },
  {
    id: 9,
    title: "Configure Domain & DNS",
    description:
      "Point public hostnames, establish subdomains, and verify propagation rules.",
    detail:
      "Nameservers updated and DNS records propagated across global routing tables.",
  },
  {
    id: 10,
    title: "Establish Backup Strategy",
    description:
      "Schedule automated snapshots, retention windows, and restore drills.",
    detail:
      "Snapshot policies scheduled and point-in-time recovery test completed.",
  },
  {
    id: 11,
    title: "Run Vulnerability Scans",
    description:
      "Perform security audits across dependencies, containers, and codebases.",
    detail:
      "Dependency vulnerability checks passed with zero high-severity CVEs detected.",
  },
  {
    id: 12,
    title: "Configure Feature Flags",
    description:
      "Set up remote flag providers and rollout management controls.",
    detail:
      "Feature flag client connected and default configuration environments mapped.",
  },
  {
    id: 13,
    title: "Set Up Error Tracking",
    description:
      "Integrate exception capture tools and performance tracing software.",
    detail:
      "Error monitoring SDK initialized and sourcemaps uploaded for production builds.",
  },
  {
    id: 14,
    title: "Perform Load Testing",
    description:
      "Simulate high concurrent user traffic and measure response thresholds.",
    detail:
      "Stress tests completed successfully under simulated peak traffic loads.",
  },
  {
    id: 15,
    title: "Launch Production Release",
    description:
      "Promote staging artifacts to live production and sign off final checklist.",
    detail:
      "Production release tagged, traffic shifted to live environment, and system stable.",
  },
];

function App() {
  const [checkedItems, setCheckedItems] = useState<{
    [key: number]: boolean;
  }>({});

  const [activeModalItem, setActiveModalItem] = useState<ChecklistItem | null>(
    null
  );

  // =========================================================
  // ESCAPE KEY
  // =========================================================

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveModalItem(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // =========================================================
  // CHECKBOX CHANGE
  //
  // This is now the single source of truth.
  // =========================================================

  const handleCheckboxChange = (item: ChecklistItem, checked: boolean) => {
    setCheckedItems((prev) => ({
      ...prev,
      [item.id]: checked,
    }));

    // Show modal only when checking
    if (checked) {
      setActiveModalItem(item);
    }
  };

  // =========================================================
  // CLOSE MODAL
  // =========================================================

  const closeModal = () => {
    setActiveModalItem(null);
  };

  return (
    <main className="container">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="header">
        <div className="page-navigation">
          <button
            type="button"
            className="page-navigation-button"
            onClick={() => {
              window.location.hash = "#booking-details";
            }}
          >
            Booking Details
          </button>
        </div>

        <h1>Workspace Setup</h1>

        <p>
          Follow the steps below to initialize and deploy the cloud application
          environment.
        </p>
      </header>

      {/* =====================================================
          INSTRUCTIONS
      ===================================================== */}

      <section className="instructions">
        <span className="instructions-icon">💡</span>

        <div className="instructions-text">
          <strong>Instructions:</strong> Select each configuration item to
          toggle its completion status. When you check a step as complete, a{" "}
          <strong>centered pop-up modal</strong> will display to confirm the
          action. You can close the modal by clicking the <strong>OK</strong>{" "}
          button or pressing <strong>Esc</strong>.
        </div>
      </section>

      {/* =====================================================
          CHECKLIST
      ===================================================== */}

      <section className="checklist" aria-label="System configuration steps">
        {ITEMS.map((item) => {
          const isChecked = !!checkedItems[item.id];

          return (
            <article
              key={item.id}
              className={`checkbox-card ${isChecked ? "checked" : ""}`}
            >
              {/* =================================================
                  REAL CHECKBOX

                  IMPORTANT:
                  This is now a real HTML checkbox.
                  ================================================= */}

              <label className="checkbox-container">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={(e) => {
                    handleCheckboxChange(item, e.target.checked);
                  }}
                  aria-label={`Mark "${item.title}" as done`}
                />

                {/* =============================================
                    VISUAL CHECKBOX
                    ============================================= */}

                <span className="checkbox-visual" aria-hidden="true">
                  <svg
                    className="checkbox-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
              </label>

              {/* =================================================
                  CARD CONTENT
                  ================================================= */}

              <div className="card-content">
                <h2 className="card-title">{item.title}</h2>

                <p className="card-description">{item.description}</p>
              </div>
            </article>
          );
        })}
      </section>

      {/* =====================================================
          MODAL
      ===================================================== */}

      {activeModalItem && (
        <div className="modal-overlay" onClick={closeModal}>
          <div
            className="modal-content"
            onClick={(e) => {
              e.stopPropagation();
            }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            {/* =================================================
                CHECKMARK
                ================================================= */}

            <div className="checkmark-container">
              <div className="checkmark-circle">
                <svg className="checkmark-svg" viewBox="0 0 24 24">
                  <path d="M20 6L9 17L4 12" />
                </svg>
              </div>
            </div>

            {/* =================================================
                MODAL TEXT
                ================================================= */}

            <span className="modal-step-info">
              Step {activeModalItem.id} Activated
            </span>

            <h2 id="modal-title" className="modal-title">
              {activeModalItem.title}
            </h2>

            <p className="modal-desc">{activeModalItem.detail}</p>

            {/* =================================================
                OK BUTTON
                ================================================= */}

            <button
              type="button"
              className="modal-btn"
              onClick={closeModal}
              autoFocus
            >
              OK
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

export default App;
