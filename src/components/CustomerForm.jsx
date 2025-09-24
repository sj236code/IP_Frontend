import { useEffect, useState } from "react";
import axios from "axios";

function CustomerForm({show, onClose, onSubmit, initialData = null}){

    const[newCustomer, setNewCustomer] = useState({
        first_name : '',
        last_name : '',
        email: '',
        address: '',
        address2: '',
        district : '',
        postal_code : '',
        phone : '',
    })

    useEffect(() => {
        if (initialData) {
            setNewCustomer({
                first_name: initialData.first_name || '',
                last_name: initialData.last_name || '',
                email: initialData.email || '',
                address: initialData.address || '',
                address2: initialData.address2 || '',
                district: initialData.district || '',
                postal_code: initialData.postal_code || '',
                phone: initialData.phone || '',
            });
        }
        else{
            setNewCustomer({
                first_name : '',
                last_name : '',
                email: '',
                address: '',
                address2: '',
                district : '',
                postal_code : '',
                phone : '',
            })
        }
    }, [initialData, show])

    // pass event obj
    const handleDataEdit = (e) => {
        const {name, value} = e.target;
        setNewCustomer(prev => ({
            ...prev, [name]: value
        }));
    };

    const submitForm = (e) => {
        e.preventDefault();
        console.log("form submitted with data: ", newCustomer)
        onSubmit(newCustomer);
    };

    if(!show){
        return null;
    }

    return (
        <div className="modal show d-block" style = {{backgroundColor: 'rgba(0,0,0,0.5)'}}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">
                            {initialData ? 'Edit Customer' : 'Add New Customer'}
                        </h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={submitForm}>
                            {/* Each Field Sep by Div */}
                            <div className="mb-3">
                                <label className="form-label">First Name</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    name="first_name" 
                                    value={newCustomer.first_name}
                                    onChange={handleDataEdit}
                                    required 
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Last Name</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    name="last_name" 
                                    value={newCustomer.last_name }
                                    onChange={handleDataEdit}
                                    required 
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input 
                                    type="email" 
                                    className="form-control" 
                                    name="email" 
                                    value={newCustomer.email}
                                    onChange={handleDataEdit} 
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Address</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    name="address" 
                                    value={newCustomer.address}
                                    onChange={handleDataEdit}
                                    required 
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Address 2</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    name="address2" 
                                    value={newCustomer.address2 || ''}
                                    onChange={handleDataEdit}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">District</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    name="district" 
                                    value={newCustomer.district}
                                    onChange={handleDataEdit}
                                    required 
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Postal Code</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    name="postal_code" 
                                    value={newCustomer.postal_code}
                                    onChange={handleDataEdit} 
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Phone Number</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    name="phone"
                                    value={newCustomer.phone}
                                    onChange={handleDataEdit}
                                />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
                                <button type="submit" className="btn btn-success">
                                    {(initialData ? 'Update Customer' : 'Add Customer')}

                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default CustomerForm;