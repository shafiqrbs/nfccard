import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import {
    Button,
    rem, Flex,
    Grid, Box, ScrollArea, Text, Title, Alert, List, Stack, Tooltip, ActionIcon,
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

import TextAreaForm from "../../form-builders/TextAreaForm";
import getLocationDropdownData from "../../global-hook/dropdown/getLocationDropdownData.js";
import getExecutiveDropdownData from "../../global-hook/dropdown/getExecutiveDropdownData.js";
import ImageUploadDropzone from "../../form-builders/ImageUploadDropzone.jsx";

function SignupForm() {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    const { isOnline, mainAreaHeight } = useOutletContext();
    const height = mainAreaHeight - 80; //TabList height 104
    const [opened, { open, close }] = useDisclosure(false);

    const [saveCreateLoading, setSaveCreateLoading] = useState(false);
    const [customerGroupData, setCustomerGroupData] = useState(null);
    const [locationData, setLocationData] = useState(null);
    const [marketingExeData, setMarketingExeData] = useState(null);

    const validationMessage = useSelector((state) => state.crudSlice.validationMessage)
    const validation = useSelector((state) => state.crudSlice.validation)
    const entityNewData = useSelector((state) => state.crudSlice.entityNewData)

    const locationDropdown = getLocationDropdownData();
    const executiveDropdown = getExecutiveDropdownData();

    const form = useForm({
        initialValues: {
            name: '',
            email: '',
            phone: '',
            twitterAccount: '',
            linkedinAccount: '',
            profilePic: [],
            companyName: '',
            designation: '',
            companyWebsite: '',
            companyEmail: '',
            companyLogo: [],
            address: '',
        },
        validate: {
            name: hasLength({ min: 2, max: 20 }),
            companyName: hasLength({ min: 2, max: 20 }),
            designation: hasLength({ min: 2, max: 20 }),
            phone: (value) => (!/^\d+$/.test(value)),
            email: (value) => {
                if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    return true;
                }
                return null;
            },
            address: hasLength({ min: 2, max: 20 }),
            companyWebsite: hasLength({ min: 2, max: 20 }),
            companyLogo: (value) => value.length === 0,
        }
    });
    useEffect(() => {
        if (validation) {
            validationMessage.name && (form.setFieldError('name', true));
            validationMessage.companyName && (form.setFieldError('companyName', true));
            validationMessage.mobile && (form.setFieldError('phone', true));
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
                setMarketingExeData(null)
                setCustomerGroupData(null)
                setLocationData(null)
                dispatch(setEntityNewData([]))
                dispatch(setFetching(true))
            }, 700)
        }
    }, [validation, validationMessage, form]);



    return (
        <Box >
            <form onSubmit={form.onSubmit((values) => {
                dispatch(setValidationData(false))
                modals.openConfirmModal({
                    title: (
                        <Text size="md"> {t("FormConfirmationTitle")}</Text>
                    ),
                    children: (
                        <Text size="sm"> {t("FormConfirmationMessage")}</Text>
                    ),
                    labels: { confirm: t('Submit'), cancel: t('Cancel') }, confirmProps: { color: 'red' },
                    onCancel: () => console.log('Cancel'),
                    onConfirm: () => {
                        const value = {
                            url: 'core/customer',
                            data: values
                        }
                        dispatch(storeEntityData(value))
                    },
                });
            })}>
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

                                        <Box mt={'xs'}>
                                            <ScrollArea h={height - 60} scrollbarSize={2} scrollbars="y" type="never"  >
                                                <Grid columns={12} >
                                                    {/* 1st column */}
                                                    <Grid.Col span={{ base: 12, sm: 12, md: 6, lg: 6 }}    >
                                                        <Box h={{ base: '100%', sm: '100%', md: height - 70 }} pl={`xs`} pr={8} pt={'xs'} pb={{ base: 'sm', sm: 'sm', md: 0 }} className="borderRadiusAll">
                                                            <Box pl={`xs`} pb={'xs'} pr={8} pt={'xs'} className={'boxBackground borderRadiusAll'} >
                                                                <Grid>
                                                                    <Grid.Col h={35}>
                                                                        <Title order={6} pl={'6'}>{t('PersonalInformation')}</Title>
                                                                    </Grid.Col>
                                                                </Grid>
                                                            </Box>
                                                            <Box  >
                                                                <Box>
                                                                    <Grid gutter={{ base: 4 }} mt={'xs'}>
                                                                        <Grid.Col span={{ base: 12, sm: 12, md: 4, lg: 4 }} >
                                                                            <Box mt={{ base: 1, sm: 1, md: 'xs', lg: 'xs' }}>
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
                                                                            <Box mt={1} >
                                                                                <InputForm
                                                                                    tooltip={t('NameValidateMessage')}
                                                                                    placeholder={t('Name')}
                                                                                    required={true}
                                                                                    nextField={'email'}
                                                                                    name={'name'}
                                                                                    form={form}
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
                                                                            <Box mt={{ base: 1, sm: 1, md: 'md', lg: 'md' }}>
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
                                                                        <Grid.Col span={{ base: 12, sm: 12, md: 8, lg: 8 }}>
                                                                            <Box >
                                                                                <InputForm
                                                                                    tooltip={t('Email')}
                                                                                    // label={t('Email')}
                                                                                    placeholder={t('Email')}
                                                                                    required={true}
                                                                                    nextField={'phone'}
                                                                                    name={'email'}
                                                                                    form={form}
                                                                                    mt={{ base: 1, sm: 1, md: '8', lg: '8' }}
                                                                                    id={'email'}
                                                                                />
                                                                            </Box>
                                                                        </Grid.Col>
                                                                    </Grid>
                                                                </Box>
                                                                <Box mt={'xs'}>
                                                                    <Grid gutter={{ base: 4 }}>
                                                                        <Grid.Col span={{ base: 12, sm: 12, md: 4, lg: 4 }}>
                                                                            <Box mt={{ base: 1, sm: 1, md: 'md', lg: 'md' }}>
                                                                                <Box mt={{ base: 1, sm: 1, md: 'md', lg: 'md' }}>
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
                                                                                <InputForm
                                                                                    tooltip={t('Phone')}
                                                                                    // label={t('Phone')}
                                                                                    placeholder={t('Phone')}
                                                                                    required={true}
                                                                                    nextField={'twitterAccount'}
                                                                                    name={'phone'}
                                                                                    form={form}
                                                                                    mt={{ base: 1, sm: 1, md: '8', lg: '8' }}
                                                                                    id={'phone'}
                                                                                />
                                                                            </Box>
                                                                        </Grid.Col>
                                                                    </Grid>
                                                                </Box>
                                                                <Box mt={'xs'}>
                                                                    <Grid gutter={{ base: 4 }}>
                                                                        <Grid.Col span={{ base: 12, sm: 12, md: 4, lg: 4 }}>
                                                                            <Box mt={{ base: 1, sm: 1, md: 'md', lg: 'md' }}>
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
                                                                                    // label={t('CompanyEmail')}
                                                                                    placeholder={t('TwitterAccount')}
                                                                                    required={false}
                                                                                    nextField={'linkedinAccount'}
                                                                                    name={'twitter_account'}
                                                                                    form={form}
                                                                                    mt={{ base: 1, sm: 1, md: '8', lg: '8' }}
                                                                                    id={'twitterAccount'}
                                                                                />
                                                                            </Box>
                                                                        </Grid.Col>
                                                                    </Grid>
                                                                </Box>
                                                                <Box mt={'xs'}>
                                                                    <Grid gutter={{ base: 4 }}>
                                                                        <Grid.Col span={{ base: 12, sm: 12, md: 4, lg: 4 }}>
                                                                            <Box mt={{ base: 1, sm: 1, md: 'md', lg: 'md' }}>
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
                                                                                    placeholder={t('LinkedinAccount')}
                                                                                    required={false}
                                                                                    nextField={'companyName'}
                                                                                    name={'linkedinAccount'}
                                                                                    form={form}
                                                                                    mt={{ base: 1, sm: 1, md: '8', lg: '8' }}
                                                                                    id={'linkedinAccount'}
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
                                                                                    mt={{ base: '1', sm: '1', md: 'sm', lg: 'sm' }}
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
                                                                            <Box mt={{ base: 'xs', sm: 'xs', md: 'xs', lg: 'xs' }}>
                                                                                <ImageUploadDropzone
                                                                                    label={t('ProfilePic')}
                                                                                    id={'profilePic'}
                                                                                    name={'profile_pic'}
                                                                                    form={form}
                                                                                    required={false}
                                                                                    placeholder={t('DropProfilePictureHere')}
                                                                                    nextField={''}
                                                                                />
                                                                            </Box>
                                                                        </Grid.Col>
                                                                    </Grid>
                                                                </Box>
                                                            </Box>
                                                        </Box>
                                                    </Grid.Col>
                                                    {/*     2nd columnd */}

                                                    <Grid.Col span={{ base: 12, sm: 12, md: 6, lg: 6 }} >

                                                        <Box h={{ base: 'auto', sm: 'auto', md: height - 70 }} pl={`xs`} pr={8} pt={'xs'} pb={{ base: 'sm', sm: 'sm', md: 0 }} className="borderRadiusAll">
                                                            <Box pl={`xs`} pb={'xs'} pr={8} pt={'xs'} className={'boxBackground borderRadiusAll'} >
                                                                <Grid>
                                                                    <Grid.Col h={35}>
                                                                        <Title order={6} pl={'6'}>{t('CompanyInformation')}</Title>
                                                                    </Grid.Col>
                                                                </Grid>
                                                            </Box>
                                                            <Box  >
                                                                <Box>
                                                                    <Grid gutter={{ base: 4 }} mt={'xs'}>
                                                                        <Grid.Col span={{ base: 12, sm: 12, md: 4, lg: 4 }} >
                                                                            <Box mt={{ base: 1, sm: 1, md: 'xs', lg: 'xs' }}>
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
                                                                                    placeholder={t('CompanyName')}
                                                                                    required={true}
                                                                                    nextField={'designation'}
                                                                                    name={'companyName'}
                                                                                    form={form}
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
                                                                            <Box mt={{ base: 1, sm: 1, md: 'xs', lg: 'xs' }}>
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
                                                                                    placeholder={t('Designation')}
                                                                                    required={true}
                                                                                    nextField={'companyWebsite'}
                                                                                    name={'designation'}
                                                                                    form={form}
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
                                                                            <Box mt={{ base: 1, sm: 1, md: 'md', lg: 'md' }}>
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
                                                                                    placeholder={t('CompanyWebsite')}
                                                                                    required={false}
                                                                                    nextField={'companyEmail'}
                                                                                    name={'companyWebsite'}
                                                                                    form={form}
                                                                                    mt={{ base: 1, sm: 1, md: '8', lg: '8' }}
                                                                                    id={'companyWebsite'}
                                                                                />
                                                                            </Box>
                                                                        </Grid.Col>
                                                                    </Grid>
                                                                </Box>
                                                                <Box mt={'xs'}>
                                                                    <Grid gutter={{ base: 4 }}>
                                                                        <Grid.Col span={{ base: 12, sm: 12, md: 4, lg: 4 }}>
                                                                            <Box mt={{ base: 1, sm: 1, md: 'md', lg: 'md' }}>
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
                                                                                    placeholder={t('CompanyEmail')}
                                                                                    required={false}
                                                                                    nextField={'address'}
                                                                                    name={'company_email'}
                                                                                    form={form}
                                                                                    mt={{ base: 1, sm: 1, md: '8', lg: '8' }}
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
                                                                                    mt={{ base: '1', sm: '1', md: 'sm', lg: 'sm' }}
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
                                                                            <Box mt={'xs'}>
                                                                                <ImageUploadDropzone
                                                                                    label={t('CompanyLogo')}
                                                                                    id={'companyLogo'}
                                                                                    name={'companyLogo'}
                                                                                    form={form}
                                                                                    required={true}
                                                                                    placeholder={t('DropCompanyLogoHere')}
                                                                                    nextField={'address'}

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
                                                                                <Box mt={{ base: '1', sm: '1', md: '1', lg: '1' }}>
                                                                                    <TextAreaForm
                                                                                        tooltip={t('Address')}
                                                                                        placeholder={t('Address')}
                                                                                        required={true}
                                                                                        nextField={'EntityFormSubmit'}
                                                                                        name={'address'}
                                                                                        form={form}
                                                                                        mt={{ base: 1, sm: 1, md: '8', lg: '8' }}
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
                                                                // leftSection={<IconDeviceFloppy size={16} />}
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

export default SignupForm;
