import React, { useEffect, useState } from "react";
import {
    Box,
    Grid, Progress, Title, Container,
    Image,
    ScrollArea,
    Stack,
    Button,
    Flex,
    Text,
    rem,
    Space,
    Divider,
    GridCol,
    Anchor,
    em,
    Card, Avatar, Group, ActionIcon
} from "@mantine/core";
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from "react-redux";
import {
    IconPhone,
    IconLocation,
    IconPhoneFilled,
    IconMailFilled,
    IconBrandWhatsapp,
    IconDeviceLandlinePhone,
    IconMailOpenedFilled,
    IconAddressBook,
    IconWorld,
    IconBuilding,
    IconMail,
    IconDeviceFloppy,
    IconUserPlus,
    IconShare
} from '@tabler/icons-react'
import { getLoadingProgress } from "../../global-hook/loading-progress/getLoadingProgress.js";
import { useLocalStorage } from '@mantine/hooks';
import { Navigate, useOutletContext } from "react-router-dom";
import { useDisclosure, useHotkeys, useMediaQuery } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";
import { readLocalStorageValue } from '@mantine/hooks';

import facebook from '../../../assets/images/facebook.png';
import twitter from '../../../assets/images/twitter.png';
import linkedin from '../../../assets/images/linkedin.png';
import instagram from '../../../assets/images/instagram.png';


