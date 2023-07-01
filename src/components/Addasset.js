import React, { useState, useEffect } from 'react';
import './Addasset.css';

const Addasset = () => {
    
    const [asset, setAsset] = useState({
        assetClass: '',
        modelNumber: '',
        manufactureDate: '',
        email: '',
        confirmation: ''
    });
    
    const handleInputs = (e) => {
        const { id, value } = e.target;
        setAsset({ ...asset, [id]: value });
    };

    const PostData = async (e) => {
        e.preventDefault();
        const { assetClass, modelNumber, manufactureDate, email } = asset;
        if (!assetClass || !modelNumber || !manufactureDate || !email) {
            alert('Please fill all the fields');
            return;
        }
        try {
            const response = await fetch('/Administrator', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    assetClass,
                    modelNumber,
                    manufactureDate,
                    email
                })
            });

            const res = await response.json();

            if (res.status === 422) {
                window.alert('Invalid Entry');
                console.log('Invalid Entry');
            } else {
                window.alert('Successfully Entered ');
                console.log('Successfully Entered ');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (


        <div className="">
            <div className="card">
                <h2>Add Asset</h2>
                <form className="" onSubmit={PostData}>
                    <div className="form-group">
                        <input
                            placeholder='Asset Class'
                            type="text"
                            className="form-control"
                            id="assetClass"
                            value={asset.assetClass}
                            onChange={handleInputs}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            placeholder='Model Number'
                            type="text"
                            className="form-control"
                            id="modelNumber"
                            value={asset.modelNumber}
                            onChange={handleInputs}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            placeholder='Date of Manufacture'
                            type="date"
                            className="form-control"
                            id="manufactureDate"
                            value={asset.manufactureDate}
                            onChange={handleInputs}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            placeholder='Assigned to Email'
                            type="email"
                            className="form-control"
                            id="email"
                            value={asset.email}
                            onChange={handleInputs}
                        />
                    </div>
                    <button className="btn" type="submit" >
                        <span class="circle1"></span>
                        <span class="circle2"></span>
                        <span class="circle3"></span>
                        <span class="circle4"></span>
                        <span class="circle5"></span>
                        <span class="text">Submit</span>
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Addasset