// import React, { useState, useEffect } from 'react';
// import { useTranslation } from 'react-i18next';
// import axios from 'axios';
// import CustomCheckbox from '../../Shared/MiniComponents/CustomCheckbox/CustomCheckbox';
// import BillingInputs from './BillingInputs';
// import s from './BillingDetails.module.scss';

// const BillingDetails = ({ billingValues, setBillingValues, submitted }) => {
//   const { t } = useTranslation();
//   const [editable, setEditable] = useState(false); // Initialize editable state

  // useEffect(() => {
  //   const fetchBillingInfo = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:8000/api/user/save-billing");
  //       setBillingValues(response.data); // Update billingValues state with fetched data
  //       setEditable(true); // Enable editing if data is fetched successfully
  //     } catch (error) {
  //       console.error("Error fetching billing information:", error);
  //       // Handle error fetching data
  //     }
  //   };

  //   fetchBillingInfo();
  // }, [setBillingValues]);

//   const handleCheckboxChange = (e) => {
//     const { checked } = e.target;
//     setBillingValues((prevValues) => ({
//       ...prevValues,
//       saveInfo: checked,
//     }));
//   };

//   return (
//     <section className={s.billingDetailsSection}>
//       <h2>{t('billingDetails')}</h2>

//       {/* Pass editable state to BillingInputs */}
//       {/* <BillingInputs
//         billingValues={billingValues}
//         setBillingValues={setBillingValues}
//         editable={editable}
//         submitted={submitted} // Pass submitted state to BillingInputs
//       />

//       <CustomCheckbox
//         inputData={{
//           label: t('saveInfo'),
//           name: 'saveInfo',
//           value: billingValues.saveInfo,
//           onChange: handleCheckboxChange,
//           id: 'save-info',
//         }} */}
//       />
//     </section>
//   );
// };

// export default BillingDetails;



// import React, { useState, useCallback } from 'react';
// import axios from 'axios';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useSelector } from 'react-redux';
// import { selectUserId } from 'src/Features/userSlice';
// import s from './BillingDetails.module.scss';

// const BillingDetails = () => {
//   const userId = useSelector(selectUserId);
//   console.log("User ID is", userId);

//   const [formValues, setFormValues] = useState({
//     firstName: '',
//     streetAddress: '',
//     townCity: '',
//     apartment: '',
//     pincode: '',
//     mobileNumber: '',
//   });

//   const [addressList, setAddressList] = useState([]);
//   const [showAddressFields, setShowAddressFields] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editingIndex, setEditingIndex] = useState(null);

//   const handleInputChange = useCallback((e) => {
//     const { name, value } = e.target;
//     setFormValues(prev => ({ ...prev, [name]: value }));
//   }, []);

//   const handleProceedPayment = useCallback(async () => {
//     const { streetAddress, pincode } = formValues;
//     if (streetAddress && pincode) {
//       await saveBillingInfo();
//     } else {
//       toast.error('Please fill out all required fields.');
//     }
//   }, [formValues]);

//   const saveBillingInfo = useCallback(async () => {
//     if (!userId) {
//       toast.error('User ID is not defined.');
//       return;
//     }

//     try {
//       const response = await axios.post('http://localhost:8000/api/user/save-billing', {
//         ...formValues,
//         userId,
//         addressList
//       });
//       toast.success('Billing information saved successfully!');
//     } catch (error) {
//       console.error('Error saving billing information:', error.response ? error.response.data : error.message);
//       toast.error('Failed to save billing information.');
//     }
//   }, [formValues, userId, addressList]);

//   const handleSaveAddress = useCallback(async () => {
//     const { firstName, streetAddress, townCity, apartment, pincode, mobileNumber } = formValues;
//     if (!firstName || !streetAddress || !townCity || !pincode || !mobileNumber) {
//       toast.error('Please fill out all fields.');
//       return;
//     }

//     const fullAddress = `
//       ${firstName}
//       ${streetAddress}, ${townCity}
//       ${apartment ? `${apartment}, ` : ''}
//       ${pincode}
//       ${mobileNumber}
//     `.trim();

//     const updatedAddressList = [...addressList];

