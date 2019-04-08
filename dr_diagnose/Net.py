from tensorflow import keras


class ImgNet():
    @staticmethod
    def build(input_shape=(512, 512, 3)):
        img_input = keras.layers.Input(shape=input_shape)
        # Block 1
        x = keras.layers.Conv2D(64, (3, 3),
                                activation='relu',
                                padding='same',
                                name='block1_conv1')(img_input)
        x = keras.layers.Conv2D(64, (3, 3),
                                activation='relu',
                                padding='same',
                                name='block1_conv2')(x)
        x = keras.layers.MaxPooling2D((2, 2), strides=(2, 2), name='block1_pool')(x)

        # Block 2
        x = keras.layers.Conv2D(128, (3, 3),
                                activation='relu',
                                padding='same',
                                name='block2_conv1')(x)
        x = keras.layers.Conv2D(128, (3, 3),
                                activation='relu',
                                padding='same',
                                name='block2_conv2')(x)
        x = keras.layers.MaxPooling2D((2, 2), strides=(2, 2), name='block2_pool')(x)

        # Block 3
        x = keras.layers.Conv2D(256, (3, 3),
                                activation='relu',
                                padding='same',
                                name='block3_conv1')(x)
        x = keras.layers.Conv2D(256, (3, 3),
                                activation='relu',
                                padding='same',
                                name='block3_conv2')(x)
        x = keras.layers.Conv2D(256, (3, 3),
                                activation='relu',
                                padding='same',
                                name='block3_conv3')(x)
        x = keras.layers.MaxPooling2D((2, 2), strides=(2, 2), name='block3_pool')(x)

        # Block 4
        x = keras.layers.Conv2D(512, (3, 3),
                                activation='relu',
                                padding='same',
                                name='block4_conv1')(x)
        x = keras.layers.Conv2D(512, (3, 3),
                                activation='relu',
                                padding='same',
                                name='block4_conv2')(x)
        x = keras.layers.Conv2D(512, (3, 3),
                                activation='relu',
                                padding='same',
                                name='block4_conv3')(x)
        x = keras.layers.MaxPooling2D((2, 2), strides=(2, 2), name='block4_pool')(x)

        # Block 5
        x = keras.layers.Conv2D(512, (3, 3),
                                activation='relu',
                                padding='same',
                                name='block5_conv1')(x)
        x = keras.layers.Conv2D(512, (3, 3),
                                activation='relu',
                                padding='same',
                                name='block5_conv2')(x)
        x = keras.layers.Conv2D(512, (3, 3),
                                activation='relu',
                                padding='same',
                                name='block5_conv3')(x)
        x = keras.layers.MaxPooling2D((2, 2), strides=(2, 2), name='block5_pool')(x)

        base_model = keras.models.Model(img_input, x)
        # base_model.load_weights("...")

        new_x = base_model.output
        new_x = keras.layers.GlobalAveragePooling2D()(new_x)

        # level classify block
        x_level = keras.layers.Dense(2048, activation='relu', name='fc_level1')(new_x)
        x_level = keras.layers.Dense(2048, activation='relu', name='fc_level2')(x_level)
        x_level = keras.layers.Dense(5, activation='softmax', name='level_output')(x_level)

        # disease classify block
        x_disease = keras.layers.Dense(2048, activation='relu', name='fc_disease')(new_x)
        x_disease = keras.layers.Dense(2, activation="softmax", name="disease_output")(x_disease)

        # Create model.
        model = keras.models.Model(inputs=base_model.input, outputs=[x_level, x_disease])
        return model