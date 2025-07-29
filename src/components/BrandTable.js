import React from 'react';

export default function BrandTable({ brandRows, brands, onBrandRowChange, addBrandRow }) {
  return (
    <div>
      <table className="brand-table">
        <thead>
          <tr>
            <th>Brand</th>
            <th>No. of Units</th>
          </tr>
        </thead>
        <tbody>
          {brandRows.map((row, idx) => (
            <tr key={idx}>
              <td>
                <select 
                  value={row.brand} 
                  onChange={e => onBrandRowChange(idx, 'brand', e.target.value)} 
                  required={idx === 0}
                >
                  <option value="">Select brand</option>
                  {brands.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
              </td>
              <td>
                <input 
                  type="number" 
                  min="0" 
                  value={row.units} 
                  onChange={e => onBrandRowChange(idx, 'units', e.target.value)} 
                  required={idx === 0}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button type="button" onClick={addBrandRow}>Add Brand</button>
    </div>
  );
}
