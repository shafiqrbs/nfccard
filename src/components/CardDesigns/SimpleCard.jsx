import { Card, Avatar, Text, Group, Box, Image, Divider, Flex, BackgroundImage, Grid, Container, Button, Space } from '@mantine/core';
import { IconPhone, IconMail, IconMapPin } from '@tabler/icons-react';
import { readLocalStorageValue } from '@mantine/hooks';

function SimpleCard() {
    const formData = readLocalStorageValue({ key: 'signup-form-data' });
    return (
        <Card shadow="lg" padding="xs" radius="md" style={{ width: '100mm', height: '60mm' }} >

            <div style={{ position: 'start', width: '100%', textAlign: 'start' }}>
                <Avatar
                    src={formData.profilePic}
                    size={90}
                    radius="100%"
                    style={{ position: 'absolute', top: -40, left: '5%', transform: 'translateY(70%)', border: '1px solid white' }}
                />
            </div>
            <Flex justify='flex-end' align='flex-end' direction='column'>
                <Text weight={700} size="md">{formData.name}</Text>
                <Text c="dimmed" size="sm">{formData.designation}</Text>
            </Flex>
            <Divider my="sm" />
            <Box>


                <Container fluid >
                    <Space h='md'></Space>
                    <Grid columns={12} gutter={0}>
                        <Grid.Col span={4}>
                        </Grid.Col>
                        <Grid.Col span={8}>
                            <Grid columns={12} gutter={0}  >
                                <Grid.Col span={2}>
                                    <IconPhone size={16} />
                                </Grid.Col>
                                <Grid.Col span={10}>
                                    <Text size="sm">{formData.phone}</Text>
                                </Grid.Col>
                            </Grid>
                            <Grid columns={12} gutter={0}  >
                                <Grid.Col span={2}>
                                    <IconMail size={16} />
                                </Grid.Col>
                                <Grid.Col span={10}>
                                    <Text size="sm">{formData.email}</Text>
                                </Grid.Col>
                            </Grid>
                            <Grid columns={12} gutter={0} >
                                <Grid.Col span={2}>

                                    <IconMapPin size={16} />
                                </Grid.Col>
                                <Grid.Col span={10}>
                                    <Text size="sm">{formData.address}</Text>
                                </Grid.Col>
                            </Grid>

                        </Grid.Col>
                    </Grid>
                </Container>
            </Box>
            <Box >
                <div style={{ position: 'relative' }}>
                    <img
                        src={formData.companyLogo}
                        alt="Company Logo"
                        style={{ position: 'absolute', top: -25, left: '50%', transform: 'translateY(100%)', border: '1px solid white', objectFit: 'contain', height: 30, maxWidth: '50%' }}
                    />
                </div>
            </Box>


        </Card >
    );
}

export default SimpleCard;
