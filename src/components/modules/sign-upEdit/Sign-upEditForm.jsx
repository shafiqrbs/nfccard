import React, { useEffect, useState } from "react";
import { Navigate, useOutletContext } from "react-router-dom";
import {
    Button,
    rem, Flex,
    Grid, Box, ScrollArea, Text, Title, Alert, List, Stack, Tooltip, ActionIcon, Image
} from "@mantine/core";
import { useTranslation } from 'react-i18next';
import {
    IconCheck,
    IconDeviceFloppy, IconUsersGroup
} from "@tabler/icons-react";
import { useDisclosure, useHotkeys } from "@mantine/hooks";
import { useDispatch, useSelector } from "react-redux";
import { hasLength, useForm } from "@mantine/form";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { setEntityNewData, setFetching, setValidationData, storeEntityData } from "../../../store/core/crudSlice.js";
import InputForm from "../../form-builders/InputForm.jsx";
import ImageUploadDropzone from "../../form-builders/ImageUploadDropzone.jsx";
import TextAreaForm from "../../form-builders/TextAreaForm";
import { useLocalStorage } from '@mantine/hooks';
import { useNavigate } from "react-router-dom";
import PhoneNumberInput from "../../form-builders/PhoneNumInput.jsx";
import { readLocalStorageValue } from '@mantine/hooks';

