'use client';

import { ReactNode } from 'react';

interface AdminInputProps {
  label?: string;
  type?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  helperText?: string;
  multiline?: boolean;
  rows?: number;
  icon?: ReactNode;
  options?: { value: string; label: string }[];
  className?: string;
}

export default function AdminInput({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  error,
  helperText,
  multiline = false,
  rows = 3,
  icon,
  options,
  className = ''
}: AdminInputProps) {
  const baseInputClasses = `w-full px-4 py-2.5 rounded-lg border-2 transition-all duration-200 focus:outline-none ${
    error
      ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200'
      : 'border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
  } ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'} ${icon ? 'pl-12' : ''}`;

  const renderInput = () => {
    if (options) {
      return (
        <select
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          className={baseInputClasses}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
    }

    if (multiline) {
      return (
        <textarea
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          rows={rows}
          className={baseInputClasses}
        />
      );
    }

    return (
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={baseInputClasses}
      />
    );
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-sm font-semibold text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        {renderInput()}
      </div>
      {error && (
        <p className="text-sm text-red-600 flex items-center gap-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
      {helperText && !error && (
        <p className="text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
}
