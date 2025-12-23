import React from 'react'
import PrivacyPolicy from './PrivacyPolicy';
import { Link } from 'react-router-dom';
function Footer() {
  return (
    <div>
      <div className="flex flex-col items-center bg-gray-100 p-2">
        <h1>&copy; 2024 JobNest. All rights reserved.</h1>
        <p>
            <Link to={"PrivacyPolicy"} className="text-blue-400">Privacy Policy</Link>
            &nbsp;
            |
            &nbsp;
            <Link to="/TermsOfService" className="text-blue-400">Terms of Service</Link>
        </p>
      </div>
    </div>
  );
}

export default Footer