function SignupEditForm() {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    const { isOnline, mainAreaHeight } = useOutletContext();
    const height = mainAreaHeight - 80; //TabList height 104
    const [opened, { open, close }] = useDisclosure(false);

    const [saveCreateLoading, setSaveCreateLoading] = useState(false);

    const validationMessage = useSelector((state) => state.crudSlice.validationMessage)
    const validation = useSelector((state) => state.crudSlice.validation)
    const entityNewData = useSelector((state) => state.crudSlice.entityNewData)

    const values = readLocalStorageValue({ key: 'signup-form-data' });

    const navigate = useNavigate();
    const [formData, setFormData] = useLocalStorage({
        key: 'signup-form-data',
        defaultValue: {
            name: values.name,
            email: values.email,
            phone: values.phone,
            twitterAccount: values.twitterAccount,
            linkedinAccount: values.linkedinAccount,
            profilePic: values.profilePic,
            companyName: values.companyName,
            designation: values.designation,
            companyWebsite: values.companyWebsite,
            companyEmail: values.companyEmail,
            companyLogo: values.companyLogo,
            address: values.address,
            instaAccount: values.instaAccount,
            fbAccount: values.fbAccount,
        },
    });

    const form = useForm({
        initialValues: formData,
        validate: {
            name: hasLength({ min: 2, max: 20 }),
            companyName: hasLength({ min: 2, max: 20 }),
            designation: hasLength({ min: 2, max: 20 }),
            phone: (value) => (!/^\d+$/.test(value) ? 'Invalid phone number' : null),
            email: (value) => {
                if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    return 'Invalid email address';
                }
                return null;
            },
            address: hasLength({ min: 2, max: 20 }),
            companyWebsite: hasLength({ min: 2, max: 20 }),
            companyLogo: (value) => (value.length === 0 ? 'Company logo is required' : null),
        }
    });

    const handleSubmit = (e) => {

        e.preventDefault();

        const currentFormData = form.getValues();


        const updatedFormData = { ...formData };

        Object.keys(currentFormData).forEach(key => {
            if (currentFormData[key] !== formData[key]) {
                updatedFormData[key] = currentFormData[key];

            }
        });

        setFormData(updatedFormData);

        console.log(updatedFormData);
        navigate('/sign-upView');
    };

    useEffect(() => {
        if (validation) {
            validationMessage.name && (form.setFieldError('name', true));
            validationMessage.companyName && (form.setFieldError('companyName', true));
            validationMessage.phone && (form.setFieldError('phone', true));
            validationMessage.email && (form.setFieldError('email', true));
            validationMessage.designation && (form.setFieldError('designation', true));
            validationMessage.companyWebsite && (form.setFieldError('companyWebsite', true));
            validationMessage.address && (form.setFieldError('address', true));
            validationMessage.credit_limit && (form.setFieldError('credit_limit', true));
            validationMessage.companyLogo && (form.setFieldError('companyLogo', true));
            validationMessage.alternative_mobile && (form.setFieldError('alternative_mobile', true));
            dispatch(setValidationData(false))
        }

        if (entityNewData.message === 'success') {
            notifications.show({
                color: 'teal',
                title: t('SubmitSuccessfully'),
                icon: <IconCheck style={{ width: rem(18), height: rem(18) }} />,
                loading: false,
                autoClose: 700,
                style: { backgroundColor: 'lightgray' },
            });

            setTimeout(() => {
                form.reset()

            }, 700)
        }
    }, [validation, validationMessage, form]);


    return (
        <Box >
            <form onSubmit={handleSubmit}>
                <Grid gutter={{ base: 8 }} >
                    <Grid.Col p={'0'} >
                        <Box   >
                            <Box  >
                                <Box pl={`xs`} pb={'xs'} pr={8} pt={'xs'} className={'boxBackground borderRadiusAll'}  >
                                    <Grid >
                                        <Grid.Col h={54}>
                                            <Title order={6} mt={'xs'} pl={'6'}>{t('WelcomeSignup')}</Title>
                                        </Grid.Col>
                                    </Grid>
                                </Box>
                                <Box >
                                    <Box>
                                        {
                                            Object.keys(form.errors).length > 0 && validationMessage != 0 &&
                                            <Alert variant="light" color="red" radius="md" title={
                                                <List withPadding size="sm">
                                                    {validationMessage.name && <List.Item>{t('NameValidateMessage')}</List.Item>}
                                                    {validationMessage.companyName && <List.Item>{t('CompanyNameValidateMessage')}</List.Item>}
                                                    {validationMessage.email && <List.Item>{t('Email')}</List.Item>}
                                                    {validationMessage.companyLogo && <List.Item>{t('CompanyLogo')}</List.Item>}
                                                    {validationMessage.designation && <List.Item>{t('Designation')}</List.Item>}
                                                    {validationMessage.phone && <List.Item>{t('Phone')}</List.Item>}
                                                    {validationMessage.address && <List.Item>{t('Address')}</List.Item>}
                                                    {validationMessage.companyWebsite && <List.Item>{t('CompanyWebsite')}</List.Item>}
                                                </List>
                                            }></Alert>
                                        }
                                        <Box mt={'4'}>
                                            <ScrollArea h={height - 55} scrollbarSize={2} scrollbars="y" type="never"  >
                                                <Grid columns={12} gutter={{ base: 6 }} >
                                                    {/* 1st column */}
                                                    <Grid.Col span={{ base: 12, sm: 12, md: 6, lg: 6 }}    >
                                                        <Box h={{ base: '100%', sm: '100%', md: height - 60 }} pl={`4`} pr={4} pt={'4'} pb={{ base: 'sm', sm: 'sm', md: 0 }} className="borderRadiusAll">
                                                            <Box pl={`xs`} pb={'xs'} pr={8} pt={'xs'} className={'boxBackground borderRadiusAll'} >
                                                                <Grid>
                                                                    <Grid.Col h={35}>
                                                                        <Title order={6} pl={'6'}>{t('PersonalInformation')}</Title>
                                                                    </Grid.Col>
                                                                </Grid>
                                                            </Box>
                                                            <Box  >
                                                                <Box pl={'xs'} pr={'4'}>
                                                                    <Box >
                                                                        <Grid gutter={{ base: 4 }} mt={'xs'}>
                                                                            <Grid.Col span={{ base: 12, sm: 12, md: 4, lg: 4 }} >
                                                                                <Box mt={{ base: 1, sm: 1, md: '4', lg: '4' }}>
                                                                                    <Flex
                                                                                        justify="flex-start"
                                                                                        align="center"
                                                                                        direction="row"
                                                                                    >
                                                                                        <Text ta="center" fz="sm" fw={300}>
                                                                                            {t('Name')}<Text component="span" c="red">*</Text>
                                                                                        </Text>
                                                                                    </Flex>
                                                                                </Box>
                                                                            </Grid.Col>
                                                                            <Grid.Col span={{ base: 12, sm: 12, md: 8, lg: 8 }}>
                                                                                <Box  >
                                                                                    <InputForm
                                                                                        tooltip={t('NameValidateMessage')}
                                                                                        placeholder={formData.name}
                                                                                        required={true}
                                                                                        nextField={'email'}
                                                                                        name={'name'}
                                                                                        form={form}
                                                                                        {...form.getInputProps('name')}
                                                                                        mt={0}
                                                                                        id={'name'}
                                                                                    />
                                                                                </Box>
                                                                            </Grid.Col>
                                                                        </Grid>
                                                                    </Box>
                                                                    <Box mt={'xs'}>
                                                                        <Grid gutter={{ base: 4 }}>
                                                                            <Grid.Col span={{ base: 12, sm: 12, md: 4, lg: 4 }}>
                                                                                <Box mt={{ base: 1, sm: 1, md: '4', lg: '4' }}>
                                                                                    <Flex
                                                                                        justify="flex-start"
                                                                                        align="center"
                                                                                        direction="row"
                                                                                    >
                                                                                        <Text ta="center" fz="sm" fw={300}>
                                                                                            {t('Email')}<Text component="span" c="red">*</Text>
                                                                                        </Text>
                                                                                    </Flex>
                                                                                </Box>
                                                                            </Grid.Col>
                                                                            <Grid.Col span={{ base: 12, sm: 12, md: 8, lg: 8 }} >
                                                                                <Box >

                                                                                    <InputForm
                                                                                        tooltip={t('Email')}
                                                                                        // label={t('Email')}
                                                                                        placeholder={formData.email}
                                                                                        required={true}
                                                                                        nextField={'phone'}
                                                                                        name={'email'}
                                                                                        form={form}
                                                                                        {...form.getInputProps('email')}
                                                                                        mt={{ base: 1, sm: 1, md: '0', lg: '0' }}
                                                                                        id={'email'}
                                                                                    />
                                                                                </Box>
                                                                            </Grid.Col>
                                                                        </Grid>
                                                                    </Box>
                                                                    <Box mt={'xs'}>
                                                                        <Grid gutter={{ base: 4 }}>
                                                                            <Grid.Col span={{ base: 12, sm: 12, md: 4, lg: 4 }}>
                                                                                <Box mt={{ base: 1, sm: 1, md: '4', lg: '4' }}>
                                                                                    <Box >
                                                                                        <Flex
                                                                                            justify="flex-start"
                                                                                            align="center"
                                                                                            direction="row"
                                                                                        >
                                                                                            <Text ta="center" fz="sm" fw={300}>
                                                                                                {t('Phone')}<Text component="span" c="red">*</Text>
                                                                                            </Text>
                                                                                        </Flex>
                                                                                    </Box>
                                                                                </Box>
                                                                            </Grid.Col>
                                                                            <Grid.Col span={{ base: 12, sm: 12, md: 8, lg: 8 }}>
                                                                                <Box >
                                                                                    <PhoneNumberInput
                                                                                        country={'bd'}
                                                                                        onChange={(phone) => form.setFieldValue('phone', phone)}
                                                                                        tooltip={t('Phone')}
                                                                                        placeholder="Enter phone number"
                                                                                        required={true}
                                                                                        nextField={'twitterAccount'}
                                                                                        name={'phone'}
                                                                                        form={form}
                                                                                        {...form.getInputProps('phone')}
                                                                                        id={'phone'}
                                                                                    />
                                                                                </Box>
                                                                            </Grid.Col>
                                                                        </Grid>
                                                                    </Box>
                                                                    <Box mt={'xs'}>
                                                                        <Grid gutter={{ base: 4 }}>
                                                                            <Grid.Col span={{ base: 12, sm: 12, md: 4, lg: 4 }}>
                                                                                <Box mt={{ base: 1, sm: 1, md: '6', lg: '6' }}>
                                                                                    <Flex
                                                                                        justify="flex-start"
                                                                                        align="center"
                                                                                        direction="row"
                                                                                    >
                                                                                        <Text
                                                                                            ta="center" fz="sm"
                                                                                            fw={300}>
                                                                                            {t('TwitterAccount')}
                                                                                        </Text>
                                                                                    </Flex>
                                                                                </Box>
                                                                            </Grid.Col>
                                                                            <Grid.Col span={{ base: 12, sm: 12, md: 8, lg: 8 }}>
                                                                                <Box >
                                                                                    <InputForm
                                                                                        tooltip={t('TwitterAccount')}
                                                                                        placeholder={formData.twitterAccount}
                                                                                        required={false}
                                                                                        nextField={'linkedinAccount'}
                                                                                        name={'twitterAccount'}
                                                                                        form={form}
                                                                                        {...form.getInputProps('twitterAccount')}
                                                                                        mt={{ base: 1, sm: 1, md: '0', lg: '0' }}
                                                                                        id={'twitterAccount'}
                                                                                    />
                                                                                </Box>
                                                                            </Grid.Col>
                                                                        </Grid>
                                                                    </Box>
                                                                    <Box mt={'xs'}>
                                                                        <Grid gutter={{ base: 4 }}>
                                                                            <Grid.Col span={{ base: 12, sm: 12, md: 4, lg: 4 }}>
                                                                                <Box mt={{ base: 1, sm: 1, md: '8', lg: '8' }}>
                                                                                    <Flex
                                                                                        justify="flex-start"
                                                                                        align="center"
                                                                                        direction="row"
                                                                                    >
                                                                                        <Text
                                                                                            ta="center" fz="sm"
                                                                                            fw={300}>
                                                                                            {t('LinkedinAccount')}
                                                                                        </Text>
                                                                                    </Flex>
                                                                                </Box>
                                                                            </Grid.Col>
                                                                            <Grid.Col span={{ base: 12, sm: 12, md: 8, lg: 8 }}>
                                                                                <Box >
                                                                                    <InputForm
                                                                                        tooltip={t('LinkedinAccount')}
                                                                                        // label={t('LinkedinAccount')}
                                                                                        placeholder={formData.linkedinAccount}
                                                                                        required={false}
                                                                                        nextField={'fbAccount'}
                                                                                        name={'linkedinAccount'}
                                                                                        form={form}
                                                                                        {...form.getInputProps('linkedinAccount')}
                                                                                        mt={{ base: 1, sm: 1, md: '0', lg: '0' }}
                                                                                        id={'linkedinAccount'}
                                                                                    />
                                                                                </Box>
                                                                            </Grid.Col>
                                                                        </Grid>
                                                                    </Box>
                                                                    <Box mt={'xs'}>
                                                                        <Grid gutter={{ base: 4 }}>
                                                                            <Grid.Col span={{ base: 12, sm: 12, md: 4, lg: 4 }}>
                                                                                <Box mt={{ base: 1, sm: 1, md: '4', lg: '4' }}>
                                                                                    <Flex
                                                                                        justify="flex-start"
                                                                                        align="center"
                                                                                        direction="row"
                                                                                    >
                                                                                        <Text
                                                                                            ta="center" fz="sm"
                                                                                            fw={300}>
                                                                                            {t('FacebookAccount')}
                                                                                        </Text>
                                                                                    </Flex>
                                                                                </Box>
                                                                            </Grid.Col>
                                                                            <Grid.Col span={{ base: 12, sm: 12, md: 8, lg: 8 }}>
                                                                                <Box >
                                                                                    <InputForm
                                                                                        tooltip={t('FacebookAccount')}
                                                                                        placeholder={formData.fbAccount}
                                                                                        required={false}
                                                                                        nextField={'instaAccount'}
                                                                                        name={'fbAccount'}
                                                                                        form={form}
                                                                                        {...form.getInputProps('fbAccount')}
                                                                                        mt={{ base: 1, sm: 1, md: '0', lg: '0' }}
                                                                                        id={'fbAccount'}
                                                                                    />
                                                                                </Box>
                                                                            </Grid.Col>
                                                                        </Grid>
                                                                    </Box>
                                                                    <Box mt={'xs'}>
                                                                        <Grid gutter={{ base: 4 }}>
                                                                            <Grid.Col span={{ base: 12, sm: 12, md: 4, lg: 4 }}>
                                                                                <Box mt={{ base: 1, sm: 1, md: '4', lg: '4' }}>
                                                                                    <Flex
                                                                                        justify="flex-start"
                                                                                        align="center"
                                                                                        direction="row"
                                                                                    >
                                                                                        <Text
                                                                                            ta="center" fz="sm"
                                                                                            fw={300}>
                                                                                            {t('InstaAccount')}
                                                                                        </Text>
                                                                                    </Flex>
                                                                                </Box>
                                                                            </Grid.Col>
                                                                            <Grid.Col span={{ base: 12, sm: 12, md: 8, lg: 8 }}>
                                                                                <Box >
                                                                                    <InputForm
                                                                                        tooltip={t('InstaAccount')}
                                                                                        // label={t('LinkedinAccount')}
                                                                                        placeholder={formData.instaAccount}
                                                                                        required={false}
                                                                                        nextField={'companyName'}
                                                                                        name={'instaAccount'}
                                                                                        form={form}
                                                                                        {...form.getInputProps('instaAccount')}
                                                                                        mt={{ base: 1, sm: 1, md: '0', lg: '0' }}
                                                                                        id={'instaAccount'}
                                                                                    />
                                                                                </Box>
                                                                            </Grid.Col>
                                                                        </Grid>
                                                                    </Box>
                                                                    <Box mt={'xs'}>
                                                                        <Grid gutter={{ base: 4 }}>
                                                                            <Grid.Col span={{ base: 12, sm: 12, md: 4, lg: 4 }}>
                                                                                <Box >
                                                                                    <Flex
                                                                                        mih={{ base: 30, sm: 30, md: 80 }}
                                                                                        gap="md"
                                                                                        mt={{ base: '1', sm: '1', md: 'md', lg: 'md' }}
                                                                                        justify="flex-start"
                                                                                        align="center"
                                                                                        direction="row"
                                                                                    >
                                                                                        <Text
                                                                                            fz="sm"
                                                                                            fw={300}>
                                                                                            {t('ProfilePic')}
                                                                                        </Text>
                                                                                    </Flex>
                                                                                </Box>
                                                                            </Grid.Col>
                                                                            <Grid.Col span={{ base: 12, sm: 12, md: 8, lg: 8 }}>
                                                                                <Box mt={{ base: 'xs', sm: 'xs', md: '2', lg: '2' }} mb={'sm'}>
                                                                                    <ImageUploadDropzone
                                                                                        label={t('ProfilePic')}
                                                                                        id={'profilePic'}
                                                                                        name={'profile_pic'}
                                                                                        form={form}
                                                                                        fieldName={'profilePic'}
                                                                                        required={false}
                                                                                        placeholder={<Image h={rem(150)} fit="contain" src={formData.profilePic} />}
                                                                                        nextField={''}
                                                                                    />
                                                                                </Box>
                                                                            </Grid.Col>
                                                                        </Grid>
                                                                    </Box>
                                                                </Box>
                                                            </Box>
                                                        </Box>
                                                    </Grid.Col>
                                                    {/*     2nd columnd */}

                                                    <Grid.Col span={{ base: 12, sm: 12, md: 6, lg: 6 }} >

                                                        <Box h={{ base: 'auto', sm: 'auto', md: height - 60 }} pl={`4`} pr={4} pt={'4'} pb={{ base: 'sm', sm: 'sm', md: 0 }} className="borderRadiusAll">
                                                            <Box pl={`xs`} pb={'xs'} pr={8} pt={'xs'} className={'boxBackground borderRadiusAll'} >
                                                                <Grid>
                                                                    <Grid.Col h={35}>
                                                                        <Title order={6} pl={'6'}>{t('CompanyInformation')}</Title>
                                                                    </Grid.Col>
                                                                </Grid>
                                                            </Box>
                                                            <Box pl={'xs'} pr={'2'}>
                                                                <Box>
                                                                    <Grid gutter={{ base: 4 }} mt={'xs'}>
                                                                        <Grid.Col span={{ base: 12, sm: 12, md: 4, lg: 4 }} >
                                                                            <Box mt={{ base: 1, sm: 1, md: '4', lg: '4' }}>
                                                                                <Flex
                                                                                    justify="flex-start"
                                                                                    align="center"
                                                                                    direction="row"
                                                                                >
                                                                                    <Text ta="center" fz="sm" fw={300}>
                                                                                        {t('CompanyName')}<Text component="span" c="red">*</Text>
                                                                                    </Text>
                                                                                </Flex>

                                                                            </Box>
                                                                        </Grid.Col>
                                                                        <Grid.Col span={{ base: 12, sm: 12, md: 8, lg: 8 }}>
                                                                            <Box >
                                                                                <InputForm
                                                                                    tooltip={t('CompanyNameValidateMessage')}
                                                                                    placeholder={formData.companyName}
                                                                                    required={true}
                                                                                    nextField={'designation'}
                                                                                    name={'companyName'}
                                                                                    form={form}
                                                                                    {...form.getInputProps('companyName')}
                                                                                    mt={0}
                                                                                    id={'companyName'}
                                                                                />

                                                                            </Box>
                                                                        </Grid.Col>
                                                                    </Grid>
                                                                </Box>
                                                                <Box mt={'xs'}>
                                                                    <Grid gutter={{ base: 4 }} >
                                                                        <Grid.Col span={{ base: 12, sm: 12, md: 4, lg: 4 }} >
                                                                            <Box mt={{ base: 1, sm: 1, md: '4', lg: '4' }}>
                                                                                <Flex
                                                                                    justify="flex-start"
                                                                                    align="center"
                                                                                    direction="row"
                                                                                >
                                                                                    <Text ta="center" fz="sm" fw={300}>
                                                                                        {t('Designation')}<Text component="span" c="red">*</Text>
                                                                                    </Text>
                                                                                </Flex>

                                                                            </Box>
                                                                        </Grid.Col>
                                                                        <Grid.Col span={{ base: 12, sm: 12, md: 8, lg: 8 }}>
                                                                            <Box >
                                                                                <InputForm
                                                                                    tooltip={t('Designation')}
                                                                                    // label={t('CompanyName')}
                                                                                    placeholder={formData.designation}
                                                                                    required={true}
                                                                                    nextField={'companyWebsite'}
                                                                                    name={'designation'}
                                                                                    form={form}
                                                                                    {...form.getInputProps('designation')}
                                                                                    mt={0}
                                                                                    id={'designation'}
                                                                                />

                                                                            </Box>
                                                                        </Grid.Col>
                                                                    </Grid>
                                                                </Box>
                                                                <Box mt={'xs'}>
                                                                    <Grid gutter={{ base: 4 }}>
                                                                        <Grid.Col span={{ base: 12, sm: 12, md: 4, lg: 4 }}>
                                                                            <Box mt={{ base: 1, sm: 1, md: '4', lg: '4' }}>
                                                                                <Flex
                                                                                    justify="flex-start"
                                                                                    align="center"
                                                                                    direction="row"
                                                                                >
                                                                                    <Text ta="center" fz="sm" fw={300}>
                                                                                        {t('CompanyWebsite')}<Text component="span" c="red">*</Text>
                                                                                    </Text>
                                                                                </Flex>

                                                                            </Box>
                                                                        </Grid.Col>
                                                                        <Grid.Col span={{ base: 12, sm: 12, md: 8, lg: 8 }}>
                                                                            <Box >
                                                                                <InputForm
                                                                                    tooltip={t('CompanyWebsite')}
                                                                                    // label={t('CompanyWebsite')}
                                                                                    placeholder={formData.companyWebsite}
                                                                                    required={false}
                                                                                    nextField={'companyEmail'}
                                                                                    name={'companyWebsite'}
                                                                                    form={form}
                                                                                    {...form.getInputProps('companyWebsite')}
                                                                                    mt={{ base: 1, sm: 1, md: '0', lg: '0' }}
                                                                                    id={'companyWebsite'}
                                                                                />
                                                                            </Box>
                                                                        </Grid.Col>
                                                                    </Grid>
                                                                </Box>
                                                                <Box mt={'xs'}>
                                                                    <Grid gutter={{ base: 4 }}>
                                                                        <Grid.Col span={{ base: 12, sm: 12, md: 4, lg: 4 }}>
                                                                            <Box mt={{ base: 1, sm: 1, md: '4', lg: '4' }}>
                                                                                <Flex
                                                                                    justify="flex-start"
                                                                                    align="center"
                                                                                    direction="row"
                                                                                >
                                                                                    <Text
                                                                                        ta="center" fz="sm"
                                                                                        fw={300}>
                                                                                        {t('CompanyEmail')}
                                                                                    </Text>
                                                                                </Flex>
                                                                            </Box>
                                                                        </Grid.Col>
                                                                        <Grid.Col span={{ base: 12, sm: 12, md: 8, lg: 8 }}>
                                                                            <Box >
                                                                                <InputForm
                                                                                    tooltip={t('CompanyEmail')}
                                                                                    // label={t('CompanyEmail')}
                                                                                    placeholder={formData.companyEmail}
                                                                                    required={false}
                                                                                    nextField={'address'}
                                                                                    name={'companyEmail'}
                                                                                    form={form}
                                                                                    {...form.getInputProps('companyEmail')}
                                                                                    mt={{ base: 1, sm: 1, md: '0', lg: '0' }}
                                                                                    id={'companyEmail'}
                                                                                />
                                                                            </Box>
                                                                        </Grid.Col>
                                                                    </Grid>
                                                                </Box>
                                                                <Box mt={'xs'}>
                                                                    <Grid gutter={{ base: 4 }}>
                                                                        <Grid.Col span={{ base: 12, sm: 12, md: 4, lg: 4 }}>
                                                                            <Box >

                                                                                <Flex
                                                                                    mih={{ base: 30, sm: 30, md: 80 }}
                                                                                    gap="md"
                                                                                    mt={{ base: '1', sm: '1', md: '10', lg: '10' }}
                                                                                    justify="flex-start"
                                                                                    align="center"
                                                                                    direction="row"
                                                                                >
                                                                                    <Text ta="center" fz="sm" fw={300}>
                                                                                        {t('CompanyLogo')}<Text component="span" c="red">*</Text>
                                                                                    </Text>
                                                                                </Flex>
                                                                            </Box>
                                                                        </Grid.Col>
                                                                        <Grid.Col span={{ base: 12, sm: 12, md: 8, lg: 8 }}>
                                                                            <Box mt={'2'}>
                                                                                <ImageUploadDropzone
                                                                                    label={t('CompanyLogo')}
                                                                                    id={'companyLogo'}
                                                                                    name={'companyLogo'}
                                                                                    form={form}
                                                                                    fieldName={'companyLogo'}
                                                                                    required={true}
                                                                                    placeholder={<Image h={rem(150)} fit="contain" src={formData.companyLogo} />}
                                                                                    nextField={'address'}

                                                                                />
                                                                            </Box>
                                                                        </Grid.Col>
                                                                    </Grid>
                                                                </Box>
                                                                <Box mt={'4'}>
                                                                    <Grid gutter={{ base: 4 }}>
                                                                        <Grid.Col span={{ base: 12, sm: 12, md: 4, lg: 4 }}>
                                                                            <Box >
                                                                                <Flex
                                                                                    mih={{ base: 30, sm: 30, md: 70 }}
                                                                                    gap="md"
                                                                                    justify="flex-start"
                                                                                    align="center"
                                                                                    direction="row"
                                                                                >
                                                                                    <Text ta="center" fz="sm" fw={300}>
                                                                                        {t('Address')}<Text component="span" c="red">*</Text>
                                                                                    </Text>

                                                                                </Flex>
                                                                            </Box>
                                                                        </Grid.Col>
                                                                        <Grid.Col span={{ base: 12, sm: 12, md: 8, lg: 8 }}>
                                                                            <Box >
                                                                                <Box mt={{ base: '1', sm: '1', md: '6', lg: '6' }}>
                                                                                    <TextAreaForm
                                                                                        tooltip={t('Address')}
                                                                                        placeholder={formData.address}
                                                                                        required={true}
                                                                                        nextField={'EntityFormSubmit'}
                                                                                        name={'address'}
                                                                                        form={form}
                                                                                        {...form.getInputProps('address')}
                                                                                        mt={{ base: 1, sm: 1, md: '0', lg: '0' }}
                                                                                        id={'address'}
                                                                                    />
                                                                                </Box>
                                                                            </Box>
                                                                        </Grid.Col>
                                                                    </Grid>
                                                                </Box>
                                                            </Box>
                                                        </Box>
                                                    </Grid.Col>
                                                </Grid>
                                            </ScrollArea>
                                        </Box>
                                        <Box pl={`sm`} pb={{ base: 'sm', sm: 'sm', md: 'xs' }} pr={8} pt={'xs'} mt={'1'} className={'boxBackground borderRadiusAll'}  >
                                            <Grid span={12}>
                                                <Grid.Col >
                                                    <Stack right align="flex-end" h={30}>
                                                        <>
                                                            {
                                                                !saveCreateLoading && isOnline &&
                                                                <Button
                                                                    size="xs"
                                                                    color={`red.6`}
                                                                    type="submit"
                                                                    id="EntityFormSubmit"
                                                                // onClick={() => {
                                                                //     navigate('/sign-upView')
                                                                // }}
                                                                >

                                                                    <Flex direction={`column`} gap={0}>
                                                                        <Text fz={12} fw={400}>
                                                                            {t("Submit")}
                                                                        </Text>
                                                                    </Flex>
                                                                </Button>
                                                            }
                                                        </></Stack>
                                                </Grid.Col>
                                            </Grid>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Grid.Col >
                </Grid >

            </form >
        </Box >
    );
}

export default SignupEditForm;
