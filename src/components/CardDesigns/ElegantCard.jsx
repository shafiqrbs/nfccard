import { Card, Avatar, Text, Group, Box, Image, Divider, BackgroundImage } from '@mantine/core';
import { IconPhone, IconMail, IconMapPin } from '@tabler/icons-react';
import { readLocalStorageValue } from '@mantine/hooks';

function ElegantCard() {
    const formData = readLocalStorageValue({ key: 'signup-form-data' });
    return (
        <Card shadow="lg" padding="lg" radius="md" style={{ width: '85.6mm', height: '53.98mm' }}>
            <BackgroundImage src={formData.companyLogo} radius="md" height={50}>
                <Box sx={{ textAlign: 'center', padding: '1rem 0' }}>
                    <Avatar
                        src={formData.profilePic}
                        size={80}
                        radius="xl"
                        sx={{ margin: 'auto', border: '2px solid white', position: 'relative', top: '20px' }}
                    />
                </Box>
            </BackgroundImage>
            <Box textAlign="center" mt={50}>
                <Text weight={700} size="md">Foysal Mahmud Hasan</Text>
                <Text c="dimmed" size="sm">Jr. Software Engineer</Text>
            </Box>
            <Divider my="sm" />
            <Box textAlign="left">
                <Group spacing="xs">
                    <IconPhone size={16} />
                    <Text size="sm">+8801231234751</Text>
                </Group>
                <Group spacing="xs">
                    <IconMail size={16} />
                    <Text size="sm">foysalmahmud.rbs@gmail.com</Text>
                </Group>
                <Group spacing="xs">
                    <IconMapPin size={16} />
                    <Text size="sm">29, Gaussia Azam Avenue, Uttara, Dhaka</Text>
                </Group>
            </Box>
        </Card>
    );
}

export default ElegantCard;
