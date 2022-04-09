import React from "react";
import loginImg from "../../assets/login.svg";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import "./styles.css";
function Signup() {
  return (
    <>
      <div className="login-screen">
        <div className="login-container">
          <div className="login-form-container">
            <div className="entry row">
              <div className="col-sm-12">
                <h1 style={{fontWeight:700,fontSize:60}}>Sign up</h1>
              </div>
            </div>
            <div className="entry row">
              <div className="col-sm-1">
                <i class="fa-solid fa-user"></i>
              </div>
              <div className="col-sm-11">
                <input type="text" placeholder="Your name" />
              </div>
            </div>
            <div className="entry row">
              <div className="col-sm-1">
                <i class="fa-solid fa-phone"></i>
              </div>
              <div className="col-sm-11">
                <input type="text" placeholder="Mobile number" />
              </div>
            </div>
            <div className="entry row">
              <div className="col-sm-1">
                <MailOutlineIcon />
              </div>
              <div className="col-sm-11">
                <input type="email" placeholder="Your email" />
              </div>
            </div>
            <div className="entry row">
              <div className="col-sm-1">
                <i class="fa-solid fa-lock"></i>
              </div>
              <div className="col-sm-11">
                <input type="password" placeholder="Password" />
              </div>
            </div>
            <div className="entry row">
              <div className="col-sm-1">
                <i class="fa-solid fa-key"></i>
              </div>
              <div className="col-sm-11">
                <input type="password" placeholder="Confirm Password" />
              </div>
            </div>
            <div className="entry row">
              <button
                    // onClick={loginsubmithandler}
                    type='button'
                    class='btn btn-primary'
                  >
                    Register
                  </button>
            </div>
          </div>
          <div className="login-image-container">
            <img src={loginImg} className="login-img" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
