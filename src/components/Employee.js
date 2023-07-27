import React, { useEffect, useState } from 'react';
import './Employee.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './Navbar2';

const AssetList = () => {
  
  const email = localStorage.getItem('EMAIL');
  const [assets, setAssets] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/Employee')
      .then((response) => response.json())
      .then((data) => {
        setAssets(data);
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  }, []);

  const handleConfirmationUpdate = (_id, confirmation) => {
    console.log('Confirmation clicked for asset with ID:', _id);
    console.log('Confirmation:', confirmation);

    fetch(`http://localhost:5000/Employee/${_id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        confirmation: confirmation,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Confirmation status updated:', data);
        const updatedAssets = assets.map((item) => {
          if (item._id === _id) {
            return { ...item, confirmation: confirmation };
          }
          return item;
        });
        setAssets(updatedAssets);
      })
      .catch((error) => {
        console.log('Error updating confirmation status:', error);
      });
  };

  return (
    <Router>
      <header>
        <Navbar />
      </header>
    <div>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Asset Class</th>
            <th>Asset Model Number</th>
            <th>Asset Manufacture Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((asset) => (
            // Check if the email field matches localStorage.email
            asset.email === email && (
              <tr key={asset._id}>
                <td>{asset.email}</td>
                <td>{asset.assetClass}</td>
                <td>{asset.modelNumber}</td>
                <td>{asset.manufactureDate}</td>
                <td>
                  {(asset.confirmation !== 'Yes' && asset.confirmation !== 'No') && (
                    <>
                      <button onClick={() => handleConfirmationUpdate(asset._id, 'Yes')}>
                        Yes
                      </button>
                      <button onClick={() => handleConfirmationUpdate(asset._id, 'No')}>
                        No
                      </button>
                    </>
                  )}
                </td>
              </tr>
            )
          ))}
        </tbody>

      </table>
    </div>
    </Router>
  );
};

export default AssetList;
