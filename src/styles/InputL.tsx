// Input.tsx
import { useField } from 'formik';
import React, { memo, useEffect, useMemo, useState } from 'react';
import classnames from 'classnames';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

interface InputProps {
    id?: string;
    type?: string;
    name?: string;
    placeholder?: string;
    error?: boolean;
    errorMessage?: string;
    className?: string;
    setFieldValue?: (field: string, value: any) => void;
    fieldName?: string;
    isLoginInput?: boolean;
}

const Input = memo((props: InputProps) => {
    const [field] = useField({ name: props.name || '' });
    const [focused, setFocused] = useState(false);
    const [isShowPlaceholder, setIsShowPlaceholder] = useState(true);
    const yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
    const DefaultBirthDate = yesterday.toISOString().split('T')[0];
    const DefaultAdmissionDate = new Date().toISOString().split('T')[0];


    useEffect(() => {
        if (field.value) {
            setFocused(true);
        } else {
            setFocused(false);
        }
        if (props.type === 'date' || props.type === 'phone') setFocused(true);
    }, [field.value]);

    useEffect(() => {
        if (props.isLoginInput) {
            let inputFounded = false;
            let count = 0;
            const interval = setInterval(() => {
                count++;
                const prefillingInput = document.querySelector(
                    'input#password:-webkit-autofill',
                ) as HTMLInputElement;
                if (prefillingInput) {
                    inputFounded = true;
                    setIsShowPlaceholder(false);
                }

                if (inputFounded || count === 120) {
                    clearInterval(interval);
                }
            }, 30);
            return () => {
                clearInterval(interval);
            };
        }
    }, [props.isLoginInput]);

    const inputClass = useMemo(() => {
        return classnames(
            'border inline-block text-int-grey-60 p-[11px] rounded-[4px] w-full outline-none',
            {
                'border-int-red': props.error,
                'border-int-mid-blue': !props.error,
            },
        );
    }, [props.error]);

    const labelClass = useMemo(() => {
        return classnames(
            'absolute left-2 transition-all transform cursor-auto pointer-events-none',
            {
                'text-int-red': props.error,
                'top-1/2 -translate-y-1/2': !focused && props.type !== 'date',
                'top-[2px] text-[10px] leading-4':
                    !isShowPlaceholder && props.isLoginInput && !focused,
                '-top-[8px] text-[10px] leading-4':
                    (focused && props.type !== 'date') || props.type === 'date',
            },
        );
    }, [props.error, focused, isShowPlaceholder, props.isLoginInput]);
    const inputElement = useMemo(() => {
        if (props.type === 'phone') {
            return (
                <PhoneInput
                    country="de"
                    value={field.value}
                    inputProps={{
                        autoFocus: props.fieldName === 'phoneOrEmail',
                        name: props.fieldName || 'phone',
                        placeholder: '',
                        type: 'tel', // Change the type to 'tel' for phone input
                        onChange: field.onChange,
                        // ... other phone input props ...
                    }}
                // ... phone input styles ...
                />
            );
        } else if (props.type === 'date') {
            return (
                <input
                    id={props.id}
                    type="date" // Change the type to 'date' for date input
                    name={field.name}
                    value={field.value}
                    onChange={field.onChange}
                    className={inputClass}
                    onFocus={() => {
                        if (!field.value) {
                            let defaultValue = "1990-01-01";

                            if (props.placeholder === "Geburtsdatum*") {
                                defaultValue = DefaultBirthDate;
                            } else if (props.placeholder === "Aufnahmedatum") {
                                defaultValue = DefaultAdmissionDate;
                            }

                            if (props.setFieldValue) {
                                props.setFieldValue(field.name, defaultValue);
                            }
                        }
                        setFocused(true);
                    }}
                    onBlur={(e) => {
                        if (!field.value) {
                            setFocused(false);
                        }
                        field.onBlur(e);
                    }}
                />
            );
        } else {
            return (
                <input
                    id={props.id}
                    type={props.type || 'text'} // Default to 'text' type if no type is provided
                    name={field.name}
                    value={field.value}
                    onChange={field.onChange}
                    className={`${inputClass} `}
                    onFocus={() => setFocused(true)}
                    onBlur={(e) => {
                        if (!field.value) {
                            setFocused(false);
                        }
                        field.onBlur(e);
                    }}
                />
            );
        }
    }, [props.type, props.fieldName, field.name, field.value, field.onChange]);





    return (
        <div className={`mb-2 ${props.className ? props.className : ''}`}>
            <div className="mb-1 relative">
                {inputElement}
                <label className={labelClass}>
                    <div className="px-2 text-center">
                        <span className="relative z-10">{props.placeholder || ''}</span>
                        {(focused || props.type === 'date') && (
                            <div className="bg-white left-0 w-full h-[3px] top-[9px] transform -translate-y-1/2 absolute z-0"></div>
                        )}

                        {!isShowPlaceholder && props.isLoginInput && !focused && (
                            <div className="bg-white left-0 w-full h-[3px] top-[7px] transform -translate-y-1/2 absolute z-0"></div>
                        )}
                    </div>
                </label>
            </div>
            {props.error && props.errorMessage && (
                <span className="text-int-red font-BeVietnamRegular text-sm">
                    {props.errorMessage}
                </span>
            )}
        </div>
    );
});

export default Input;