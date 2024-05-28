import React, { useEffect, useState } from "react";
import {
    Container,
    Button,
    Flex,
    Group,
    Grid,
    Image

} from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { useDisclosure } from '@mantine/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { useLocalStorage } from '@mantine/hooks';
import { useNavigate, useOutletContext } from 'react-router-dom';


function CardOneIndex(props) {
    const { } = props;
    const { isOnline, mainAreaHeight } = useOutletContext();
    const height = mainAreaHeight - 80;

    const [formData, setFormData] = useLocalStorage({
        key: 'signup-form-data',
        defaultValue: {
            name: '',
            email: '',
            phone: '',
            twitterAccount: '',
            linkedinAccount: '',
            profilePic: '',
            companyName: '',
            designation: '',
            companyWebsite: '',
            companyEmail: '',
            companyLogo: '',
            address: '',
            instaAccount: '',
            fbAccount: ''
        },
    });


    return (
        <>
            <Container h={height + 60} bg={'blue'} mt={'xs'} mb={4}>

            </Container>
        </>
    );
}

export default CardOneIndex;