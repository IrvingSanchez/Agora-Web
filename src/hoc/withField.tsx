/* eslint-disable @typescript-eslint/no-explicit-any */

import { useMemo, forwardRef, useState } from "react";
import { useField } from "formik";

const withField = (InputComponent: any) => 
  forwardRef(({ label, black, file, transition = true, displayError = true, data = {}, ...props }: any, ref: any) => {
    const [field, meta, helpers] = useField(props);
    const [isActive, setIsActive] = useState(false);
    const error = Boolean(meta.touched && meta.error);
    const datas: any = useMemo(() => ({}), []);

    Object.keys(data).forEach((key: any) => {
      datas[`data-${key}`] = data[key];
    });

    return (
      <label
        htmlFor={props.id || props.name}
        ref={ref}
        data-readonly={props.readOnly}
        data-error={error}
        data-error-msg={meta.error}
        data-disabled={props.disabled}
        data-black={black}
        data-select={props?.options?.length > 0}
        data-active={transition && isActive || props?.active}
        className={`input${file ? " input--file" : ""}`}
        {...datas}
      >
        {!file && (
          <p
            className="input__text"
            title={meta.error}
            
          >
            {label}
          </p>
        )}
        <InputComponent
          error={error}
          field={field}
          meta={meta}
          helpers={helpers}
          label={label}
          onActiveChange={setIsActive}
          {...props}
        />
        <p className={`input__error text-base ${displayError ? '' : 'invisible'}`}
          aria-live="polite"
          data-error={error}
        >
          {error ? meta.error : '\u00A0'}
        </p>
      </label>
    );
  });

export default withField;
