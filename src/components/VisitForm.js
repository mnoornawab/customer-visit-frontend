import React, { useState, useEffect } from 'react';
import { 
  fetchMetaData, 
  fetchCustomersByRep, 
  fetchCustomerLastVisit, 
  submitVisit 
} from '../api';
import BrandTable from './BrandTable';
import CustomerSelector from './CustomerSelector';

export default function VisitForm() {
  const [reps, setReps] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedRep, setSelectedRep] = useState('');
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [visitDate, setVisitDate] = useState(new Date().toISOString().substr(0, 10));
  const [brandRows, setBrandRows] = useState([{ brand: '', units: '' }]);
  const [lastVisit, setLastVisit] = useState('');
  const [notes, setNotes] = useState('');
  const [followUp, setFollowUp] = useState(false);
  const [isNewCustomer, setIsNewCustomer] = useState(false);
  const [newCustomerName, setNewCustomerName] = useState('');

  useEffect(() => {
    fetchMetaData().then(data => {
      setReps(data.reps);
      setBrands(data.brands);
    });
  }, []);

  useEffect(() => {
    if (selectedRep) {
      fetchCustomersByRep(selectedRep).then(data => setCustomers(data.customers));
    }
  }, [selectedRep]);

  useEffect(() => {
    if (selectedCustomer && !isNewCustomer) {
      fetchCustomerLastVisit(selectedCustomer).then(data => setLastVisit(data.lastVisit));
    } else {
      setLastVisit('');
    }
  }, [selectedCustomer, isNewCustomer]);

  const handleBrandRowChange = (idx, field, value) => {
    const rows = [...brandRows];
    rows[idx][field] = value;
    setBrandRows(rows);
  };

  const addBrandRow = () => setBrandRows([...brandRows, { brand: '', units: '' }]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const visitData = {
      rep: selectedRep,
      customer: isNewCustomer ? newCustomerName : selectedCustomer,
      date: visitDate,
      brands: brandRows.filter(row => row.brand),
      notes,
      followUp,
      isNewCustomer
    };
    await submitVisit(visitData);
    alert('Visit recorded!');
    // Reset form
    setSelectedRep('');
    setSelectedCustomer('');
    setVisitDate(new Date().toISOString().substr(0, 10));
    setBrandRows([{ brand: '', units: '' }]);
    setNotes('');
    setFollowUp(false);
    setIsNewCustomer(false);
    setNewCustomerName('');
  };

  return (
    <form className="visit-form" onSubmit={handleSubmit}>
      <label>
        Sales Rep:
        <select value={selectedRep} onChange={e => setSelectedRep(e.target.value)} required>
          <option value="">Select rep</option>
          {reps.map(rep => <option key={rep} value={rep}>{rep}</option>)}
        </select>
      </label>

      <label>
        <input type="checkbox" checked={isNewCustomer} onChange={e => setIsNewCustomer(e.target.checked)} />
        New Customer
      </label>

      {isNewCustomer ? (
        <label>
          Customer Name:
          <input value={newCustomerName} onChange={e => setNewCustomerName(e.target.value)} required />
        </label>
      ) : (
        <CustomerSelector 
          customers={customers} 
          selectedCustomer={selectedCustomer} 
          onChange={setSelectedCustomer} 
        />
      )}

      {lastVisit && !isNewCustomer && (
        <div className="last-visit">
          Last Visit: <strong>{lastVisit}</strong>
        </div>
      )}

      <label>
        Date of Visit:
        <input type="date" value={visitDate} onChange={e => setVisitDate(e.target.value)} required />
      </label>

      <BrandTable 
        brandRows={brandRows} 
        brands={brands} 
        onBrandRowChange={handleBrandRowChange} 
        addBrandRow={addBrandRow} 
      />

      <label>
        Notes:
        <textarea value={notes} onChange={e => setNotes(e.target.value)} />
      </label>

      <label>
        Follow-up Required:
        <input type="checkbox" checked={followUp} onChange={e => setFollowUp(e.target.checked)} />
      </label>

      <button type="submit">Record Visit</button>
    </form>
  );
}
