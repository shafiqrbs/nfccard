import React from "react";
import {
    Tooltip,
    TextInput
} from "@mantine/core";
import { useTranslation } from "react-i18next";
import { IconInfoCircle, IconX } from "@tabler/icons-react";
import { getHotkeyHandler } from "@mantine/hooks";
import PhoneInput from 'react-phone-input-2'

import 'react-phone-input-2/lib/style.css'; // Ensure this import is present
import classes from '../../assets/css/PhoneNumberInput.module.css'

function PhoneNumberInput(props) {
    const { label, placeholder, required, nextField, name, form, tooltip, mt, id, disabled, country, rules } = props
    const { t, i18n } = useTranslation();

    return (
        <>
            {
                form &&
                <Tooltip
                    label={tooltip}
                    opened={(name in form.errors) && !!form.errors[name]}
                    px={16}
                    py={2}
                    position="top-end"
                    bg={`red.4`}
                    c={'white'}
                    withArrow
                    offset={2}
                    zIndex={999}
                    transitionProps={{ transition: "pop-bottom-left", duration: 500 }}
                >
                    <PhoneInput
                        containerClass={classes.PhoneInputContainer}
                        inputClass={classes.PhoneInputInput}
                        buttonClass={classes.PhoneInputButton}
                        country={country}
                        id={id}
                        label={label}
                        placeholder={placeholder}
                        rules={rules}
                        mt={mt}
                        disabled={disabled}
                        autoComplete="off"
                        {...form.getInputProps(name)}
                        onKeyDown={getHotkeyHandler([
                            ['Enter', (e) => {
                                nextField === 'EntityFormSubmit' ?
                                    document.getElementById(nextField).click() :
                                    document.getElementById(nextField).focus()
                            }],
                        ])}
                        leftSection={props.leftSection ? props.leftSection : ''}
                        rightSection={
                            form.values[name] ?
                                <Tooltip
                                    label={t("Close")}
                                    withArrow
                                    bg={`red.1`}
                                    c={'red.3'}
                                >
                                    <IconX color={`red`} size={16} opacity={0.5} onClick={() => {
                                        form.setFieldValue(name, '');
                                    }} />
                                </Tooltip>
                                :
                                <Tooltip
                                    label={tooltip}
                                    px={16}
                                    py={2}
                                    withArrow
                                    position={"left"}
                                    c={'black'}
                                    bg={`gray.1`}
                                    transitionProps={{ transition: "pop-bottom-left", duration: 500 }}
                                >
                                    {props.rightIcon ? props.rightIcon : <IconInfoCircle size={16} opacity={0.5} />}
                                </Tooltip>
                        }
                        withAsterisk={required}
                    />
                </Tooltip>
            }
        </>
    );
}

export default PhoneNumberInput;
