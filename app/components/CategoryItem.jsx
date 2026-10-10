"use client";

import Link from "next/link";
import { Plus, Minus } from "lucide-react";
import { useCategories } from "../context/CategoryContext";

const CategoryItem = ({ category, level = 0 }) => {
  const { toggleCategory, expandedCategories } = useCategories();
  const isExpanded = expandedCategories[category._id];
  const hasSubcategories = category.subcategories && category.subcategories.length > 0;
  const paddingLeft = `${level * 20 + 12}px`;

  return (
    <>
      <div 
        className={`menu-item rounded-xl transition-all ${isExpanded ? 'open' : ''}`}
        onClick={() => hasSubcategories && toggleCategory(category._id)}
      >
        <div 
          className="menu-label flex items-center justify-between py-3 pr-3 cursor-pointer select-none transition-all group hover:bg-[#FAF6F0] rounded-xl"
          style={{ paddingLeft }}
        >
          <Link 
            href={`/category/${category.slug || '#'}`}
            className={`truncate flex-1 transition-colors ${level === 0 ? 'font-bold text-sm' : 'text-xs font-medium'}`}
            style={{ color: isExpanded ? "#C49A6C" : "#2B211D" }}
          >
            {category.name}
          </Link>
          {hasSubcategories && (
            <span className="icon-toggle flex-shrink-0 ml-2 p-1 rounded-lg text-xs font-bold"
              style={{ background: "#FAF6F0", color: "#3E2723" }}>
              {isExpanded ? '−' : '+'}
            </span>
          )}
        </div>
      </div>
      {hasSubcategories && isExpanded && (
        <div className="sub-menu pl-2 border-l border-[#E7DED5] ml-4 my-1 space-y-1">
          {category.subcategories.map((subCategory) => (
            <CategoryItem 
              key={subCategory._id || subCategory.name}
              category={subCategory}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default CategoryItem;
