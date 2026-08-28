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
  photoIdProof: "Aadhaar Card",
  photoIdNumber: "",
});

const initialPilgrims: Pilgrim[] = Array.from(
  { length: 6 },
  () => emptyPilgrim()
);

const initialGeneralDetails: GeneralDetails = {
  gothram: "",
  email: "",
  city: "",
  state: "",
  country: "INDIA",
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
  const [pilgrims, setPilgrims] = React.useState<Pilgrim[]>(
    initialPilgrims
  );

  const [general, setGeneral] =
    React.useState<GeneralDetails>(initialGeneralDetails);

  const updatePilgrim = (
    index: number,
    key: keyof Pilgrim,
    value: string
  ) => {
    setPilgrims((current) =>
      current.map((pilgrim, i) =>
        i === index
          ? { ...pilgrim, [key]: value }
          : pilgrim
      )
    );
  };

  const updateGeneral = (
    key: keyof GeneralDetails,
    value: string
  ) => {
    setGeneral((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const payload = {
      pilgrims,
      generalDetails: general,
    };

    console.log("Practice booking details:", payload);
    alert("Practice form submitted successfully.");
  };

  const handleReset = () => {
    setPilgrims(
      Array.from({ length: 6 }, () => emptyPilgrim())
    );
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
        <form
          className="booking-form"
          onSubmit={handleSubmit}
        >
          {pilgrims.map((pilgrim, index) => (
            <section
              className="pilgrim-section"
              key={index}
              aria-labelledby={`pilgrim-${index + 1}-heading`}
            >
              <h2
                id={`pilgrim-${index + 1}-heading`}
                className="section-title"
              >
                Pilgrim {index + 1}
              </h2>

              <Field label="Name" required>
                <input
                  id={`pilgrim-${index + 1}-name`}
                  name={`pilgrim[${index}].name`}
                  type="text"
                  autoComplete="off"
                  value={pilgrim.name}
                  onChange={(e) =>
                    updatePilgrim(
                      index,
                      "name",
                      e.target.value
                    )
                  }
                />
              </Field>

              <Field label="Age" required>
                <input
                  id={`pilgrim-${index + 1}-age`}
                  name={`pilgrim[${index}].age`}
                  type="number"
                  min="1"
                  max="120"
                  inputMode="numeric"
                  value={pilgrim.age}
                  onChange={(e) =>
                    updatePilgrim(
                      index,
                      "age",
                      e.target.value
                    )
                  }
                />
              </Field>

              <Field label="Gender" required>
                <select
                  id={`pilgrim-${index + 1}-gender`}
                  name={`pilgrim[${index}].gender`}
                  value={pilgrim.gender}
                  onChange={(e) =>
                    updatePilgrim(
                      index,
                      "gender",
                      e.target.value
                    )
                  }
                >
                  <option value="">Select Gender</option>
                  {genderOptions.map((option) => (
                    <option
                      value={option}
                      key={option}
                    >
                      {option}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Photo ID Proof" required>
                <select
                  id={`pilgrim-${index + 1}-photo-id-proof`}
                  name={`pilgrim[${index}].photoIdProof`}
                  value={pilgrim.photoIdProof}
                  onChange={(e) =>
                    updatePilgrim(
                      index,
                      "photoIdProof",
                      e.target.value
                    )
                  }
                >
                  {idProofOptions.map((option) => (
                    <option
                      value={option}
                      key={option}
                    >
                      {option}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Photo ID Number" required>
                <input
                  id={`pilgrim-${index + 1}-photo-id-number`}
                  name={`pilgrim[${index}].photoIdNumber`}
                  type="text"
                  autoComplete="off"
                  value={pilgrim.photoIdNumber}
                  onChange={(e) =>
                    updatePilgrim(
                      index,
                      "photoIdNumber",
                      e.target.value
                    )
                  }
                />
              </Field>
            </section>
          ))}

          <section
            className="general-section"
            aria-labelledby="general-details-heading"
          >
            <h2
              id="general-details-heading"
              className="general-title"
            >
              General Details
            </h2>

            <Field label="Gothram">
              <input
                id="gothram"
                name="general.gothram"
                type="text"
                autoComplete="off"
                value={general.gothram}
                onChange={(e) =>
                  updateGeneral(
                    "gothram",
                    e.target.value
                  )
                }
              />
            </Field>

            <Field label="Email Address" required>
              <input
                id="email"
                name="general.email"
                type="email"
                autoComplete="email"
                value={general.email}
                onChange={(e) =>
                  updateGeneral(
                    "email",
                    e.target.value
                  )
                }
              />
            </Field>

            <Field label="City" required>
              <input
                id="city"
                name="general.city"
                type="text"
                autoComplete="address-level2"
                value={general.city}
                onChange={(e) =>
                  updateGeneral(
                    "city",
                    e.target.value
                  )
                }
              />
            </Field>

            <Field label="State" required>
              <input
                id="state"
                name="general.state"
                type="text"
                autoComplete="address-level1"
                value={general.state}
                onChange={(e) =>
                  updateGeneral(
                    "state",
                    e.target.value
                  )
                }
              />
            </Field>

            <Field label="Country" required>
              <input
                id="country"
                name="general.country"
                type="text"
                autoComplete="country-name"
                value={general.country}
                onChange={(e) =>
                  updateGeneral(
                    "country",
                    e.target.value
                  )
                }
              />
            </Field>

            <Field label="Pincode" required>
              <input
                id="pincode"
                name="general.pincode"
                type="text"
                inputMode="numeric"
                maxLength={10}
                autoComplete="postal-code"
                value={general.pincode}
                onChange={(e) =>
                  updateGeneral(
                    "pincode",
                    e.target.value
                  )
                }
              />
            </Field>
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
              Reset
            </button>

            <button
              type="submit"
              className="primary-button"
            >
              Continue
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

function Field({
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
          <span
            className="required"
            aria-hidden="true"
          >
            *
          </span>
        )}
      </label>

      {children}
    </div>
  );
}
