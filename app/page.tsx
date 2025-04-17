"use client";
import { useState } from "react";


export default function Home() {
  const [code, setCode] = useState("");
  const [code2, setCode2] = useState("");
  const [code11, setCode11] = useState("");
  const [code22, setCode22] = useState("");
  const [amountToconvert, setAmountToConvert] = useState("");
  const [conversionRate, setConversionRate] = useState("");

  //Fetch convertion rate
  const handleRate = async (e: unknown) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/conversion_rate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code11, code22, amountToconvert }),
      });
      const data = await response.json();
      console.log("result", code, code2, amountToconvert);
      setConversionRate(data.conversion_result);
    } catch (err: unknown) {
      console.error("Error converting data", err);
    }
  };

  // handle code
  const handleCode = (e: ) => {
    const codeValue = e.target.value;
    const codeLoweer = codeValue.toLowerCase();
    const codeValue2 = e.target.options[e.target.selectedIndex].text;
    const codeLoweer2 = codeValue2.toLowerCase();
    setCode(codeLoweer);
    setCode11(codeLoweer2);
  };

  const handleCode2 = (e: any) => {
    const codeValue = e.target.value;
    const codeLoweer = codeValue.toLowerCase();
    const codeValue2 = e.target.options[e.target.selectedIndex].text;
    const codeLoweer2 = codeValue2.toLowerCase();
    setCode2(codeLoweer);
    setCode22(codeLoweer2);
  };

  const countryCode = [
    {
      au: "aud", // Australia
      br: "brl", // Brazil
      ca: "cad", // Canada
      cn: "cny", // China
      cz: "czk", // Czech Republic
      dk: "dkk", // Denmark
      eg: "egp", // Egypt
      eu: "eur", // European Union
      gb: "gbp", // United Kingdom
      gh: "ghs", // Ghana
      hk: "hkd", // Hong Kong
      hu: "huf", // Hungary
      id: "idr", // Indonesia
      il: "ils", // Israel
      in: "inr", // India
      jp: "jpy", // Japan
      ke: "kes", // Kenya
      kr: "krw", // South Korea
      kw: "kwd", // Kuwait
      mx: "mxn", // Mexico
      my: "myr", // Malaysia
      ng: "ngn", // Nigeria
      no: "nok", // Norway
      np: "npr", // Nepal
      nz: "nzd", // New Zealand
      pk: "pkr", // Pakistan
      pl: "pln", // Poland
      qa: "qar", // Qatar
      ru: "rub", // Russia
      sa: "sar", // Saudi Arabia
      sd: "sdg", // Sudan
      se: "sek", // Sweden
      sg: "sgd", // Singapore
      th: "thb", // Thailand
      tr: "try", // Turkey
      tz: "tzs", // Tanzania
      ua: "uah", // Ukraine
      us: "usd", // United States
      vn: "vnd", // Vietnam
      za: "zar", // South Africa
      zm: "zmw", // Zambia
    },
  ];

  return (
    <div className="main">
      <nav className="navbar">
        <div>
          <div className="brand-nav">
            BANKYT
            <div className="brand-menu">
              <span></span>
              <span></span>
              <span></span>
            </div>
            CH <br />
          </div>
          <p className="currency">Currency Converter</p>
        </div>
        <div className="Tools">
          <div>Tools</div>
          <div>Exchange Rate API</div>
          <div>Resources</div>
        </div>
        <div className="Tools">
          <div>Sign In</div>
          <button type="button">Register</button>
        </div>
      </nav>
      <div className="image-container">
        <div className="converter-section">
          <h3>Various Currency converter</h3>
          <p>Convert Different Currency</p>
          <p>1 NGN = USD ?</p>
          <div className="grid-input-field">
            <div className="input-sec1">
              <input
                className="input-field"
                type="number"
                placeholder="Amount"
                value={amountToconvert}
                onChange={(e) => setAmountToConvert(e.target.value)}
              />
              <img
                src={`https://flagcdn.com/w80/${code}.png`}
                alt="flag"
                className="currency-logo"
              />
              <select
                aria-label="select"
                className="input-flex2"
                onChange={handleCode}
              >
                {countryCode.map((cD) => (
                  <>
                    {Object.entries(cD).map(([key, value]) => (
                      <option key={key} value={key}>
                        {value}
                      </option>
                    ))}
                  </>
                ))}
              </select>
            </div>
            <div>
              <h1>
                <i className="bi bi-arrow-left-right"></i>{" "}
              </h1>
            </div>
            <div className="input-sec input-sec2">
              <input
                className="input-field"
                type="number"
                placeholder="Amount"
                value={conversionRate}
                onChange={(e) => setConversionRate(e.target.value)}
              />
              <img
                src={`https://flagcdn.com/w80/${code2}.png`}
                alt="flag2"
                className="currency-logo"
              />
              <select
                aria-label="select"
                className="input-flex2"
                onChange={handleCode2}
              >
                {countryCode.map((value, index) => (
                  <>
                    {Object.entries(value).map(([key, value]) => (
                      <option key={`${key}-${index}`} value={key}>
                        {value}
                      </option>
                    ))}
                  </>
                ))}
              </select>
            </div>
          </div>
          <div className="convert-button">
            <button className="convert-btn" type="button" onClick={handleRate}>
              Convert
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
