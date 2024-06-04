import React, { useEffect, useState } from "react";
import {
    Box,
    Grid, Progress, Title, Container
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

import SignupEditForm from "./SignupEditForm.jsx";

function SignupEditIndex() {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();


    const progress = getLoadingProgress()

    return (
        <>
            {progress !== 100 && <Progress color="red" size={"xs"} striped animated value={progress} />}
            {progress === 100 &&
                <>

                    <Box bg={'white'} mt={6} className={'borderRadiusAll'}>
                        <SignupEditForm />
                    </Box>
                </>
            }
        </>

    );
}

export default SignupEditIndex;
