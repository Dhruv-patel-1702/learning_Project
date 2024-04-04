import { useState } from "react";

const Contact = () => {
  const [contact, setContact] = useState({
    username: "",
    email: "",
    message: "",
  });

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setContact({
      ...contact,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(contact);
  };

  return (
    <>
      <section className="section-contact">
        <div className="contact-content container">
          <h1 className="main-heading">contact us</h1>
        </div>
        <div className="container grid grid-two-cols">
          <div className="contact-img">
            <img
              src="/images/support.png"
              alt="contact image"
              width="400"
              height="500"
            />
          </div>
          <div className="section-form">
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username">username</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  autoComplete="off"
                  value={contact.username}
                  onChange={handleInput}
                  required
                />
              </div>
              <div>
                <label htmlFor="email">email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={contact.email}
                  onChange={handleInput}
                  autoComplete="off"
                  required
                />
              </div>
              <div>
                <label htmlFor="message">message</label>
                <textarea
                  name="message"
                  id="message"
                  cols="30"
                  autoComplete="off"
                  value={contact.message}
                  onChange={handleInput}
                  required
                  rows="6"
                ></textarea>
              </div>
              <div>
                <button type="submit">submit</button>
              </div>
            </form>
          </div>
        </div>

        <section className="mb-3">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1888472.9915471477!2d70.0076696521738!3d22.41306885597678!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3959051f5f0ef795%3A0x861bd887ed54522e!2sGujarat!5e0!3m2!1sen!2sin!4v1705568297948!5m2!1sen!2sin"
            width="100%"
            height="450"
            loading="lazy"
          ></iframe>
        </section>
      </section>
    </>
  );
};

export default Contact;
