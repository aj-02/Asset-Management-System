import React, { useState, useEffect } from 'react';

const EmployeeManagement = () => {
  
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/Employe')
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  }, []);

  const handleConfirmationUpdate = (_id, confirmation) => {
    console.log('Confirmation clicked for asset with ID:', _id);
    console.log('Confirmation:', confirmation);




    fetch(`http://localhost:5000/Employe/${_id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        confirmation: confirmation
      })
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Confirmation status updated:', data);
        const updatedUser = users.map((item) => {
          if (item._id === _id) {
            return { ...item, confirmation: confirmation };
          }
          return item;
        });
        setUsers(updatedUser);
      })
      .catch((error) => {
        console.log('Error updating confirmation status:', error);
      });
  };

    return (
        
        
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Employee Name</th>
                        <th>Employee Email</th>
                        <th>Employee Mobile Number</th>                        
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.mobile}</td>
                            <td>{user.work}</td>
                            <td>
                                {user.confirmation !== 'Yes' && (
                                    <>
                                        <button onClick={() => handleConfirmationUpdate(user._id, 'Yes')}>Yes</button>
                                        <button onClick={() => handleConfirmationUpdate(user._id, 'No')}>No</button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default EmployeeManagement