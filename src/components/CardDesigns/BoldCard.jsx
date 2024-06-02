import { Card, Avatar, Text, Group, Box, Image, BackgroundImage, Divider, Flex } from '@mantine/core';
import { IconPhone, IconMail, IconMapPin } from '@tabler/icons-react';
import { readLocalStorageValue } from '@mantine/hooks';
function BoldCard() {

    const formData = readLocalStorageValue({ key: 'signup-form-data' });
    return (
        <>
            <Card shadow="lg" padding="sm" radius="md" style={{ width: '100mm', height: '60mm' }}>
                <div style={{ position: 'relative', width: '100%', textAlign: 'end' }}>
                    <img
                        src={formData.companyLogo}
                        alt="Company Logo"
                        style={{ width: '50%', height: 40, objectFit: 'contain', borderRadius: 'md' }}
                    />
                    <Avatar
                        src={formData.profilePic}
                        size={80}
                        radius="100%"
                        style={{ position: 'absolute', top: 10, right: '85%', transform: 'translateX(50%)', border: '3px solid white' }}
                    />
                </div>
                <Box mt={'sm'}>
                    <Flex justify={'flex-end'} align={'flex-end'} direction={'column'}>
                        <Text weight={700} size="md">{formData.name}</Text>
                        <Text c="dimmed" size="sm">{formData.designation}</Text>
                    </Flex>
                </Box>
                <Divider my="sm" />
                <Box textAlign="left"   >
                    <Group spacing="sm">
                        <IconPhone size={16} />
                        <Text size="sm">{formData.phone}</Text>
                    </Group>
                    <Group spacing="sm">
                        <IconMail size={16} />
                        <Text size="sm">{formData.email}</Text>
                    </Group>
                    <Group spacing="sm">
                        <IconMapPin size={16} />
                        <Text size="sm">{formData.address}</Text>
                    </Group>
                </Box>
            </Card>
        </>
    );
}

export default BoldCard;
