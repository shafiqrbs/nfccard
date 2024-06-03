import React, { useEffect, useState } from "react";
import {
    Box,
    Grid, Progress, Title, Container, Flex, Image
} from "@mantine/core";
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from "react-redux";
import { Carousel } from '@mantine/carousel';
import {
    setCustomerFilterData,
    setEntityNewData,
    setInsertType,
    setSearchKeyword
} from "../../../store/core/crudSlice.js";
import { getLoadingProgress } from "../../global-hook/loading-progress/getLoadingProgress.js";


function SignupLanding() {
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
    // const images = [
    //     'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-1.png',
    //     'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-2.png',
    //     'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-3.png',
    //     'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-4.png',
    //     'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-5.png',
    // ];
    // const slides = images.map((url) => (
    //     <Carousel.Slide key={url}>
    //         <Image src={url} />
    //     </Carousel.Slide>
    // ));
    return (
        <>
            {progress !== 100 && <Progress color="red" size={"xs"} striped animated value={progress} />}
            {progress === 100 &&
                <>

                </>
            }
        </>

    );
}

export default SignupLanding;
