<Group gap={4} justify="right" wrap="nowrap">
    <Menu position="bottom-end" offset={3} withArrow trigger="hover" openDelay={100} closeDelay={400}>
        <Menu.Target>
            <ActionIcon variant="outline" color="gray.6" radius="xl" aria-label="Settings">
                <IconDotsVertical height={'18'} width={'18'} stroke={1.5} />
            </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
            <Menu.Item
                // href={`/inventory/sales/edit/${data.id}`}
                onClick={() => {
                    dispatch(setInsertType('update'))
                    dispatch(editEntityData('inventory/sales/' + data.id))
                    dispatch(setFormLoading(true))
                }}
            >
                {t('Edit')}
            </Menu.Item>

            <Menu.Item
                href={``}
                onClick={() => {
                    setSalesViewData(data)
                }}
                target="_blank"
                component="a"
                w={'200'}
            >
                {t('Show')}
            </Menu.Item>
            <Menu.Item
                // href={``}
                target="_blank"
                component="a"
                w={'200'}
                mt={'2'}
                bg={'red.1'}
                c={'red.6'}
                onClick={() => {
                    modals.openConfirmModal({
                        title: (
                            <Text size="md"> {t("FormConfirmationTitle")}</Text>
                        ),
                        children: (
                            <Text size="sm"> {t("FormConfirmationMessage")}</Text>
                        ),
                        labels: { confirm: 'Confirm', cancel: 'Cancel' },
                        onCancel: () => console.log('Cancel'),
                        onConfirm: () => {
                            dispatch(deleteEntityData('vendor/' + data.id))
                            dispatch(setFetching(true))
                        },
                    });
                }}
                rightSection={<IconTrashX style={{ width: rem(14), height: rem(14) }} />}
            >
                {t('Delete')}
            </Menu.Item>
        </Menu.Dropdown>
    </Menu>
</Group>