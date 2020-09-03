import React from 'react';
import { LANGUAGE } from '../../constants';
import './styles.css';
import loginImg from '../../images/login_2.png';

export default function LoginImage() {
  const { title, subText } = LANGUAGE.login.loginImage;

  return (
    <section className="loginImage d-flex justify-content-center">
      <span>
        <img src={loginImg} alt="Office" className="mb-md-5" />
        <h4 className="text-center text-white font-weight-bold mt-md-5 mb-md-3">
          {title}
        </h4>
        <p className="text-center text-white">{subText}</p>
      </span>
    </section>
  );
}
