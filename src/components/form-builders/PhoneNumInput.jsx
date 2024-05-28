import React from "react";
import {
    Tooltip,
    TextInput
} from "@mantine/core";
import { useTranslation } from "react-i18next";
import { IconInfoCircle, IconX } from "@tabler/icons-react";
import { getHotkeyHandler } from "@mantine/hooks";
import PhoneInput from 'react-phone-input-2'
import { useState } from "react";

import 'react-phone-input-2/lib/style.css'; // Ensure this import is present
import classes from '../../assets/css/PhoneNumberInput.module.css'

function PhoneNumberInput(props) {
    const { label, placeholder, required, nextField, name, form, tooltip, mt, id, disabled, country } = props
    const { t, i18n } = useTranslation();
    const [value, setValue] = useState()
    return (
        <>
            {
                form &&
                <PhoneInput
                    containerClass={classes.PhoneInputContainer}
                    inputClass={classes.PhoneInputInput}
                    buttonClass={classes.PhoneInputButton}
                    country={country}
                    id={id}
                    label={label}
                    placeholder={placeholder}
                    mt={mt}
                    autoComplete="off"
                    {...form.getInputProps(name)}
                    onKeyDown={getHotkeyHandler([
                        ['Enter', (e) => {
                            nextField === 'EntityFormSubmit' ?
                                document.getElementById(nextField).click() :
                                document.getElementById(nextField).focus()
                        }],
                    ])}
                />
            }
        </>
    );
}

export default PhoneNumberInput;
