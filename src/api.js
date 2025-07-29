// Replace API_URL with your Apps Script Web App endpoint
const API_URL = "YOUR_APPS_SCRIPT_WEB_APP_URL";

// Fetch metadata (reps, brands)
export async function fetchMetaData() {
  const res = await fetch(`${API_URL}?action=getMetaData`);
  return res.json();
}

// Fetch customers for a sales rep
export async function fetchCustomersByRep(rep) {
  const res = await fetch(`${API_URL}?action=getCustomersByRep&rep=${encodeURIComponent(rep)}`);
  return res.json();
}

// Fetch last visit date for a customer
export async function fetchCustomerLastVisit(customer) {
  const res = await fetch(`${API_URL}?action=getCustomerLastVisit&customer=${encodeURIComponent(customer)}`);
  return res.json();
}

// Submit a visit
export async function submitVisit(data) {
  const res = await fetch(`${API_URL}?action=recordVisit`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" }
  });
  return res.json();
}
