import { Card, Avatar, Text, Group, Button, Tabs } from '@mantine/core';

function ContactCard() {
    return (
        <Card shadow="sm" padding="lg">
            <Group position="apart">
                <Group>
                    <Avatar src="path_to_avatar.jpg" size={100} />
                    <div>
                        <Text weight={700}>Foysal Mahmud Hasan</Text>
                        <Text color="dimmed">Jr. Software Engineer</Text>
                    </div>
                </Group>
                <Button variant="outline">Contact</Button>
            </Group>

            <Tabs defaultValue="personal" mt="md">
                <Tabs.List>
                    <Tabs.Tab value="personal">Personal Info</Tabs.Tab>
                    <Tabs.Tab value="organization">Organization Info</Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="personal">
                    <Text>Mobile: +8801231234751</Text>
                    <Text>Email: foysalmahmud.rbs@gmail.com</Text>
                    <Text>Address: 29, Gaussia Azam Avenue, Uttara, Dhaka</Text>
                </Tabs.Panel>

                <Tabs.Panel value="organization">
                    <Text>Company: RightBrain Solution Ltd.</Text>
                    <Text>Website: lazycoders.co</Text>
                </Tabs.Panel>
            </Tabs>
        </Card>
    );
}

export default ContactCard;
