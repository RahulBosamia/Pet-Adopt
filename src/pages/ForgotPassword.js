import React, { useRef, useState } from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions/index";
import { Alert } from "react-bootstrap";

function ForgotPassword({ ForgotPassword, error}) {
  const emailRef = useRef();
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email: emailRef.current.value,
    };
    await ForgotPassword(data);
    if(error!=null)
      setMsg("Email Sent");
  };
  return (
    <div>
      <div className="container signup__container">
        <div className="container__child signup__form">
          <h2>Reset Password</h2>
          {error && <Alert variant="danger" style={{fontSize: "14px"}}>{error}</Alert>}
          {msg && <Alert variant="success">{msg}</Alert>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                className="form-control"
                type="text"
                name="email"
                id="email"
                placeholder="james.bond@spectre.com"
                required
                ref={emailRef}
              />
            </div>
            <div className="m-t-lg">
              <ul className="list-inline">
                <li>
                  <input
                    className="btn btn--form"
                    type="submit"
                    value="Reset"
                  />
                </li>
              </ul>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = ({auth}) => ({
  error: auth.error
});
const mapDispatchToProps = {
  ForgotPassword: actions.ForgotPassword,
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);

