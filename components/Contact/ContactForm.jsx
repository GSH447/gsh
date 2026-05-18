"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import axiosInstance from "../../lib/axios";

export default function ContactForm() {
  const [countries, setCountries] = useState([]); //countries variables
  const [text, setText] = useState(""); //text variables
  const [search, setSearch] = useState(""); //search variables
  const [showDropdown, setShowDropdown] = useState(false); //tel dropdown variables
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const maxWords = 50; // Max words allowed
  const maxChars = 200; // Max characters allowed
  const [isChecked, setIsChecked] = useState(false); // State to track checkbox
  const [loading, setLoading] = useState(false); //set loading
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal
  const [selectedCountry, setSelectedCountry] = useState({
    code: "+234",
    flag: "",
    name: "Nigeria",
  }); //selectedCountry variables

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: ""
  }); //form variables


  /* ---------------- FETCH COUNTRIES ---------------- */
  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all?fields=idd,name,flags")
      .then((res) => res.json())
      .then((data) => {
        const countryData = data
          .filter((c) => c.idd?.root && c.flags?.png)
          .map((c) => ({
            code: c.idd.root + (c.idd.suffixes?.[0] || ""),
            flag: c.flags.png,
            name: c.name.common,
          }));

        setCountries(countryData);
        const nigeria = countryData.find((c) => c.code === "+234");
        if (nigeria) setSelectedCountry(nigeria);
      })
      .catch((err) =>
        console.error("Country fetch error:", err.message)
      );
  }, []);

  /* ---------------- HANDLERS ---------------- */
  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    setShowDropdown(false);
  };




  /* ---------------- VALIDATION ---------------- */
  const validate = () => {
    const e = {};

    if (!data.title) e.title = "Title is required";
    if (!data.firstName.trim()) e.firstName = "First name required";
    if (!data.lastName.trim()) e.lastName = "Last name required";

    if (!/^\S+@\S+\.\S+$/.test(data.email))
      e.email = "Invalid email address";

    if (!data.phone || data.phone.length < 7)
      e.phone = "Valid phone number required";

    setErrors(e);
    return Object.keys(e).length === 0;
  };


  // textarea function 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTextChange = (e) => {
    let inputText = e.target.value;
    let words = inputText.trim().split(/\s+/).filter((word) => word !== "");
    let charCount = inputText.length;

    if (charCount <= maxChars && words.length <= maxWords) {
      setText(inputText);
      setFormData({ ...formData, message: inputText });
    }
  };

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked); // Update the checkbox state
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setLoading(true);
    const payload = {
      ...formData,
      countryCode: selectedCountry.code,
    };

    try {
        const response = await axiosInstance.post('/contact',  payload );
        const result = response.data;
    
        if (result.status === 'success') {
          setSuccessMessage(`Submitted successfully!`);
        } 
        else {
          setErrorMessage(result.message || "Submission failed, email admin@gracespringhospitals.com");
        }
    } 
  
    
    catch (err) {
      const error = err;
    
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message || "Something went wrong.");
      } else if (error.message) {
        setErrorMessage(error.message || "Network error, please try again.");
      } else {
        setErrorMessage("An unexpected error occurred.");
      }
    }
    
    finally {
        setLoading(false);
    }

  };
  // Modal Toggle
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  

  return (

    <div
      id="contact-form"
      className="lg:bg-primary lg:p-10 w-fit mx-auto rounded-lg shadow-md"
    >

      
        <div className="lg:w-fit m-auto p-10 bg-white shadow-xl rounded-lg">

          <div className=" w-fit mb-5">

            <h1 className="text-[x-large] lg:text-[45px] leading-[2cm] font-bold tracking-wide" style={{fontFamily:"AvenirBold"}}>Send us a message</h1>

            <p className="text-[small] lg:text-[15px]">Fill out the form below and the relevant person will get back to you.</p>

          </div>

          <form className=" flex flex-col space-y-1 w-full max-w-lg " onSubmit={handleSubmit}>

              <div className="flex gap-2">

                <div>
                  <label className="text-[small] lg:text-[15px]">First name</label>
                  <input
                    type="text"
                    placeholder="Elizabeth"
                    className="flex-1 p-2 border rounded-md focus:ring focus:outline-none w-full lg:text-[15px]"
                    name="firstName"
                    onChange={handleChange}
                    required
                  /> 
                </div>

                <div>
                  <label className="text-[small] lg:text-[15px]">Last name</label>
                  <input
                    type="text"
                    placeholder="Last name"
                    className="flex-1 p-2 border rounded-md focus:ring focus:outline-none w-full lg:text-[15px]"
                    name="lastName"
                    onChange={handleChange}
                    required
                  />
                </div>

              </div>

              <div>
                <label className="text-[small] lg:text-[15px]">Email</label>
                <input
                  type="email"
                  placeholder="you@company.com"
                  className="w-full p-2 border rounded-md focus:ring focus:outline-none lg:text-[15px]"
                  name="email"
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div>
                <label className="text-[small] lg:text-[15px]">Phone Number</label>
                <div className="flex items-center border rounded-md p-2 space-x-2">
                  <div className="relative">
                    <button
                      type="button"
                      className="flex items-center space-x-2 p-2 focus:outline-none"
                      // onClick={() => {
                      //   /* Optional: Add a modal/dropdown to select the country */
                      // }}

                    onClick={() => setShowDropdown(!showDropdown)}
                    >
                      <img
                        src={selectedCountry.flag || '/logo.svg'}
                        alt="Flag"
                        className="w-6 h-4 rounded-md"
                      />
                      
                      <span className="text-[small] lg:text-[15px]">{selectedCountry.code}</span>
                    </button>

                    {showDropdown && (
                    <div className="absolute top-12 left-0 bg-white border shadow-md max-h-60 overflow-y-auto w-44 z-10">
                      <input
                        type="text"
                        placeholder="Search country..."
                        className="w-full p-2 border-b lg:text-[15px]"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      />
                  {countries
                        .filter((c) =>
                          c.name.toLowerCase().includes(search.toLowerCase())
                        )
                        .map((country) => (
                          <div
                            key={`${country.code}-${country.name}`}
                            className="flex items-center p-2 hover:bg-gray-200 cursor-pointer"
                            onClick={() => handleCountryChange(country)}
                          >
                            <img
                              src={country.flag}
                              alt={country.name}
                              className="w-6 h-4 mr-2"
                            />
                            <span>{country.name} ({country.code})</span>
                          </div>
                        ))}
                    </div>
                  )}
                    </div>

                    <input
                      type="tel"
                      placeholder="8143516481"
                      className="flex-1 p-2 focus:ring focus:outline-none lg:text-[15px]"
                      name="phone"
                      onChange={handleChange}
                      required
                    />
                </div>
              </div>
                
              <div>

                <label className="text-[small] lg:text-[15px]">Message</label>
                
                <textarea
                  placeholder="Type your text here..."
                  className="w-full p-2 border rounded-md focus:ring focus:outline-none h-24 resize-none lg:text-[15px]"
                  value={text}
                  name="message"
                  onChange={handleTextChange}
                  required
                />
                {/* <p className="text-sm text-gray-500 mt-1">
                  {text.length} / {maxChars} characters | {text.split(/\s+/).filter(word => word !== "").length} / {maxWords} words
                </p> */}
                
              </div>

              <div className="flex items-center space-x-2">

              <input
                type="checkbox"
                id="privacy"
                className="rounded lg:text-[15px]"
                checked={isChecked}
                onChange={() => setIsChecked(!isChecked)}
              />
              <label
                htmlFor="privacy"
                className="text-[small] lg:text-[15px]"
              >
                Accept and <Link className="hover:text-primary font-bold cursor-pointer text-[small]  lg:text-[15px]" target="_blank" href={"/privacy-policy"}>read privacy policy.</Link>
              </label>

                We will use the information you have provided to respond to your enquiry.

              </div>

              {errorMessage && <p className="text-red-500">{errorMessage}</p>}
              {successMessage && <p className="text-green-500">{successMessage}</p>}
              
              <button
                type="submit"
                className="w-full bg-primary text-white p-2 rounded-md hover:bg-black"
                disabled={!isChecked} // Disable button when checkbox is unchecked
              >
                
                {loading ? "Sending message..." : "Send message"}
              </button>

          </form>
              



        </div>


    </div>


  );
}




