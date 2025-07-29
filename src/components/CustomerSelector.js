import React from 'react';

export default function CustomerSelector({ customers, selectedCustomer, onChange }) {
  return (
    <label>
      Customer:
      <select value={selectedCustomer} onChange={e => onChange(e.target.value)} required>
        <option value="">Select customer</option>
        {customers.map(c => <option key={c} value={c}>{c}</option>)}
      </select>
    </label>
  );
}
