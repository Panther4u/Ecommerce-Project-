import React, { useState, useEffect, useRef } from "react";
import s from "./CategorySelector.module.scss"; // Adjust path as needed

const CategorySelector = ({ categories, selectedCategory, onSelectCategory }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleCategorySelect = (category) => {
    onSelectCategory(category);
    setIsOpen(false); // Close the dropdown after selection
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={s.categorySelector} ref={dropdownRef}>
      <div className={s.dropdown}>
        <button
          className={s.dropdownButton}
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedCategory || 'Select a category'}
        </button>
        {isOpen && (
          <ul className={s.dropdownMenu}>
            {categories.map((category) => (
              <li
                key={category.id}
                onClick={() => handleCategorySelect(category.title)}
                className={selectedCategory === category.title ? s.selected : ''}
              >
                <i className={`icon-${category.iconName}`}></i> {category.title}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CategorySelector;

