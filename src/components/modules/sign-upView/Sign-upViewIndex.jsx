import React, { useEffect, useState } from "react";
import {
    Box,
    Grid, Progress, Title, Container,
    Flex
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
import ViewCard from "./ViewCard.jsx";
import ViewCardIndex from "./ViewCardIndex.jsx";
import ContactCard from "./ContactCard.jsx";
import ContactCardPrev from "./ContactCardPrev.jsx";
import BoldCard from "../../CardDesigns/BoldCard.jsx";
import ElegantCard from "../../CardDesigns/ElegantCard.jsx";


function SignupViewIndex({ setFormData }) {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();

    const insertType = useSelector((state) => state.crudSlice.insertType)
    const customerFilterData = useSelector((state) => state.crudSlice.customerFilterData)

    const progress = getLoadingProgress()

    useEffect(() => {
        dispatch(setInsertType('create'))
        dispatch(setSearchKeyword(''))
        dispatch(setEntityNewData([]))
        dispatch(setCustomerFilterData({
            ...customerFilterData,
            ['name']: '',
            ['mobile']: ''
        }))
    }, [])

    const user = localStorage.getItem("user");

    return (
        <>
            {progress !== 100 && <Progress color="red" size={"xs"} striped animated value={progress} />}
            {progress === 100 &&
                <>
                    {console.log(setFormData)}
                    <Box bg={'white'} p={'xs'} mt={6} >
                        {/* <ViewCardIndex /> */}
                        {/* <ViewCard /> */}
                        {/* <ContactCard /> */}
                        {/* <ContactCardPrev /> */}
                        <Grid columns={12} gutter={{ base: 6 }} mt={'md'}>
                            <Grid.Col span={6}>
                                <BoldCard />
                            </Grid.Col>
                            <Grid.Col span={6}>
                                <ElegantCard />
                            </Grid.Col>
                        </Grid>
                        <Grid columns={12} gutter={{ base: 6 }} mt={'md'}>
                            <Grid.Col span={6}>
                                <BoldCard />
                            </Grid.Col>
                            <Grid.Col span={6}>
                                <BoldCard />
                            </Grid.Col>
                        </Grid>

                    </Box>
                </>
            }
        </>

    );
}

export default SignupViewIndex;