//     if (isEditing) {
//       updatedAddressList[editingIndex] = { address: fullAddress, pincode };
//     } else {
//       updatedAddressList.push({ address: fullAddress, pincode });
//     }

//     setAddressList(updatedAddressList);

//     try {
//       await axios.post('http://localhost:8000/api/user/save-billing', {
//         ...formValues,
//         userId,
//         addressList: updatedAddressList
//       });
//       toast.success(isEditing ? 'Address updated successfully!' : 'Address saved successfully!');
//     } catch (error) {
//       toast.error('Failed to save address.');
//     }

//     setFormValues({
//       firstName: '',
//       streetAddress: '',
//       townCity: '',
//       apartment: '',
//       pincode: '',
//       mobileNumber: '',
//     });
//     setIsEditing(false);
//     setEditingIndex(null);
//     setShowAddressFields(false);
//   }, [formValues, addressList, isEditing, editingIndex, userId]);

//   const handleCancelEdit = useCallback(() => {
//     setFormValues({
//       firstName: '',
//       streetAddress: '',
//       townCity: '',
//       apartment: '',
//       pincode: '',
//       mobileNumber: '',
//     });
//     setIsEditing(false);
//     setEditingIndex(null);
//     setShowAddressFields(false);
//   }, []);

//   const startEditing = useCallback((index) => {
//     const addressToEdit = addressList[index];
//     const [firstName, streetAddress, townCity, apartment, pincode, mobileNumber] = addressToEdit.address.split('\n').map(line => line.trim());

//     setFormValues({
//       firstName,
//       streetAddress,
//       townCity,
//       apartment: apartment ? apartment.replace(',', '').trim() : '',
//       pincode,
//       mobileNumber,
//     });
//     setEditingIndex(index);
//     setIsEditing(true);
//     setShowAddressFields(true);
//   }, [addressList]);

//   const handleAddressSelect = useCallback((address) => {
//     toast.info(`Selected address: ${address.address}`);
//   }, []);

//   const handleRemoveAddress = useCallback(async (index) => {
//     const updatedAddressList = addressList.filter((_, i) => i !== index);
//     setAddressList(updatedAddressList);

//     try {
//       await axios.post('http://localhost:8000/api/user/save-billing', {
//         ...formValues,
//         userId,
//         addressList: updatedAddressList
//       });
//       toast.success('Address removed successfully!');
//     } catch (error) {
//       toast.error('Failed to remove address.');
//     }
//   }, [addressList, formValues, userId]);

//   return (
//     <div className={s.BillingDetails}>
//       <ToastContainer />
//       <div className={s.detailsCard}>
//         {showAddressFields && (
//           <>
//             <h3>{isEditing ? 'Edit Address' : 'Add Address'}</h3>
//             <div className={s.detailsCard}>
//               <div className={s.firstLastName}>
//                 <input
//                   type="text"
//                   name="firstName"
//                   className={s.inputField}
//                   value={formValues.firstName || ''}
//                   onChange={handleInputChange}
//                   placeholder="First Name"
//                 />
//               </div>
//               <div className={s.firstLastName}>
//                 <input
//                   type="text"
//                   name="streetAddress"
//                   className={s.inputField}
//                   value={formValues.streetAddress || ''}
//                   onChange={handleInputChange}
//                   placeholder="Street Address"
//                 />
//                 <input
//                   type="text"
//                   name="townCity"
//                   className={s.inputField}
//                   value={formValues.townCity || ''}
//                   onChange={handleInputChange}
//                   placeholder="Town/City"
//                 />
//               </div>
//               <div className={s.firstLastName}>
//                 <input
//                   type="text"
//                   name="apartment"
//                   className={s.inputField}
//                   value={formValues.apartment || ''}
//                   onChange={handleInputChange}
//                   placeholder="Apartment"
//                 />
//                 <input
//                   type="text"
//                   name="pincode"
//                   className={s.inputField}
//                   value={formValues.pincode || ''}
//                   onChange={handleInputChange}
//                   placeholder="Pincode"
//                 />
//               </div>
//               <input
//                 type="text"
//                 name="mobileNumber"
//                 className={s.inputField}
//                 value={formValues.mobileNumber || ''}
//                 onChange={handleInputChange}
//                 placeholder="Mobile Number"
//               />
//               <div className={s.actionButtons}>
//                 <button
//                   type="button"
//                   className={s.saveButton}
//                   onClick={handleSaveAddress}
//                 >
//                   {isEditing ? 'Update Address' : 'Save Address'}
//                 </button>
//                 {/* Uncomment if cancel functionality is needed
//                 <button
//                   type="button"
//                   className={s.cancelButton}
//                   onClick={handleCancelEdit}
//                 >
//                   Cancel
//                 </button> */}
//               </div>
//             </div>
//           </>
//         )}

