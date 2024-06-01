import React, { useEffect, useState } from "react";
import { Box, ActionIcon, Group, Menu, rem, Anchor, ScrollArea } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { IconDotsVertical, IconPencil, IconEyeEdit, IconTrashX } from "@tabler/icons-react";
import { DataTable } from 'mantine-datatable';
import { readLocalStorageValue, useLocalStorage } from '@mantine/hooks';
import { Navigate, useOutletContext } from "react-router-dom";
import { Table } from '@mantine/core';

import tableCss from "../../../assets/css/Table.module.css";

function SignupTable() {
    const { t } = useTranslation();
    const [currentPage, setCurrentPage] = useState(1);
    const { isOnline, mainAreaHeight } = useOutletContext();
    const tableHeight = mainAreaHeight - 30;
    const height = mainAreaHeight - 30;
    const perPage = 30;

    const data = useLocalStorage({
        key: 'signup-form-data',
        defaultValue: [],
    });
    useEffect(() => {
        console.log(data);
    }, [data]);

    return (
        <Box className={'borderRadiusAll'} >
            <ScrollArea >
                <DataTable
                    classNames={{
                        root: tableCss.root,
                        table: tableCss.table,
                        header: tableCss.header,
                        footer: tableCss.footer,
                        pagination: tableCss.pagination,
                    }}
                    records={data}
                    columns={[
                        {
                            accessor: 'index',
                            title: t('S/N'),
                            textAlignment: 'right',
                            width: 50,
                            render: (item) => (data.indexOf(item) + 1)
                        },
                        { accessor: 'name', title: t("Name"), width: 200 }, // Adjust width as needed
                        { accessor: 'email', title: t("Email"), width: 200 }, // Adjust width as needed
                        { accessor: 'phone', title: t("Phone"), width: 150 }, // Adjust width as needed

                        { accessor: 'companyName', title: t("Company Name"), width: 200 }, // Adjust width as needed
                        { accessor: 'designation', title: t("Designation"), width: 150 }, // Adjust width as needed
                        { accessor: 'companyWebsite', title: t("Company Website"), width: 200 }, // Adjust width as needed
                        { accessor: 'companyEmail', title: t("Company Email"), width: 200 }, // Adjust width as needed

                        { accessor: 'address', title: t("Address"), width: 200 }, // Adjust width as needed

                        {
                            accessor: "action",
                            title: t("Action"),
                            textAlign: "right",
                            // Adjust width as needed
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
                    totalRecords={data.length}
                    recordsPerPage={perPage}
                    page={currentPage}
                    onPageChange={(newPage) => setCurrentPage(newPage)}
                    loaderSize="xs"
                    height={tableHeight}
                    loaderColor="grape"
                    scrollAreaProps={{ type: 'never' }}
                />
            </ScrollArea>
        </Box >
    );
}

export default SignupTable;
