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

import SignupTable from "./Sign-upTable.jsx";

function SignupTableIndex() {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();


    const progress = getLoadingProgress()

    return (
        <>
            {progress !== 100 && <Progress color="red" size={"xs"} striped animated value={progress} />}
            {progress === 100 &&
                <>

                    <Box bg={'white'} p={'xs'} mt={6} className={'borderRadiusAll'}>
                        <SignupTable />
                    </Box>
                </>
            }
        </>

    );
}

export default SignupTableIndex;
