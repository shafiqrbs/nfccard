import React, { useState } from "react";
import { Box, ActionIcon, Group, Menu, rem, Anchor } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { IconDotsVertical, IconPencil, IconEyeEdit, IconTrashX } from "@tabler/icons-react";
import { DataTable } from 'mantine-datatable';
import { readLocalStorageValue } from '@mantine/hooks';

import tableCss from "../../../assets/css/Table.module.css";

function SignupTable() {
    const { t } = useTranslation();
    const [currentPage, setCurrentPage] = useState(1);
    const signupFormData = readLocalStorageValue({ key: 'signup-form-data' });

    return (
        <Box className={'borderRadiusAll'}>
            <DataTable
                classNames={{
                    root: tableCss.root,
                    table: tableCss.table,
                    header: tableCss.header,
                    footer: tableCss.footer,
                    pagination: tableCss.pagination,
                }}
                records={signupFormData}
                columns={[
                    {
                        accessor: 'index',
                        title: t('S/N'),
                        textAlignment: 'right',
                        render: (item) => (signupFormData.indexOf(item) + 1)
                    },
                    { accessor: 'id', title: t("ID") },
                    { accessor: 'name', title: t("Name") },
                    { accessor: 'phone', title: t("phone") },
                    {
                        accessor: "action",
                        title: t("Action"),
                        textAlign: "right",
                        render: (data) => (
                            <Group gap={4} justify="right" wrap="nowrap">
                                <Menu position="bottom-end" offset={3} withArrow trigger="hover" openDelay={100} closeDelay={400}>
                                    <Menu.Target>
                                        <ActionIcon variant="outline" color="gray.6" radius="xl" aria-label="Settings">
                                            <IconDotsVertical height={'18'} width={'18'} stroke={1.5} />
                                        </ActionIcon>
                                    </Menu.Target>
                                    <Menu.Dropdown>
                                        <Menu.Item w={'200'} href="/inventory/config" leftSection={<IconPencil style={{ width: rem(14), height: rem(14) }} />} >
                                            <Anchor href="https://mantine.dev/" target="_blank">
                                                {t('Edit')}
                                            </Anchor>
                                        </Menu.Item>
                                        <Menu.Item href="/inventory/config"
                                            leftSection={<IconEyeEdit style={{ width: rem(14), height: rem(14) }} />}>

                                            <Anchor href="https://mantine.dev/" target="_blank">
                                                {t('Show')}
                                            </Anchor>
                                        </Menu.Item>
                                        <Menu.Item href=""
                                            leftSection={<IconTrashX style={{ width: rem(14), height: rem(14) }} />}>
                                            <Anchor href="/inventory/config" >
                                                {t('Delete')}
                                            </Anchor>
                                        </Menu.Item>
                                    </Menu.Dropdown>
                                </Menu>
                            </Group>
                        ),
                    },
                ]}
                totalRecords={signupFormData.length}
                recordsPerPage={50}
                page={currentPage}
                onPageChange={(newPage) => setCurrentPage(newPage)}
                loaderSize="xs"
                loaderColor="grape"
                height={500} // Define your desired height
                scrollAreaProps={{ type: 'never' }}
            />
        </Box>
    );
}

export default SignupTable;
