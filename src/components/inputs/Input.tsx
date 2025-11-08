/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRef, useState, useEffect, memo } from "react";
import { Field, ErrorMessage } from "formik";
import withField from "@/hoc/withField";
import { Icon } from '@iconify/react';
import '@/assets/scss/custom/Inputs.scss';


import IconEye from "@/assets/images/icons/eye-icon.svg";
import IconEyeClose from "@/assets/images/icons/eye-close-icon.svg";

// Función para generar contraseña segura
const generateSecurePassword = () => {
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  const special = '!@#$%^&*()_+-=[]{}|;:,.<>?';
  
  // Aseguramos al menos un carácter de cada tipo
  let password = '';
  password += lowercase[Math.floor(Math.random() * lowercase.length)];
  password += uppercase[Math.floor(Math.random() * uppercase.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];
  password += special[Math.floor(Math.random() * special.length)];
  
  // Completamos hasta 12 caracteres con una mezcla aleatoria
  const allChars = lowercase + uppercase + numbers + special;
  while (password.length < 12) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }
  
  // Mezclamos los caracteres para que no sigan un patrón
  return password.split('').sort(() => Math.random() - 0.5).join('');
};

const Input = ({ error, field, meta, helpers, type, onActiveChange, ...props }: any) => {
  const [showPassword, setShowPassword] = useState(false);
  const [copied, setCopied] = useState(false);

  // Generar contraseña al montar el componente si es type password-default
  useEffect(() => {
    if (type === 'password-default' && !field.value) {
      const generatedPassword = generateSecurePassword();
      helpers.setValue(generatedPassword);
    }
  }, []);

  // Handle focus/blur events
  useEffect(() => {
    const handleFocus = () => onActiveChange(true);
    const handleBlur = () => onActiveChange(false);
    
    const inputElement = document.getElementById(props.id || props.name);
    if (inputElement) {
      inputElement.addEventListener("focus", handleFocus);
      inputElement.addEventListener("blur", handleBlur);
    }
    return () => {
      if (inputElement) {
        inputElement.removeEventListener("focus", handleFocus);
        inputElement.removeEventListener("blur", handleBlur);
      }
    };
  }, [props.id, props.name, onActiveChange]);

  const handleCopyPassword = async () => {
    if (field.value) {
      await navigator.clipboard.writeText(field.value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
    }
  };

  return (
    <>
      <input
        id={props.id || props.name}
        className="input__input"
        data-error={error}
        type={type === "password-default" ? "text" : (type === "password" && showPassword ? "text" : type)}
        readOnly={type === "password-default"}
        {...field}
        {...props}
      />
      {type === "password" && (
        <button type="button" className="input__show" onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? (
            <img src={IconEye} alt="Show password" className="input__show-icon" />
          ) : (
            <img src={IconEyeClose} alt="Hide password" className="input__show-icon" />
          )}
        </button>
      )}
      {type === "password-default" && (
        <button 
          type="button" 
          className="input__show" 
          onClick={handleCopyPassword}
          title={copied ? "¡Copiado!" : "Copiar contraseña"}
        >
          <Icon 
            icon={copied ? "mdi:check" : "mdi:content-copy"} 
            width="20" 
            height="20" 
          />
        </button>
      )}
    </>
  );
};

const Area = ({ error, field, meta, helpers, ...props }: any) => (
  <textarea
    id={props.id || props.name}
    data-error={error}
    className="input__area"
    {...field}
    {...props}
  />
);

