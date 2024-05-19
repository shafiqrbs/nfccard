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

import Shortcut from "../shortcut/Shortcut.jsx";
import InputForm from "../../form-builders/InputForm.jsx";
import SelectForm from "../../form-builders/SelectForm";
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
            customer_group: '',
            credit_limit: '',
            reference_id: '',
            mobile: '',
            alternative_mobile: '',
            email: '',
            location_id: '',
            marketing_id: '',
            address: '',
        },
        validate: {
            name: hasLength({ min: 2, max: 20 }),
            mobile: (value) => (!/^\d+$/.test(value)),
            email: (value) => {
                if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    return true;
                }
                return null;
            },
            credit_limit: (value) => {
                if (value) {
                    const isNumberOrFractional = /^-?\d+(\.\d+)?$/.test(value);
                    if (!isNumberOrFractional) {
                        return true;
                    }
                }
                return null;
            },
            alternative_mobile: (value) => {
                if (value && value.trim()) {
                    const isDigitsOnly = /^\d+$/.test(value);
                    if (!isDigitsOnly) {
                        return true;
                    }
                }
                return null;
            },
        }
    });


    useEffect(() => {
        if (validation) {
            validationMessage.name && (form.setFieldError('name', true));
            validationMessage.mobile && (form.setFieldError('mobile', true));
            validationMessage.email && (form.setFieldError('email', true));
            validationMessage.credit_limit && (form.setFieldError('credit_limit', true));
            validationMessage.alternative_mobile && (form.setFieldError('alternative_mobile', true));
            dispatch(setValidationData(false))
        }

        if (entityNewData.message === 'success') {
            notifications.show({
                color: 'teal',
                title: t('CreateSuccessfully'),
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

    useHotkeys([['alt+n', () => {
        document.getElementById('CustomerName').focus()
    }]], []);

    useHotkeys([['alt+r', () => {
        form.reset()
    }]], []);

    useHotkeys([['alt+s', () => {
        document.getElementById('EntityFormSubmit').click()
    }]], []);


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
                    <Grid.Col p={'0'}>
                        <Box bg={'white'} p={'xs'} className={'borderRadiusAll'} >
                            <Box bg={"white"} >
                                <Box pl={`xs`} pb={'xs'} pr={8} pt={'xs'} mb={'xs'} className={'boxBackground borderRadiusAll'} >
                                    <Grid>
                                        <Grid.Col span={8} h={54}>
                                            <Title order={6} mt={'xs'} pl={'6'}>{t('Welcome to Signup')}</Title>
                                        </Grid.Col>
                                        <Grid.Col span={4}>
                                            <Stack right align="flex-end">
                                                <>
                                                    {
                                                        !saveCreateLoading && isOnline &&
                                                        <Button
                                                            size="xs"
                                                            color={`red.6`}
                                                            type="submit"
                                                            mt={4}
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
                                <Box pl={`xs`} pr={'xs'} mt={'xs'} className={'borderRadiusAll'}>
                                    <ScrollArea h={height} scrollbarSize={2} scrollbars="y" type="never">
                                        <Box>
                                            {
                                                Object.keys(form.errors).length > 0 && validationMessage != 0 &&
                                                <Alert variant="light" color="red" radius="md" title={
                                                    <List withPadding size="sm">
                                                        {validationMessage.name && <List.Item>{t('NameValidateMessage')}</List.Item>}
                                                        {validationMessage.mobile && <List.Item>{t('MobileValidateMessage')}</List.Item>}
                                                        {validationMessage.alternative_mobile && <List.Item>{t('AlternativeMobile')}</List.Item>}
                                                    </List>
                                                }></Alert>
                                            }
                                            <Box mt={'xs'}>
                                                <Grid gutter={{ base: 4 }}>
                                                    <Grid.Col span={{ base: 12, sm: 12, md: 4, lg: 4 }}>
                                                        <Box mt={{ base: 1, sm: 1, md: 'xs', lg: 'xs' }}>
                                                            <Flex
                                                                justify="flex-start"
                                                                align="center"
                                                                direction="row"
                                                            >
                                                                <Text
                                                                    textAlign="center"
                                                                    fz="sm"
                                                                    fw={300}>
                                                                    {t('CompanyName')}
                                                                </Text>
                                                            </Flex>
                                                        </Box>
                                                    </Grid.Col>
                                                    <Grid.Col span={{ base: 12, sm: 12, md: 8, lg: 8 }}>
                                                        <Box >
                                                            <InputForm
                                                                tooltip={t('CompanyName')}
                                                                // label={t('CompanyName')}
                                                                placeholder={t('CompanyName')}
                                                                required={true}
                                                                nextField={'customerName'}
                                                                name={'company_name'}
                                                                form={form}
                                                                mt={0}
                                                                id={'companyName'}
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
                                                                    textAlign="center" fz="sm"
                                                                    fw={300}>
                                                                    {t('Name')}
                                                                </Text>
                                                            </Flex>
                                                        </Box>
                                                    </Grid.Col>
                                                    <Grid.Col span={{ base: 12, sm: 12, md: 8, lg: 8 }}>
                                                        <Box >
                                                            <InputForm
                                                                tooltip={t('Name')}
                                                                // label={t('Name')}
                                                                placeholder={t('Name')}
                                                                required={true}
                                                                nextField={'designation'}
                                                                name={'customer_name'}
                                                                form={form}
                                                                mt={{ base: 1, sm: 1, md: '8', lg: '8' }}
                                                                id={'customerName'}
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
                                                                    {t('Designation')}
                                                                </Text>
                                                            </Flex>
                                                        </Box>
                                                    </Grid.Col>
                                                    <Grid.Col span={{ base: 12, sm: 12, md: 8, lg: 8 }}>
                                                        <Box >
                                                            <InputForm
                                                                tooltip={t('Designation')}
                                                                // label={t('Designation')}
                                                                placeholder={t('Designation')}
                                                                required={true}
                                                                nextField={'email'}
                                                                name={'designation'}
                                                                form={form}
                                                                mt={{ base: 1, sm: 1, md: '8', lg: '8' }}
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
                                                                <Text
                                                                    ta="center" fz="sm"
                                                                    fw={300}>
                                                                    {t('Email')}
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
                                                            <Flex
                                                                justify="flex-start"
                                                                align="center"
                                                                direction="row"
                                                            >
                                                                <Text
                                                                    ta="center" fz="sm"
                                                                    fw={300}>
                                                                    {t('Phone')}
                                                                </Text>
                                                            </Flex>
                                                        </Box>
                                                    </Grid.Col>
                                                    <Grid.Col span={{ base: 12, sm: 12, md: 8, lg: 8 }}>
                                                        <Box >
                                                            <InputForm
                                                                tooltip={t('Phone')}
                                                                // label={t('Phone')}
                                                                placeholder={t('Phone')}
                                                                required={true}
                                                                nextField={'companyWebsite'}
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
                                                                    {t('CompanyWebsite')}
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
                                                                name={'company_website'}
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
                                                                nextField={'twitterAccount'}
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
                                                        <Box mt={{ base: 1, sm: 1, md: 'md', lg: 'md' }}>
                                                            <Flex
                                                                justify="flex-start"
                                                                align="center"
                                                                direction="row"
                                                            >
                                                                <Text
                                                                    ta="center" fz="sm"
                                                                    fw={300}>
                                                                    {t('x(Twitter)Account')}
                                                                </Text>
                                                            </Flex>
                                                        </Box>
                                                    </Grid.Col>
                                                    <Grid.Col span={{ base: 12, sm: 12, md: 8, lg: 8 }}>
                                                        <Box >
                                                            <InputForm
                                                                tooltip={t('x(Twitter)Account')}
                                                                // label={t('CompanyEmail')}
                                                                placeholder={t('x(Twitter)Account')}
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
                                                                nextField={'profilePic'}
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
                                                                justify="flex-start"
                                                                align="center"
                                                                direction="row"
                                                            >
                                                                <Text
                                                                    fz="sm"
                                                                    fw={300}>
                                                                    {t('profilePic')}
                                                                </Text>
                                                            </Flex>
                                                        </Box>
                                                    </Grid.Col>
                                                    <Grid.Col span={{ base: 12, sm: 12, md: 8, lg: 8 }}>
                                                        <Box mt={{ base: 'xs', sm: 'xs', md: 'xs', lg: 'xs' }}>
                                                            <ImageUploadDropzone
                                                                label={t('profilePic')}
                                                                id={'profilePic'}
                                                                name={'profile_pic'}
                                                                form={form}
                                                                required={false}
                                                                placeholder={t('DropProfilePictureHere')}
                                                                nextField={'removeImage'}

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
                                                                <Text
                                                                    fz="sm"
                                                                    fw={300}>
                                                                    {t('CompanyLogo')}
                                                                </Text>
                                                            </Flex>
                                                        </Box>
                                                    </Grid.Col>
                                                    <Grid.Col span={{ base: 12, sm: 12, md: 8, lg: 8 }}>
                                                        <Box mt={'xs'}>
                                                            <ImageUploadDropzone
                                                                label={t('CompanyLogo')}
                                                                id={'companyLogo'}
                                                                name={'ompany_logo'}
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
                                                                <Text
                                                                    fz="sm"
                                                                    fw={300}>
                                                                    {t('Address')}
                                                                </Text>
                                                            </Flex>
                                                        </Box>
                                                    </Grid.Col>
                                                    <Grid.Col span={{ base: 12, sm: 12, md: 8, lg: 8 }}>
                                                        <Box >
                                                            <Box mt={{ base: 'xs', sm: 'xs', md: 'xs', lg: 'xs' }} mb={'xs'}>
                                                                <TextAreaForm
                                                                    tooltip={t('Address')}
                                                                    placeholder={t('Address')}
                                                                    required={true}
                                                                    nextField={''}
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
                                    </ScrollArea>
                                </Box>
                            </Box>
                        </Box>
                    </Grid.Col>
                    {/* <Grid.Col span={1} >
                        <Box bg={'white'} className={'borderRadiusAll'} pt={'16'} >
                            <Shortcut
                                form={form}
                                FormSubmit={'EntityFormSubmit'}
                                Name={'name'}
                                inputType="select"
                            />
                        </Box>
                    </Grid.Col> */}
                </Grid>

            </form>
        </Box>
    );
}

export default SignupForm;
