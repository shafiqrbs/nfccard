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
    Anchor
} from "@mantine/core";
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from "react-redux";
import {
    IconMail,
    IconPhone,
    IconWorld,
    IconLocation
} from '@tabler/icons-react'
import { getLoadingProgress } from "../../global-hook/loading-progress/getLoadingProgress.js";
import { useLocalStorage } from '@mantine/hooks';
import { Navigate, useOutletContext } from "react-router-dom";
import { useDisclosure, useHotkeys } from "@mantine/hooks";
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
    const height = mainAreaHeight - 80;
    const [opened, { open, close }] = useDisclosure(false);
    const navigate = useNavigate();

    const formData = readLocalStorageValue({ key: 'signup-form-data' });


    return (
        <Box>
            <Grid gutter={{ base: 8 }} >
                <Grid.Col p={'0'} >
                    <Box   >
                        <Box  >
                            <Box pl={`xs`} pb={'xs'} pr={8} pt={'xs'} className={'boxBackground borderRadiusAll'} >
                                <Grid>
                                    <Grid.Col h={35}>
                                        <Title order={6} pl={'6'}>{t('PersonalInformation')}</Title>
                                    </Grid.Col>
                                </Grid>
                            </Box>
                            <Box >
                                <Box>
                                    <Box mt={'4'} h={height - 35}>
                                        <Box h={{ base: '100%', sm: '100%' }} pr={'xs'} pl={'xs'} pt={'xs'} pb={{ base: 'sm', sm: 'sm', md: 0 }} className="borderRadiusAll">
                                            <Container >
                                                <Flex
                                                    justify="center"
                                                    align="center"
                                                    direction="column"
                                                    wrap="wrap"
                                                >
                                                    <Image h={120} maw={{ sm: rem * (300), md: rem(900) }} src={formData.companyLogo} alt="Company Logo" fit="contain" >
                                                    </Image>
                                                </Flex>
                                                <Flex
                                                    justify="center"
                                                    align="center"
                                                    direction="column"
                                                    wrap="wrap"
                                                >
                                                    <Image h={70} w={70} src={formData.profilePic} alt="Company Logo" pt={2} mt={'xs'} fit="contain">
                                                    </Image>
                                                    <Text
                                                        mt={'xs'}
                                                        ta="center" fz="h3" fw={800}
                                                    >
                                                        {formData.name}
                                                    </Text>
                                                    <Text
                                                        ta="center" fz="h5" fw={200}
                                                    >
                                                        {formData.designation}
                                                    </Text>
                                                    <Text
                                                        ta="center" fz="h5" fw={500}
                                                    >
                                                        {formData.companyName}
                                                    </Text>
                                                </Flex>
                                                <Space h={'xl'} />
                                                <Grid columns={12.1} gutter={{ base: 6 }}>
                                                    <Grid.Col span={6}>
                                                        <Flex
                                                            mih={height - 440}
                                                            bg="white"
                                                            gap="xs"
                                                            justify="center"
                                                            align="center"
                                                            direction="column"
                                                        >
                                                            {formData.email ? (
                                                                <IconMail style={{ width: rem(30), height: rem(30) }} />
                                                            ) : null}
                                                            <Text
                                                                ta="center" fz="h5" fw={500}
                                                            >
                                                                {formData.email}
                                                            </Text>
                                                            {formData.phone ? (
                                                                <IconPhone style={{ width: rem(30), height: rem(30) }} />
                                                            ) : null}
                                                            <Text
                                                                ta="center" fz="h5" fw={500}
                                                            >
                                                                {formData.phone ? '+' + formData.phone : ''}
                                                            </Text>
                                                            <Grid columns={12} gutter={{ base: 6 }} mt={'sm'}>
                                                                <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                                                                    <Anchor href={formData.fbAccount} target="_blank" rel="noopener noreferrer" onClick={() => { console.log('link' + formData.fbAccount) }}>
                                                                        <Image h={80} fit="contain" src={facebook} alt="Facebook" />
                                                                    </Anchor>
                                                                </Grid.Col>
                                                                <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                                                                    <Anchor href={formData.linkedinAccount} target="_blank" rel="noopener noreferrer">
                                                                        <Image h={80} fit="contain" src={linkedin} alt="Facebook" />
                                                                    </Anchor>
                                                                </Grid.Col>
                                                                <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                                                                    <Anchor href={formData.instaAccount} target="_blank" rel="noopener noreferrer">
                                                                        <Image h={80} fit="contain" src={instagram} alt="Facebook" />
                                                                    </Anchor>
                                                                </Grid.Col>
                                                                <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                                                                    <Anchor href={formData.twitterAccount} target="_blank" rel="noopener noreferrer">
                                                                        <Image h={80} fit="contain" src={twitter} alt="Facebook" />
                                                                    </Anchor>
                                                                </Grid.Col>
                                                            </Grid>
                                                        </Flex>
                                                    </Grid.Col>
                                                    <Divider size={'sm'} orientation="vertical" />
                                                    <Grid.Col span={6}>
                                                        <Flex
                                                            mih={height - 440}
                                                            bg="white"
                                                            gap="xs"
                                                            justify="flex-start"
                                                            align="center"
                                                            direction="column"
                                                        >

                                                            <IconWorld style={{ width: rem(30), height: rem(30) }}>
                                                            </IconWorld>
                                                            <Text
                                                                ta="center" fz="h5" fw={500}
                                                            >
                                                                {formData.companyWebsite}
                                                            </Text>
                                                            <IconMail style={{ width: rem(30), height: rem(30) }}>
                                                            </IconMail>
                                                            <Text
                                                                ta="center" fz="h5" fw={500}
                                                            >
                                                                {formData.companyEmail}
                                                            </Text>
                                                            <IconLocation style={{ width: rem(30), height: rem(30) }}>
                                                            </IconLocation>
                                                            <Text
                                                                ta="center" fz="h5" fw={500}
                                                            >
                                                                {formData.address}
                                                            </Text>
                                                        </Flex>

                                                    </Grid.Col>
                                                </Grid>



                                            </Container>
                                        </Box>
                                    </Box>
                                    <Box pl={`sm`} pb={{ base: 'sm', sm: 'sm', md: 'xs' }} pr={8} pt={'xs'} mt={'1'} className={'boxBackground borderRadiusAll'}  >
                                        <Grid span={12}>
                                            <Grid.Col >
                                                <Stack right align="flex-end" h={30}>
                                                    <>
                                                        {
                                                            <Button
                                                                size="xs"
                                                                color={`red.6`}
                                                                id="EntityFormSubmit"
                                                                onClick={() => {
                                                                    navigate('/sign-up-edit')
                                                                }}

                                                            >

                                                                <Flex direction={`column`} gap={0}>
                                                                    <Text fz={12} fw={400}>
                                                                        {t("Edit")}
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
        </Box >
    );
}

export default ViewCard;