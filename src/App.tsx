import { useState, useCallback ,useEffect } from "react";
import SignatureForm from "./components/SignatureForm";
import SignatureCanvas from "./components/SignatureCanvas";
import SignatureTyped, { fontOptions } from "./components/SignatureTyped";
import { t, Lang } from "./i18n";
import { Lock, PenLine, Keyboard, Key, Package } from "lucide-react";

type Tab = "draw" | "type";

interface Meta {
  name: string;
  role: string;
  publicKey: string;
  timestamp: string;
}

function buildPayload(meta: Meta, dataUrl: string) {
  const json = JSON.stringify({ ...meta, signature: dataUrl });
  return btoa(unescape(encodeURIComponent(json)));
}

function simpleHash(str: string) {
  let h = 0;
  for (let i = 0; i < str.length; i++)
    h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
  return Math.abs(h).toString(16).padStart(8, "0");
}

export default function App() {
  const [lang, setLang] = useState<Lang>("fa");
  const tr = t[lang];

  const [tab, setTab] = useState<Tab>("draw");
  const [fields, setFields] = useState({ name: "", role: "", publicKey: "" });
  const [color, setColor] = useState("#1e293b");
  const [lineWidth, setLineWidth] = useState(3);
  const [font, setFont] = useState(fontOptions()[0].value);
  const [drawnUrl, setDrawnUrl] = useState("");
  const [payload, setPayload] = useState("");

  useEffect(() => {
  document.documentElement.dir = lang === "fa" ? "rtl" : "ltr";
  document.documentElement.lang = lang;
}, [lang]);

  const handleField = (field: string, val: string) =>
    setFields((prev) => ({ ...prev, [field]: val }));

  const generate = () => {
    const meta: Meta = { ...fields, timestamp: new Date().toISOString() };
    const sigData = tab === "draw" ? drawnUrl : `typed:${fields.name}:${font}`;
    setPayload(buildPayload(meta, sigData));
  };

  const exportPNG = () => {
    if (!drawnUrl) return;
    const a = document.createElement("a");
    a.href = drawnUrl;
    a.download = `signature_${fields.name || "user"}.png`;
    a.click();
  };

  const exportSVG = () => {
    const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="120">
  <rect width="400" height="120" fill="white"/>
  <text x="200" y="80" text-anchor="middle" font-family="${font}" font-size="48" fill="${color}">${fields.name || "Signature"}</text>
  <text x="200" y="110" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#666">${fields.role}</text>
</svg>`;
    const blob = new Blob([svgContent], { type: "image/svg+xml" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `signature_${fields.name || "user"}.svg`;
    a.click();
  };

  return (
    <>
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
        {(["fa", "en", "de"] as Lang[]).map((l) => (
          <button
            key={l}
            onClick={() => setLang(l)}
            style={{
              padding: "0.25rem 0.75rem",
              borderRadius: 6,
              border: "1px solid #334155",
              background: lang === l ? "#3b82f6" : "#1e293b",
              color: "#e2e8f0",
              cursor: "pointer",
            }}
          >
            {l === "fa" ? "فارسی" : l === "en" ? "English" : "Deutsch"}
          </button>
        ))}
      </div>
      <div className="card">
        <h1>
          <Lock size={20} /> {tr.title}
        </h1>
        <SignatureForm
          name={fields.name}
          role={fields.role}
          publicKey={fields.publicKey}
          onChange={handleField}
          labels={tr}
        />

        <div className="tabs">
          <button
            className={`tab ${tab === "draw" ? "active" : ""}`}
            onClick={() => setTab("draw")}
          >
            <PenLine size={16} style={{ marginLeft: "3px" }} />
            {tr.drawTab}
          </button>
          <button
            className={`tab ${tab === "type" ? "active" : ""}`}
            onClick={() => setTab("type")}
          >
            <Keyboard size={16} style={{ marginLeft: "3px" }} />
            {tr.typeTab}
          </button>
        </div>

        <div className="controls" style={{ marginBottom: "0.75rem" }}>
          <label>{tr.color}</label>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            style={{
              width: 36,
              height: 36,
              padding: 2,
              border: "none",
              background: "none",
              cursor: "pointer",
            }}
          />
          {tab === "draw" && (
            <>
              <label>{tr.thickness}</label>
              <input
                type="range"
                min={1}
                max={10}
                value={lineWidth}
                onChange={(e) => setLineWidth(+e.target.value)}
                style={{ width: 80 }}
              />
              <span style={{ fontSize: "0.8rem", color: "#94a3b8" }}>
                {lineWidth}px
              </span>
            </>
          )}
          {tab === "type" && (
            <>
              <label>{tr.font}</label>
              <select
                value={font}
                onChange={(e) => setFont(e.target.value)}
                style={{
                  background: "#0f172a",
                  color: "#e2e8f0",
                  border: "1px solid #334155",
                  borderRadius: 6,
                  padding: "0.3rem",
                }}
              >
                {fontOptions().map((f) => (
                  <option key={f.value} value={f.value}>
                    {f.label}
                  </option>
                ))}
              </select>
            </>
          )}
        </div>

        {tab === "draw" ? (
          <SignatureCanvas
            color={color}
            lineWidth={lineWidth}
            onDataUrl={setDrawnUrl}
            clearLabel={tr.clear}
          />
        ) : (
          <SignatureTyped name={fields.name} font={font} color={color} />
        )}

        <div className="export-row">
          <button className="btn btn-primary" onClick={generate}>
            <Key size={14} style={{ marginLeft: "3px" }} />
            {tr.generate}
          </button>
          {tab === "draw" && (
            <button className="btn btn-success" onClick={exportPNG}>
              ⬇ PNG
            </button>
          )}
          {tab === "type" && (
            <button className="btn btn-success" onClick={exportSVG}>
              ⬇ SVG
            </button>
          )}
        </div>


        {payload && (
          <div
            className="hash-box"
            style={{
              height: "260px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>
              <Package size={12} /> ({tr.payloadLabel}):
            </span>
            <div
              style={{
                flex: 1,
                overflowY: "auto",
                wordBreak: "break-all",
                marginBottom: "0.5rem",
              }}
            >
              {payload}
            </div>
            <span>
              <Key size={12} /> {tr.hashLabel}
            </span>
            <div style={{ color: "#fbbf24" }}>{simpleHash(payload)}</div>
          </div>
        )}
      </div>
    </>
  );
}
