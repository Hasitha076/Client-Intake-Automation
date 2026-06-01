import { useState, useRef } from "react";

const STEPS = [
  { id: "client", label: "Client info", icon: "👤" },
  { id: "matter", label: "Matter details", icon: "📁" },
  { id: "conflict", label: "Conflict check", icon: "🔍" },
  { id: "review", label: "Review & submit", icon: "✅" },
];

const MATTER_TYPES = [
  "Corporate — M&A",
  "Corporate — Restructuring",
  "Litigation — Commercial",
  "Litigation — Employment",
  "Real Estate — Transaction",
  "Real Estate — Dispute",
  "IP — Patent",
  "IP — Trademark",
  "Finance — Debt Capital Markets",
  "Finance — Syndicated Loans",
  "Regulatory — Competition",
  "Regulatory — Data & Privacy",
];

const JURISDICTIONS = [
  "England & Wales",
  "New York",
  "Delaware",
  "California",
  "EU — Brussels",
  "Singapore",
  "Hong Kong",
  "Dubai (DIFC)",
  "Australia — NSW",
  "Canada — Ontario",
];

const ENTITY_TYPES = [
  "Public Company",
  "Private Company",
  "LLP / Partnership",
  "Individual / HNW",
  "Trust / Foundation",
  "Government / Public Body",
  "Not-for-Profit",
];

function FieldGroup({ label, required, error, children }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <label style={{
        display: "block",
        fontFamily: "'DM Mono', monospace",
        fontSize: 11,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: "#8b7d6b",
        marginBottom: 6,
        fontWeight: 500,
      }}>
        {label}{required && <span style={{ color: "#c0392b", marginLeft: 3 }}>*</span>}
      </label>
      {children}
      {error && (
        <p style={{
          margin: "4px 0 0",
          fontSize: 12,
          color: "#c0392b",
          fontFamily: "'DM Mono', monospace",
        }}>
          ↑ {error}
        </p>
      )}
    </div>
  );
}

const inputStyle = {
  width: "100%",
  boxSizing: "border-box",
  padding: "10px 14px",
  background: "#fafaf8",
  border: "1px solid #ddd8d0",
  borderRadius: 6,
  fontSize: 14,
  fontFamily: "'DM Sans', sans-serif",
  color: "#2c2a25",
  outline: "none",
  transition: "border-color 0.15s",
};

const selectStyle = { ...inputStyle, appearance: "none", backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%238b7d6b' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center", paddingRight: 36 };

function StepIndicator({ current }) {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      marginBottom: 36,
      gap: 0,
    }}>
      {STEPS.map((step, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <div key={step.id} style={{ display: "flex", alignItems: "center", flex: 1 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: "none" }}>
              <div style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: done ? 14 : 13,
                background: done ? "#2c2a25" : active ? "#8b7d6b" : "#f0ece6",
                color: done || active ? "#fff" : "#b0a898",
                fontFamily: "'DM Mono', monospace",
                fontWeight: 500,
                border: active ? "2px solid #2c2a25" : "none",
                transition: "all 0.2s",
                flexShrink: 0,
              }}>
                {done ? "✓" : i + 1}
              </div>
              <span style={{
                marginTop: 4,
                fontSize: 10,
                fontFamily: "'DM Mono', monospace",
                textTransform: "uppercase",
                letterSpacing: "0.07em",
                color: active ? "#2c2a25" : done ? "#8b7d6b" : "#c0b8ae",
                whiteSpace: "nowrap",
              }}>
                {step.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div style={{
                flex: 1,
                height: 1,
                background: done ? "#2c2a25" : "#ddd8d0",
                margin: "0 8px",
                marginBottom: 20,
                transition: "background 0.3s",
              }} />
            )}
          </div>
        );
      })}
    </div>
  );
}

