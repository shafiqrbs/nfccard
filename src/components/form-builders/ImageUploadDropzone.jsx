import React, { useState } from "react";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { Text, Image, useMantineTheme, Center, Stack, rem } from "@mantine/core";

function ImageUploadDropzone(props) {
    const { placeholder, form, fieldName, placeholderSize } = props;
    const [files, setFiles] = useState([]);
    const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
    const theme = useMantineTheme();

    const handleDrop = (newFiles) => {
        const file = newFiles[0];
        setFiles([file]);

        const imageUrl = URL.createObjectURL(file);
        form.setFieldValue(fieldName, imageUrl);
    };

    const handleImageLoad = (event) => {
        const { width, height } = event.target;
        const aspectRatio = width / height;
        const desiredHeight = 125;

        let newWidth;
        let newHeight;

        if (aspectRatio > 1) {
            newWidth = desiredHeight * aspectRatio;
            newHeight = desiredHeight;
        } else {
            newWidth = desiredHeight;
            newHeight = desiredHeight / aspectRatio;
        }

        setImageDimensions({ width: newWidth, height: newHeight });
    };

    const inputProps = form.getInputProps(fieldName);
    const imageUrl = files.length > 0 ? URL.createObjectURL(files[0]) : null;

    return (
        <Dropzone
            accept={IMAGE_MIME_TYPE}
            onDrop={handleDrop}
            multiple={false}
            style={{
                border: `2px dashed ${theme.colors.gray[3]}`,
                borderRadius: '4px',
                padding: '20px',
                textAlign: 'center',
            }}
            {...inputProps}
        >
            <Center>
                {imageUrl ? (
                    <Image
                        height={imageDimensions.height}
                        width={imageDimensions.width}
                        radius="md"
                        src={imageUrl}
                        onLoad={handleImageLoad}
                        fit="contain"
                    />
                ) : (
                    <Stack gap={0}>
                        <Text>{placeholder}</Text>
                        <Text>{placeholderSize}</Text>
                    </Stack>
                )}
            </Center>
        </Dropzone>
    );
}

export default ImageUploadDropzone;