const FileInput = ({ error, field, meta, helpers, type: _type, accept = "image/*", ...props }: any) => {
  const { profile, defaultValue, alt, cancelText, activeButton, onValueChange, ...remainingProps } = props;
  const { onChange: _onChange, onBlur, value } = field;

  const handleSelectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    const { files } = event.target;
    if (files) {
      const newValue = props.multiple ? [...value, ...Array.from(files)] : files[0];
      helpers.setValue(newValue);
      // Notificar al componente padre sobre el cambio
      if (onValueChange) {
        onValueChange(newValue, true); // true indica que tiene valor
      }
    }
  };

  const handleCancel = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    helpers.setValue(null);
    // Notificar al componente padre sobre el cambio
    if (onValueChange) {
      onValueChange(null, false); // false indica que no tiene valor
    }
  };

  return (
    <>
      {profile ? (
        <img
          src={value ? URL.createObjectURL(value) : defaultValue}
          alt={value?.name || alt}
          className="input__file-image"
        />
      ) : null}
     
        <>
          {value !== null ? (
            <button onClick={handleCancel} type="button" className="input__file-remove" title="Cancelar imagen">
              {cancelText || <Icon icon="mdi:close" width="18" height="18" color="#FFF" />}
            </button>
          ) : null}
          {value === null ? (
            <>
              <p
                className="input__text input__text--file"
                title={meta.error}
                data-error={error}
              >
                {props.label || <Icon icon="lucide:pen" width="16" height="16" color="#000" />}
              </p>
              <input
                id={props.id || props.name}
                className="input__file"
                data-error={error}
                type="file"
                accept={accept}
                onChange={handleSelectFile}
                onBlur={onBlur}
                {...remainingProps}
              />
            </>
          ) : null}
        </>
      
    </>
  );
};

const SelectInput = ({ options = [], error, field, meta, helpers, value = null, ...props }: any) => {
  const { onSelect } = props;
  const selectRef = useRef<any>(null);
  const validateValue = options.find(({ value: valueOption }: any) => (
    valueOption === meta.value
  ))?.label || props.withoutValue;

  const handleCloseSelect = () => {
    if (selectRef.current?.dataset.active) {
      delete selectRef.current.dataset.active;
    } else {
      selectRef.current.dataset.active = true;
    }
  };

  const handleSelect = (event: any) => {
    const option = event.target;
    if (!option.classList.contains("input__select")) {
      const valueSelected = option.dataset.value;
      if (onSelect) onSelect(valueSelected);
      helpers.setValue(valueSelected);
      selectRef.current.dataset.active = false;
    } else {
      handleCloseSelect();
      selectRef.current.lastElementChild.scrollTo(0, 0);
    }
  };

  useEffect(() => {
    if (options.length === 1 && field.value !== options[0].value) {
      helpers.setValue(options[0].value);
      if (onSelect) onSelect(options[0].value);
    }
  }, [options, field, helpers, onSelect]);

  return (
    <div ref={selectRef} onClick={handleSelect} role="button" tabIndex={0} className="input__select" data-error={error}>
      <p className="input__select-value">
        {value ?? validateValue}
      </p>
      <div className="input__select-options" onMouseLeave={handleCloseSelect}>
        {options.map((option: any) => (
          <span key={option.value} data-value={option.value} className="input__select-option">
            {option.label}
          </span>
        ))}
      </div>
    </div>
  );
};

export const Checkbox = ({ children, name, label, label2 = null, ...props }: any) => (
  <label htmlFor={name} data-black={props.black} data-checked={props.checked} className={`input input--check ${props?.className}`} data-switch={props['data-switch'] || false}>
    <Field type="checkbox" id={name} name={name} className="input__checkbox" {...(props.onChange && { onChange: props.onChange })} />
    <ErrorMessage component="span" name={name} className="input__checkbox-error" />
    <span className="input__text input__text--check">
      {label}
      {children}
      {label2}
    </span>
  </label>
);

export const Radio = ({ children, name, checked, value, ...props }: any) => (
  <label
    htmlFor={props.id}
    data-black={props.black}
    data-checked={checked}
    data-payment={props.payment}
    className="input input--radio"
    onClick={props.onSelect}
  >
    <Field type="radio" id={props.id} name={name} value={value} className="input__radio" />
    <ErrorMessage component="span" name={name} className="input__radio-error" />
    <span className="input__text input__text--radio">
      {props.label}
      {children}
      {props.label2}
    </span>
  </label>
);

export const TextArea = withField(Area);
export const Select = withField(memo(SelectInput));
export const File = withField(FileInput);

const TextInput = withField(Input);
export default TextInput;