function ViewCard() {


    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    const { isOnline, mainAreaHeight } = useOutletContext();
    const height = mainAreaHeight - 30;
    const [opened, { open, close }] = useDisclosure(false);
    const navigate = useNavigate();

    const formData = readLocalStorageValue({ key: 'signup-form-data' });

    const isMobile = useMediaQuery(`(max-width: ${em(750)})`);




    return (
        <Box >
            <ScrollArea h={height} scrollbars='y'>


                <Container fluid size='100%' bg='var(--mantine-color-blue-8)' >
                    <Flex justify='center' align='center' >
                        <Stack gap={0}>
                            <Card shadow="xl" pt={'lg'} pl={'lg'} pr={'lg'} pb={0} w={500} mb={0} variant="gradient"
                                gradient={{ from: 'blue', to: 'cyan', deg: 90 }} bg='var(--mantine-color-blue-8 )'>
                                <Flex justify='center' align='center' mt={'lg'}>
                                    <Avatar src={formData.profile_pic} size={100} radius="100%" />
                                </Flex>
                                <Text align="center" size="xl" weight={500} mt="md" c={'white'}>
                                    {formData.name}
                                </Text>
                                <Text align="center" c="white " size="sm">
                                    {formData.designation}
                                </Text>

                                <Grid columns={12} gutter={0} pt={'md'}>
                                    <Grid.Col span={6} style={{
                                        border: 'none', borderTop: '1px solid var(--mantine-color-gray-4)', borderRight: '1px solid var(--mantine-color-gray-4)', borderRadius: '0px 0 0 0',
                                    }}>
                                        <Flex justify={'center'} align={'center'} direction={'column'}>
                                            <Flex justify='center' align='center' pt={'xs'}>
                                                <ActionIcon variant="filled" bg='var(--mantine-color-blue-8)' c='var(--mantine-color-gray-5)'>
                                                    <IconPhone style={{ width: '100%', height: '100%' }} stroke={1} />
                                                </ActionIcon>
                                            </Flex>
                                            < Button variant="outline" c='var(--mantine-color-gray-0)' fullWidth style={{ border: 'none' }}>
                                                {t('Call')}
                                            </Button>
                                        </Flex>

                                    </Grid.Col>
                                    <Grid.Col span={6} style={{ border: 'none', borderTop: '1px solid var(--mantine-color-gray-4)', borderRadius: '0px 0 0 0' }} >
                                        <Flex justify={'center'} align={'center'} direction={'column'}>
                                            <Flex justify='center' align='center' pt={'xs'}>
                                                <ActionIcon variant="filled" bg='var(--mantine-color-blue-8)' c='var(--mantine-color-gray-5)'>
                                                    <IconMail style={{ width: '100%', height: '100%' }} stroke={1} />
                                                </ActionIcon>
                                            </Flex>
                                            < Button variant="outline" c='var(--mantine-color-gray-0)' fullWidth style={{ border: 'none' }}>
                                                {t('Email')}
                                            </Button>
                                        </Flex>
                                    </Grid.Col>
                                </Grid>
                            </Card>
                        </Stack>
                    </Flex>
                </Container>
                <Container >
                    <Flex justify='center' align='center' >
                        <Stack >
                            <Card shadow="md" w={500} pt={0} mt={0} >

                                <Text mt="md" size="sm" c={'dimmed'}>
                                    {formData.about}
                                </Text>
                                <Title order={4} mt={'md'}>Personal Information</Title>
                                <Divider my={'xs'} size={'xs'} />
                                <Grid columns={12} gutter={0}>
                                    <Grid.Col span={1.5}>
                                        <Flex justify='flex-start' align='center' pt={'xs'}>
                                            <ActionIcon bg={'var(--mantine-color-gray-7)'} radius={'100%'} size={'lg'} p={'6'} >
                                                <IconPhone style={{ width: '100%', height: '100%' }} stroke={1} c />
                                            </ActionIcon>
                                        </Flex>
                                    </Grid.Col>
                                    <Grid.Col span={10.5}>
                                        <Flex justify='flex-start' direction={'column'} >
                                            < Text fw={500} size="lg">
                                                {t('Mobile')}
                                            </Text>
                                            < Text c={'dimmed'}>
                                                {formData.phone}
                                            </Text>
                                        </Flex>
                                        <Divider mt={'xs'} />
                                    </Grid.Col>
                                </Grid>
                                <Grid columns={12} gutter={0} mt={'xs'}>
                                    <Grid.Col span={1.5}>
                                        <Flex justify='flex-start' align='center' pt={'xs'}>
                                            <ActionIcon bg={'var(--mantine-color-gray-7)'} radius={'100%'} size={'lg'} p={'6'} >
                                                <IconBrandWhatsapp style={{ width: '100%', height: '100%' }} stroke={1} c />
                                            </ActionIcon>
                                        </Flex>
                                    </Grid.Col>
                                    <Grid.Col span={10.5}>
                                        <Flex justify='flex-start' direction={'column'} >
                                            < Text fw={500} size="lg">
                                                {t('WhatsAppNumber')}
                                            </Text>
                                            < Text c={'dimmed'}>
                                                {formData.phone}
                                            </Text>
                                        </Flex>
                                        <Divider mt={'xs'} />
                                    </Grid.Col>
                                </Grid>

                                <Grid columns={12} gutter={0} mt={'xs'}>
                                    <Grid.Col span={1.5}>
                                        <Flex justify='flex-start' align='center' pt={'xs'}>
                                            <ActionIcon bg={'var(--mantine-color-gray-7)'} radius={'100%'} size={'lg'} p={'6'} >
                                                <IconDeviceLandlinePhone style={{ width: '100%', height: '100%' }} stroke={1} c />
                                            </ActionIcon>
                                        </Flex>
                                    </Grid.Col>
                                    <Grid.Col span={10.5}>
                                        <Flex justify='flex-start' direction={'column'} >
                                            < Text fw={500} size="lg">
                                                {t('PhoneNumber')}
                                            </Text>
                                            < Text c={'dimmed'}>
                                                {formData.phone}
                                            </Text>
                                        </Flex>
                                        <Divider mt={'xs'} />
                                    </Grid.Col>
                                </Grid>

                                <Grid columns={12} gutter={0} mt={'xs'}>
                                    <Grid.Col span={1.5}>
                                        <Flex justify='flex-start' align='center' pt={'xs'}>
                                            <ActionIcon bg={'var(--mantine-color-gray-7)'} radius={'100%'} size={'lg'} p={'6'} >
                                                <IconMailOpenedFilled style={{ width: '100%', height: '100%' }} stroke={1} c />
                                            </ActionIcon>
                                        </Flex>
                                    </Grid.Col>
                                    <Grid.Col span={10.5}>
                                        <Flex justify='flex-start' direction={'column'} >
                                            < Text fw={500} size="lg">
                                                {t('Email')}
                                            </Text>
                                            < Text c={'dimmed'}>
                                                {formData.email}
                                            </Text>
                                        </Flex>
                                        <Divider mt={'xs'} />
                                    </Grid.Col>
                                </Grid>
                                <Grid columns={12} gutter={0} mt={'xs'}>
                                    <Grid.Col span={1.5}>
                                        <Flex justify='flex-start' align='center' pt={'xs'}>
                                            <ActionIcon bg={'var(--mantine-color-gray-7)'} radius={'100%'} size={'lg'} p={'6'} >
                                                <IconAddressBook style={{ width: '100%', height: '100%' }} stroke={1} c />
                                            </ActionIcon>
                                        </Flex>
                                    </Grid.Col>
                                    <Grid.Col span={10.5}>
                                        <Flex justify='flex-start' direction={'column'} >
                                            < Text fw={500} size="lg">
                                                {t('Address')}
                                            </Text>
                                            < Text c={'dimmed'}>
                                                {formData.address}
                                            </Text>
                                        </Flex>
                                        <Divider mt={'xs'} />
                                    </Grid.Col>
                                </Grid>
                                <Grid columns={12} gutter={0} mt={'xs'}>
                                    <Grid.Col span={1.5}>
                                        <Flex justify='flex-start' align='center' pt={'xs'}>
                                            <ActionIcon bg={'var(--mantine-color-gray-7)'} radius={'100%'} size={'lg'} p={'6'} >
                                                <IconWorld style={{ width: '100%', height: '100%' }} stroke={1} c />
                                            </ActionIcon>
                                        </Flex>
                                    </Grid.Col>
                                    <Grid.Col span={10.5}>
                                        <Flex justify='flex-start' direction={'column'} >
                                            < Text fw={500} size="lg">
                                                {t('Website')}
                                            </Text>
                                            < Text c={'dimmed'}>
                                                {formData.companyWebsite}
                                            </Text>
                                        </Flex>
                                        <Divider mt={'xs'} />
                                    </Grid.Col>
                                </Grid>



                                {/* Second Section */}





                                <Title order={4} mt={'md'}>O{t('OrganizationInformation')}</Title>
                                <Divider my={'xs'} size={'xs'} />



                                <Grid columns={12} gutter={0} mt={'xs'}>
                                    <Grid.Col span={1.5}>
                                        <Flex justify='flex-start' align='center' pt={'xs'}>
                                            <ActionIcon bg={'var(--mantine-color-gray-7)'} radius={'100%'} size={'lg'} p={'6'} >
                                                <IconBuilding style={{ width: '100%', height: '100%' }} stroke={1} c />
                                            </ActionIcon>
                                        </Flex>
                                    </Grid.Col>
                                    <Grid.Col span={10.5}>
                                        <Flex justify='flex-start' direction={'column'} >
                                            < Text fw={500} size="lg">
                                                {t('CompanyName')}
                                            </Text>
                                            < Text c={'dimmed'}>
                                                {formData.companyName}
                                            </Text>
                                        </Flex>
                                        <Divider mt={'xs'} />
                                    </Grid.Col>
                                </Grid>
                                <Grid columns={12} gutter={0} mt={'xs'}>
                                    <Grid.Col span={1.5}>
                                        <Flex justify='flex-start' align='center' pt={'xs'}>
                                            <ActionIcon bg={'var(--mantine-color-gray-7)'} radius={'100%'} size={'lg'} p={'6'} >
                                                <IconPhone style={{ width: '100%', height: '100%' }} stroke={1} c />
                                            </ActionIcon>
                                        </Flex>
                                    </Grid.Col>
                                    <Grid.Col span={10.5}>
                                        <Flex justify='flex-start' direction={'column'} >
                                            < Text fw={500} size="lg">
                                                {t('Mobile')}
                                            </Text>
                                            < Text c={'dimmed'}>
                                                {formData.phone}
                                            </Text>
                                        </Flex>
                                        <Divider mt={'xs'} />
                                    </Grid.Col>
                                </Grid>
                                <Grid columns={12} gutter={0} mt={'xs'}>
                                    <Grid.Col span={1.5}>
                                        <Flex justify='flex-start' align='center' pt={'xs'}>
                                            <ActionIcon bg={'var(--mantine-color-gray-7)'} radius={'100%'} size={'lg'} p={'6'} >
                                                <IconBrandWhatsapp style={{ width: '100%', height: '100%' }} stroke={1} c />
                                            </ActionIcon>
                                        </Flex>
                                    </Grid.Col>
                                    <Grid.Col span={10.5}>
                                        <Flex justify='flex-start' direction={'column'} >
                                            < Text fw={500} size="lg">
                                                {t('WhatsAppNumber')}
                                            </Text>
                                            < Text c={'dimmed'}>
                                                {formData.phone}
                                            </Text>
                                        </Flex>
                                        <Divider mt={'xs'} />
                                    </Grid.Col>
                                </Grid>
                                <Grid columns={12} gutter={0} mt={'xs'}>
                                    <Grid.Col span={1.5}>
                                        <Flex justify='flex-start' align='center' pt={'xs'}>
                                            <ActionIcon bg={'var(--mantine-color-gray-7)'} radius={'100%'} size={'lg'} p={'6'} >
                                                <IconDeviceLandlinePhone style={{ width: '100%', height: '100%' }} stroke={1} c />
                                            </ActionIcon>
                                        </Flex>
                                    </Grid.Col>
                                    <Grid.Col span={10.5}>
                                        <Flex justify='flex-start' direction={'column'} >
                                            < Text fw={500} size="lg">
                                                {t('PhoneNumber')}
                                            </Text>
                                            < Text c={'dimmed'}>
                                                {formData.phone}
                                            </Text>
                                        </Flex>
                                        <Divider mt={'xs'} />
                                    </Grid.Col>
                                </Grid>
                                <Grid columns={12} gutter={0} mt={'xs'}>
                                    <Grid.Col span={1.5}>
                                        <Flex justify='flex-start' align='center' pt={'xs'}>
                                            <ActionIcon bg={'var(--mantine-color-gray-7)'} radius={'100%'} size={'lg'} p={'6'} >
                                                <IconMail style={{ width: '100%', height: '100%' }} stroke={1} c />
                                            </ActionIcon>
                                        </Flex>
                                    </Grid.Col>
                                    <Grid.Col span={10.5}>
                                        <Flex justify='flex-start' direction={'column'} >
                                            < Text fw={500} size="lg">
                                                {t('Email')}
                                            </Text>
                                            < Text c={'dimmed'}>
                                                {formData.email}
                                            </Text>
                                        </Flex>
                                        <Divider mt={'xs'} />
                                    </Grid.Col>
                                </Grid>
                                <Grid columns={12} gutter={0} mt={'xs'}>
                                    <Grid.Col span={1.5}>
                                        <Flex justify='flex-start' align='center' pt={'xs'}>
                                            <ActionIcon bg={'var(--mantine-color-gray-7)'} radius={'100%'} size={'lg'} p={'6'} >
                                                <IconAddressBook style={{ width: '100%', height: '100%' }} stroke={1} c />
                                            </ActionIcon>
                                        </Flex>
                                    </Grid.Col>
                                    <Grid.Col span={10.5}>
                                        <Flex justify='flex-start' direction={'column'} >
                                            < Text fw={500} size="lg">
                                                {t('Address')}
                                            </Text>
                                            < Text c={'dimmed'}>
                                                {formData.address}
                                            </Text>
                                        </Flex>
                                        <Divider mt={'xs'} />
                                    </Grid.Col>
                                </Grid>

                                <Grid columns={12} gutter={0} mt={'xs'}>
                                    <Grid.Col span={1.5}>
                                        <Flex justify='flex-start' align='center' pt={'xs'}>
                                            <ActionIcon bg={'var(--mantine-color-gray-7)'} radius={'100%'} size={'lg'} p={'6'} >
                                                <IconWorld style={{ width: '100%', height: '100%' }} stroke={1} c />
                                            </ActionIcon>
                                        </Flex>
                                    </Grid.Col>
                                    <Grid.Col span={10.5}>
                                        <Flex justify='flex-start' direction={'column'} >
                                            < Text fw={500} size="lg">
                                                {t('WebAddress')}
                                            </Text>
                                            < Text c={'dimmed'}>
                                                {formData.companyWebsite}
                                            </Text>
                                        </Flex>
                                        <Divider mt={'xs'} />
                                    </Grid.Col>
                                </Grid>


                                <Grid columns={12} gutter={0}>
                                    <Grid.Col span={1}>

                                    </Grid.Col>
                                    <Grid.Col span={11}>
                                        <Text fw={700} mt={'md'} >
                                            {t('SocialMedia')}
                                        </Text>
                                    </Grid.Col>
                                </Grid>
                                <Flex justify={'flex-start'} align={'center'} mt={'xs'} ml={'xl'} pl={'lg'}>
                                    <Anchor href={formData.facebook} target="_blank" rel="noopener noreferrer" onClick={() => { console.log('link' + formData.facebook) }}>
                                        <Image h={isMobile ? 30 : 50} fit="contain" src={facebook} alt="Facebook" />
                                    </Anchor>
                                    <Anchor href={formData.linkedinAccount} target="_blank" rel="noopener noreferrer">
                                        <Image h={isMobile ? 30 : 50} fit="contain" src={linkedin} alt="Facebook" />
                                    </Anchor>
                                    <Anchor href={formData.instaAccount} target="_blank" rel="noopener noreferrer">
                                        <Image h={isMobile ? 30 : 50} fit="contain" src={instagram} alt="Facebook" />
                                    </Anchor>
                                    <Anchor href={formData.twitterAccount} target="_blank" rel="noopener noreferrer">
                                        <Image h={isMobile ? 30 : 50} fit="contain" src={twitter} alt="Facebook" />
                                    </Anchor>
                                </Flex>
                                <Grid columns={12}>
                                    <Grid.Col span={1}>

                                    </Grid.Col>
                                    <Grid.Col span={10} mt={'md'}>
                                        <Button
                                            fullWidth
                                            color={`orange.6`}
                                            type="submit"
                                            mt={4}
                                            id="EntityFormSubmit"
                                            leftSection={<IconUserPlus size={25} />}
                                        >

                                            <Flex direction={`column`} gap={0}>
                                                <Text fz={14} fw={700}>
                                                    {t("DownloadVCard")}
                                                </Text>
                                            </Flex>
                                        </Button>
                                    </Grid.Col>
                                    <Grid.Col span={1}>

                                    </Grid.Col>
                                </Grid>
                                <Grid columns={12}>
                                    <Grid.Col span={1}>

                                    </Grid.Col>
                                    <Grid.Col span={10} mt={'md'}>
                                        <Button
                                            fullWidth
                                            color={`yellow.8`}
                                            type="submit"
                                            mt={4}
                                            id="EntityFormSubmit"
                                            leftSection={<IconShare size={25} />}
                                        >

                                            <Flex direction={`column`} gap={0}>
                                                <Text fz={14} fw={700}>
                                                    {t("ShareThisPage")}
                                                </Text>
                                            </Flex>
                                        </Button>
                                    </Grid.Col>
                                    <Grid.Col span={1}>

                                    </Grid.Col>
                                </Grid>


                                {/* <Text mt="xs" size="sm"><strong>Mobile Number:</strong> 8801894433644</Text>
                                <Text mt="xs" size="sm"><strong>WhatsApp Number:</strong> 8801894433644</Text>
                                <Text mt="xs" size="sm"><strong>Phone Number:</strong> 8801894433644</Text>
                                <Text mt="xs" size="sm"><strong>Email:</strong> rtnuhin@gmail.com</Text>

                                <Text mt="xs" size="sm">
                                    <strong>Address:</strong> Nice Power & IT Solution Ltd, 49 Kawran Bazar, Vision 2021 Tower-1 (Software Technology Park) 12th Floor, Dhaka-1215, Bangladesh.
                                </Text> */}
                            </Card>
                        </Stack>
                    </Flex >
                </Container >
            </ScrollArea>
        </Box >
    );
}

export default ViewCard;