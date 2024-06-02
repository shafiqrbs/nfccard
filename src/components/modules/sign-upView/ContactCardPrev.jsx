import { Card, Avatar, Text, Group, Button, Tabs, Stack, Divider } from '@mantine/core';
import { IconPhone, IconMail, IconMapPin, IconBuilding } from '@tabler/icons-react';
import { readLocalStorageValue } from '@mantine/hooks';

function ContactCard() {
    const formData = readLocalStorageValue({ key: 'signup-form-data' });
    return (
        <Card shadow="lg" padding="lg" radius="md" style={{ maxWidth: 400, margin: 'auto' }}>
            <Stack align="center">
                <div style={{ position: 'relative', width: '100%', textAlign: 'center' }}>
                    <img
                        src={formData.companyLogo}
                        alt="Company Logo"
                        style={{ width: '100%', height: 100, objectFit: 'contain', borderRadius: 'md' }}
                    />
                    <Avatar
                        src={formData.profilePic}
                        size={100}
                        radius="100%"
                        style={{ position: 'absolute', top: 50, left: '50%', transform: 'translateX(-50%)', border: '3px solid white' }}
                    />
                </div>
                <Text weight={700} size="lg" mt={50}>Foysal Mahmud Hasan</Text>
                <Text color="dimmed" size="sm">Jr. Software Engineer</Text>
                <Divider my="sm" />
            </Stack>

            <Tabs defaultValue="personal" grow>
                <Tabs.List position="center">
                    <Tabs.Tab value="personal">Personal Info</Tabs.Tab>
                    <Tabs.Tab value="organization">Organization Info</Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="personal">
                    <Group direction="column" spacing="xs" mt="md">
                        <Group>
                            <IconPhone size={16} />
                            <Text>+8801231234751</Text>
                        </Group>
                        <Group>
                            <IconMail size={16} />
                            <Text>foysalmahmud.rbs@gmail.com</Text>
                        </Group>
                        <Group>
                            <IconMapPin size={16} />
                            <Text>29, Gaussia Azam Avenue, Uttara, Dhaka</Text>
                        </Group>
                    </Group>
                </Tabs.Panel>

                <Tabs.Panel value="organization">
                    <Group direction="column" spacing="xs" mt="md">
                        <Group>
                            <IconBuilding size={16} />
                            <Text>RightBrain Solution Ltd.</Text>
                        </Group>
                        <Group>
                            <IconMail size={16} />
                            <Text>foysalmahmud.rbs@gmail.com</Text>
                        </Group>
                        <Group>
                            <IconMapPin size={16} />
                            <Text>29, Gaussia Azam Avenue, Uttara, Dhaka</Text>
                        </Group>
                        <Group>
                            <IconPhone size={16} />
                            <Text>+8801231234751</Text>
                        </Group>
                    </Group>
                </Tabs.Panel>
            </Tabs>

            <Group position="center" mt="md">
                <Button variant="outline" color="blue" radius="md" size="sm">Contact</Button>
                <Button variant="outline" color="gray" radius="md" size="sm">Download vCard</Button>
            </Group>
        </Card>
    );
}

export default ContactCard;
