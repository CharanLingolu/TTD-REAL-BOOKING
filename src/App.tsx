import React, { useEffect, useState } from "react";
import "./TtdBookingPracticePage.css";

type Pilgrim = { name: string; age: string; gender: string; photoIdProof: string; photoIdNumber: string };
type GeneralDetails = { gothram: string; email: string; city: string; state: string; country: string; pincode: string };
interface ChecklistItem { id: number; title: string; description: string; detail: string }

const emptyPilgrim = (): Pilgrim => ({ name: "", age: "", gender: "", photoIdProof: "", photoIdNumber: "" });
const initialPilgrims: Pilgrim[] = Array.from({ length: 6 }, () => emptyPilgrim());
const initialGeneralDetails: GeneralDetails = { gothram: "", email: "", city: "", state: "", country: "", pincode: "" };
const genderOptions = ["Male", "Female", "Other"];
const idProofOptions = ["Aadhaar Card", "Passport", "Voter ID", "Driving Licence", "PAN Card"];

const ITEMS: ChecklistItem[] = [
  { id: 1, title: "Initialize Repository", description: "Establish the project base, file architecture, and versioning controls.", detail: "Repository settings, main branches, and security parameters have been configured." },
  { id: 2, title: "Setup Database", description: "Deploy the relational databases, schema migrations, and cache servers.", detail: "Database connection pools initialized and schema migrations applied successfully." },
  { id: 3, title: "Configure Security", description: "Install firewalls, encrypt keys, and establish access management.", detail: "Secret manager configured and SSL certificate verified for security protocols." },
  { id: 4, title: "Deploy API Gateway", description: "Route services, manage API access, and configure rate limiters.", detail: "API Gateway routes configured with secure bearer token authorization." },
  { id: 5, title: "Integrate CI/CD", description: "Configure automated actions, test suites, and build scripts.", detail: "Deployment pipeline greenlighted. Unit tests and lint checks verified." },
  { id: 6, title: "Verify Global CDN", description: "Set up edge-caching zones and global load balancer nodes.", detail: "CDN caching rules compiled and asset distribution verified across active edge zones." },
  { id: 7, title: "Provision Kubernetes Cluster", description: "Spin up container orchestration nodes and cluster networking modules.", detail: "Control plane active, worker nodes joined, and container network interface installed." },
  { id: 8, title: "Setup Monitoring & Logging", description: "Deploy metrics collectors, log aggregators, and system dashboard monitors.", detail: "Telemetry exporters running, log streams routing to central storage, and alerts mapped." },
  { id: 9, title: "Configure Domain & DNS", description: "Point public hostnames, establish subdomains, and verify propagation rules.", detail: "Nameservers updated and DNS records propagated across global routing tables." },
  { id: 10, title: "Establish Backup Strategy", description: "Schedule automated snapshots, retention windows, and restore drills.", detail: "Snapshot policies scheduled and point-in-time recovery test completed." },
  { id: 11, title: "Run Vulnerability Scans", description: "Perform security audits across dependencies, containers, and codebases.", detail: "Dependency vulnerability checks passed with zero high-severity CVEs detected." },
  { id: 12, title: "Configure Feature Flags", description: "Set up remote flag providers and rollout management controls.", detail: "Feature flag client connected and default configuration environments mapped." },
  { id: 13, title: "Set Up Error Tracking", description: "Integrate exception capture tools and performance tracing software.", detail: "Error monitoring SDK initialized and sourcemaps uploaded for production builds." },
  { id: 14, title: "Perform Load Testing", description: "Simulate high concurrent user traffic and measure response thresholds.", detail: "Stress tests completed successfully under simulated peak traffic loads." },
  { id: 15, title: "Launch Production Release", description: "Promote staging artifacts to live production and sign off final checklist.", detail: "Production release tagged, traffic shifted to live environment, and system stable." },
];

