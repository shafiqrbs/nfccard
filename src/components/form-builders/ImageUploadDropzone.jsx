import React, { useState } from "react";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { Text, Image, useMantineTheme, Center, Stack } from "@mantine/core";

function ImageUploadDropzone(props) {
    const { placeholder, form, fieldName } = props;
    const [files, setFiles] = useState([]);
    const theme = useMantineTheme();

    const handleDrop = (newFiles) => {

        const updatedFiles = [...files, ...newFiles];
        setFiles(updatedFiles);

        const imageUrls = updatedFiles.map(file => URL.createObjectURL(file));
        form.setFieldValue(fieldName, imageUrls);
    };

    const inputProps = form.getInputProps(fieldName);

    const imageUrl = files.length > 0 ? URL.createObjectURL(files[0]) : null;

    return (
        <>
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

                <Center >

                    {imageUrl ? (
                        <Image
                            h={125}
                            w="auto"
                            radius="md"
                            src={imageUrl}
                            onLoad={() => URL.revokeObjectURL(imageUrl)}
                        />
                    ) : (
                        <>
                            <Stack gap={0}>
                                <Text>{placeholder}</Text>
                                <Text>700*500</Text>
                            </Stack>
                        </>
                    )}
                </Center>
            </Dropzone>


        </>
    );
}

export default ImageUploadDropzone;


