import { Card, Avatar, Text, Group, Box, Divider, Image, Center, Grid, Flex, Stack, Button, Space } from '@mantine/core';
import { IconPhone, IconMail, IconMapPin } from '@tabler/icons-react';
import { readLocalStorageValue, } from '@mantine/hooks';
function DesignFive() {

    const formData = readLocalStorageValue({ key: 'signup-form-data' });
    return (
        <Card shadow="lg" padding="lg" radius="md" style={{ width: '63mm', height: '100mm', backgroundColor: '#F8F9FA' }}>

            <Box sx={{ textAlign: 'center' }}>
                <Center >
                    <Avatar
                        src={formData.profile_pic}
                        size={70}
                        radius="xl"
                        sx={{ border: '2px solid #343A40' }}
                    />
                </Center>
            </Box>
            <Box ta="center" mt={'xl'}>
                <Text weight={700} size="md" color="#343A40">{formData.name}</Text>
                <Text c="dimmed" size="sm">{formData.designation}</Text>
            </Box>
            <Divider my="sm" />
            <Space h={'sm'}></Space>
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
                mt={'xs'}
                align="center"
                justify="flex-end"


            >
                <Box sx={{ textAlign: 'center', backgroundColor: '#343A40' }}>
                    <Center >
                        <Image pb={'xs'} src={formData.company_logo} height={90} fit="contain" alt="Company Logo" maw={'80%'} />
                    </Center>
                </Box>
            </Stack>
        </Card>
    );
}

export default DesignFive;