function App() {
  const [page, setPage] = useState(window.location.hash || "#booking-details");
  useEffect(() => {
    const onHash = () => setPage(window.location.hash || "#booking-details");
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  return page === "#checkbox-filling" ? <ChecklistPage /> : <BookingDetailsPage />;
}


function BookingDetailsPage() {
  const [pilgrims, setPilgrims] = useState<Pilgrim[]>(initialPilgrims);
  const [general, setGeneral] = useState<GeneralDetails>(initialGeneralDetails);
  const updatePilgrim = (index: number, key: keyof Pilgrim, value: string) => setPilgrims((curr) => curr.map((p, i) => i === index ? { ...p, [key]: value } : p));
  const updateGeneral = (key: keyof GeneralDetails, value: string) => setGeneral((curr) => ({ ...curr, [key]: value }));
  const handleContinue = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Practice booking details:", { pilgrims, generalDetails: general });
    window.location.hash = "#checkbox-filling";
  };
  const handleReset = () => { setPilgrims(Array.from({ length: 6 }, () => emptyPilgrim())); setGeneral(initialGeneralDetails); };
  return (
    <div className="ttd-page">
      <header className="ttd-header">
        <button type="button" className="back-button" aria-label="Go back" onClick={() => { window.location.hash = "#checkbox-filling"; }}><span aria-hidden="true">←</span></button>
        <h1>Special Darshan ₹300</h1>
        <button type="button" className="page-switch-button" onClick={() => { window.location.hash = "#checkbox-filling"; }}>Checkbox Filling</button>
      </header>
      <main className="ttd-content">
        <form className="booking-form" onSubmit={handleContinue}>
          {pilgrims.map((pilgrim, index) => (
            <section className="pilgrim-section" key={index} aria-label={`Pilgrim ${index + 1}`}>
              <TtdField label="Name" required><input id={`pilgrim-${index + 1}-name`} name={`pilgrim[${index}].name`} type="text" autoComplete="off" value={pilgrim.name} onChange={(e) => updatePilgrim(index, "name", e.target.value)} required /></TtdField>
              <TtdField label="Age" required><input id={`pilgrim-${index + 1}-age`} name={`pilgrim[${index}].age`} type="number" min="1" max="120" inputMode="numeric" value={pilgrim.age} onChange={(e) => updatePilgrim(index, "age", e.target.value)} required /></TtdField>
              <TtdField label="Gender" required><TtdDropdown id={`pilgrim-${index + 1}-gender`} name={`pilgrim[${index}].gender`} value={pilgrim.gender} options={genderOptions} placeholder="Select gender" onChange={(value) => updatePilgrim(index, "gender", value)} /></TtdField>
              <TtdField label="Photo ID Proof" required><TtdDropdown id={`pilgrim-${index + 1}-photo-id-proof`} name={`pilgrim[${index}].photoIdProof`} value={pilgrim.photoIdProof} options={idProofOptions} placeholder="Select ID proof" onChange={(value) => updatePilgrim(index, "photoIdProof", value)} /></TtdField>
              <TtdField label="Photo ID Number" required><input id={`pilgrim-${index + 1}-photo-id-number`} name={`pilgrim[${index}].photoIdNumber`} type="text" autoComplete="off" value={pilgrim.photoIdNumber} onChange={(e) => updatePilgrim(index, "photoIdNumber", e.target.value)} required /></TtdField>
            </section>
          ))}
          <section className="general-section" aria-labelledby="general-details-heading">
            <h2 id="general-details-heading" className="general-title">General Details</h2>
            <TtdField label="Gothram"><input id="gothram" name="general.gothram" type="text" autoComplete="off" value={general.gothram} onChange={(e) => updateGeneral("gothram", e.target.value)} /></TtdField>
            <TtdField label="Email Address" required><input id="email" name="general.email" type="email" autoComplete="email" value={general.email} onChange={(e) => updateGeneral("email", e.target.value)} required /></TtdField>
            <TtdField label="City" required><input id="city" name="general.city" type="text" autoComplete="address-level2" value={general.city} onChange={(e) => updateGeneral("city", e.target.value)} required /></TtdField>
            <TtdField label="State" required><input id="state" name="general.state" type="text" autoComplete="address-level1" value={general.state} onChange={(e) => updateGeneral("state", e.target.value)} required /></TtdField>
            <TtdField label="Country" required><input id="country" name="general.country" type="text" autoComplete="country-name" value={general.country} onChange={(e) => updateGeneral("country", e.target.value)} required /></TtdField>
            <TtdField label="Pincode" required><input id="pincode" name="general.pincode" type="text" inputMode="numeric" maxLength={10} autoComplete="postal-code" value={general.pincode} onChange={(e) => updateGeneral("pincode", e.target.value)} required /></TtdField>
          </section>
          <div className="note"><strong>Note:</strong><span>Fields marked as <b>*</b> are mandatory</span></div>
          <div className="form-actions"><button type="button" className="secondary-button" onClick={handleReset}>Back</button><button type="submit" className="primary-button">Continue</button></div>
        </form>
      </main>
    </div>
  );
}


function ChecklistPage() {
  const [checkedItems, setCheckedItems] = useState<{ [key: number]: boolean }>({});
  const [activeModalItem, setActiveModalItem] = useState<ChecklistItem | null>(null);
  const [bookingSuccessful, setBookingSuccessful] = useState(false);
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => { if (e.key === "Escape") setActiveModalItem(null); };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
  const handleCheckboxChange = (item: ChecklistItem, checked: boolean) => {
    setCheckedItems((prev) => ({ ...prev, [item.id]: checked }));
    if (checked) setActiveModalItem(item);
  };
  const closeModal = () => setActiveModalItem(null);
  const allComplete = ITEMS.every((item) => checkedItems[item.id]);
  const checkedCount = ITEMS.filter((item) => checkedItems[item.id]).length;
  return (
    <main className="container checklist-page">
      <header className="header">
        <div className="page-navigation"><button type="button" className="page-navigation-button" onClick={() => { window.location.hash = "#booking-details"; }}>Booking Details</button></div>
        <h1>Special Darshan ₹300</h1>
        <p>Complete each verification step below to finish your booking practice.</p>
      </header>
      <section className="instructions"><span className="instructions-icon">💡</span><div className="instructions-text"><strong>Instructions:</strong> Select each configuration item to toggle its completion status. Checking a step displays a centered confirmation popup. Close it using <strong>OK</strong> or <strong>Esc</strong>.</div></section>
      <div className="progress-line"><span>{checkedCount} of {ITEMS.length} steps completed</span><div className="progress-track"><div className="progress-fill" style={{ width: `${(checkedCount / ITEMS.length) * 100}%` }} /></div></div>
      <section className="checklist" aria-label="System configuration steps">
        {ITEMS.map((item) => {
          const isChecked = !!checkedItems[item.id];
          return <article key={item.id} className={`checkbox-card ${isChecked ? "checked" : ""}`}>
            <label className="checkbox-container"><input type="checkbox" checked={isChecked} onChange={(e) => handleCheckboxChange(item, e.target.checked)} aria-label={`Mark "${item.title}" as done`} /><span className="checkbox-visual" aria-hidden="true"><svg className="checkbox-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg></span></label>
            <div className="card-content"><h2 className="card-title">{item.title}</h2><p className="card-description">{item.description}</p></div>
            {isChecked && <span className="card-status">Completed</span>}
          </article>;
        })}
      </section>
      <section className="checked-details" aria-label="Completed step details"><h2>Completed Checklist Details</h2><p className="review-intro">Review the information for each completed step below.</p>
        {ITEMS.filter((item) => checkedItems[item.id]).map((item) => <article className="detail-card" key={item.id}><div className="detail-card-top"><span className="detail-step">Step {item.id}</span><span className="detail-completed">✓ Completed</span></div><h3>{item.title}</h3><p>{item.description}</p><div className="detail-info"><strong>Completion information</strong><p>{item.detail}</p></div></article>)}
        {checkedCount === 0 && <div className="empty-review">Completed step details will appear here as you check each item.</div>}
      </section>
      <div className="confirm-area"><button className="confirm-button" type="button" disabled={!allComplete} onClick={() => setBookingSuccessful(true)}>Confirm</button><p>{allComplete ? "All steps completed. You can confirm now." : `Complete all 15 steps to enable confirmation (${checkedCount}/15).`}</p></div>
      {activeModalItem && <div className="modal-overlay" onClick={closeModal}><div className="modal-content" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="modal-title"><div className="checkmark-container"><div className="checkmark-circle"><svg className="checkmark-svg" viewBox="0 0 24 24"><path d="M20 6L9 17L4 12" /></svg></div></div><span className="modal-step-info">Step {activeModalItem.id} Activated</span><h2 id="modal-title" className="modal-title">{activeModalItem.title}</h2><p className="modal-desc">{activeModalItem.detail}</p><button type="button" className="modal-btn" onClick={closeModal} autoFocus>OK</button></div></div>}
      {bookingSuccessful && <div className="modal-overlay" onClick={() => setBookingSuccessful(false)}><div className="modal-content success-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="success-title"><div className="checkmark-container"><div className="checkmark-circle"><svg className="checkmark-svg" viewBox="0 0 24 24"><path d="M20 6L9 17L4 12" /></svg></div></div><span className="modal-step-info">All 15 steps confirmed</span><h2 id="success-title" className="modal-title">Booking Successful!</h2><p className="modal-desc">Your Special Darshan ₹300 practice booking has been completed successfully.</p><button type="button" className="modal-btn" onClick={() => setBookingSuccessful(false)}>Done</button></div></div>}
    </main>
  );
}


function TtdField({ label, required = false, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  const child = React.Children.only(children) as React.ReactElement<{ id?: string }>;
  return <div className="field"><label htmlFor={child.props.id}>{label}{required && <span className="required" aria-hidden="true">*</span>}</label>{children}</div>;
}

function TtdDropdown({ id, name, value, options, placeholder = "", onChange }: { id: string; name: string; value: string; options: string[]; placeholder?: string; onChange: (value: string) => void }) {
  const [open, setOpen] = useState(false);
  const rootRef = React.useRef<HTMLDivElement>(null);
  useEffect(() => {
    const close = (event: MouseEvent | TouchEvent) => { if (rootRef.current && !rootRef.current.contains(event.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", close); document.addEventListener("touchstart", close);
    return () => { document.removeEventListener("mousedown", close); document.removeEventListener("touchstart", close); };
  }, []);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey); return () => document.removeEventListener("keydown", onKey);
  }, []);
  return <div ref={rootRef} className={`ttd-dropdown ${open ? "open" : ""}`}><button type="button" id={id} name={name} className="ttd-dropdown-trigger" role="combobox" aria-haspopup="listbox" aria-expanded={open} aria-controls={`${id}-listbox`} onClick={() => setOpen((curr) => !curr)}><span className={value ? "selected" : "placeholder"}>{value || placeholder}</span><span className="dropdown-arrow" aria-hidden="true">{open ? "⌃" : "⌄"}</span></button>{open && <div id={`${id}-listbox`} className="ttd-dropdown-menu" role="listbox" aria-label={name}>{options.map((option) => <button type="button" role="option" aria-selected={value === option} className={`ttd-dropdown-option ${value === option ? "selected-option" : ""}`} key={option} onClick={() => { onChange(option); setOpen(false); }}>{option}</button>)}</div>}</div>;
}
export default App;