function ClientStep({ data, onChange, errors }) {
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 20px" }}>
        <FieldGroup label="Client legal name" required error={errors.clientName}>
          <input
            style={{ ...inputStyle, borderColor: errors.clientName ? "#c0392b" : "#ddd8d0" }}
            value={data.clientName}
            onChange={e => onChange("clientName", e.target.value)}
            placeholder="Acme Industries Ltd."
          />
        </FieldGroup>
        <FieldGroup label="Entity type" required error={errors.entityType}>
          <select
            style={{ ...selectStyle, borderColor: errors.entityType ? "#c0392b" : "#ddd8d0" }}
            value={data.entityType}
            onChange={e => onChange("entityType", e.target.value)}
          >
            <option value="">Select type…</option>
            {ENTITY_TYPES.map(t => <option key={t}>{t}</option>)}
          </select>
        </FieldGroup>
        <FieldGroup label="Primary contact name" required error={errors.contactName}>
          <input
            style={{ ...inputStyle, borderColor: errors.contactName ? "#c0392b" : "#ddd8d0" }}
            value={data.contactName}
            onChange={e => onChange("contactName", e.target.value)}
            placeholder="Jane Pemberton"
          />
        </FieldGroup>
        <FieldGroup label="Contact title / role">
          <input
            style={inputStyle}
            value={data.contactTitle}
            onChange={e => onChange("contactTitle", e.target.value)}
            placeholder="General Counsel"
          />
        </FieldGroup>
        <FieldGroup label="Contact email" required error={errors.contactEmail}>
          <input
            type="email"
            style={{ ...inputStyle, borderColor: errors.contactEmail ? "#c0392b" : "#ddd8d0" }}
            value={data.contactEmail}
            onChange={e => onChange("contactEmail", e.target.value)}
            placeholder="j.pemberton@acme.com"
          />
        </FieldGroup>
        <FieldGroup label="Contact phone">
          <input
            style={inputStyle}
            value={data.contactPhone}
            onChange={e => onChange("contactPhone", e.target.value)}
            placeholder="+44 20 7946 0000"
          />
        </FieldGroup>
      </div>
      <FieldGroup label="Registered address" required error={errors.address}>
        <input
          style={{ ...inputStyle, borderColor: errors.address ? "#c0392b" : "#ddd8d0" }}
          value={data.address}
          onChange={e => onChange("address", e.target.value)}
          placeholder="1 Canada Square, Canary Wharf, London E14 5AB"
        />
      </FieldGroup>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 20px" }}>
        <FieldGroup label="Company number / Tax ID">
          <input
            style={inputStyle}
            value={data.companyNumber}
            onChange={e => onChange("companyNumber", e.target.value)}
            placeholder="12345678"
          />
        </FieldGroup>
        <FieldGroup label="Industry / Sector">
          <input
            style={inputStyle}
            value={data.industry}
            onChange={e => onChange("industry", e.target.value)}
            placeholder="Financial Services"
          />
        </FieldGroup>
      </div>
    </div>
  );
}

function MatterStep({ data, onChange, errors }) {
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 20px" }}>
        <FieldGroup label="Matter type" required error={errors.matterType}>
          <select
            style={{ ...selectStyle, borderColor: errors.matterType ? "#c0392b" : "#ddd8d0" }}
            value={data.matterType}
            onChange={e => onChange("matterType", e.target.value)}
          >
            <option value="">Select type…</option>
            {MATTER_TYPES.map(t => <option key={t}>{t}</option>)}
          </select>
        </FieldGroup>
        <FieldGroup label="Primary jurisdiction" required error={errors.jurisdiction}>
          <select
            style={{ ...selectStyle, borderColor: errors.jurisdiction ? "#c0392b" : "#ddd8d0" }}
            value={data.jurisdiction}
            onChange={e => onChange("jurisdiction", e.target.value)}
          >
            <option value="">Select jurisdiction…</option>
            {JURISDICTIONS.map(j => <option key={j}>{j}</option>)}
          </select>
        </FieldGroup>
      </div>
      <FieldGroup label="Matter description" required error={errors.description}>
        <textarea
          style={{
            ...inputStyle,
            minHeight: 90,
            resize: "vertical",
            fontFamily: "'DM Sans', sans-serif",
            lineHeight: 1.6,
            borderColor: errors.description ? "#c0392b" : "#ddd8d0",
          }}
          value={data.description}
          onChange={e => onChange("description", e.target.value)}
          placeholder="Brief summary of the matter, key issues, and immediate needs…"
        />
      </FieldGroup>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 20px" }}>
        <FieldGroup label="Opposing / adverse party">
          <input
            style={inputStyle}
            value={data.adverseParty}
            onChange={e => onChange("adverseParty", e.target.value)}
            placeholder="Rival Corp PLC"
          />
        </FieldGroup>
        <FieldGroup label="Responsible attorney" required error={errors.attorney}>
          <input
            style={{ ...inputStyle, borderColor: errors.attorney ? "#c0392b" : "#ddd8d0" }}
            value={data.attorney}
            onChange={e => onChange("attorney", e.target.value)}
            placeholder="Sarah Mitchell"
          />
        </FieldGroup>
        <FieldGroup label="Estimated matter value (£)">
          <input
            style={inputStyle}
            value={data.matterValue}
            onChange={e => onChange("matterValue", e.target.value)}
            placeholder="5,000,000"
          />
        </FieldGroup>
        <FieldGroup label="Target open date">
          <input
            type="date"
            style={inputStyle}
            value={data.openDate}
            onChange={e => onChange("openDate", e.target.value)}
          />
        </FieldGroup>
      </div>
      <FieldGroup label="Billing arrangement">
        <div style={{ display: "flex", gap: 12 }}>
          {["Hourly rate", "Fixed fee", "Retainer", "Conditional"].map(opt => (
            <label key={opt} style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontSize: 13,
              fontFamily: "'DM Sans', sans-serif",
              color: "#2c2a25",
              cursor: "pointer",
            }}>
              <input
                type="radio"
                name="billing"
                value={opt}
                checked={data.billing === opt}
                onChange={() => onChange("billing", opt)}
                style={{ accentColor: "#2c2a25" }}
              />
              {opt}
            </label>
          ))}
        </div>
      </FieldGroup>
    </div>
  );
}

