import React from 'react';

const PrivacyPolicy = () => {
  const lastUpdated = "December 21, 2025";

  return (
    <div className="max-w-5xl mx-auto px-4 py-16 text-slate-800 leading-relaxed bg-white">
      <header className="mb-12 border-b border-slate-200 pb-8 text-center">
        <h1 className="text-5xl font-extrabold text-blue-900 mb-4">JobNest Privacy Policy</h1>
        <p className="text-lg text-slate-500 font-medium tracking-wide italic">Building Trust in Your Career Journey</p>
        <p className="mt-2 text-sm font-semibold uppercase text-blue-600">Last Revised: {lastUpdated}</p>
      </header>

      <div className="grid grid-cols-1 gap-10">
        {/* Core Principles for Job Portals */}
        <section className="bg-slate-50 p-8 rounded-xl border border-slate-100">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center">
            <span className="bg-blue-600 text-white rounded-lg px-3 py-1 mr-3 text-sm">1</span>
            Our Privacy Commitment
          </h2>
          <p className="text-slate-700">
            At JobNest, we are dedicated to protecting your professional data. This policy explains how we handle your personal information in compliance with 2025 global standards and India’s DPDP Rules. We only process data essential to connecting you with your next career opportunity.
          </p>
        </section>

        {/* Recruitment Specific Data Collection */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Data We Process for Recruitment</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-5 border rounded-lg hover:shadow-md transition-shadow">
              <h3 className="font-bold text-blue-800 mb-2">For Candidates</h3>
              <ul className="list-disc ml-5 space-y-1 text-sm">
                <li>Professional resumes and cover letters.</li>
                <li>Educational history and work experience.</li>
                <li>Portfolio links (e.g., GitHub, LinkedIn).</li>
                <li>Salary expectations and notice periods.</li>
              </ul>
            </div>
            <div className="p-5 border rounded-lg hover:shadow-md transition-shadow">
              <h3 className="font-bold text-blue-800 mb-2">For Recruiters</h3>
              <ul className="list-disc ml-5 space-y-1 text-sm">
                <li>Company identifiers and contact details.</li>
                <li>Job description metadata.</li>
                <li>Hiring manager profiles.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* DPDP 2025 Rights Section */}
        <section className="border-t pt-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">3. Your 2025 Data Rights (DPDP Compliant)</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
            <div className="p-4 bg-white border border-slate-200 rounded-lg shadow-sm">
              <div className="text-blue-600 font-bold text-xl mb-1">Access</div>
              <p className="text-xs text-slate-500 leading-snug">Request a copy of all shared resumes & data.</p>
            </div>
            <div className="p-4 bg-white border border-slate-200 rounded-lg shadow-sm">
              <div className="text-blue-600 font-bold text-xl mb-1">Correction</div>
              <p className="text-xs text-slate-500 leading-snug">Instantly update outdated job history or skills.</p>
            </div>
            <div className="p-4 bg-white border border-slate-200 rounded-lg shadow-sm">
              <div className="text-blue-600 font-bold text-xl mb-1">Erasure</div>
              <p className="text-xs text-slate-500 leading-snug">Request complete deletion of your profile.</p>
            </div>
            <div className="p-4 bg-white border border-slate-200 rounded-lg shadow-sm">
              <div className="text-blue-600 font-bold text-xl mb-1">Withdrawal</div>
              <p className="text-xs text-slate-500 leading-snug">Revoke recruiter access to your data at any time.</p>
            </div>
          </div>
          <p className="mt-4 text-xs text-slate-400 italic text-center underline">
            All requests are processed within a maximum of 90 days.
          </p>
        </section>

        {/* Security & Deletion */}
        <section className="grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Data Retention</h2>
            <p className="text-sm text-slate-700">
              We do not store resumes indefinitely. Candidate profiles inactive for <strong>3 consecutive years</strong> are automatically deleted. Before deletion, we provide a 48-hour notification allowing you to reactivate your account or download your data.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Security Measures</h2>
            <p className="text-sm text-slate-700">
              JobNest implements industry-standard encryption (AES-256) for resumes at rest. We utilize role-based access controls (RBAC) to ensure only authorized recruiters for specific roles can view your personal information.
            </p>
          </div>
        </section>

        {/* Support Link */}
        <footer className="mt-16 pt-8 border-t border-slate-200 flex flex-col items-center">
          <p className="text-slate-600 mb-4 font-medium">Questions about your data at JobNest?</p>
          <a 
            href="mailto:dpo@jobnest.com" 
            className="px-8 py-3 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-colors shadow-lg"
          >
            Contact Data Protection Officer
          </a>
          <p className="mt-6 text-[10px] text-slate-400 text-center max-w-lg uppercase tracking-widest leading-normal">
            This policy applies to both JobNest Web and Mobile applications. JobNest is a registered Data Fiduciary under the DPDP Act 2023.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