//         <div className={s.shippingCard}>
//           <div
//             className={s.addAddressPrompt}
//             onClick={() => setShowAddressFields(prev => !prev)}
//           >
//             <p>{showAddressFields ? 'Close Address' : 'Add Address +'}</p>
//           </div>

//           {!showAddressFields && (
//             <div className={s.addSavedCard}>
//               {addressList.length > 0 ? (
//                 <div className={s.addressOptions}>
//                   {addressList.map((address, index) => (
//                     <div key={index} className={s.addressOption}>
//                       <input
//                         type="radio"
//                         id={`address-${index}`}
//                         name="savedAddress"
//                         value={address.address}
//                         onChange={() => handleAddressSelect(address)}
//                         aria-label={`Select address ${index + 1}`}
//                       />
//                       <label className={s.address} htmlFor={`address-${index}`}>
//                         {address.address.split('\n').map((line, i) => (
//                           <React.Fragment key={i}>
//                             {line}<br />
//                           </React.Fragment>
//                         ))}
//                         <span className={s.pincode}>{address.pincode}</span>
//                         <button
//                           type="button"
//                           className={s.editButton}
//                           onClick={() => startEditing(index)}
//                         >
//                           Edit
//                         </button>
//                         <button
//                           type="button"
//                           className={s.removeButton}
//                           onClick={() => handleRemoveAddress(index)}
//                         >
//                           Remove
//                         </button>
//                       </label>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <p>No saved addresses. Please add a new address.</p>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BillingDetails;





import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import { selectUserId } from 'src/Features/userSlice';
import { useNavigate } from 'react-router-dom';
import s from './BillingDetails.module.scss';
import { selectCartProducts } from 'src/Features/productsSlice'; // Adjust import as per your slice
import Modal from './Modal';
import InvoiceModal from './InvoiceModal';

