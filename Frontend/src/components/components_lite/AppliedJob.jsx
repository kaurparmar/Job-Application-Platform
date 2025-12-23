import React from 'react'
import Badge from '../ui/Badge'
function AppliedJob() {
  return (
    <div className="w-full ">
      {/* Table Wrapper for Horizontal Scroll/Overflow */}
      <div className="relative w-full overflow-auto border rounded-md mx-auto">
        <table className="w-full caption-bottom text-sm">
          
          <caption className="mt-4 text-sm text-slate-500 italic">
            Recent Applied Jobs
          </caption>

          <thead className="[&_tr]:border-b bg-slate-50/50">
            <tr className="border-b transition-colors">
              <th className="h-12 px-4 text-left align-middle font-medium text-slate-500">Date</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-slate-500">Job Title</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-slate-500">Company</th>
              <th className="h-12 px-4 text-right align-middle font-medium text-slate-500">Status</th>
            </tr>
          </thead>

          <tbody className="[&_tr:last-child]:border-0">
            {
              [1, 2, 3, 4, 5].map((item, index) => (
                <tr key={index} className="border-b transition-colors hover:bg-slate-50/50">
                  <td className="p-4 align-middle">23-12-2024</td>
                  <td className="p-4 align-middle">Software Engineer</td>
                  <td className="p-4 align-middle">Microsoft</td>
                  <td className="p-4 align-middle text-right">
                    <Badge>Selected</Badge>{" "}
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AppliedJob
