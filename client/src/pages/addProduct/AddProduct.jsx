import React, { useState } from 'react';
import s from './addproduct.module.scss';
import axios from 'axios';
import { API_BASE_URL } from 'src/api/index'; // Adjust the path as needed
import { categoriesData } from 'src/Data/staticData';

const frameStyles = [
  { name: 'Weaved Brown', img: 'src/Assets/Images/weaved-brown.png' },
  { name: 'Gold Sash (Brown)', img: 'src/Assets/Images/gold-sash-brown.png' },
  { name: 'Zigzag Brown', img: 'src/Assets/Images/zigzag-brown.png' },
  { name: 'Crackled Brown', img: 'src/Assets/Images/crackled-brown.png' },
  { name: 'Cheak Brown', img: 'src/Assets/Images/cheak-brown.png' },
  { name: 'Coarse Brown', img: 'src/Assets/Images/coarse-brown.png' },
  { name: 'Stripes Black', img: 'src/Assets/Images/stripes-black.png' },
  { name: 'Maze Brown', img: 'src/Assets/Images/maze-brown.png' },
  { name: 'Crackle Black', img: 'src/Assets/Images/crackle-black.png' },
  // Add more styles as needed
];

const printSizes = [
  { name: '9 x 12 in', img: 'src/Assets/Images/size-9x12.png' },
  { name: '12 x 12 in', img: 'src/Assets/Images/size-12x12.png' },
  { name: '12 x 18 in', img: 'src/Assets/Images/size-12x18.png' },
  { name: '14 x 18 in', img: 'src/Assets/Images/size-14x18.png' },
  { name: '18 x 24 in', img: 'src/Assets/Images/size-18x24.png' },
  { name: '27 x 36 in', img: 'src/Assets/Images/size-27x36.png' },
];

