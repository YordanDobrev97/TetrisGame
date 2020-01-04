function renderRandomFigure() {
    const figures = [
        [
            ['Z', 
                [1,1,0],
                [0,1,1],
                [0,0,0]
            ]
        ],
        [
            ['S',
                [0,1,1],
                [1,1,0],
                [0,0,0]]
        ],
        [
            ['J',
                [0,1,0],
                [0,1,0],
                [1,1,0]
            ]
        ],
        [
            ['T',
                [0,0,0],
                [1,1,1],
                [0,1,0]
            ]
        ],
        [
            ['L',
                [0,1,0],
                [0,1,0],
                [0,1,1]
            ]
        ]
    ];

    return figures;
}

module.exports = renderRandomFigure;