import { Card, Avatar, Text, Group, Box, Divider, Image, Center, Grid, Flex, Stack, Button, Space } from '@mantine/core';
import { IconPhone, IconMail, IconMapPin } from '@tabler/icons-react';
import { readLocalStorageValue, } from '@mantine/hooks';
function DesignSix() {

    const formData = readLocalStorageValue({ key: 'signup-form-data' });
    return (
        <Card shadow="lg" radius="md" style={{ width: '60mm', height: '100mm', backgroundColor: '#F8F9FA' }}>

            <Box >

                <Image
                    h={'30mm'}
                    w={'100%'}
                    src={formData.profile_pic}
                    fit='cover'
                >
                </Image>

            </Box>
            <Box ta="center" mt={'xl'}>
                <Text weight={700} size="md" color="#343A40">{formData.name}</Text>
                <Text c="dimmed" size="sm">{formData.designation}</Text>
            </Box>
            <Divider my="sm" />
            <Box >
                <Grid columns={12} gutter={1}>
                    <Grid.Col span={1}>
                        <IconPhone size={14} />
                    </Grid.Col>
                    <Grid.Col span={11} mt={2}>
                        <Text size="xs" fw={700}>{formData.phone}</Text>
                    </Grid.Col>
                </Grid>
                <Grid columns={12} gutter={1}>
                    <Grid.Col span={1}>
                        <IconMail size={14} />
                    </Grid.Col>
                    <Grid.Col span={11} mt={2}>
                        <Text size="xs" fw={700}>{formData.email}</Text>
                    </Grid.Col>
                </Grid>
                <Grid columns={12} gutter={1}>
                    <Grid.Col span={1}>
                        <IconMapPin size={14} />
                    </Grid.Col>
                    <Grid.Col span={11} mt={2}>
                        <Text size="xs" fw={700}>{formData.address}</Text>
                    </Grid.Col>
                </Grid>
            </Box>

            <Stack
                align="center"
                justify="flex-end"

            >
                <Box sx={{ textAlign: 'center', backgroundColor: '#343A40' }}>
                    <Center >
                        <Image src={formData.company_logo} height={60} fit="contain" alt="Company Logo" maw={'80%'} />
                    </Center>
                </Box>
            </Stack>
        </Card>
    );
}

export default DesignSix;