const orientations = [
  { name: 'Portrait', img: 'src/Assets/Images/portrait.png' },
  { name: 'Landscape', img: 'src/Assets/Images/landscape.png' },
];

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
    sold: 0,
    printSize: '',
    frameStyle: '',
    orientation: '',
  });

  const [images, setImages] = useState([]);
  const [newColor, setNewColor] = useState('');
  const [showDetails, setShowDetails] = useState(false);
  const [showPrintSizeOptions, setShowPrintSizeOptions] = useState(false);
  const [showFrameOptions, setShowFrameOptions] = useState(false);
  const [showOrientationOptions, setShowOrientationOptions] = useState(false);
  const [selectedPrintSize, setSelectedPrintSize] = useState('');
  const [selectedFrame, setSelectedFrame] = useState({});
  const [selectedOrientation, setSelectedOrientation] = useState('');
  
  // Handle Print Size Change
  const handlePrintSizeChange = (size) => {
    setSelectedPrintSize(size);
    setShowPrintSizeOptions(false);
  };
  
  // Handle Frame Change
  const handleFrameChange = (name) => {
    const selectedStyle = frameStyles.find((style) => style.name === name);
    setSelectedFrame(selectedStyle);
    setProduct((prevProduct) => ({ ...prevProduct, frameStyle: name }));
    setShowFrameOptions(false);
  };
  
  // Handle Orientation Change
  const handleOrientationChange = (orientation) => {
    setSelectedOrientation(orientation);
    setShowOrientationOptions(false);
  };
  

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };
  const handleFileChange = (e) => {
    const { name, files } = e.target;

    if (name === 'img') {
      setProduct((prevProduct) => ({
        ...prevProduct,
        img: files[0],
      }));
    } else if (name === 'otherImages') {
      const newFiles = Array.from(files);
      setImages((prevImages) => {
        const updatedImages = [...prevImages, ...newFiles];
        return updatedImages.slice(0, 4); // Limit to 4 images
      });
    }
  };

  const handleCategoryChange = (e) => {
    const { value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      category: value,
    }));
    setShowDetails(value.toLowerCase() === 'frame'); // Case-insensitive match
  };

  const handleColorChange = (e) => setNewColor(e.target.value);

  const addColor = () => {
    if (newColor && !product.colors.includes(newColor)) {
      setProduct((prevProduct) => ({
        ...prevProduct,
        colors: [...prevProduct.colors, newColor],
      }));
      setNewColor('');
    }
  };

  const removeColor = (colorToRemove) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      colors: prevProduct.colors.filter((color) => color !== colorToRemove),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(product).forEach((key) => {
      if (key === 'colors') {
        formData.append(key, JSON.stringify(product[key]));
      } else {
        formData.append(key, product[key]);
      }
    });

    if (product.img) formData.append('img', product.img);
    images.forEach((file) => formData.append('otherImages', file));

    if (product.category.toLowerCase() === 'frame') {
      formData.append('printSize', product.printSize);
      formData.append('frameStyle', product.frameStyle);
      formData.append('orientation', product.orientation);
    }

    try {
      await axios.post(`${API_BASE_URL}/api/add-product`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Product added successfully');
      // Reset form
      setProduct({
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
        sold: 0,
        printSize: '',
        frameStyle: '',
        orientation: '',
      });
      setImages([]);
      setNewColor('');
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
          />
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
              onChange={handleCategoryChange}
              required
            >
              <option value="" disabled>
                Select a category
              </option>
              {categoriesData.map((category) => (
                <option key={category.id} value={category.title}>
                  {category.title}
                </option>
              ))}
            </select>
          </div>
          {showDetails && (
            <div className={s['frame-details']}>
  {/* <h2>Frame Details</h2> */}

  {/* Print Size Dropdown */}
  <div className={s['print-size']}>
    <div 
      className={s['custom-select']}
      onClick={() => setShowPrintSizeOptions(!showPrintSizeOptions)}
    >
      <div className={s['selected-frame']}>
        <span>{selectedPrintSize || 'print size'}</span>
        <button type="button" className={s['dropdown-btn']}>
          ▼
        </button>
      </div>
      {showPrintSizeOptions && (
        <div className={s['frame-style-options']}>
          {printSizes.map((size, index) => (
            <div
              key={index}
              className={s['frame-style-option']}
              onClick={() => handlePrintSizeChange(size.name)}
            >
              <img
                src={size.img}
                alt={size.name}
                className={s['frame-style-img']}
              />
              <span>{size.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>

  {/* Frame Style Dropdown */}
  <div className={s['frame-style']}>
    <div 
      className={s['custom-select']}
      onClick={() => setShowFrameOptions(!showFrameOptions)}
    >
      <div className={s['selected-frame']}>
        <span>{selectedFrame.name || 'rame style'}</span>
        <button type="button" className={s['dropdown-btn']}>
          ▼
        </button>
      </div>
      {showFrameOptions && (
        <div className={s['frame-style-options']}>
          {frameStyles.map((style, index) => (
            <div
              key={index}
              className={s['frame-style-option']}
              onClick={() => handleFrameChange(style.name)}
            >
              <img
                src={style.img}
                alt={style.name}
                className={s['frame-style-img']}
              />
              <span>{style.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>

  {/* Orientation Dropdown */}
  <div className={s['orientation']}>
    <div 
      className={s['custom-select']}
      onClick={() => setShowOrientationOptions(!showOrientationOptions)}
    >
      <div className={s['selected-frame']}>
        <span>{selectedOrientation || 'Select orientation'}</span>
        <button type="button" className={s['dropdown-btn']}>
          ▼
        </button>
      </div>
      {showOrientationOptions && (
        <div className={s['frame-style-options']}>
          {orientations.map((orientation, index) => (
            <div
              key={index}
              className={s['frame-style-option']}
              onClick={() => handleOrientationChange(orientation.name)}
            >
              <img
                src={orientation.img}
                alt={orientation.name}
                className={s['frame-style-img']}
              />
              <span>{orientation.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
</div>



          )}
        </div>
        {/* <div className={s.colors}>
          <h2>Colors</h2>
          <input
            type="text"
            value={newColor}
            onChange={handleColorChange}
            placeholder="Enter color name or code"
          />
          <button type="button" onClick={addColor}>
            Add Color
          </button>
          <div className={s['color-list']}>
            {product.colors.map((color, index) => (
              <div key={index} className={s['color-item']}>
                <span>{color}</span>
                <button
                  type="button"
                  onClick={() => removeColor(color)}
                  className={s['remove-color']}
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div> */}
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
