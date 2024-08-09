import React, { useState } from 'react';
import s from './addproduct.module.scss';
import axios from 'axios';
import { API_BASE_URL } from 'src/api/index'; // Adjust the path as needed
import { categoriesData } from 'src/Data/staticData';

const AddProduct = () => {
  const [product, setProduct] = useState({
    shortName: '',
    name: '',
    category: '',
    price: 0,
    discount: 0,
    discountType: '',
    description: '',
    img: null,
    otherImages: [],
    colors: [],
    size: '',
    rate: 0,
    votes: 0,
    quantity: 0,
    sold: 0
  });

  const [otherImageFiles, setOtherImageFiles] = useState([]);
  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;

    if (name === 'img') {
      // Handle the main image file
      setProduct((prevProduct) => ({
        ...prevProduct,
        img: files[0] // Single file for main image
      }));
    } else if (name === 'otherImages') {
      // Handle additional image files
      const newFiles = Array.from(files);
      setImages((prevImages) => {
        const updatedImages = [...prevImages, ...newFiles];
        return updatedImages.slice(0, 4); // Limit to 4 images
      });
    }
  };

  const handleSizeChange = (size) => setProduct({ ...product, size });

  const removeImage = (index) => {
    setOtherImageFiles((prevFiles) =>
      prevFiles.filter((_, i) => i !== index)
    );
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleClick = (index) => {
    document.getElementById(`imageUploadInput-${index}`).click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('shortName', product.shortName);
    formData.append('name', product.name);
    formData.append('category', product.category);
    formData.append('price', product.price);
    formData.append('discount', product.discount);
    formData.append('description', product.description);
    formData.append('rate', product.rate);
    formData.append('votes', product.votes);
    formData.append('quantity', product.quantity);
    formData.append('sold', product.sold);
    formData.append('colors', JSON.stringify(product.colors));
    formData.append('size', product.size);

    // Append the main image
    if (product.img) {
      formData.append('img', product.img);
    }

    // Append additional images
    images.forEach((file) => {
      formData.append('otherImages', file);
    });

    try {
      await axios.post(`${API_BASE_URL}/api/add-product`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Product added successfully');
      // Reset form and state
      setProduct({
        shortName: '',
        name: '',
        category: '',
        price: 0,
        discount: 0,
        description: '',
        img: null,
        otherImages: [],
        colors: [],
        size: '',
        rate: 0,
        votes: 0,
        quantity: 0,
        sold: 0
      });
      setImages([]);
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Error adding product. Please try again.');
    }
  };

  return (
    <div className={s['add-product']}>
      <h1 className={s.head}>Add New Product</h1>

      <div className={s['product-details']}>
        <div className={s['general-info']}>
          <h2>General Information</h2>
          <input 
            type="text" 
            placeholder="Short Name"
            name="shortName"
            value={product.shortName}
            onChange={handleChange}
            required
          />
          <input 
            type="text" 
            placeholder="Product Name"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />
          <textarea 
            placeholder="Product Description..."
            name="description"
            value={product.description}
            onChange={handleChange}
            rows="4"
            required
          ></textarea>

          <div className={s.price}>
            <input 
              type="number" 
              placeholder="Price"
              name="price"
              value={product.price || ''}
              onChange={handleChange}
              required
            />
            <input 
              type="number" 
              placeholder="Discount"
              name="discount"
              value={product.discount || ''}
              onChange={handleChange}
            />
            <input 
              type="number" 
              placeholder="Quantity"
              name="quantity"
              value={product.quantity || ''}
              onChange={handleChange}
              required
            />
          </div>

          <div className={s.category}>
            <select
              name="category"
              value={product.category}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded"
              required
            >
              <option value="" disabled>Select a category</option>
              {categoriesData.map(category => (
                <option key={category.id} value={category.title}>
                  {category.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className={s['upload-img']}>
          <h2>Upload Images</h2>
          <div className={s['large-image-preview']}>
            {product.img && (
              <img src={URL.createObjectURL(product.img)} alt="Product" />
            )}
            {images.length > 0 && (
              <div className={s['additional-images']}>
                {images.map((image, index) => (
                  <img key={index} src={URL.createObjectURL(image)} alt={`Additional Preview ${index + 1}`} />
                ))}
              </div>
            )}
            {images.length === 0 && !product.img && <p>No Image Selected</p>}
          </div>
          <div className={s['small-image-previews']}>
            <div className={s['small-image-box']}>
              <input 
                type="file" 
                id="imageUploadInput-0" 
                onChange={handleFileChange} 
                name="img" 
                style={{ display: 'none' }} 
              />
              <button 
                type="button" 
                onClick={() => document.getElementById('imageUploadInput-0').click()}
                className={s['upload-btn']}
              >
                <span className={s['plus-icon']}>+</span>
              </button>
              {product.img && (
                <img 
                  src={URL.createObjectURL(product.img)} 
                  alt="Large Preview" 
                  className={s['small-image-preview']}
                />
              )}
            </div>
            {[1, 2, 3].map(index => (
              <div key={index} className={s['small-image-box']}>
                <input 
                  type="file" 
                  id={`imageUploadInput-${index}`} 
                  onChange={handleFileChange} 
                  name="otherImages" 
                  multiple 
                  style={{ display: 'none' }} 
                />
                <button 
                  type="button" 
                  onClick={() => document.getElementById(`imageUploadInput-${index}`).click()}
                  className={s['upload-btn']}
                >
                  <span className={s['plus-icon']}>+</span>
                </button>
                {images[index - 1] && (
                  <img 
                    src={URL.createObjectURL(images[index - 1])} 
                    alt={`Preview ${index}`} 
                    className={s['small-image-preview']}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={s['header-actions']}>
        <button className={s['save-draft']}>Save Draft</button>
        <button className={s['add-product-btn']} onClick={handleSubmit}>Add Product</button>
      </div>
    </div>
  );
};

export default AddProduct;