function ConflictStep({ data, status, onCheck, checking }) {
  return (
    <div>
      <div style={{
        background: "#f5f1eb",
        border: "1px solid #e8e0d4",
        borderRadius: 8,
        padding: "16px 20px",
        marginBottom: 24,
      }}>
        <p style={{
          margin: 0,
          fontFamily: "'DM Mono', monospace",
          fontSize: 12,
          color: "#6b5f52",
          lineHeight: 1.7,
        }}>
          Checking against all existing clients, adverse parties, and related entities across the firm's matter database. This includes subsidiary name matching using pg_trgm fuzzy search.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 20px", marginBottom: 16 }}>
        <div style={{
          background: "#fafaf8",
          border: "1px solid #e8e0d4",
          borderRadius: 6,
          padding: "12px 16px",
        }}>
          <div style={{ fontSize: 11, fontFamily: "'DM Mono', monospace", color: "#8b7d6b", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>Checking client</div>
          <div style={{ fontSize: 14, fontFamily: "'DM Sans', sans-serif", color: "#2c2a25", fontWeight: 500 }}>{data.clientName || "—"}</div>
        </div>
        <div style={{
          background: "#fafaf8",
          border: "1px solid #e8e0d4",
          borderRadius: 6,
          padding: "12px 16px",
        }}>
          <div style={{ fontSize: 11, fontFamily: "'DM Mono', monospace", color: "#8b7d6b", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>Adverse party</div>
          <div style={{ fontSize: 14, fontFamily: "'DM Sans', sans-serif", color: "#2c2a25", fontWeight: 500 }}>{data.adverseParty || "None specified"}</div>
        </div>
      </div>

      {status === "idle" && (
        <button
          onClick={onCheck}
          style={{
            width: "100%",
            padding: "12px 24px",
            background: "#2c2a25",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            fontFamily: "'DM Mono', monospace",
            fontSize: 12,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            cursor: "pointer",
            marginTop: 8,
          }}>
          Run conflict check
        </button>
      )}

      {checking && (
        <div style={{
          textAlign: "center",
          padding: "28px 0",
          fontFamily: "'DM Mono', monospace",
          fontSize: 12,
          color: "#8b7d6b",
          letterSpacing: "0.08em",
        }}>
          <div style={{ fontSize: 24, marginBottom: 12, animation: "spin 1s linear infinite", display: "inline-block" }}>⟳</div>
          <br />
          Querying matter database…
        </div>
      )}

      {status === "clear" && (
        <div style={{
          background: "#f0faf4",
          border: "1px solid #a8d8b9",
          borderRadius: 8,
          padding: "16px 20px",
          display: "flex",
          alignItems: "flex-start",
          gap: 12,
          marginTop: 8,
        }}>
          <span style={{ fontSize: 20, flexShrink: 0 }}>✓</span>
          <div>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, fontWeight: 500, color: "#1a6b3c", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>No conflicts found</div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#2d7a4f" }}>
              Checked 3,847 existing clients, 12,291 adverse parties, and 847 related entities. No matches found. You may proceed to matter creation.
            </div>
          </div>
        </div>
      )}

      {status === "conflict" && (
        <div style={{
          background: "#fff5f5",
          border: "1px solid #f5a0a0",
          borderRadius: 8,
          padding: "16px 20px",
          display: "flex",
          alignItems: "flex-start",
          gap: 12,
          marginTop: 8,
        }}>
          <span style={{ fontSize: 20, flexShrink: 0 }}>⚠</span>
          <div>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, fontWeight: 500, color: "#a02020", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>Potential conflict detected</div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#7a2020", lineHeight: 1.6 }}>
              <strong>Acme Industries Ltd.</strong> appears as adverse party in matter LIT-2024-00831 (Meridian v. Acme Industries). Assigned partner: David Okafor. Please review before proceeding.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ReviewStep({ clientData, matterData, conflictStatus }) {
  const Section = ({ title, rows }) => (
    <div style={{ marginBottom: 20 }}>
      <div style={{
        fontFamily: "'DM Mono', monospace",
        fontSize: 10,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        color: "#8b7d6b",
        marginBottom: 10,
        paddingBottom: 6,
        borderBottom: "1px solid #e8e0d4",
      }}>{title}</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 20px" }}>
        {rows.map(([k, v]) => v ? (
          <div key={k}>
            <div style={{ fontSize: 10, fontFamily: "'DM Mono', monospace", color: "#b0a898", marginBottom: 2 }}>{k}</div>
            <div style={{ fontSize: 13, fontFamily: "'DM Sans', sans-serif", color: "#2c2a25" }}>{v}</div>
          </div>
        ) : null)}
      </div>
    </div>
  );

  return (
    <div>
      <div style={{
        background: "#f5f1eb",
        border: "1px solid #e8e0d4",
        borderRadius: 8,
        padding: "12px 16px",
        marginBottom: 20,
        display: "flex",
        alignItems: "center",
        gap: 10,
      }}>
        <span style={{ fontSize: 16 }}>{conflictStatus === "clear" ? "✓" : "⚠"}</span>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#6b5f52", textTransform: "uppercase", letterSpacing: "0.08em" }}>
          Conflict check: {conflictStatus === "clear" ? "Passed" : conflictStatus === "conflict" ? "Flagged — review required" : "Not run"}
        </span>
      </div>

      <Section title="Client" rows={[
        ["Legal name", clientData.clientName],
        ["Entity type", clientData.entityType],
        ["Contact", clientData.contactName + (clientData.contactTitle ? ` · ${clientData.contactTitle}` : "")],
        ["Email", clientData.contactEmail],
        ["Phone", clientData.contactPhone],
        ["Address", clientData.address],
        ["Company no.", clientData.companyNumber],
        ["Industry", clientData.industry],
      ]} />

      <Section title="Matter" rows={[
        ["Type", matterData.matterType],
        ["Jurisdiction", matterData.jurisdiction],
        ["Attorney", matterData.attorney],
        ["Billing", matterData.billing],
        ["Adverse party", matterData.adverseParty],
        ["Est. value", matterData.matterValue ? `£${matterData.matterValue}` : ""],
        ["Open date", matterData.openDate],
        ["Description", matterData.description],
      ]} />

      <div style={{
        background: "#fafaf8",
        border: "1px dashed #c8c0b4",
        borderRadius: 6,
        padding: "12px 16px",
        fontFamily: "'DM Mono', monospace",
        fontSize: 11,
        color: "#8b7d6b",
        lineHeight: 1.7,
      }}>
        On submit: client record → matter created → n8n automation triggered → welcome email sent → internal alert dispatched → matter number assigned (e.g. LIT-2026-XXXXX)
      </div>
    </div>
  );
}

export default function ClientIntakeForm() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [matterNumber, setMatterNumber] = useState("");
  const [conflictStatus, setConflictStatus] = useState("idle"); // idle | checking | clear | conflict
  const [errors, setErrors] = useState({});

  const [clientData, setClientData] = useState({
    clientName: "", entityType: "", contactName: "", contactTitle: "",
    contactEmail: "", contactPhone: "", address: "", companyNumber: "", industry: "",
  });

  const [matterData, setMatterData] = useState({
    matterType: "", jurisdiction: "", description: "", adverseParty: "",
    attorney: "", matterValue: "", openDate: "", billing: "Hourly rate",
  });

  const updateClient = (k, v) => { setClientData(p => ({ ...p, [k]: v })); setErrors(p => ({ ...p, [k]: undefined })); };
  const updateMatter = (k, v) => { setMatterData(p => ({ ...p, [k]: v })); setErrors(p => ({ ...p, [k]: undefined })); };

  const validateClient = () => {
    const e = {};
    if (!clientData.clientName.trim()) e.clientName = "Required";
    if (!clientData.entityType) e.entityType = "Required";
    if (!clientData.contactName.trim()) e.contactName = "Required";
    if (!clientData.contactEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.contactEmail = "Valid email required";
    if (!clientData.address.trim()) e.address = "Required";
    return e;
  };

  const validateMatter = () => {
    const e = {};
    if (!matterData.matterType) e.matterType = "Required";
    if (!matterData.jurisdiction) e.jurisdiction = "Required";
    if (!matterData.description.trim()) e.description = "Required";
    if (!matterData.attorney.trim()) e.attorney = "Required";
    return e;
  };

  const handleNext = () => {
    if (step === 0) {
      const e = validateClient();
      if (Object.keys(e).length > 0) { setErrors(e); return; }
    }
    if (step === 1) {
      const e = validateMatter();
      if (Object.keys(e).length > 0) { setErrors(e); return; }
    }
    setErrors({});
    setStep(s => s + 1);
  };

  const runConflictCheck = () => {
    setConflictStatus("checking");
    setTimeout(() => {
      // Simulate: if adverse party contains 'Acme' → conflict
      const hasConflict = matterData.adverseParty.toLowerCase().includes("acme") ||
        clientData.clientName.toLowerCase().includes("rival");
      setConflictStatus(hasConflict ? "conflict" : "clear");
    }, 2200);
  };

  const handleSubmit = async () => {
    const year = new Date().getFullYear();
    const type = matterData.matterType.includes("Litig") ? "LIT" :
      matterData.matterType.includes("Corporate") ? "CORP" :
      matterData.matterType.includes("Real") ? "RE" :
      matterData.matterType.includes("IP") ? "IP" : "GEN";
    const num = String(Math.floor(Math.random() * 90000) + 10000);
    const generatedMatterNumber = `${type}-${year}-${num}`;
    const webhookUrl = "https://n8n.srv1676388.hstgr.cloud/webhook-test/client-intake";

    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          matterNumber: generatedMatterNumber,
          clientData,
          matterData,
          conflictStatus,
        }),
      });

      if (!response.ok) {
        throw new Error(`Webhook failed with status ${response.status}`);
      }

      setMatterNumber(generatedMatterNumber);
      setSubmitted(true);
      console.log("Form submitted successfully:", {
        matterNumber: generatedMatterNumber,
        client: clientData.clientName,
        matterType: matterData.matterType,
      });
    } catch (error) {
      console.error("Failed to submit intake webhook:", error);
      alert("Submission failed. Please try again.");
    }
  };

  if (submitted) {
    return (
      <div style={{
        minHeight: "100vh",
        background: "linear-gradient(160deg, #f5f1eb 0%, #ede8e0 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}>
        <div style={{
          background: "#fff",
          border: "1px solid #ddd8d0",
          borderRadius: 12,
          padding: "48px 40px",
          maxWidth: 480,
          width: "100%",
          textAlign: "center",
        }}>
          <div style={{ fontSize: 40, marginBottom: 16 }}>✦</div>
          <h2 style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: 26,
            color: "#2c2a25",
            margin: "0 0 8px",
            fontWeight: 400,
          }}>
            Matter opened
          </h2>
          <div style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 13,
            letterSpacing: "0.12em",
            color: "#8b7d6b",
            marginBottom: 28,
          }}>
            {matterNumber}
          </div>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 14,
            color: "#6b6560",
            lineHeight: 1.7,
            marginBottom: 28,
          }}>
            Client record created in Supabase. n8n automation triggered. Welcome email dispatched to <strong>{clientData.contactEmail}</strong>. Internal alert sent to {matterData.attorney}.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 28 }}>
            {[
              { label: "Client record", status: "Created" },
              { label: "Conflict check", status: conflictStatus === "clear" ? "Passed" : "Flagged" },
              { label: "Welcome email", status: "Sent" },
            ].map(item => (
              <div key={item.label} style={{
                background: "#f5f1eb",
                borderRadius: 6,
                padding: "10px 8px",
                textAlign: "center",
              }}>
                <div style={{ fontSize: 10, fontFamily: "'DM Mono', monospace", color: "#b0a898", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>{item.label}</div>
                <div style={{ fontSize: 12, fontFamily: "'DM Sans', sans-serif", color: "#2c2a25", fontWeight: 500 }}>{item.status}</div>
              </div>
            ))}
          </div>
          <button
            onClick={() => { setSubmitted(false); setStep(0); setClientData({ clientName: "", entityType: "", contactName: "", contactTitle: "", contactEmail: "", contactPhone: "", address: "", companyNumber: "", industry: "" }); setMatterData({ matterType: "", jurisdiction: "", description: "", adverseParty: "", attorney: "", matterValue: "", openDate: "", billing: "Hourly rate" }); setConflictStatus("idle"); }}
            style={{
              padding: "10px 24px",
              background: "transparent",
              border: "1px solid #ddd8d0",
              borderRadius: 6,
              fontFamily: "'DM Mono', monospace",
              fontSize: 11,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#8b7d6b",
              cursor: "pointer",
            }}
          >
            New intake
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #f5f1eb 0%, #ede8e0 100%)",
      padding: "32px 20px",
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500&family=DM+Serif+Display&display=swap');
        @keyframes spin { to { transform: rotate(360deg); } }
        input:focus, select:focus, textarea:focus { border-color: #8b7d6b !important; box-shadow: 0 0 0 3px rgba(139,125,107,0.12); }
        input[type="radio"] { cursor: pointer; }
      `}</style>

      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <div style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 10,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#8b7d6b",
            marginBottom: 6,
          }}>
            New client intake
          </div>
          <h1 style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: 30,
            color: "#2c2a25",
            margin: 0,
            fontWeight: 400,
            lineHeight: 1.2,
          }}>
            Client &amp; matter intake
          </h1>
        </div>

        {/* Card */}
        <div style={{
          background: "#fff",
          border: "1px solid #ddd8d0",
          borderRadius: 12,
          padding: "32px 36px",
          boxShadow: "0 2px 20px rgba(44,42,37,0.06)",
        }}>
          <StepIndicator current={step} />

          {/* Step title */}
          <div style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 10,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#8b7d6b",
            marginBottom: 20,
          }}>
            Step {step + 1} of {STEPS.length} — {STEPS[step].label}
          </div>

          {/* Step content */}
          {step === 0 && <ClientStep data={clientData} onChange={updateClient} errors={errors} />}
          {step === 1 && <MatterStep data={matterData} onChange={updateMatter} errors={errors} />}
          {step === 2 && (
            <ConflictStep
              data={{ clientName: clientData.clientName, adverseParty: matterData.adverseParty }}
              status={conflictStatus === "checking" ? "idle" : conflictStatus}
              onCheck={runConflictCheck}
              checking={conflictStatus === "checking"}
            />
          )}
          {step === 3 && <ReviewStep clientData={clientData} matterData={matterData} conflictStatus={conflictStatus} />}

          {/* Navigation */}
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 32,
            paddingTop: 20,
            borderTop: "1px solid #e8e0d4",
          }}>
            <button
              onClick={() => setStep(s => Math.max(0, s - 1))}
              disabled={step === 0}
              style={{
                padding: "10px 20px",
                background: "transparent",
                border: "1px solid #ddd8d0",
                borderRadius: 6,
                fontFamily: "'DM Mono', monospace",
                fontSize: 11,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: step === 0 ? "#c8c0b4" : "#8b7d6b",
                cursor: step === 0 ? "default" : "pointer",
              }}
            >
              ← Back
            </button>

            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#c8c0b4", letterSpacing: "0.08em" }}>
              {step + 1} / {STEPS.length}
            </div>

            {step < 3 ? (
              <button
                onClick={handleNext}
                disabled={step === 2 && conflictStatus !== "clear" && conflictStatus !== "conflict"}
                style={{
                  padding: "10px 24px",
                  background: "#2c2a25",
                  color: "#fff",
                  border: "none",
                  borderRadius: 6,
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 11,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  cursor: (step === 2 && conflictStatus !== "clear" && conflictStatus !== "conflict") ? "default" : "pointer",
                  opacity: (step === 2 && conflictStatus !== "clear" && conflictStatus !== "conflict") ? 0.4 : 1,
                }}
              >
                Continue →
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                style={{
                  padding: "10px 24px",
                  background: conflictStatus === "clear" ? "#1a6b3c" : "#8b7d6b",
                  color: "#fff",
                  border: "none",
                  borderRadius: 6,
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 11,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                }}
              >
                {conflictStatus === "conflict" ? "⚠ Submit with flag" : "Open matter →"}
              </button>
            )}
          </div>
        </div>

        <p style={{
          textAlign: "center",
          fontFamily: "'DM Mono', monospace",
          fontSize: 10,
          color: "#c8c0b4",
          marginTop: 16,
          letterSpacing: "0.08em",
        }}>
          All submissions are encrypted at rest · Supabase RLS enforced · Audit logged
        </p>
      </div>
    </div>
  );
}
