import React, { useState } from "react";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { Text, Image, useMantineTheme, Center, Stack } from "@mantine/core";

function ImageUploadDropzone(props) {
    const { placeholder } = props;
    const [file, setFile] = useState(null);
    const theme = useMantineTheme();

    const handleDrop = (files) => {
        if (files.length > 0) {
            setFile(files[0]);
        }
    };

    const imageUrl = file ? URL.createObjectURL(file) : null;

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


