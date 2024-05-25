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
    Space
} from "@mantine/core";
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from "react-redux";
import {
    setCustomerFilterData,
    setEntityNewData,
    setInsertType,
    setSearchKeyword
} from "../../../store/core/crudSlice.js";
import {
    IconMail,
    IconPhone
} from '@tabler/icons-react'
import { getLoadingProgress } from "../../global-hook/loading-progress/getLoadingProgress.js";
import { useLocalStorage } from '@mantine/hooks';
import { Navigate, useOutletContext } from "react-router-dom";
import { useDisclosure, useHotkeys } from "@mantine/hooks";

function ViewCard() {


    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    const { isOnline, mainAreaHeight } = useOutletContext();
    const height = mainAreaHeight - 80; //TabList height 104
    const [opened, { open, close }] = useDisclosure(false);

    const [formData, setFormData] = useLocalStorage({
        key: 'signup-form-data',
        defaultValue: {
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
    });

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
                                            <Container w={{ base: '100%', sm: '100%', md: 450 }}>
                                                <Image h={150} src={formData.companyLogo} alt="Company Logo" >

                                                </Image>
                                                <Flex
                                                    justify="center"
                                                    align="center"
                                                    direction="column"
                                                    wrap="wrap"
                                                >
                                                    <Image h={70} w={70} src={formData.profilePic} alt="Company Logo" pt={2} mt={'xs'}>

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
                                                <Grid columns={12} gutter={{ base: 8 }}>
                                                    <Grid.Col span={6}>
                                                        <Flex
                                                            justify="center"
                                                            align="center"
                                                            direction="column"
                                                            wrap="wrap">
                                                            <IconMail style={{ width: rem(30), height: rem(30) }}>
                                                            </IconMail>
                                                            <Text
                                                                ta="center" fz="h5" fw={500}
                                                            >
                                                                {formData.email}
                                                            </Text>
                                                        </Flex>
                                                    </Grid.Col>
                                                    <Grid.Col span={6}>
                                                        <Flex
                                                            justify="center"
                                                            align="center"
                                                            direction="column"
                                                            wrap="wrap">
                                                            <IconPhone style={{ width: rem(30), height: rem(30) }} />

                                                            <Text
                                                                ta="center" fz="h5" fw={500}
                                                            >
                                                                {formData.phone}
                                                            </Text>
                                                        </Flex>
                                                    </Grid.Col>
                                                </Grid>
                                                <Space h={'xl'} />
                                                <Grid columns={12} gutter={{ base: 8 }}>
                                                    <Grid.Col span={6}>
                                                        <Flex
                                                            justify="center"
                                                            align="center"
                                                            direction="column"
                                                            wrap="wrap">
                                                            <IconMail style={{ width: rem(30), height: rem(30) }}>
                                                            </IconMail>
                                                            <Text
                                                                ta="center" fz="h5" fw={500}
                                                            >
                                                                {formData.email}
                                                            </Text>
                                                        </Flex>
                                                    </Grid.Col>
                                                    <Grid.Col span={6}>
                                                        <Flex
                                                            justify="center"
                                                            align="center"
                                                            direction="column"
                                                            wrap="wrap">
                                                            <IconPhone style={{ width: rem(30), height: rem(30) }} />

                                                            <Text
                                                                ta="center" fz="h5" fw={500}
                                                            >
                                                                {formData.phone}
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
                                                                type="submit"
                                                                id="EntityFormSubmit"
                                                            // onClick={(values) => {
                                                            //     setFormData = values;
                                                            //     console.log('Form Submitted with values:', values)
                                                            // }}
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
        </Box >
    );
}

export default ViewCard;