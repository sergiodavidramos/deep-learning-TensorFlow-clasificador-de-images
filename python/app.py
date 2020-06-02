import os
import cv2 as cv
import numpy as np
import re
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report
import keras
from keras.utils import to_categorical
from keras.models import Sequential, Input, Model
from keras.layers import Dense, Dropout, Flatten
from keras.layers import Conv2D, MaxPooling2D
from keras.layers.normalization import BatchNormalization
from keras.layers.advanced_activations import LeakyReLU
import tensorflowjs as tfjs

# import matplotlib.pyplot as plt
dirname = os.path.join(os.getcwd(), 'trajes_tipicos')
imagepath = dirname+os.sep
images = []
directories = []
dircount = []
prevRoot = ''
cont = 0


def resize_image():
    archivo = os.path.abspath('trajes_tipicos/prueba')
    print(archivo)
    cont = 1184
    for i in os.listdir(archivo):
        os.rename(archivo+os.sep+i, "trajes_tipicos/prueba/"+str(cont)+".jpg")
        img = cv.imread("trajes_tipicos/prueba/"+str(cont)+".jpg")

        print(cont)
        resized_image = cv.resize(
            img, (200, 200), interpolation=cv.INTER_CUBIC)
        cv.imwrite("trajes_tipicos/prueba/"+str(cont)+".jpg", resized_image)
        cont += 1


def load_images():
    global imagepath
    global images
    global directories
    global dircount
    global prevRoot
    global cont
    print('Leyendo imagenes de: ', imagepath)
    for root, dirnames, filenames in os.walk(imagepath):
        for filename in filenames:
            cont = cont+1
            filepath = os.path.join(root, filename)
            image = cv.imread(filepath)
            # resized = cv.resize(image, dsize=(100, 100), interpolation=cv.INTER_CUBIC)
            images.append(image)
            b = "Leyendo..." + str(cont)
            print(b, end="\r")
            if prevRoot != root:
                print(root, cont)
                prevRoot = root
                directories.append(root)
                dircount.append(cont)
                cont = 0

    dircount.append(cont)

    dircount = dircount[1:]
    dircount[0] = dircount[0]+1
    print("Directorios leidos: ", len(directories))
    print("Imagenes en cada directorio: ", dircount)
    print("Suma total de imagenes en subdirs: ", sum(dircount))


labels = []
indice = 0
trajes = []
train_images = np.array([])
train_labels = np.array([])
n_classes = 0


def create_tags_classes():
    global labels, indice, trajes, train_images, train_labels, n_classes
    for cantidad in dircount:
        for i in range(cantidad):
            labels.append(indice)
        indice = indice+1
    print("Cantidad de etiquetas creadas: ", len(labels))
    indice = 0
    for directorio in directories:
        name = directorio.split(os.sep)
        print(indice, name[len(name)-1])
        trajes.append(name[len(name)-1])
        indice = indice+1

    train_images = np.array(images)
    train_labels = np.array(labels)

    classes = np.unique(train_labels)
    n_classes = len(classes)
    print('Total salidas: ', n_classes)
    print('classes: ', classes)
    print('Trajes: ', trajes)


def create_train_test_val():
    # mesclamos todo para crear un grupo de entrenamiento y testing
    train_X, test_X, train_Y, test_Y = train_test_split(
        train_images, train_labels, test_size=0.2)
    print("Nuevos datos de entrenamiento: ", train_X.shape, train_Y.shape)
    print("Nuevos datos de testing: ", test_X.shape, test_Y.shape)

    train_X = train_X.astype('float32')
    test_X = test_X.astype('float32')
    # print("sdsd",train_X[0])
    train_X = train_X/255.0
    test_X = test_X/255.0

    train_Y_one_hot = to_categorical(train_Y)
    test_Y_one_hot = to_categorical(test_Y)

    print("Label Original: ", train_Y[0])
    print("Label convertido: ", train_Y_one_hot[0])

    train_X, valid_X, train_label, valid_label = train_test_split(
        train_X, train_Y_one_hot, test_size=0.2, random_state=13)
    print(train_X.shape, valid_X.shape, train_label.shape, valid_label.shape)

    # creando la red
    INIT_LR = 1e-3
    epochs = 20
    batch_size = 64

    trajes_model = Sequential()
    trajes_model.add(Conv2D(32, kernel_size=(
        3, 3), activation='linear', padding='same', input_shape=(200, 200, 3)))
    trajes_model.add(LeakyReLU(alpha=0.1))
    trajes_model.add(MaxPooling2D((2, 2), padding='same'))
    trajes_model.add(Dropout(0.5))

    trajes_model.add(Flatten())
    trajes_model.add(Dense(150, activation='linear'))
    trajes_model.add(LeakyReLU(alpha=0.1))
    trajes_model.add(Dropout(0.5))
    trajes_model.add(Dense(n_classes, activation='softmax'))

    trajes_model.summary()

    trajes_model.compile(loss=keras.losses.categorical_crossentropy, optimizer=keras.optimizers.Adagrad(
        lr=INIT_LR, decay=INIT_LR/100), metrics=['accuracy'])

    # entrenando
    # trajes_train_out = trajes_model.fit(train_X, train_label, batch_size=batch_size, epochs=epochs, verbose=1, validation_data=(valid_X, valid_label))
    # py
    trajes_model.save("trajes.h5py")
    # js
    tfjs.converters.save_keras_model(trajes_model, "js")

    new_model = keras.models.load_model('trajes_mnist.h5')
    new_model.summary()

    test_eval = new_model.evaluate(test_X, test_Y_one_hot, verbose=1)

    print("test loss: ", test_eval[0])
    print("test precision: ", test_eval[1])
    print(test_X.shape)
    result = new_model.predict(test_X)

    print(result[1103])
    print("res1 ", test_Y_one_hot[1103])

    while True:
        # cv.imshow('foto1', test_X[1])
        # cv.imshow('foto2', test_X[2])
        cv.imshow('foto3', test_X[1103])
        k = cv.waitKey(30) & 0xff
        if k == 27:
            break

# def create_red():


# resize_image()
load_images()
create_tags_classes()
create_train_test_val()
cv.destroyAllWindows()
# create_red()
