"use client";
import React, { useState } from "react";
import { Toaster, toast } from "react-hot-toast";

interface Rate {
  time_last_update_utc: string;
  time_next_update_utc: string;
  conversion_result: string;
}
export default function Home() {
  const [code, setCode] = useState("");
  const [code2, setCode2] = useState("");
  const [code11, setCode11] = useState("");
  const [code22, setCode22] = useState("");
  const [amountToconvert, setAmountToConvert] = useState("");
  const [conversionRate, setConversionRate] = useState<Rate>({
    time_last_update_utc: "",
    time_next_update_utc: "",
    conversion_result: "",
  });
  const [isSubmit, setIsSubmit] = useState(false);
  // const [conversionResult, setConversionResult] = useState(0);

  //Fetch convertion rate
  const handleRate = async (e: React.MouseEvent<HTMLButtonElement>) => {
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
      setConversionRate(data);
    } catch (err) {
      console.error("Error converting data", err);
    }
  };

  // handle code
  const handleCode = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const codeValue = e.target.value;
    const codeLoweer = codeValue.toLowerCase();
    const codeValue2 = e.target.options[e.target.selectedIndex].text;
    const codeLoweer2 = codeValue2.toLowerCase();
    setCode(codeLoweer);
    setCode11(codeLoweer2);
  };

  const handleCode2 = (e: React.ChangeEvent<HTMLSelectElement>) => {
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

  // Submit comment
  const handleComment = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://backend-i9tl.onrender.com/api/v1/sumbmit-comment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setIsSubmit(true);
      if (response.status === 200) {
        console.log("Comment inserted successfully");
        setIsSubmit(false);
      }
    } catch (err) {
      console.error("Error inserting comment", err);
    }
  };

  // Toaster
  const notify = () => {
    toast.success(
      "Feature is coming up \n stay tune and drop your comments to us for improvement",
      {
        style: {
          backgroundColor: "#084879",
          color: "#fff",
        },
        icon: "✅",
      }
    );
  };

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
        <div className="Tools toolsExchane">
          <div onClick={notify}>Weather Checking</div>
          <Toaster position="top-center" />
          <div onClick={notify}>Tenperature Converter</div>{" "}
          <Toaster position="top-center" />
          <div>Time Converter</div>
        </div>
        <div className="Tools">
          <div onClick={notify}>Sign In</div>
          <Toaster position="top-center" />
          <button type="button" onClick={notify}>
            Register
          </button>{" "}
          <Toaster position="top-center" />
        </div>
      </nav>

      <div className="image-container">
        <div>
          <div className="converter-section">
            <h3>Various Currency converter</h3>
            <p>Convert Different Currency</p>
            <p>1 NGN = USD ?</p>
            <div className="grid-input-fields">
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
                  className="input-select outline"
                  onChange={handleCode}
                >
                  {countryCode.map((cD, index) => (
                    <>
                      <option key={index}>~~~</option>
                      {Object.entries(cD).map(([key, value]) => (
                        <option key={key} value={key}>
                          {value}
                        </option>
                      ))}
                    </>
                  ))}
                </select>
              </div>
              <div className="arrow">
                <h1>
                  <i className="bi bi-arrow-left-right"></i>{" "}
                </h1>
              </div>
              <div className="arrow2">
                <h1>
                  <i className="bi bi-arrow-down-up"></i>{" "}
                </h1>
              </div>
              <div className="input-sec2">
                <input
                  className="input-field outline"
                  type="number"
                  placeholder="Amount"
                  defaultValue={conversionRate.conversion_result}
                  disabled
                />
                <img
                  src={`https://flagcdn.com/w80/${code2}.png`}
                  alt="flag2"
                  className="currency-logo"
                />
                <select
                  aria-label="select"
                  className="input-select outline"
                  onChange={handleCode2}
                >
                  {countryCode.map((value, index) => (
                    <>
                      <option key={index}>~~~</option>
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

            <div className="flex-date">
              <div>
                <h6 className="mid-market">
                  Mid-market last exchange rate update at UTC
                </h6>
                <div className="calendar">
                  <span className="calendar-date">
                    {conversionRate.time_last_update_utc}
                  </span>
                  <span>
                    {" "}
                    <i className="bi bi-calendar"></i>
                  </span>
                </div>
              </div>
              <div>
                <h6 className="mid-market">
                  Mid-market next exchange rate update at UTC
                </h6>
                <div className="calendar">
                  <span className="calendar-date">
                    {conversionRate.time_next_update_utc}
                  </span>
                  <span>
                    {" "}
                    <i className="bi bi-calendar"></i>
                  </span>
                </div>
              </div>
            </div>
            <div className="convert-button">
              <button
                className="convert-btn"
                type="button"
                onClick={handleRate}
              >
                Convert
              </button>
            </div>
          </div>
          <div className="second-section">
            <div className="demo-header">
              <h5>
                Demo, <br />
                Convert BRl to KRW
              </h5>
              <div className="d-flex justify-content-around">
                <div className="d-flex">
                  <img
                    src="https://flagcdn.com/w80/br.png"
                    alt="brazil"
                    className="demo-image"
                  />
                  <p>BRL</p>
                </div>
                <div className="d-flex">
                  <img
                    src="https://flagcdn.com/w80/kr.png"
                    alt="brazil"
                    className="demo-image"
                  />
                  <p>KWR</p>
                </div>
              </div>
            </div>
            <div className="grid-conversion">
              <p>1 BRL</p> <p>0242.3 KWR</p>
              <p>2 BRL</p> <p>484.78 KWR</p>
              <p>3 BRL</p> <p>727.17 KWR</p>
              <p>4 BRL</p> <p>969.56 KWR</p>
              <p>5 BRL</p> <p>1211.95 KWR</p>
              <p>6 BRL</p> <p>1454.34 KWR</p>
              <p>7 BRL</p> <p>1696.73 KWR</p>
              <p>8 BRL</p> <p>1939.12 KWR</p>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-center mt-5">Currency Information</h4>
          <div className="grid-currency-info-container">
            <div className="currency-info-container">
              <div className="d-flex gap-1">
                <img
                  src="https://flagcdn.com/w80/br.png"
                  alt="flag"
                  className="demo-image"
                />
                <h5>BRL</h5>
              </div>
              <p>
                The Brailian Real (BRL) is the official currency of Brazil. The
                symbol of the Brazilian Real is R$.
              </p>
            </div>
            <div className="currency-info-container">
              <div className="d-flex gap-1">
                <img
                  src="https://flagcdn.com/w80/kr.png"
                  alt="flag"
                  className="demo-image"
                />
                <h5>KWR</h5>
              </div>
              <p>
                The South Korean Won (kwr) is the official currency of South
                Korean. The symbol of the Brazilian Real is ₩.
              </p>
            </div>
          </div>
        </div>

        <div className="form-field">
          <h4 className="text-white pt-3">Comment section</h4>
          <p>
            Please leave your comment for us, we need this for improvement, what
            to add, remove, the app is usefull or not. <br />
            Please note your infomation are well emcrypt. Thanks
          </p>
          <div className="gridcomment">
            <input
              type="text"
              aria-label="name"
              placeholder="Input Your Name"
            />
            <input
              type="email"
              aria-label="gmail"
              placeholder="Input Your Gmail Address"
            />
          </div>
          <textarea
            aria-label="comment"
            placeholder="Input Your Comment Content Here"
            rows={5}
          ></textarea>
          <div className="commit-button">
          {isSubmit ? (
          <p>Comment Submited. Thanks</p>
          ) : (' ')}
            <button type="submit" onClick={handleComment}>
              Submit
            </button>
          </div>
        </div>

        <footer>
          <div>
            <div>
              <div className="brand-footer">
                BANKYT
                <div className="footer-brand-menu">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                CH <br />
              </div>
              <p className="footer-currency">Currency Converter</p>
            </div>
            <h4 className="text-white  foot-h fs-3">Tools</h4>
            <p className="text-white footer-text foot-p">Currency Converter</p>
            <p className="text-white footer-text foot-p">Historical Currency Rates</p>
            <p className="text-white footer-text foot-p">Rate Alert</p>
          </div>
          <div className="mt-5 text-white footer-text">
            <h4 className="foot-h">Exchange Rate API</h4>
            <p className="footer-text foot-p">Exchange Rate API</p>
            <p className="footer-text foot-p">Free Trial</p>
            <p className="footer-text foot-p">Pricing</p>
            <p className="footer-text foot-p">Developers</p>
          </div>
          <div className="mt-5 text-white">
            <h4 className="foot-h">About Me</h4>
            <i className="bi bi-whatsapp me-3 foot-p"></i>
            <i className="bi bi-facebook foot-p" ></i>
          </div>
        </footer>
      </div>
    </div>
  );
}
