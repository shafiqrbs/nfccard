import React from "react";
import {
    Box,
    Grid,
    Title,
    Container,
    Image,
    ScrollArea,
    Stack,
    Button,
    Flex,
    Text,
    Divider,
    Anchor,
    em,
    Card,
    Avatar,
    Group,
    ActionIcon,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import { useTranslation } from 'react-i18next';
import { useDispatch } from "react-redux";
import {
    IconPhone,
    IconMailOpenedFilled,
    IconAddressBook,
    IconWorld,
    IconBuilding,
    IconMail,
    IconUserPlus,
    IconShare
} from '@tabler/icons-react';
import { useNavigate, useOutletContext } from "react-router-dom";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { readLocalStorageValue } from '@mantine/hooks';
import { Navigate } from "react-router-dom";

import facebook from '../../../assets/images/facebook.png';
import twitter from '../../../assets/images/twitter.png';
import linkedin from '../../../assets/images/linkedin.png';
import instagram from '../../../assets/images/instagram.png';

function ViewCard() {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { isOnline, mainAreaHeight } = useOutletContext();
    const height = mainAreaHeight - 30;
    const [opened, { open, close }] = useDisclosure(false);
    const formData = readLocalStorageValue({ key: 'signup-form-data' });
    const isMobile = useMediaQuery(`(max-width: ${em(750)})`);
    const navigate = useNavigate();

    return (
        <Box pt={2}>
            <ScrollArea p={0} h={{ base: height + 28, md: height - 25 }} scrollbarSize={2} scrollbars="y" type="never" mb={2} className={'boxBackground borderRadiusAll'}>
                <Flex justify="center" align="center" bg='var(--mantine-color-blue-9)'>
                    <Card
                        shadow="xl"
                        pt="lg"
                        pl="lg"
                        align="stretch"
                        justify="center"
                        pr="lg"
                        pb={0}
                        w={isMobile ? '100%' : 500}
                        mb={0}
                        variant="gradient"
                        bg='#154549'
                    >
                        <Flex justify="center" align="center" mt={{ md: "lg" }}>
                            <Avatar src={formData.profile_pic} size={100} radius="100%" />
                        </Flex>
                        <Text align="center" size="xl" weight={500} mt="md" style={{ color: 'white' }}>
                            {formData.name}
                        </Text>
                        <Text align="center" style={{ color: 'white' }} size="sm">
                            {formData.designation}
                        </Text>

                        <Grid columns={12} gutter={0} pt="md">
                            <Grid.Col
                                span={6}
                                style={{
                                    border: 'none',
                                    borderTop: '1px solid var(--mantine-color-gray-4)',
                                    borderRight: '1px solid var(--mantine-color-gray-4)',
                                    borderRadius: '0px 0 0 0',
                                }}
                            >
                                <Flex justify="center" align="center" direction="column" >
                                    <Flex justify="center" align="center" pt="xs">
                                        <ActionIcon variant="filled" style={{ backgroundColor: '#154549', color: 'var(--mantine-color-gray-5)' }}>
                                            <IconPhone style={{ width: '100%', height: '100%' }} stroke={1} />
                                        </ActionIcon>
                                    </Flex>
                                    <Button variant="outline" style={{ color: 'var(--mantine-color-gray-0)', border: 'none' }} fullWidth>
                                        {t('Call')}
                                    </Button>
                                </Flex>
                            </Grid.Col>
                            <Grid.Col
                                span={6}
                                style={{
                                    border: 'none',
                                    borderTop: '1px solid var(--mantine-color-gray-4)',
                                    borderRadius: '0px 0 0 0',
                                }}
                            >
                                <Flex justify="center" align="center" direction="column">
                                    <Flex justify="center" align="center" pt="xs">
                                        <ActionIcon variant="filled" style={{ backgroundColor: '#154549', color: 'var(--mantine-color-gray-5)' }}>
                                            <IconMail style={{ width: '100%', height: '100%' }} stroke={1} />
                                        </ActionIcon>
                                    </Flex>
                                    <Button variant="outline" style={{ color: 'var(--mantine-color-gray-0)', border: 'none' }} fullWidth>
                                        {t('Email')}
                                    </Button>
                                </Flex>
                            </Grid.Col>
                        </Grid>
                    </Card>

                </Flex>


                <Flex justify="center" align="center"  >

                    <Card shadow="md" w={isMobile ? '95%' : 500} pt={0} className={'boxBackground borderRadiusAll'} mb={8} mt='8' pl={'md'} pr={'md'}>
                        <Text mt="md" size="sm" style={{ color: 'dimmed' }}>
                            {formData.about}
                        </Text>
                        <Title order={4} mt="md">
                            {t('PersonalInformation')}
                        </Title>
                        <Divider my="xs" size="xs" />
                        <Grid columns={12} gutter={0}>
                            <Grid.Col span={1}>
                                <Flex justify="flex-start" align="center" pt="xs">
                                    <ActionIcon style={{ backgroundColor: 'var(--mantine-color-gray-7)', borderRadius: '100%' }} size="lg" p={6}>
                                        <IconPhone style={{ width: '100%', height: '100%' }} stroke={1} />
                                    </ActionIcon>
                                </Flex>
                            </Grid.Col>
                            <Grid.Col span={.5}>
                            </Grid.Col>
                            <Grid.Col span={10.5}>
                                <Flex justify="flex-start" direction="column" ml={{ base: 'xs', sm: 0, md: 0 }}>
                                    <Text fw={500} size="lg">
                                        {t('Name')}
                                    </Text>
                                    <Text style={{ color: 'dimmed' }}>
                                        {formData.name}
                                    </Text>
                                </Flex>
                                <Divider mt="xs" />
                            </Grid.Col>
                        </Grid>
                        <Grid columns={12} gutter={0} mt="xs">
                            <Grid.Col span={1}>
                                <Flex justify="flex-start" align="center" pt="xs">
                                    <ActionIcon style={{ backgroundColor: 'var(--mantine-color-gray-7)', borderRadius: '100%' }} size="lg" p={6}>
                                        <IconMailOpenedFilled style={{ width: '100%', height: '100%' }} stroke={1} />
                                    </ActionIcon>
                                </Flex>
                            </Grid.Col>
                            <Grid.Col span={.5}>
                            </Grid.Col>
                            <Grid.Col span={10.5}>
                                <Flex justify="flex-start" direction="column" ml={{ base: 'xs', sm: 0, md: 0 }}>
                                    <Text fw={500} size="lg">
                                        {t('Designation')}
                                    </Text>
                                    <Text style={{ color: 'dimmed' }}>
                                        {formData.designation}
                                    </Text>
                                </Flex>
                                <Divider mt="xs" />
                            </Grid.Col>
                        </Grid>
                        <Grid columns={12} gutter={0} mt="xs">
                            <Grid.Col span={1}>
                                <Flex justify="flex-start" align="center" pt="xs">
                                    <ActionIcon style={{ backgroundColor: 'var(--mantine-color-gray-7)', borderRadius: '100%' }} size="lg" p={6}>
                                        <IconPhone style={{ width: '100%', height: '100%' }} stroke={1} />
                                    </ActionIcon>
                                </Flex>
                            </Grid.Col>
                            <Grid.Col span={.5}>
                            </Grid.Col>
                            <Grid.Col span={10.5}>
                                <Flex justify="flex-start" direction="column" ml={{ base: 'xs', sm: 0, md: 0 }}>
                                    <Text fw={500} size="lg">
                                        {t('Mobile')}
                                    </Text>
                                    <Text style={{ color: 'dimmed' }}>
                                        {formData.phone}
                                    </Text>
                                </Flex>
                                <Divider mt="xs" />
                            </Grid.Col>
                        </Grid>
                        <Grid columns={12} gutter={0} mt="xs">
                            <Grid.Col span={1}>
                                <Flex justify="flex-start" align="center" pt="xs">
                                    <ActionIcon style={{ backgroundColor: 'var(--mantine-color-gray-7)', borderRadius: '100%' }} size="lg" p={6}>
                                        <IconMailOpenedFilled style={{ width: '100%', height: '100%' }} stroke={1} />
                                    </ActionIcon>
                                </Flex>
                            </Grid.Col>
                            <Grid.Col span={.5}>
                            </Grid.Col>
                            <Grid.Col span={10.5}>
                                <Flex justify="flex-start" direction="column" ml={{ base: 'xs', sm: 0, md: 0 }}>
                                    <Text fw={500} size="lg">
                                        {t('Email')}
                                    </Text>
                                    <Text style={{ color: 'dimmed' }}>
                                        {formData.email}
                                    </Text>
                                </Flex>
                                <Divider mt="xs" />
                            </Grid.Col>
                        </Grid>

                        <Title order={4} mt="md">
                            {t('OrganizationInformation')}
                        </Title>
                        <Divider my="xs" size="xs" />
                        <Grid columns={12} gutter={0} mt="xs">
                            <Grid.Col span={1}>
                                <Flex justify="flex-start" align="center" pt="xs">
                                    <ActionIcon style={{ backgroundColor: 'var(--mantine-color-gray-7)', borderRadius: '100%' }} size="lg" p={6}>
                                        <IconBuilding style={{ width: '100%', height: '100%' }} stroke={1} />
                                    </ActionIcon>
                                </Flex>
                            </Grid.Col>
                            <Grid.Col span={.5}>
                            </Grid.Col>
                            <Grid.Col span={10.5}>
                                <Flex justify="flex-start" direction="column" ml={{ base: 'xs', sm: 0, md: 0 }}>
                                    <Text fw={500} size="lg">
                                        {t('CompanyName')}
                                    </Text>
                                    <Text style={{ color: 'dimmed' }}>
                                        {formData.company_name}
                                    </Text>
                                </Flex>
                                <Divider mt="xs" />
                            </Grid.Col>
                        </Grid>
                        <Grid columns={12} gutter={0} mt="xs">
                            <Grid.Col span={1}>
                                <Flex justify="flex-start" align="center" pt="xs">
                                    <ActionIcon style={{ backgroundColor: 'var(--mantine-color-gray-7)', borderRadius: '100%' }} size="lg" p={6}>
                                        <IconMail style={{ width: '100%', height: '100%' }} stroke={1} />
                                    </ActionIcon>
                                </Flex>
                            </Grid.Col>
                            <Grid.Col span={.5}>
                            </Grid.Col>
                            <Grid.Col span={10.5}>
                                <Flex justify="flex-start" direction="column" ml={{ base: 'xs', sm: 0, md: 0 }}>
                                    <Text fw={500} size="lg">
                                        {t('Email')}
                                    </Text>
                                    <Text style={{ color: 'dimmed' }}>
                                        {formData.company_email}
                                    </Text>
                                </Flex>
                                <Divider mt="xs" />
                            </Grid.Col>
                        </Grid>
                        <Grid columns={12} gutter={0} mt="xs">
                            <Grid.Col span={1}>
                                <Flex justify="flex-start" align="center" pt="xs">
                                    <ActionIcon style={{ backgroundColor: 'var(--mantine-color-gray-7)', borderRadius: '100%' }} size="lg" p={6}>
                                        <IconWorld style={{ width: '100%', height: '100%' }} stroke={1} />
                                    </ActionIcon>
                                </Flex>
                            </Grid.Col>
                            <Grid.Col span={.5}>
                            </Grid.Col>
                            <Grid.Col span={10.5}>
                                <Flex justify="flex-start" direction="column" ml={{ base: 'xs', sm: 0, md: 0 }}>
                                    <Text fw={500} size="lg">
                                        {t('WebAddress')}
                                    </Text>
                                    <Text style={{ color: 'dimmed' }}>
                                        {formData.website}
                                    </Text>
                                </Flex>
                                <Divider mt="xs" />
                            </Grid.Col>
                        </Grid>
                        <Grid columns={12} gutter={0} mt="xs">
                            <Grid.Col span={1}>
                                <Flex justify="flex-start" align="center" pt="xs">
                                    <ActionIcon style={{ backgroundColor: 'var(--mantine-color-gray-7)', borderRadius: '100%' }} size="lg" p={6}>
                                        <IconAddressBook style={{ width: '100%', height: '100%' }} stroke={1} />
                                    </ActionIcon>
                                </Flex>
                            </Grid.Col>
                            <Grid.Col span={.5}>
                            </Grid.Col>
                            <Grid.Col span={10.5}>
                                <Flex justify="flex-start" direction="column" ml={{ base: 'xs', sm: 0, md: 0 }}>
                                    <Text fw={500} size="lg">
                                        {t('Address')}
                                    </Text>
                                    <Text style={{ color: 'dimmed' }}>
                                        {formData.address}
                                    </Text>
                                </Flex>
                                <Divider mt="xs" />
                            </Grid.Col>
                        </Grid>
                        <Grid columns={12} gutter={0}>
                            <Grid.Col span={1}></Grid.Col>
                            <Grid.Col span={11}>
                                <Text fw={700} mt="md">
                                    {t('SocialMedia')}
                                </Text>
                            </Grid.Col>
                        </Grid>
                        <Flex justify="flex-start" align="center" mt="xs" ml="xl" pl="lg">
                            <Anchor href={formData.facebook} target="_blank" rel="noopener noreferrer">
                                <Image height={isMobile ? 30 : 50} fit="contain" src={facebook} alt="Facebook" />
                            </Anchor>
                            <Anchor href={formData.linkedinAccount} target="_blank" rel="noopener noreferrer">
                                <Image height={isMobile ? 30 : 50} fit="contain" src={linkedin} alt="LinkedIn" />
                            </Anchor>
                            <Anchor href={formData.instaAccount} target="_blank" rel="noopener noreferrer">
                                <Image height={isMobile ? 30 : 50} fit="contain" src={instagram} alt="Instagram" />
                            </Anchor>
                            <Anchor href={formData.twitterAccount} target="_blank" rel="noopener noreferrer">
                                <Image height={isMobile ? 30 : 50} fit="contain" src={twitter} alt="Twitter" />
                            </Anchor>
                        </Flex>
                        <Grid columns={12}>
                            <Grid.Col span={1}></Grid.Col>
                            <Grid.Col span={10} mt="md">
                                <Button
                                    fullWidth
                                    color="orange.6"
                                    type="submit"
                                    mt={4}
                                    leftSection={<IconUserPlus size={25} />}
                                >
                                    <Flex direction="column" gap={0}>
                                        <Text size={14} fw={700}>
                                            {t("DownloadVCard")}
                                        </Text>
                                    </Flex>
                                </Button>
                            </Grid.Col>
                            <Grid.Col span={1}></Grid.Col>
                        </Grid>
                        <Grid columns={12}>
                            <Grid.Col span={1}></Grid.Col>
                            <Grid.Col span={10} mt="md">
                                <Button
                                    fullWidth
                                    color="yellow.8"
                                    type="submit"
                                    mt={4}
                                    leftSection={<IconShare size={25} />}
                                >
                                    <Flex direction="column" gap={0}>
                                        <Text size={14} fw={700}>
                                            {t("ShareThisPage")}
                                        </Text>
                                    </Flex>
                                </Button>
                            </Grid.Col>
                            <Grid.Col span={1}></Grid.Col>
                        </Grid>
                    </Card>
                </Flex>
            </ScrollArea>
            <Box pl={`sm`} pb={{ base: '2', md: 'xs' }} pr={8} mb={1} pt={'xs'} className={'boxBackground borderRadiusAll'}>
                <Grid span={12}>
                    <Grid.Col>
                        <Group justify="flex-end" h={{ base: 38, md: 30 }} >
                            <>
                                {
                                    <>
                                        <Button
                                            size="xs"
                                            color={`orange.6`}
                                            // type="submit"
                                            id="EntityFormSubmit3"
                                            onClick={() => modals.openConfirmModal({
                                                title: (
                                                    <Text size="md"> {t("FormConfirmationTitle")}</Text>
                                                ),
                                                children: (
                                                    <Text size="sm"> {t("FormConfirmationMessage")}</Text>
                                                ),
                                                labels: { confirm: t('Submit'), cancel: t('Cancel') }, confirmProps: { color: 'orange.6' },
                                                onCancel: () => console.log('Cancel'),
                                                onConfirm: () => {
                                                    navigate('/sign-up-edit');
                                                    console.log('ok');
                                                },
                                            })}
                                        >
                                            <Flex direction={`column`} gap={0}>
                                                <Text fz={12} fw={400}>
                                                    {t("Edit")}
                                                </Text>
                                            </Flex>
                                        </Button>
                                        <Button
                                            size="xs"
                                            color={`orange.6`}
                                            // type="submit"
                                            id="EntityFormSubmit1"
                                            onClick={() => modals.openConfirmModal({
                                                title: (
                                                    <Text size="md"> {t("FormConfirmationTitle")}</Text>
                                                ),
                                                children: (
                                                    <Text size="sm"> {t("FormConfirmationMessage")}</Text>
                                                ),
                                                labels: { confirm: t('Submit'), cancel: t('Cancel') }, confirmProps: { color: 'orange.6' },
                                                onCancel: () => console.log('Cancel'),
                                                onConfirm: () => {
                                                    navigate('/card-select');
                                                    // console.log('ok');
                                                },
                                            })}
                                        >
                                            <Flex direction={`column`} gap={0}>
                                                <Text fz={12} fw={400}>
                                                    {t("PrintViewCard")}
                                                </Text>
                                            </Flex>
                                        </Button>

                                    </>
                                }
                            </>
                        </Group>
                    </Grid.Col>
                </Grid>
            </Box>
        </Box >
    );
}
export default ViewCard;