const BillingDetails = ({ totalAmount }) => {
  const userId = useSelector(selectUserId);
  const navigate = useNavigate();
  const cartProducts = useSelector(selectCartProducts);

  // console.log('BillingDetails totalAmount:', totalAmount); // Debugging log
  const [formValues, setFormValues] = useState({
    firstName: '',
    streetAddress: '',
    townCity: '',
    apartment: '',
    pincode: '',
    mobileNumber: '',
  });

  const [addressList, setAddressList] = useState([]);
  const [showAddressFields, setShowAddressFields] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(null);
  const [error, setError] = useState('');
  const [invoiceDetails, setInvoiceDetails] = useState({});
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    const fetchAddresses = async () => {
      if (!userId) return;
      try {
        const response = await axios.get(`http://localhost:8000/api/user/get-addresses/${userId}`);
        setAddressList(response.data.addresses || []);
      } catch (error) {
        console.error('Error fetching addresses:', error);
        toast.error('Failed to fetch addresses.');
      }
    };
    fetchAddresses();
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const { firstName, streetAddress, townCity, pincode, mobileNumber } = formValues;
    return firstName && streetAddress && townCity && pincode && mobileNumber;
  };

  const saveBillingInfo = async () => {
    if (!userId) {
      toast.error('User ID is not defined.');
      return;
    }

    try {
      await axios.post('http://localhost:8000/api/user/save-billing', {
        ...formValues,
        userId,
        addressIndex: isEditing ? editingIndex : undefined
      });
      toast.success('Billing information saved successfully!');
    } catch (error) {
      console.error('Error saving billing information:', error);
      toast.error('Failed to save billing information.');
    }
  };

  const generateInvoice = async () => {
    // Check if userId is available
    if (!userId) {
      toast.error('User ID is not defined.');
      return;
    }
  
    // Validate form values
    if (!validateForm()) {
      toast.error('Billing information is incomplete.');
      return;
    }
  
    // Log data for debugging
    console.log('Form Values:', formValues);
    console.log('User ID:', userId);
    console.log('Cart Products:', cartProducts);
    console.log('Total Amount:', totalAmount);
  
    // Filter out invalid cart products
    const filteredCartProducts = cartProducts.filter(product => 
      product.id && product.name && product.price
    );
  
    try {
      // Make API request to generate invoice
      const response = await axios.post('http://localhost:8000/api/invoice/generate', {
        billingInfo: formValues,
        userId,
        cartProducts: filteredCartProducts,
        totalAmount
      });
  
      // Check for successful response
      if (response.status === 200) {
        setInvoiceDetails(response.data); // Set invoice details from response
        setShowModal(true); // Show the modal with invoice details
        toast.success(`Invoice generated successfully! Invoice ID: ${response.data.invoiceId}`);
      } else {
        // Handle unexpected response status
        throw new Error(`Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      // Log the error and show an error message
      console.error('Error generating invoice:', error);
      toast.error(`Failed to generate invoice. ${error.response?.data?.message || error.message}`);
    }
  };
  
  
  
  
  const handleProceedPayment = async () => {
    const { streetAddress, pincode } = formValues;
  
    if (selectedAddressIndex !== null || (streetAddress && pincode)) {
      setError('');
      try {
        await saveBillingInfo();
  
        // Use a callback function to handle navigation
        await generateInvoice(() => {
          // Check if invoiceDetails are set and then navigate
          if (invoiceDetails && invoiceDetails.invoiceId) {
            navigate('/payment-section', { 
              state: { 
                billingInfo: formValues, 
                invoiceDetails, 
                cartProducts, 
                totalAmount // Pass total amount to the next page
              } 
            });
          } else {
            toast.error('Invoice generation failed. Please try again.');
          }
        });
      } catch (error) {
        console.error('Error during payment processing:', error);
        toast.error('Failed to proceed to payment.');
      }
    } else {
      if (addressList.length === 0) {
        toast.error('No saved addresses available. Please add a new address.');
      } else {
        toast.error('Please select an address or complete the billing form.');
      }
    }
  };
  

  const handleSaveAddress = async () => {
    if (!validateForm()) {
      toast.error('Please fill out all fields.');
      return;
    }

    const updatedAddressList = [...addressList];
    if (isEditing) {
      updatedAddressList[editingIndex] = formValues;
    } else {
      updatedAddressList.push(formValues);
    }

    setAddressList(updatedAddressList);
    await saveBillingInfo();

    setFormValues({
      firstName: '',
      streetAddress: '',
      townCity: '',
      apartment: '',
      pincode: '',
      mobileNumber: '',
    });
    setIsEditing(false);
    setEditingIndex(null);
    setShowAddressFields(false);
  };

  const handleCancelEdit = () => {
    setFormValues({
      firstName: '',
      streetAddress: '',
      townCity: '',
      apartment: '',
      pincode: '',
      mobileNumber: '',
    });
    setIsEditing(false);
    setEditingIndex(null);
    setShowAddressFields(false);
  };

  const startEditing = (index) => {
    setFormValues(addressList[index]);
    setEditingIndex(index);
    setIsEditing(true);
    setShowAddressFields(true);
  };

  const handleRemoveAddress = async (index) => {
    if (index < 0 || index >= addressList.length) {
      toast.error('Invalid address index.');
      return;
    }

    const updatedAddressList = addressList.filter((_, i) => i !== index);
    setAddressList(updatedAddressList);

    try {
      await axios.post('http://localhost:8000/api/user/remove-billing-address', {
        userId,
        addressIndex: index
      });
      toast.success('Address removed successfully!');
    } catch (error) {
      toast.error('Failed to remove address.');
    }
  };

  const handleAddressSelect = (address, index) => {
    setSelectedAddressIndex(index);
    setFormValues(address);
    setError('');
  };

  const handleModalClose = () => {
    // Close the modal
    setShowModal(false);
  
    // Navigate after closing the modal
    if (invoiceDetails && invoiceDetails.invoiceId) {
      navigate('/payment-section', { 
        state: { 
          billingInfo: formValues, 
          invoiceDetails, 
          cartProducts, 
          totalAmount // Pass total amount to the next page
        } 
      });
    } else {
      toast.error('Invoice generation failed. Please try again.');
    }
  };

  return (
    <div className={s.BillingDetails}>
      <ToastContainer />
      <div className={s.detailsCard}>
        {error && <p className={s.errorMessage}>{error}</p>}
        {showAddressFields && (
          <>
            <h3>{isEditing ? 'Edit Address' : 'Add Address'}</h3>
            <div className={s.detailsCard}>
              <div className={s.firstLastName}>
                <input
                  type="text"
                  name="firstName"
                  className={s.inputField}
                  value={formValues.firstName}
                  onChange={handleInputChange}
                  placeholder="First Name"
                />
              </div>
              <div className={s.firstLastName}>
                <input
                  type="text"
                  name="streetAddress"
                  className={s.inputField}
                  value={formValues.streetAddress}
                  onChange={handleInputChange}
                  placeholder="Street Address"
                />
                <input
                  type="text"
                  name="townCity"
                  className={s.inputField}
                  value={formValues.townCity}
                  onChange={handleInputChange}
                  placeholder="Town/City"
                />
              </div>
              <div className={s.firstLastName}>
                <input
                  type="text"
                  name="apartment"
                  className={s.inputField}
                  value={formValues.apartment}
                  onChange={handleInputChange}
                  placeholder="Apartment"
                />
                <input
                  type="text"
                  name="pincode"
                  className={s.inputField}
                  value={formValues.pincode}
                  onChange={handleInputChange}
                  placeholder="Pincode"
                />
              </div>
              <input
                type="text"
                name="mobileNumber"
                className={s.inputField}
                value={formValues.mobileNumber}
                onChange={handleInputChange}
                placeholder="Mobile Number"
              />
              <div className={s.actionButtons}>
                <button
                  type="button"
                  className={s.saveButton}
                  onClick={handleSaveAddress}
                >
                  {isEditing ? 'Update Address' : 'Save Address'}
                </button>
                {isEditing && (
                  <button
                    type="button"
                    className={s.cancelButton}
                    onClick={handleCancelEdit}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </>
        )}

        <div className={s.shippingCard}>
          <div
            className={s.addAddressPrompt}
            onClick={() => setShowAddressFields(prev => !prev)}
          >
            <p>{showAddressFields ? 'Close Address' : 'Add Address +'}</p>
          </div>

          {!showAddressFields && (
            <div className={s.addSavedCard}>
              {addressList.length > 0 ? (
                <div className={s.addressOptions}>
                  {addressList.map((address, index) => (
                    <div key={index} className={s.addressOption}>
                      <input
                        type="radio"
                        id={`address-${index}`}
                        name="savedAddress"
                        value={address.streetAddress}
                        onChange={() => handleAddressSelect(address, index)}
                        aria-label={`Select address ${index + 1}`}
                      />
                      <label className={s.address} htmlFor={`address-${index}`}>
                        {address.firstName}<br />
                        {address.streetAddress}, {address.townCity}<br />
                        {address.apartment ? `${address.apartment}, ` : ''}
                        {address.pincode}<br />
                        {address.mobileNumber}
                      </label>
                      <button
                        type="button"
                        className={s.editButton}
                        onClick={() => startEditing(index)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className={s.removeButton}
                        onClick={() => handleRemoveAddress(index)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No addresses available. Please add a new address.</p>
              )}
            </div>
          )}

          <div className={s.proceedPayment}>
            <button
              type="button"
              className={s.proceedButton}
              onClick={handleProceedPayment}
            >
              Proceed to Payment
            </button>
          </div>
          <Modal isOpen={showModal} onRequestClose={handleModalClose}>
            <InvoiceModal invoiceDetails={invoiceDetails} />
          </Modal>
          
        </div>
      </div>
    </div>
  );
};

export default BillingDetails;
