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
import { useSelector, useDispatch } from 'react-redux'; 
import { selectUserId } from 'src/Features/userSlice';
import { useNavigate } from 'react-router-dom';
import s from './BillingDetails.module.scss';
import { selectCartProducts, clearCart } from 'src/Features/productsSlice'; // Adjust import as per your slice
import Modal from './Modal';
import InvoiceModal from './InvoiceModal';

const BillingDetails = ({ totalAmount }) => {
  const dispatch = useDispatch();
  const userId = useSelector(selectUserId);
  const navigate = useNavigate();
  const cartProducts = useSelector(selectCartProducts);

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
      toast.error('Failed to save billing information. Please try again.');
    }
  };

  const generateInvoice = async () => {
    if (!userId || !validateForm()) return { success: false };
  
    const filteredCartProducts = cartProducts.filter(product =>
      product.id && product.name && product.price
    );
  
    try {
      const { data, status } = await axios.post('http://localhost:8000/api/invoice/generate', {
        billingInfo: formValues,
        userId,
        cartProducts: filteredCartProducts,
        totalAmount
      });
  
      if (status === 200 && data.invoiceId) {
        setInvoiceDetails(data);
        setShowModal(true);
        toast.success(`Invoice generated successfully! Invoice ID: ${data.invoiceId}`);
        return { success: true, invoiceId: data.invoiceId };
      } else {
        toast.error('Failed to generate invoice.');
        return { success: false };
      }
    } catch (err) {
      console.error('Error generating invoice:', err); // Log detailed error information
      toast.error(`Failed to generate invoice. ${err.response?.data?.message || 'An unexpected error occurred. Please try again later.'}`);
      return { success: false };
    }
  };
  
  const handleProceedPayment = async () => {
    const { streetAddress, pincode } = formValues;
  
    if (selectedAddressIndex !== null || (streetAddress && pincode)) {
      setError('');
      try {
        await saveBillingInfo();
        const { success, invoiceId } = await generateInvoice();
  
        if (success) {
          // Filter out empty objects from cartProducts
          const modifiedCartProducts = cartProducts
            .filter(product => product.id) // Ensure product has an ID
            .map(product => ({
              id: product.id,
              img: product.img,
              description: product.description,
              price: product.price,
              category: product.category,
              name: product.name,
              shortName: product.shortName,
              discount: product.discount,
              quantity: product.quantity
            }));
  
          console.log('Request Payload:', {
            userId,
            cartProducts: modifiedCartProducts,
            totalAmount,
            invoiceId,
            billingInfo: formValues
          });
  
          const response = await axios.post('http://localhost:8000/api/orders/save', {
            userId,
            cartProducts: modifiedCartProducts,
            totalAmount,
            invoiceId,
            billingInfo: formValues
          });
  
          if (response.status === 200) {
            handlePaymentSuccess();
            navigate('/ordersuccess', {
              state: {
                billingInfo: formValues,
                invoiceDetails: { invoiceId },
                cartProducts: modifiedCartProducts,
                totalAmount,
                invoiceId
              }
            });
          } else {
            toast.error('Failed to save order. Please try again.');
          }
        } else {
          toast.error('Invoice generation failed. Please try again.');
        }
      } catch (err) {
        console.error('Error proceeding to payment:', err);
        toast.error('Failed to proceed to payment.');
      }
    } else {
      toast.error(addressList.length === 0
        ? 'No saved addresses available. Please add a new address.'
        : 'Please select an address or complete the billing form.');
    }
  };
  
  
  
  
  
  const handlePaymentSuccess = async () => {
    try {
      // Clear the cart in the frontend
      dispatch(clearCart());
  
      // Clear the cart in the backend
      if (userId) {
        const response = await axios.post('http://localhost:8000/api/cart/clear', { userId });
        if (response.status === 200) {
          toast.success('Cart cleared successfully!');
          // Also clear the cart in local storage
          localStorage.removeItem('cartProducts');
        } else {
          toast.error('Failed to clear cart in the backend.');
        }
      } else {
        toast.error('Failed to clear cart in the backend. User ID is not defined.');
      }
    } catch (error) {
      console.error('Error clearing cart in backend:', error);
      toast.error('Failed to clear cart in the backend. Please try again.');
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
      navigate('/ordersuccess', { 
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
