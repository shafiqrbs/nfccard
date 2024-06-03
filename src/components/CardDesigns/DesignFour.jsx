import { Card, Avatar, Text, Group, Box, Divider, BackgroundImage, Image, Grid, Flex } from '@mantine/core';
import { IconPhone, IconMail, IconMapPin } from '@tabler/icons-react';
import { readLocalStorageValue } from '@mantine/hooks';

function DesignFour() {
    const formData = readLocalStorageValue({ key: 'signup-form-data' });
    return (
        <Card shadow="sm" padding="lg" radius="md" style={{ width: '100mm', height: '60mm' }}>
            <Group justify='space-between' mb="sm">
                <Avatar
                    src={formData.profile_pic}
                    size={50}
                    radius="xl"
                />
                <Image
                    src={formData.company_logo}
                    height={50}
                    maw={'50%'}
                    fit="contain"
                    alt="Company Logo"
                />
            </Group>
            <Box textAlign="center">
                <Text weight={700} size="md">{formData.name}</Text>
                <Text color="dimmed" size="sm">{formData.designation}</Text>
            </Box>
            <Box mt="sm">
                <Grid columns={12} gutter={0}>
                    <Grid.Col span={3}>
                        <Text size="sm"><strong>Phone</strong></Text>
                    </Grid.Col>
                    <Grid.Col span={1}>
                        <Text size="sm"><strong>:</strong></Text>
                    </Grid.Col>
                    <Grid.Col span={8}>
                        <Flex
                            justify={'flex-start'}
                            align={'flex-start'}
                            direction='row'>
                            <Text size="sm">{formData.phone}</Text>
                        </Flex>
                    </Grid.Col>
                </Grid>
                <Grid columns={12} gutter={0}>
                    <Grid.Col span={3}>
                        <Text size="sm"><strong>Email</strong></Text>
                    </Grid.Col>
                    <Grid.Col span={1}>
                        <Text size="sm"><strong>:</strong></Text>
                    </Grid.Col>
                    <Grid.Col span={8}>
                        <Flex
                            justify={'flex-start'}
                            align={'flex-start'}
                            direction='row'>
                            <Text size="sm">{formData.email}</Text>
                        </Flex>
                    </Grid.Col>
                </Grid>
                <Grid columns={12} gutter={0}>
                    <Grid.Col span={3}>
                        <Text size="sm"><strong>Address</strong></Text>
                    </Grid.Col>
                    <Grid.Col span={1}>
                        <Text size="sm"><strong>:</strong></Text>
                    </Grid.Col>
                    <Grid.Col span={8}>
                        <Flex
                            justify={'flex-start'}
                            align={'flex-start'}
                            direction='row'>
                            <Text size="sm">{formData.address}</Text>
                        </Flex>
                    </Grid.Col>
                </Grid>

            </Box>
        </Card>
    );
}

export default DesignFour;
