import React from 'react';

const TermsOfService = () => {
  const lastUpdated = "December 21, 2025";

  return (
    <div className="max-w-5xl mx-auto px-6 py-16 bg-white text-slate-900 leading-relaxed">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold mb-2 text-blue-900">JobNest Terms of Service</h1>
        <p className="text-slate-500 font-medium italic">Effective Date: {lastUpdated}</p>
      </header>

      <div className="space-y-12">
        {/* 1. Acceptance of Terms */}
        <section>
          <h2 className="text-2xl font-bold mb-4 border-b pb-2 border-slate-200">1. Acceptance of Agreement</h2>
          <p className="text-slate-700">
            By accessing or using JobNest, you agree to be bound by these Terms of Service. If you are using the platform on behalf of a company (Recruiter), you represent that you have the authority to bind that entity to these terms.
          </p>
        </section>

        {/* 2. User Accounts */}
        <section>
          <h2 className="text-2xl font-bold mb-4 border-b pb-2 border-slate-200">2. Account Responsibilities</h2>
          <ul className="list-disc ml-6 space-y-3 text-slate-700">
            <li><strong>Eligibility:</strong> You must be at least 18 years of age to use this platform.</li>
            <li><strong>Accuracy:</strong> You agree to provide current, complete, and accurate information during the registration and application process.</li>
            <li><strong>Security:</strong> You are responsible for maintaining the confidentiality of your account credentials. JobNest is not liable for unauthorized access resulting from your failure to secure your account.</li>
          </ul>
        </section>

        {/* 3. Job Seeker Obligations */}
        <section className="bg-blue-50 p-6 rounded-lg border border-blue-100">
          <h2 className="text-2xl font-bold mb-4 text-blue-900">3. Job Seeker Conduct</h2>
          <p className="mb-4 font-medium italic">As a candidate, you agree NOT to:</p>
          <ul className="list-disc ml-6 space-y-2 text-slate-700 text-sm">
            <li>Submit fraudulent resumes or misrepresent your professional qualifications.</li>
            <li>Apply for roles you are not genuinely interested in (Spamming).</li>
            <li>Use automated scripts or "bots" to apply for jobs or scrape listings.</li>
            <li>Share sensitive recruiter information with third parties without consent.</li>
          </ul>
        </section>

        {/* 4. Recruiter Obligations */}
        <section>
          <h2 className="text-2xl font-bold mb-4 border-b pb-2 border-slate-200">4. Recruiter & Employer Terms</h2>
          <p className="text-slate-700 mb-4">
            Recruiters using JobNest must comply with all applicable labor laws and the DPDP Rules 2025 regarding candidate data handling.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-md">
              <h3 className="font-bold text-blue-700">Verified Listings</h3>
              <p className="text-xs">All job postings must be for genuine, open positions. Multi-level marketing (MLM) schemes are strictly prohibited.</p>
            </div>
            <div className="p-4 border rounded-md">
              <h3 className="font-bold text-blue-700">Data Disposal</h3>
              <p className="text-xs">Recruiters must delete candidate data within 90 days of the role being filled or if a candidate withdraws consent.</p>
            </div>
          </div>
        </section>

        {/* 5. Limitation of Liability */}
        <section>
          <h2 className="text-2xl font-bold mb-4 border-b pb-2 border-slate-200">5. Limitation of Liability</h2>
          <p className="text-slate-700 bg-slate-100 p-4 rounded text-sm italic">
            JOBNEST IS A PLATFORM, NOT AN EMPLOYER. We do not guarantee the validity of job postings, the safety of interviews, or the accuracy of candidate resumes. Users interact at their own risk. To the maximum extent permitted by law, JobNest is not liable for any direct or indirect damages resulting from your use of the platform.
          </p>
        </section>

        {/* 6. Intellectual Property */}
        <section>
          <h2 className="text-2xl font-bold mb-4 border-b pb-2 border-slate-200">6. Intellectual Property</h2>
          <p className="text-slate-700 text-sm">
            All content on JobNest, including the logo, UI design, and proprietary matching algorithms, is the property of JobNest. You may not reproduce, copy, or redistribute any part of the platform without written permission.
          </p>
        </section>

        {/* 7. Termination */}
        <section>
          <h2 className="text-2xl font-bold mb-4 border-b pb-2 border-slate-200">7. Account Termination</h2>
          <p className="text-slate-700">
            We reserve the right to suspend or terminate accounts that violate these terms, specifically those involved in fraudulent recruitment or malicious data scraping.
          </p>
        </section>

        {/* Footer Contact */}
        <footer className="pt-10 border-t flex flex-col md:flex-row justify-between items-center text-slate-500 text-xs">
          <p>&copy; 2025 JobNest Platform. All Rights Reserved.</p>
          <p className="mt-4 md:mt-0">
            Questions? Contact <span className="font-bold text-blue-600 underline cursor-pointer">legal@jobnest.com</span>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default TermsOfService;
