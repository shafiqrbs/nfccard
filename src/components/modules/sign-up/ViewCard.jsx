import React, { useEffect, useState } from "react";
import {
    Box,
    Container,
    Flex,
    Button,
    Image,
    Portal
} from '@mantine/core'
import { useDisclosure } from "@mantine/hooks";
import { useDispatch, useSelector } from "react-redux";
import { getLoadingProgress } from "../../global-hook/loading-progress/getLoadingProgress";
import { useTranslation } from "react-i18next";
import { useOutletContext } from "react-router-dom";

function ViewCard(props) {

    const {
        format,
        label,
        placeholder,
        required,
        nextField,
        name,
        form,
        tooltip,
        mt,
        id,
        dropdownValue,
        searchable,
        value,
        changeValue,
        base,
        sm,
        lg
    } = props

    const { t, i18n } = useTranslation();
    const { isOnline, mainAreaHeight } = useOutletContext();

    const [opened, setOpened] = useState(false);

    return (
        <>
            {/* <Container>
                <Flex
                    gap="xs"
                    justify="center"
                    align="center"
                    direction="column"
                    wrap="wrap"
                >
                    <Image
                        radius="md"
                        h={100}
                        src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-9.png"
                    >

                    </Image>
                </Flex>
            </Container> */}


            {/* <main style={{ position: 'relative', zIndex: 1 }}>
                {opened && (
                    <Portal>
                        <div>Your modal content</div>
                    </Portal>
                )}

                <button onClick={() => setOpened(true)} type="button">
                    Open modal
                </button>
            </main> */}

        </>
    )
}
export default ViewCard;