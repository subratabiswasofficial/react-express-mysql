import React, { useState } from "react";
import axios from "axios";

function Home() {
  const [formData, setFormData] = useState({
    name: "",
    roll: "",
    department: "",
  });
  const uploadForm = async () => {
    try {
      const response = await axios.post("/api/users", formData);
      console.log("server response", response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const submitFormHandler = async (e) => {
    e.preventDefault();
    await uploadForm();
    setFormData({
      ...formData,
      roll: "",
    });
  };
  const onChangeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const onResetHandler = (e) => {
    setFormData({
      name: "",
      roll: "",
      department: "",
    });
  };
  return (
    <>
      <header>
        <nav className="content">
          <h1>MySQL</h1>
          <ul>
            <li>Home</li>
            <li>Signout</li>
          </ul>
        </nav>
        <section>
          <div className="content">
            <div className="form-area">
              <form onSubmit={submitFormHandler} onReset={onResetHandler}>
                <input
                  onChange={onChangeHandler}
                  value={formData.name}
                  type="text"
                  name="name"
                  placeholder="Name"
                />
                <input
                  onChange={onChangeHandler}
                  value={formData.roll}
                  type="text"
                  inputMode="numeric"
                  name="roll"
                  placeholder="Roll"
                />
                <input
                  onChange={onChangeHandler}
                  value={formData.department}
                  type="text"
                  name="department"
                  placeholder="Department"
                />
                <input type="submit" />
                <input type="reset" />
              </form>
            </div>
          </div>
        </section>
      </header>
    </>
  );
}

export default Home;
