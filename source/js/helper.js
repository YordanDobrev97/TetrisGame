const partFigureImg = 'https://www.pngitem.com/pimgs/m/311-3117345_tetris-blocks-png-transparent-png.png';

const figures = [
    [
        //I
        [1, 0, 0],
        [1, 0, 0],
        [1, 0, 0]
    ],
    [
        //T
        [0, 1, 0],
        [1, 1, 1]
    ],
    [
        //J
        [0, 0, 1],
        [1, 1, 1]
    ],
    [
        //S
        [0, 1, 1],
        [1, 1, 0]
    ]
]

export default {
    defaultPartFigure: partFigureImg,
    figures
};