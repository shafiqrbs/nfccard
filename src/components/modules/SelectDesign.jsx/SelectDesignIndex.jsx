import React, { useState } from "react";
import {
    Box,
    Grid, Progress, Container,
    ScrollArea,
    Center
} from "@mantine/core";
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from "react-redux";
import {
    setCustomerFilterData,
    setEntityNewData,
    setInsertType,
    setSearchKeyword
} from "../../../store/core/crudSlice.js";
import { getLoadingProgress } from "../../global-hook/loading-progress/getLoadingProgress.js";
import BoldCard from "../CardDesigns/BoldCard.jsx";
import ElegantCard from "../CardDesigns/ElegantCard.jsx";
import SimpleCard from "../CardDesigns/SimpleCard.jsx";
import DesignFour from "../CardDesigns/DesignFour.jsx";
import DesignFive from "../CardDesigns/DesignFive.jsx";
import { useViewportSize } from "@mantine/hooks";
import DesignSix from "../CardDesigns/DesignSix.jsx";
import { useOutletContext } from "react-router-dom";

function SelectDesignIndex({ setFormData }) {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    const { isOnline, mainAreaHeight } = useOutletContext();
    const height = mainAreaHeight - 80;

    const insertType = useSelector((state) => state.crudSlice.insertType)
    const customerFilterData = useSelector((state) => state.crudSlice.customerFilterData)

    const progress = getLoadingProgress()

    const user = localStorage.getItem("user");

    const [selectedDesign, setSelectedDesign] = useState(null);

    const handleCardClick = (design) => {
        setSelectedDesign(design);
        // You can pass this design to another function or component here
        console.log(`Selected Design: ${design}`);
        // Example: setFormData(design);
    };

    return (
        <>
            {progress !== 100 && <Progress color="red" size={"xs"} striped animated value={progress} />}
            {progress === 100 &&
                <>
                    <Box>
                        <Grid gutter={{ base: 8 }} >
                            <Grid.Col p={'0'} >
                                <Box>
                                    <Box>
                                        <Box mt={6} mb={6} className={'boxBackground borderRadiusAll'}>
                                            <ScrollArea h={{ base: height + 20, md: height + 76 }} scrollbarSize={2} scrollbars="y" type="never">
                                                <Grid columns={12} gutter={'xl'} mt={'md'}>
                                                    <Grid.Col span={6}>
                                                        <Center>
                                                            <Box onClick={() => handleCardClick('BoldCard')}>
                                                                <BoldCard />
                                                            </Box>
                                                        </Center>
                                                    </Grid.Col>
                                                    <Grid.Col span={6}>
                                                        <Center>
                                                            <Box onClick={() => handleCardClick('ElegantCard')}>
                                                                <ElegantCard />
                                                            </Box>
                                                        </Center>
                                                    </Grid.Col>
                                                </Grid>
                                                <Grid columns={12} gutter={'xl'} mt={'md'}>
                                                    <Grid.Col span={6}>
                                                        <Center>
                                                            <Box onClick={() => handleCardClick('DesignFive')}>
                                                                <DesignFive />
                                                            </Box>
                                                        </Center>
                                                    </Grid.Col>
                                                    <Grid.Col span={6}>
                                                        <Center>
                                                            <Box onClick={() => handleCardClick('DesignSix')}>
                                                                <DesignSix />
                                                            </Box>
                                                        </Center>
                                                    </Grid.Col>
                                                </Grid>
                                                <Grid columns={12} gutter={'xl'} mt={'md'}>
                                                    <Grid.Col span={6}>
                                                        <Center>
                                                            <Box onClick={() => handleCardClick('SimpleCard')}>
                                                                <SimpleCard />
                                                            </Box>
                                                        </Center>
                                                    </Grid.Col>
                                                    <Grid.Col span={6}>
                                                        <Center>
                                                            <Box onClick={() => handleCardClick('DesignFour')}>
                                                                <DesignFour />
                                                            </Box>
                                                        </Center>
                                                    </Grid.Col>
                                                </Grid>
                                            </ScrollArea>
                                        </Box>
                                    </Box>
                                </Box>
                            </Grid.Col>
                        </Grid>
                    </Box>
                </>
            }
        </>
    );
}

export default SelectDesignIndex;
