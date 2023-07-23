/**
 * @file Домашка по FP ч. 1
 *
 * Основная задача — написать самому, или найти в FP библиотеках функции anyPass/allPass
 * Эти функции/их аналоги есть и в ramda и в lodash
 *
 * allPass — принимает массив функций-предикатов, и возвращает функцию-предикат, которая
 * вернет true для заданного списка аргументов, если каждый из предоставленных предикатов
 * удовлетворяет этим аргументам (возвращает true)
 *
 * anyPass — то же самое, только удовлетворять значению может единственная функция-предикат из массива.
 *
 * Если какие либо функции написаны руками (без использования библиотек) это не является ошибкой
 */

import {map, compose, equals, anyPass, curry, allPass, prop, keys, filter, curryN, length, gte, lte, any} from 'ramda';

let figureEqualsColor = curry((color, figure) => equals(figure, color))
let figureIsWhite = figureEqualsColor('white')
let figureIsRed = figureEqualsColor('red')
let figureIsGreen = figureEqualsColor('green')
let figureIsBlue = figureEqualsColor('blue')
let figureIsOrange = figureEqualsColor('orange')

let getTriangle = prop('triangle'),
    getCircle = prop('circle'),
    getStar = prop('star'),
    getSquare = prop('square');

//------------------- Общие функции -------------------------

let triangleIsWhite = compose(figureIsWhite, getTriangle)
let circleIsWhite = compose(figureIsWhite, getCircle)
let starIsRed = compose(figureIsRed, getStar)
let squareIsGreen = compose(figureIsGreen, getSquare)

let getN1Condition = allPass([
    triangleIsWhite,
    circleIsWhite,
    starIsRed,
    squareIsGreen
]);

// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = ({star, square, triangle, circle}) => {

    return getN1Condition({star, square, triangle, circle})
};

let filterGreenFigures = filter(figureIsGreen);
let getNumGreenFigures = compose(length, keys, filterGreenFigures);

let getN2Condition = compose(lte(2), getNumGreenFigures);

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = ({star, square, triangle, circle}) => {

    return getN2Condition({star, square, triangle, circle});
};

let filterRedFigures = filter(figureIsRed);
let getNumRedFigures = compose(length, keys, filterRedFigures);

let filterBlueFigures = filter(figureIsBlue);
let getNumBlueFigures = compose(length, keys, filterBlueFigures);

let getN3Condition = (figures) => equals(getNumBlueFigures(figures), getNumRedFigures(figures))

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = ({star, square, triangle, circle}) => {
    
    return getN3Condition({star, square, triangle, circle})
};

let circleIsBlue = compose(figureIsBlue, getCircle)
let squareIsOrange = compose(figureIsOrange, getSquare)

let getN4Condition = allPass([
    circleIsBlue,
    starIsRed,
    squareIsOrange
]);

// 4. Синий круг, красная звезда, оранжевый квадрат треугольник любого цвета
export const validateFieldN4 = ({star, square, triangle, circle}) => {
    
    return getN4Condition({star, square, triangle, circle})
};



// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = ({star, square, triangle, circle}) => {
    
};

let isValidGreenNumber = (figures) => equals(getNumGreenFigures(figures), 2)
let isValidRedNumber = (figures) => equals(getNumRedFigures(figures), 1)
let triangleIsGreen = compose(figureIsGreen, getTriangle)

let getN6Condition = allPass([
    isValidGreenNumber,
    isValidRedNumber,
    triangleIsGreen
])

// 6. Ровно две зеленые фигуры (одна из зелёных – это треугольник), плюс одна красная. Четвёртая оставшаяся любого доступного цвета, но не нарушающая первые два условия
export const validateFieldN6 = ({star, square, triangle, circle}) => {
    
    return getN6Condition({star, square, triangle, circle})
};

let getNumOrangeFigures = compose(length, keys, filter(figureIsOrange));

let getN7Condition = (figures) => equals(getNumOrangeFigures(figures), 4)

// 7. Все фигуры оранжевые.
export const validateFieldN7 = ({star, square, triangle, circle}) => {
    
    return getN7Condition({star, square, triangle, circle})
};

let starIsWhite = compose(figureIsWhite, getStar)

let getN8Condition = anyPass([
    starIsWhite,
    starIsRed
])

// 8. Не красная и не белая звезда, остальные – любого цвета.
export const validateFieldN8 = ({star, square, triangle, circle}) => {
    
    return !getN8Condition({star, square, triangle, circle})
};

let getN9Condition = (figures) => equals(getNumGreenFigures(figures), 4)

// 9. Все фигуры зеленые.
export const validateFieldN9 = ({star, square, triangle, circle}) => {
    
    return getN9Condition({star, square, triangle, circle})
};

// 10. Треугольник и квадрат одного цвета (не белого), остальные – любого цвета
export const validateFieldN10 = ({star, square, triangle, circle}) => {
    
};
