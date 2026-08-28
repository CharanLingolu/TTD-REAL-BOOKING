import React from "react";
import "./TtdBookingPracticePage.css";

type Pilgrim = {
  name: string;
  age: string;
  gender: string;
  photoIdProof: string;
  photoIdNumber: string;
};

type GeneralDetails = {
  gothram: string;
  email: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
};

const emptyPilgrim = (): Pilgrim => ({
  name: "",
  age: "",
  gender: "",
  photoIdProof: "",
  photoIdNumber: "",
});

const initialPilgrims: Pilgrim[] = Array.from({ length: 6 }, () =>
  emptyPilgrim()
);

const initialGeneralDetails: GeneralDetails = {
  email: "",
  city: "",
  state: "",
  country: "",
  pincode: "",
};

const genderOptions = ["Male", "Female", "Other"];
const idProofOptions = [
  "Aadhaar Card",
  "Passport",
  "Voter ID",
  "Driving Licence",
  "PAN Card",
];

export default function TtdBookingPracticePage() {
  const [pilgrims, setPilgrims] = React.useState<Pilgrim[]>(initialPilgrims);

  const [general, setGeneral] = React.useState<GeneralDetails>(
    initialGeneralDetails
  );

  const updatePilgrim = (index: number, key: keyof Pilgrim, value: string) => {
    setPilgrims((current) =>
      current.map((pilgrim, i) =>
        i === index ? { ...pilgrim, [key]: value } : pilgrim
      )
    );
  };

  const updateGeneral = (key: keyof GeneralDetails, value: string) => {
    setGeneral((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log("Practice booking details:", {
      pilgrims,
      generalDetails: general,
    });

    alert("Practice form submitted successfully.");
  };

  const handleReset = () => {
    setPilgrims(Array.from({ length: 6 }, () => emptyPilgrim()));
    setGeneral(initialGeneralDetails);
  };

  return (
    <div className="ttd-page">
      <header className="ttd-header">
        <button
          type="button"
          className="back-button"
          aria-label="Go back"
          onClick={() => {
            window.location.hash = "#checkbox-filling";
          }}
        >
          <span aria-hidden="true">←</span>
        </button>

        <h1>Angapradakshinam</h1>

        <button
          type="button"
          className="page-switch-button"
          onClick={() => {
            window.location.hash = "#checkbox-filling";
          }}
        >
          Checkbox Filling
        </button>
      </header>

      <main className="ttd-content">
        <form className="booking-form" onSubmit={handleSubmit}>
          {pilgrims.map((pilgrim, index) => (
            <section
              className="pilgrim-section"
              key={index}
              aria-label={`Pilgrim ${index + 1}`}
            >
              <TtdField label="Name" required>
                <input
                  id={`pilgrim-${index + 1}-name`}
                  name={`pilgrim[${index}].name`}
                  type="text"
                  autoComplete="off"
                  value={pilgrim.name}
                  onChange={(e) => updatePilgrim(index, "name", e.target.value)}
                />
              </TtdField>

              <TtdField label="Age" required>
                <input
                  id={`pilgrim-${index + 1}-age`}
                  name={`pilgrim[${index}].age`}
                  type="number"
                  min="1"
                  max="120"
                  inputMode="numeric"
                  value={pilgrim.age}
                  onChange={(e) => updatePilgrim(index, "age", e.target.value)}
                />
              </TtdField>

              <TtdField label="Gender" required>
                <TtdDropdown
                  id={`pilgrim-${index + 1}-gender`}
                  name={`pilgrim[${index}].gender`}
                  value={pilgrim.gender}
                  options={genderOptions}
                  placeholder=""
                  onChange={(value) => updatePilgrim(index, "gender", value)}
                />
              </TtdField>

              <TtdField label="Photo ID Proof" required>
                <TtdDropdown
                  id={`pilgrim-${index + 1}-photo-id-proof`}
                  name={`pilgrim[${index}].photoIdProof`}
                  value={pilgrim.photoIdProof}
                  options={idProofOptions}
                  onChange={(value) =>
                    updatePilgrim(index, "photoIdProof", value)
                  }
                />
              </TtdField>

              <TtdField label="Photo ID Number" required>
                <input
                  id={`pilgrim-${index + 1}-photo-id-number`}
                  name={`pilgrim[${index}].photoIdNumber`}
                  type="text"
                  autoComplete="off"
                  value={pilgrim.photoIdNumber}
                  onChange={(e) =>
                    updatePilgrim(index, "photoIdNumber", e.target.value)
                  }
                />
              </TtdField>
            </section>
          ))}

          <section
            className="general-section"
            aria-labelledby="general-details-heading"
          >
            <h2 id="general-details-heading" className="general-title">
              General Details
            </h2>

            <TtdField label="Gothram">
              <input
                id="gothram"
                name="general.gothram"
                type="text"
                autoComplete="off"
                value={general.gothram}
                onChange={(e) => updateGeneral("gothram", e.target.value)}
              />
            </TtdField>

            <TtdField label="Email Address" required>
              <input
                id="email"
                name="general.email"
                type="email"
                autoComplete="email"
                value={general.email}
                onChange={(e) => updateGeneral("email", e.target.value)}
              />
            </TtdField>

            <TtdField label="City" required>
              <input
                id="city"
                name="general.city"
                type="text"
                autoComplete="address-level2"
                value={general.city}
                onChange={(e) => updateGeneral("city", e.target.value)}
              />
            </TtdField>

            <TtdField label="State" required>
              <input
                id="state"
                name="general.state"
                type="text"
                autoComplete="address-level1"
                value={general.state}
                onChange={(e) => updateGeneral("state", e.target.value)}
              />
            </TtdField>

            <TtdField label="Country" required>
              <input
                id="country"
                name="general.country"
                type="text"
                autoComplete="country-name"
                value={general.country}
                onChange={(e) => updateGeneral("country", e.target.value)}
              />
            </TtdField>

            <TtdField label="Pincode" required>
              <input
                id="pincode"
                name="general.pincode"
                type="text"
                inputMode="numeric"
                maxLength={10}
                autoComplete="postal-code"
                value={general.pincode}
                onChange={(e) => updateGeneral("pincode", e.target.value)}
              />
            </TtdField>
          </section>

          <div className="note">
            <strong>Note:</strong>
            <span>
              Fields marked as <b>*</b> are mandatory
            </span>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="secondary-button"
              onClick={handleReset}
            >
              Back
            </button>

            <button type="submit" className="primary-button">
              Continue
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

function TtdField({
  label,
  required = false,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  const child = React.Children.only(children) as React.ReactElement<{
    id?: string;
  }>;

  return (
    <div className="field">
      <label htmlFor={child.props.id}>
        {label}
        {required && (
          <span className="required" aria-hidden="true">
            *
          </span>
        )}
      </label>

      {children}
    </div>
  );
}

function TtdDropdown({
  id,
  name,
  value,
  options,
  placeholder = "",
  onChange,
}: {
  id: string;
  name: string;
  value: string;
  options: string[];
  placeholder?: string;
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const rootRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const close = (event: MouseEvent | TouchEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", close);
    document.addEventListener("touchstart", close);

    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("touchstart", close);
    };
  }, []);

  React.useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div ref={rootRef} className={`ttd-dropdown ${open ? "open" : ""}`}>
      <button
        type="button"
        id={id}
        name={name}
        className="ttd-dropdown-trigger"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${id}-listbox`}
        onClick={() => setOpen((current) => !current)}
      >
        <span className={value ? "selected" : "placeholder"}>
          {value || placeholder}
        </span>

        <span className="dropdown-arrow" aria-hidden="true">
          {open ? "⌃" : "⌄"}
        </span>
      </button>

      {open && (
        <div
          id={`${id}-listbox`}
          className="ttd-dropdown-menu"
          role="listbox"
          aria-label={name}
        >
          {options.map((option) => (
            <button
              type="button"
              role="option"
              aria-selected={value === option}
              className={`ttd-dropdown-option ${
                value === option ? "selected-option" : ""
              }`}
              key={option}
              onClick={() => {
                onChange(option);
                setOpen(false);
              }}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
