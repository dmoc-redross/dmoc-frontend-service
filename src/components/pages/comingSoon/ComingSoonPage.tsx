import React from "react";
import "./ComingSoon.scss";
import logo from "../../../assets/logo/logo.png";

const ComingSoonPage: React.FC = () => {
  return (
    <div className="cmng_soon">
      <img src={logo} alt="logo_img" />
      <h1>Greetings all!</h1>
      <p className="px-5">
        Get ready for liftoff! We're taking Sky Marvels on a quick pit stop to
        upgrade your affiliate experience. We're polishing the program to make
        it smoother.
      </p>
      <p>
        You won't be able to launch any referrals, but
        <h4>withdrawals are no issues!</h4> trust us, it'll be worth the wait.
        We'll be back online on July 17th, ready to help you blast off to
        affiliate marketing success!
      </p>
      <p>Stay tuned, and we'll see you back in the game in no time!</p>
    </div>
  );
};

export default ComingSoonPage;
