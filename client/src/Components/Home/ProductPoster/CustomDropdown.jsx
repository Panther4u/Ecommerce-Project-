import React, { useState, useRef, useEffect } from 'react';
import s from './CustomDropdown.module.scss'; // Adjust the path as needed

const CustomDropdown = ({ options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  const handleToggle = () => setIsOpen(!isOpen);
  
  const handleSelect = (option) => {
    setSelectedValue(option);
    onChange(option);
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className={s.dropdown}>
      <button className={s.dropdownButton} onClick={handleToggle}>
        {selectedValue || 'Sort by'}
      </button>
      {isOpen && (
        <div className={s.dropdownMenu}>
          {options.map((option, index) => (
            <div
              key={index}
              className={s.dropdownItem}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
