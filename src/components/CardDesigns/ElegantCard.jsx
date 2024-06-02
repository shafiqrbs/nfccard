import { Card, Avatar, Text, Group, Box, Image, Divider, BackgroundImage, Grid } from '@mantine/core';
import { IconPhone, IconMail, IconMapPin } from '@tabler/icons-react';
import { readLocalStorageValue } from '@mantine/hooks';

function ElegantCard() {
    const formData = readLocalStorageValue({ key: 'signup-form-data' });
    return (
        <Card shadow="lg" padding="xs" radius="md" style={{ width: '100mm', height: '60mm' }} bg={'var(--mantine-color-gray-0)'}>
            <Box textAlign="center" mt={'xs'} ml={'xs'} mb={10}>
                <Text weight={700} size="md">{formData.name}</Text>
                <Text c="dimmed" size="sm">{formData.designation}</Text>
            </Box>
            <div style={{ position: 'relative', width: '100%', textAlign: 'end' }}>
                <Avatar
                    src={formData.profilePic}
                    size={70}
                    radius="100%"
                    style={{ position: 'absolute', top: -65, left: '90%', transform: 'translateX(-50%)', border: '1px solid white' }}
                />
            </div>

            <Divider my="sm" />
            <Box textAlign="left">
                <Grid columns={12} gutter={0}>
                    <Grid.Col span={1}>
                        <IconPhone size={16} />
                    </Grid.Col>
                    <Grid.Col span={11}>
                        <Text size="sm">{formData.phone}</Text>
                    </Grid.Col>
                </Grid>
                <Grid columns={12} gutter={0}>
                    <Grid.Col span={1}>
                        <IconMail size={16} />
                    </Grid.Col>
                    <Grid.Col span={11}>
                        <Text size="sm">{formData.email}</Text>
                    </Grid.Col>
                </Grid>
                <Grid columns={12} gutter={0}>
                    <Grid.Col span={1}>
                        <IconMapPin size={16} />
                    </Grid.Col>
                    <Grid.Col span={11}>
                        <Text size="sm">{formData.address}{formData.address}</Text>
                    </Grid.Col>
                </Grid>

            </Box>
            <div style={{ position: 'relative', width: '100%', textAlign: 'end', marginTop: 5, marginBottom: 5 }} >
                <img
                    src={formData.companyLogo}
                    alt="Company Logo"
                    style={{ width: '100%', height: 30, objectFit: 'contain', borderRadius: 'md' }}
                />
            </div>

        </Card >
    );
}

export default ElegantCard;
