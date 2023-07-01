import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './Administrator.css';
import { useHistory } from 'react-router-dom';

function AdministratorPage() {

  const history = useHistory();

  const handleAddAsset = () => {
    history.push('/Addasset');
  };

  const handleEmployeeManagement = () => {
    history.push('/EmployeeManagement');
  };

  // Dummy data
  const totalAssets = 100;
  const assetsLeft = 50;
  const assetsAllocated = totalAssets - assetsLeft;

  return (
    <>
      <div className="sidebar">
        <button class="btn2" onClick={handleAddAsset}> Add Asset
        </button>
        <button class="btn2" onClick={handleEmployeeManagement}>
          <span>Employee Management</span>

        </button>
      </div>
      <div>
        <div class="cookie-card">
          <div class="title">Total Assets</div>
          <p class="description">{totalAssets} </p>
        </div>
        <div class="cookie-card">
          <div class="title">Total Assets Allocated</div>
          <p class="description">{assetsAllocated} </p>
        </div>
        <div class="cookie-card">
          <div class="title">Total Assets in Invertory</div>
          <p class="description">{assetsLeft} </p>
        </div>
      </div>
    </>
  );
}

export default AdministratorPage;
